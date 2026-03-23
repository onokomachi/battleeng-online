/**
 * App.tsx - BattleENG Online v3.0
 *
 * 統合機能:
 *  - Firebase Authentication (Google OAuth + Guest)  [エビデンスA: Firebase公式パターン]
 *  - HP制カードバトル (aicardbattle2より移植)        [エビデンスB: 標準カードゲーム設計]
 *  - PvP マルチプレイヤー (Firestore リアルタイム)   [エビデンスA: Firebase onSnapshot]
 *  - ランキングボード                               [エビデンスA: Firestore query/orderBy]
 *  - 管理画面 (GameMaster)                          [エビデンスB: RBAC管理UI設計]
 *  - DDA (Dynamic Difficulty Adjustment)            [エビデンスB: ゲームAI適応設計]
 */
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  onAuthStateChanged, signInWithPopup, signInWithRedirect,
  getRedirectResult, signOut,
  type User
} from 'firebase/auth';
import {
  doc, getDoc, setDoc, updateDoc, increment, arrayUnion,
  collection, onSnapshot, query, addDoc, serverTimestamp,
  runTransaction, where, orderBy, limit, Timestamp, deleteDoc
} from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';
import type { ProblemCard, TurnPhase, GameState, TurnInitiative, Room, BattleMode, BattleFormat, BadgeDef, StudentProfile, Problem, SpeedDuelSetup, SpeedDuelRound } from './types';
import {
  CARD_DEFINITIONS, HAND_SIZE, DECK_SIZE,
  INITIAL_HP, calcDamage, ADMIN_EMAILS, GAMEMASTER_PASSWORD,
  BADGE_DEFS, DAILY_QUEST_DEFS, WEEKLY_QUEST_DEFS, getTodayStr, getWeekStart,
  SHOP_ITEMS, SPEED_DUEL_DAMAGE, SPEED_DUEL_TIME_LIMIT, SPEED_DUEL_SECOND_CHANCE_TIME,
} from './constants';
import GameBoard from './components/GameBoard';
import DeckBuilder from './components/DeckBuilder';
import MainMenu from './components/MainMenu';
import PracticeMode from './components/PracticeMode';
import CardShop from './components/CardShop';
import LevelUpModal from './components/LevelUpModal';
import GravityBackground from './components/GravityBackground';
import LoginScreen from './components/LoginScreen';
import Matchmaking from './components/Matchmaking';
import RankingBoard from './components/RankingBoard';
import GameMaster from './components/GameMaster';
import QuestPanel from './components/QuestPanel';
import BadgeNotification from './components/BadgeNotification';
import LoginBonusModal, { getLoginReward } from './components/LoginBonusModal';
import ClassBattleBoard from './components/ClassBattleBoard';
import { addIncorrectToSrs, getDueCount } from './services/spacedRepetitionService';
import { getSrsProblemsForReview, getMultiCategoryProblemSet } from './services/problemService';
import SpeedDuelSetupScreen from './components/SpeedDuelSetup';
import SpeedDuelBoard from './components/SpeedDuelBoard';
import { recordAttempt, getCategoryWeights } from './services/weaknessAnalysisService';
import WeaknessPanel from './components/WeaknessPanel';
import ItemShop from './components/ItemShop';
import TutorialBattle from './components/TutorialBattle';
import type { ShopItemDef } from './types';
import { getCategoryStats } from './services/weaknessAnalysisService';

// ============================
// Helpers
// ============================
// エビデンスA: Fisher-Yates shuffle — 唯一の均一分布シャッフル
// sort(() => Math.random()-0.5) は偏りがある (Raymond Chen 2007)
const shuffleDeck = (deck: ProblemCard[]): ProblemCard[] => {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const SUPERSCRIPT_MAP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻', 'n': 'ⁿ', 'm': 'ᵐ' };

const normalizeAnswer = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/[！-～]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .replace(/\s+/g, '')
    .replace(/[°度円枚個m分]/g, '')
    .replace(/＝/g, '=')
    .replace(/／/g, '/')
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .replace(/\^([0-9+\-nm]+)/g, (_, digits: string) => digits.split('').map(c => SUPERSCRIPT_MAP[c] || c).join(''))
    .replace(/pi/gi, 'π')
    .replace(/0\.5x/g, '1/2x')
    .replace(/([+-])0\.5x/g, '$11/2x')
    .toLowerCase();
};

// ============================
// App Component
// ============================
const App: React.FC = () => {
  // --- Auth ---
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  // --- Student Profile (学年・組・番号) ---
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    try {
      const s = localStorage.getItem('battleMathStudentProfile');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  // --- Game State ---
  const [gameState, setGameState] = useState<GameState>('login_screen');
  const [gameMode, setGameMode] = useState<BattleMode>('cpu');
  const [turnPhase, setTurnPhase] = useState<TurnPhase>('selecting_card');
  const [initiative, setInitiative] = useState<TurnInitiative>('player');

  // --- Player Progression (synced to Firestore when logged in) ---
  const [mathPoints, setMathPoints] = useState<number>(() => {
    try { return JSON.parse(localStorage.getItem('battleMathPoints') || '1000'); }
    catch { return 1000; }
  });
  const [ownedCardIds, setOwnedCardIds] = useState<Set<number>>(() => {
    try {
      const s = localStorage.getItem('battleMathOwnedCardIds');
      if (s) return new Set(JSON.parse(s));
    } catch {}
    return new Set(CARD_DEFINITIONS.slice(0, 20).map(c => c.id));
  });
  const [playerLevel, setPlayerLevel] = useState<number>(() => {
    try { return JSON.parse(localStorage.getItem('battleMathPlayerLevel') || '1'); }
    catch { return 1; }
  });
  const [playerExp, setPlayerExp] = useState<number>(() => {
    try { return JSON.parse(localStorage.getItem('battleMathPlayerExp') || '0'); }
    catch { return 0; }
  });
  const [userLevelStats, setUserLevelStats] = useState<Record<number, { avgTime: number; count: number }>>(() => {
    try {
      const s = localStorage.getItem('battleMathUserLevelStats');
      return s ? JSON.parse(s) : {
        1: { avgTime: 5000, count: 0 }, 2: { avgTime: 10000, count: 0 },
        3: { avgTime: 20000, count: 0 }, 4: { avgTime: 40000, count: 0 },
        5: { avgTime: 60000, count: 0 }
      };
    } catch { return { 1: { avgTime: 5000, count: 0 }, 2: { avgTime: 10000, count: 0 }, 3: { avgTime: 20000, count: 0 }, 4: { avgTime: 40000, count: 0 }, 5: { avgTime: 60000, count: 0 } }; }
  });
  const [levelUpInfo, setLevelUpInfo] = useState<{
    oldLevel: number; newLevel: number; mpReward: number; newCard: ProblemCard | null;
  } | null>(null);

  // --- Battle State ---
  const [playerDeck, setPlayerDeck] = useState<ProblemCard[]>([]);
  const [pcDeck, setPcDeck] = useState<ProblemCard[]>([]);
  const [playerHand, setPlayerHand] = useState<ProblemCard[]>([]);
  const [pcHand, setPcHand] = useState<ProblemCard[]>([]);
  const [playerHP, setPlayerHP] = useState(INITIAL_HP);
  const [pcHP, setPcHP] = useState(INITIAL_HP);
  const [playerScore, setPlayerScore] = useState(0);
  const [pcScore, setPcScore] = useState(0);
  const [playerPlayedCard, setPlayerPlayedCard] = useState<ProblemCard | null>(null);
  const [pcPlayedCard, setPcPlayedCard] = useState<ProblemCard | null>(null);
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [roundResult, setRoundResult] = useState<string | null>(null);
  const [playerAnswered, setPlayerAnswered] = useState(false);
  const [pcAnswered, setPcAnswered] = useState(false);
  const [roundStartTime, setRoundStartTime] = useState(0);
  const [mismatchRound, setMismatchRound] = useState(false);
  const [battleFormat, setBattleFormat] = useState<BattleFormat>('master_duel');
  const [playerRoundWins, setPlayerRoundWins] = useState(0);
  const [pcRoundWins, setPcRoundWins] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);

  // --- PvP State ---
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);
  const unsubscribeRoomRef = useRef<(() => void) | null>(null);
  const isHostRef = useRef(isHost);
  const processedMatchIdRef = useRef<string | null>(null);
  const pendingPvpDeckRef = useRef<ProblemCard[]>([]);
  const pendingSdSetupRef = useRef<SpeedDuelSetup | null>(null);
  const currentRoomIdRef = useRef<string | null>(null);
  const gameModeRef = useRef<BattleMode>('cpu');

  // --- UI Overlays ---
  const [showRanking, setShowRanking] = useState(false);

  // --- ゲーミフィケーション State ---
  // エビデンスA: ログイン連続日数 × ストリーク喪失回避（Kahneman 1979）
  const [loginStreak, setLoginStreak] = useState(0);
  // エビデンスA: チェインカウンター × 可変報酬スケジュール（Skinner 1938）
  const [chainCount, setChainCount] = useState(0);
  const [wrongAnswerText, setWrongAnswerText] = useState<string | null>(null);
  const [playerWrongAnswer, setPlayerWrongAnswer] = useState<string | null>(null);
  const [wrongCategory, setWrongCategory] = useState<string | null>(null);
  // エビデンスB: バッジ × 自己決定理論（Deci & Ryan 1985）
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<Set<string>>(new Set());
  const [pendingBadge, setPendingBadge] = useState<BadgeDef | null>(null);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  // パネル表示
  const [showQuestPanel, setShowQuestPanel] = useState(false);
  const [showLoginBonus, setShowLoginBonus] = useState(false);
  const [loginBonusClaimed, setLoginBonusClaimed] = useState(false);
  const [showClassBattle, setShowClassBattle] = useState(false);
  const [showWeaknessPanel, setShowWeaknessPanel] = useState(false);
  const [srsReviewProblems, setSrsReviewProblems] = useState<Problem[] | null>(null);
  const [showItemShop, setShowItemShop] = useState(false);
  const [ownedShopItems, setOwnedShopItems] = useState<Set<string>>(() => {
    try {
      const s = localStorage.getItem('bm_owned_shop_items');
      return s ? new Set(JSON.parse(s)) : new Set();
    } catch { return new Set(); }
  });
  const [equippedTitle, setEquippedTitle] = useState<string | null>(() => {
    try { return localStorage.getItem('bm_equipped_title') || null; }
    catch { return null; }
  });
  const [tutorialDone, setTutorialDone] = useState(() => {
    return localStorage.getItem('bm_tutorial_done') === '1';
  });

  // --- Speed Duel State ---
  const [sdSetup, setSdSetup] = useState<SpeedDuelSetup | null>(null);
  const [sdRound, setSdRound] = useState<SpeedDuelRound | null>(null);
  const [sdPlayerHP, setSdPlayerHP] = useState(INITIAL_HP);
  const [sdOpponentHP, setSdOpponentHP] = useState(INITIAL_HP);
  const [sdPlayerRoundWins, setSdPlayerRoundWins] = useState(0);
  const [sdOpponentRoundWins, setSdOpponentRoundWins] = useState(0);
  const [sdCurrentRound, setSdCurrentRound] = useState(1);
  const [sdGameLog, setSdGameLog] = useState<string[]>([]);
  const [sdTimeRemaining, setSdTimeRemaining] = useState(SPEED_DUEL_TIME_LIMIT);
  // Refs for live values accessed by timer callbacks (avoids stale closures)
  const sdLiveRef = useRef({
    playerHP: INITIAL_HP, opponentHP: INITIAL_HP,
    playerRoundWins: 0, opponentRoundWins: 0,
    currentRound: 1, poolIndex: 0,
    setup: null as SpeedDuelSetup | null,
    pool: [] as Problem[],
  });
  const sdCpuThinkRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sdSecondChanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // クエスト進捗 (localStorage管理でFirestoreクォータ節約)
  const [dailyQuestProgress, setDailyQuestProgress] = useState<Record<string, number>>({});
  const [dailyQuestDone, setDailyQuestDone] = useState<Set<string>>(new Set());
  const [weeklyQuestProgress, setWeeklyQuestProgress] = useState<Record<string, number>>({});
  const [weeklyQuestDone, setWeeklyQuestDone] = useState<Set<string>>(new Set());
  // セッション蓄積 refs (書き込み最小化)
  const sessionCorrectRef = useRef(0);

  // Sync refs
  useEffect(() => { isHostRef.current = isHost; }, [isHost]);
  useEffect(() => { currentRoomIdRef.current = currentRoomId; }, [currentRoomId]);
  useEffect(() => { gameModeRef.current = gameMode; }, [gameMode]);
  const gameStateRef = useRef<GameState>('login_screen');
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // ============================
  // localStorage sync
  // ============================
  useEffect(() => {
    localStorage.setItem('battleMathPoints', JSON.stringify(mathPoints));
    localStorage.setItem('battleMathOwnedCardIds', JSON.stringify(Array.from(ownedCardIds)));
    localStorage.setItem('battleMathPlayerLevel', JSON.stringify(playerLevel));
    localStorage.setItem('battleMathPlayerExp', JSON.stringify(playerExp));
    localStorage.setItem('battleMathUserLevelStats', JSON.stringify(userLevelStats));
    if (studentProfile) localStorage.setItem('battleMathStudentProfile', JSON.stringify(studentProfile));
    localStorage.setItem('bm_owned_shop_items', JSON.stringify(Array.from(ownedShopItems)));
    if (equippedTitle) localStorage.setItem('bm_equipped_title', equippedTitle);
    else localStorage.removeItem('bm_equipped_title');
  }, [mathPoints, ownedCardIds, playerLevel, playerExp, userLevelStats, studentProfile, ownedShopItems, equippedTitle]);

  const ownedCards = useMemo(
    () => CARD_DEFINITIONS.filter(c => ownedCardIds.has(c.id)),
    [ownedCardIds]
  );

  // Splash screen timer (minimum 2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ============================
  // Firebase Auth
  // ============================
  useEffect(() => {
    if (!auth) { setAuthLoading(false); return; }

    // Handle redirect result (for mobile/popup-blocked environments)
    getRedirectResult(auth).catch((e) => {
      console.warn('Redirect result check:', e);
    });

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setAuthLoading(false);
      if (u && db) {
        // Sync user data from Firestore
        const ref = doc(db, 'users', u.uid);
        try {
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const d = snap.data();
            if (d.mathPoints !== undefined) setMathPoints(d.mathPoints);
            if (d.playerLevel !== undefined) setPlayerLevel(d.playerLevel);
            if (d.playerExp !== undefined) setPlayerExp(d.playerExp);
            if (d.ownedCardIds) setOwnedCardIds(new Set(d.ownedCardIds));
            // ゲーミフィケーションデータ読み込み
            if (d.earnedBadgeIds) setEarnedBadgeIds(new Set(d.earnedBadgeIds));
            if (d.totalCorrectAnswers !== undefined) setTotalCorrectAnswers(d.totalCorrectAnswers);
            // 学年・組・番号情報をFirestoreから復元 (ローカルになければ)
            if (d.studentProfile) {
              setStudentProfile(d.studentProfile);
              localStorage.setItem('battleMathStudentProfile', JSON.stringify(d.studentProfile));
            }
            // ログインストリーク計算
            const today = getTodayStr();
            const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().slice(0, 10);
            const lastLogin: string = d.lastLoginDate || '';
            let newStreak: number = d.loginStreak || 0;
            if (lastLogin !== today) {
              newStreak = lastLogin === yesterdayStr ? newStreak + 1 : 1;
              await updateDoc(ref, { loginStreak: newStreak, lastLoginDate: today }).catch(() => {});
              // Show login bonus modal automatically on new day
              setLoginBonusClaimed(false);
              setTimeout(() => setShowLoginBonus(true), 800);
            } else {
              // Already logged in today - check if bonus was claimed
              setLoginBonusClaimed(!!d.loginBonusClaimedDate && d.loginBonusClaimedDate === today);
            }
            setLoginStreak(newStreak);
          } else {
            // First login: initialize user doc
            await setDoc(ref, {
              uid: u.uid,
              displayName: u.displayName,
              email: u.email,
              photoURL: u.photoURL,
              mathPoints,
              playerLevel,
              playerExp,
              totalWins: 0,
              totalMatches: 0,
              ownedCardIds: Array.from(ownedCardIds),
              earnedBadgeIds: [],
              totalCorrectAnswers: 0,
              loginStreak: 1,
              lastLoginDate: getTodayStr(),
              loginBonusClaimedDate: '',
              studentProfile: studentProfile || null,
              createdAt: serverTimestamp(),
            });
            setLoginStreak(1);
            setLoginBonusClaimed(false);
            setTimeout(() => setShowLoginBonus(true), 800);
          }
          // クエスト進捗をlocalStorageから復元
          const dqKey = `bm_dq_${getTodayStr()}`;
          const wqKey = `bm_wq_${getWeekStart()}`;
          try {
            setDailyQuestProgress(JSON.parse(localStorage.getItem(dqKey) || '{}'));
            setWeeklyQuestProgress(JSON.parse(localStorage.getItem(wqKey) || '{}'));
            setDailyQuestDone(new Set(JSON.parse(localStorage.getItem(`${dqKey}_done`) || '[]')));
            setWeeklyQuestDone(new Set(JSON.parse(localStorage.getItem(`${wqKey}_done`) || '[]')));
          } catch {}
        } catch (e) { console.error('User sync error:', e); }
      }
    });
    return () => unsub();
  }, []);

  const saveUserToFirestore = useCallback(async (updates: Record<string, any>) => {
    if (!user || !db) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), updates);
    } catch (e) { console.error('Firestore update error:', e); }
  }, [user]);

  // ============================
  // バッジ獲得
  // エビデンスB: 自己決定理論 × 有能感フィードバック（Deci & Ryan 1985）
  // ============================
  const earnBadge = useCallback((badgeId: string) => {
    setEarnedBadgeIds(prev => {
      if (prev.has(badgeId)) return prev;
      const badge = BADGE_DEFS.find(b => b.id === badgeId);
      if (!badge) return prev;
      setPendingBadge(badge);
      setMathPoints(p => p + 100);
      // Firestore にバッジ追加 (arrayUnion で冪等性確保)
      if (user && db) {
        updateDoc(doc(db, 'users', user.uid), {
          earnedBadgeIds: arrayUnion(badgeId),
          mathPoints: increment(100),
        }).catch(() => {});
      }
      return new Set(prev).add(badgeId);
    });
  }, [user]);

  // ============================
  // クエスト進捗更新
  // エビデンスA: 目標設定理論（Locke & Latham 1990）
  // ============================
  const handleQuestProgress = useCallback((type: 'correct' | 'pvp_match') => {
    const dqKey = `bm_dq_${getTodayStr()}`;
    const wqKey = `bm_wq_${getWeekStart()}`;

    setDailyQuestProgress(prev => {
      const next = { ...prev };
      if (type === 'correct') {
        next['dq_5'] = (next['dq_5'] || 0) + 1;
        next['dq_15'] = (next['dq_15'] || 0) + 1;
        next['dq_30'] = (next['dq_30'] || 0) + 1;
      } else if (type === 'pvp_match') {
        next['dq_pvp'] = (next['dq_pvp'] || 0) + 1;
      }
      localStorage.setItem(dqKey, JSON.stringify(next));
      // クエスト達成チェック
      setDailyQuestDone(prevDone => {
        const newDone = new Set(prevDone);
        DAILY_QUEST_DEFS.forEach(q => {
          if (!newDone.has(q.id) && (next[q.id] || 0) >= q.target) {
            newDone.add(q.id);
            setMathPoints(p => p + q.reward.mp);
            if (user && db) {
              updateDoc(doc(db, 'users', user.uid), { mathPoints: increment(q.reward.mp) }).catch(() => {});
            }
          }
        });
        localStorage.setItem(`${dqKey}_done`, JSON.stringify([...newDone]));
        return newDone;
      });
      return next;
    });

    setWeeklyQuestProgress(prev => {
      const next = { ...prev };
      if (type === 'correct') {
        next['wq_50'] = (next['wq_50'] || 0) + 1;
        next['wq_100'] = (next['wq_100'] || 0) + 1;
      } else if (type === 'pvp_match') {
        next['wq_pvp3'] = (next['wq_pvp3'] || 0) + 1;
      }
      localStorage.setItem(wqKey, JSON.stringify(next));
      setWeeklyQuestDone(prevDone => {
        const newDone = new Set(prevDone);
        WEEKLY_QUEST_DEFS.forEach(q => {
          if (!newDone.has(q.id) && (next[q.id] || 0) >= q.target) {
            newDone.add(q.id);
            setMathPoints(p => p + q.reward.mp);
            if (user && db) {
              updateDoc(doc(db, 'users', user.uid), { mathPoints: increment(q.reward.mp) }).catch(() => {});
            }
          }
        });
        localStorage.setItem(`${wqKey}_done`, JSON.stringify([...newDone]));
        return newDone;
      });
      return next;
    });
  }, [user]);

  // ============================
  // 正解イベント統合処理
  // チェイン・バッジ・クエスト・クラス蓄積
  // ============================
  const onCorrectAnswerEvent = useCallback((isCorrect: boolean, correctAnswer: string) => {
    if (isCorrect) {
      // チェインカウンター更新
      setChainCount(prev => {
        const next = prev + 1;
        if (next === 5) earnBadge('chain_5');
        if (next === 10) earnBadge('chain_10');
        if (next === 20) earnBadge('chain_20');
        return next;
      });
      setWrongAnswerText(null);
      // 累積カウンター
      sessionCorrectRef.current += 1;
      setTotalCorrectAnswers(prev => {
        const next = prev + 1;
        if (next === 1) earnBadge('first_correct');
        if (next === 50) earnBadge('correct_50');
        if (next === 100) earnBadge('correct_100');
        if (next === 500) earnBadge('correct_500');
        if (next === 1000) earnBadge('correct_1000');
        return next;
      });
      // クエスト進捗
      handleQuestProgress('correct');
    } else {
      // 不正解: チェインリセット、正解ヒント表示
      setChainCount(0);
      setWrongAnswerText(correctAnswer);
    }
  }, [earnBadge, handleQuestProgress]);

  // ログインストリークバッジ
  useEffect(() => {
    if (loginStreak >= 3) earnBadge('streak_3');
    if (loginStreak >= 7) earnBadge('streak_7');
    if (loginStreak >= 14) earnBadge('streak_14');
    if (loginStreak >= 30) earnBadge('streak_30');
  }, [loginStreak, earnBadge]);

  // 正解ヒント自動クリア（3秒後）
  useEffect(() => {
    if (!wrongAnswerText) return;
    const t = setTimeout(() => setWrongAnswerText(null), 3000);
    return () => clearTimeout(t);
  }, [wrongAnswerText]);

  // ============================
  // セッションデータ書き込み (Firestore quota最小化)
  // ============================
  const flushSessionData = useCallback(async () => {
    if (!user || !db) return;
    const updates: Record<string, any> = {};
    if (sessionCorrectRef.current > 0) {
      updates.totalCorrectAnswers = increment(sessionCorrectRef.current);
      sessionCorrectRef.current = 0;
    }
    if (Object.keys(updates).length > 0) {
      await updateDoc(doc(db, 'users', user.uid), updates).catch(() => {});
    }
  }, [user]);

  // ============================
  // Auth Handlers
  // ============================
  const handleLogin = async () => {
    if (!auth || !googleProvider) {
      console.error('Firebase auth not initialized. auth:', !!auth, 'provider:', !!googleProvider);
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e: any) {
      console.warn('Popup login failed, trying redirect:', e?.code || e);
      // Fallback to redirect for mobile/popup-blocked environments
      if (e?.code === 'auth/popup-blocked' || e?.code === 'auth/popup-closed-by-user' || e?.code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          console.error('Redirect login also failed:', redirectError);
        }
      }
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await leaveRoom(currentRoomId, isHost);
      await flushSessionData();
      await signOut(auth);
      setGameState('login_screen');
      cleanupGameSession();
    } catch (e) { console.error('Logout failed:', e); }
  };

  const handleStudentProfileSet = useCallback(async (profile: StudentProfile) => {
    setStudentProfile(profile);
    localStorage.setItem('battleMathStudentProfile', JSON.stringify(profile));
    if (user && db) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          studentProfile: profile,
        });
      } catch (e) { console.error('Student profile sync error:', e); }
    }
  }, [user]);

  const handleGuestPlay = () => {
    setGameState(tutorialDone ? 'main_menu' : 'tutorial');
  };

  const handleClaimLoginBonus = useCallback(() => {
    const reward = getLoginReward(loginStreak);
    setMathPoints(p => p + reward);
    setLoginBonusClaimed(true);
    if (user && db) {
      updateDoc(doc(db, 'users', user.uid), {
        mathPoints: increment(reward),
        loginBonusClaimedDate: getTodayStr(),
      }).catch(() => {});
    }
  }, [loginStreak, user]);

  const handleShopPurchase = useCallback((item: ShopItemDef) => {
    if (ownedShopItems.has(item.id) || mathPoints < item.cost) return;
    setMathPoints(p => p - item.cost);
    setOwnedShopItems(prev => new Set([...prev, item.id]));
    if (user && db) {
      updateDoc(doc(db, 'users', user.uid), {
        mathPoints: increment(-item.cost),
      }).catch(() => {});
    }
  }, [ownedShopItems, mathPoints, user]);

  // 分野マスターバッジチェック
  const checkCategoryMasterBadges = useCallback(() => {
    const stats = getCategoryStats();
    const categoryBadgeMap: Record<string, string> = {
      '式の計算': 'master_polynomial',
      '連立方程式': 'master_equation',
      '図形の性質': 'master_geometry',
      '一次関数': 'master_function',
      '確率': 'master_probability',
      'データの活用': 'master_data',
    };
    let masteredCount = 0;
    Object.entries(categoryBadgeMap).forEach(([cat, badgeId]) => {
      const s = stats[cat];
      if (s && s.total >= 10 && (s.correct / s.total) >= 0.85) {
        earnBadge(badgeId);
        masteredCount++;
      }
    });
    if (masteredCount >= Object.keys(categoryBadgeMap).length) {
      earnBadge('all_master');
    }
  }, [earnBadge]);

  const canAccessGameMaster = useMemo(() => {
    if (ADMIN_EMAILS.length === 0) return !!user;
    return user && user.email && ADMIN_EMAILS.includes(user.email);
  }, [user]);

  const handleOpenGameMaster = () => {
    const pass = window.prompt('Game Master パスワードを入力:');
    if (pass === GAMEMASTER_PASSWORD) setGameState('gamemaster');
  };

  // ============================
  // Progression
  // ============================
  const expForNextLevel = useCallback((level: number) => 100 + (level - 1) * 50, []);

  // Refs to break useCallback dependency cycle (prevents infinite re-render on level-up)
  const playerLevelRef = useRef(playerLevel);
  const playerExpRef = useRef(playerExp);
  const mathPointsRef = useRef(mathPoints);
  const ownedCardIdsRef = useRef(ownedCardIds);
  useEffect(() => { playerLevelRef.current = playerLevel; }, [playerLevel]);
  useEffect(() => { playerExpRef.current = playerExp; }, [playerExp]);
  useEffect(() => { mathPointsRef.current = mathPoints; }, [mathPoints]);
  useEffect(() => { ownedCardIdsRef.current = ownedCardIds; }, [ownedCardIds]);

  const addExp = useCallback((amount: number) => {
    let currentExp = playerExpRef.current + amount;
    let currentLevel = playerLevelRef.current;
    const oldLevel = currentLevel;
    let totalMpReward = 0;
    while (currentExp >= expForNextLevel(currentLevel)) {
      currentExp -= expForNextLevel(currentLevel);
      currentLevel++;
      totalMpReward += currentLevel * 100;
    }
    if (currentLevel > oldLevel) {
      let newCard: ProblemCard | null = null;
      const unowned = CARD_DEFINITIONS.filter(c => !ownedCardIdsRef.current.has(c.id));
      if (unowned.length > 0) {
        newCard = shuffleDeck(unowned)[0];
        setOwnedCardIds(prev => new Set(prev).add(newCard!.id));
      } else {
        totalMpReward += 500;
      }
      setMathPoints(p => p + totalMpReward);
      setLevelUpInfo({ oldLevel, newLevel: currentLevel, mpReward: totalMpReward, newCard });
      setPlayerLevel(currentLevel);
      saveUserToFirestore({ playerLevel: currentLevel, mathPoints: mathPointsRef.current + totalMpReward });
    }
    setPlayerExp(currentExp);
    saveUserToFirestore({ playerExp: currentExp });
  }, [expForNextLevel, saveUserToFirestore]);

  // ============================
  // Room / PvP watch
  // ============================
  // エビデンスA: Firestore query最適化 - finishedルームを除外
  useEffect(() => {
    if ((gameState !== 'matchmaking' && gameState !== 'sd_matchmaking') || !db) return;
    const q = query(
      collection(db, 'rooms'),
      where('status', 'in', ['waiting', 'playing']),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    return onSnapshot(q, snap => {
      const list: Room[] = [];
      const now = Date.now();
      snap.forEach(d => {
        const data = d.data() as Room;
        if (!data.roomId) data.roomId = d.id;
        // クライアント側: 10分以上前のwaitingルームをフィルタ（ゾンビ除去）
        if (data.status === 'waiting' && data.createdAt) {
          const createdMs = data.createdAt.toDate ? data.createdAt.toDate().getTime() : 0;
          if (createdMs > 0 && now - createdMs > 10 * 60 * 1000) {
            // 古いwaitingルームを自動クリーンアップ
            updateDoc(doc(db, 'rooms', d.id), { status: 'finished', winnerId: 'abandoned' }).catch(() => {});
            return;
          }
        }
        list.push(data);
      });
      setRooms(list);
    }, (error) => {
      const msg = error?.message || '';
      if (msg.includes('not found') || msg.includes('404') || error?.code === 'not-found') {
        setFirestoreError('Firestoreデータベースが未作成です。Firebase Console で Firestore Database を有効化してください。');
      } else if (msg.includes('offline') || msg.includes('unavailable')) {
        setFirestoreError('サーバーに接続できません。インターネット接続を確認してください。');
      } else {
        setFirestoreError(`接続エラー: ${msg}`);
      }
    });
  }, [gameState]);

  // エビデンスA: Firebase公式 - ドキュメントライフサイクル管理
  // ルーム離脱時にFirestoreステータスを更新し、ゾンビルームを防止
  const leaveRoom = useCallback(async (roomId: string | null, wasHost: boolean) => {
    if (!roomId || !db) return;
    try {
      const roomRef = doc(db, 'rooms', roomId);
      const snap = await getDoc(roomRef);
      if (!snap.exists()) return;
      const data = snap.data() as Room;
      if (data.status === 'finished') return;
      if (data.status === 'waiting' && wasHost) {
        // ホストが待機中に離脱 → ルームを終了
        await updateDoc(roomRef, { status: 'finished', winnerId: 'abandoned' });
      } else if (data.status === 'playing') {
        // 対戦中に離脱 → 相手の勝利
        await updateDoc(roomRef, {
          status: 'finished',
          winnerId: wasHost ? 'guest' : 'host',
        });
      }
    } catch (e) { console.error('leaveRoom error:', e); }
  }, []);

  const cleanupGameSession = useCallback((keepConn = false) => {
    if (!keepConn) {
      if (unsubscribeRoomRef.current) unsubscribeRoomRef.current();
      setCurrentRoomId(null);
      setIsHost(false);
      setOpponentDisconnected(false);
    }
    processedMatchIdRef.current = null;
    setWinner(null);
    setPlayerPlayedCard(null);
    setPcPlayedCard(null);
    setMismatchRound(false);
    setPlayerRoundWins(0);
    setPcRoundWins(0);
    setCurrentRound(1);
    setTurnPhase('selecting_card');
  }, []);

  // ============================
  // Speed Duel Logic
  // ============================
  const sdGetRequiredWins = (format: BattleFormat): number => {
    if (format === 'best_of_3') return 2;
    if (format === 'best_of_5') return 3;
    if (format === 'best_of_7') return 4;
    return 0;
  };

  const sdClearTimers = useCallback(() => {
    if (sdCpuThinkRef.current) { clearTimeout(sdCpuThinkRef.current); sdCpuThinkRef.current = null; }
    if (sdSecondChanceRef.current) { clearTimeout(sdSecondChanceRef.current); sdSecondChanceRef.current = null; }
  }, []);

  const sdAdvanceQuestion = useCallback((pool: Problem[], idx: number) => {
    sdClearTimers();
    const actualIdx = idx % Math.max(1, pool.length);
    const problem = pool[actualIdx];
    if (!problem) return;
    sdLiveRef.current.poolIndex = actualIdx;
    setSdRound({
      problem,
      phase: 'showing_question',
      playerBuzzed: false,
      cpuBuzzed: false,
      playerAnswer: null,
      cpuAnswered: false,
      result: null,
      startedAt: Date.now(),
    });
    setSdTimeRemaining(SPEED_DUEL_TIME_LIMIT);
  }, [sdClearTimers]);

  const sdResolveRound = useCallback((result: 'player_win' | 'cpu_win' | 'draw' | 'timeout') => {
    sdClearTimers();
    const live = sdLiveRef.current;

    let newPlayerHP = live.playerHP;
    let newOpponentHP = live.opponentHP;
    let newPlayerWins = live.playerRoundWins;
    let newOpponentWins = live.opponentRoundWins;

    if (result === 'player_win') {
      newOpponentHP = Math.max(0, live.opponentHP - SPEED_DUEL_DAMAGE);
      newPlayerWins = live.playerRoundWins + 1;
      setSdGameLog(prev => [...prev, `R${live.currentRound}: 正解！`]);
      onCorrectAnswerEvent(true, '');
    } else if (result === 'cpu_win') {
      newPlayerHP = Math.max(0, live.playerHP - SPEED_DUEL_DAMAGE);
      newOpponentWins = live.opponentRoundWins + 1;
      setSdGameLog(prev => [...prev, `R${live.currentRound}: CPU正解...`]);
      onCorrectAnswerEvent(false, '');
    } else if (result === 'draw') {
      setSdGameLog(prev => [...prev, `R${live.currentRound}: ドロー`]);
    } else {
      setSdGameLog(prev => [...prev, `R${live.currentRound}: タイムアウト`]);
    }

    // Update live ref and state
    sdLiveRef.current = { ...live, playerHP: newPlayerHP, opponentHP: newOpponentHP, playerRoundWins: newPlayerWins, opponentRoundWins: newOpponentWins };
    setSdPlayerHP(newPlayerHP);
    setSdOpponentHP(newOpponentHP);
    setSdPlayerRoundWins(newPlayerWins);
    setSdOpponentRoundWins(newOpponentWins);
    setSdRound(prev => prev ? { ...prev, phase: 'reveal', result } : prev);
  }, [sdClearTimers, onCorrectAnswerEvent]);

  const sdBuzz = useCallback(() => {
    if (!sdRound || sdRound.phase !== 'showing_question' || sdRound.playerBuzzed || sdRound.cpuBuzzed) return;
    sdClearTimers();
    setSdRound(prev => prev ? { ...prev, phase: 'player_buzzed', playerBuzzed: true } : prev);
  }, [sdRound, sdClearTimers]);

  const sdAnswer = useCallback((answer: string) => {
    if (!sdRound) return;
    const { phase, problem } = sdRound;
    if (phase !== 'player_buzzed' && phase !== 'opponent_chance') return;
    sdClearTimers();

    const correctStr = Array.isArray(problem.answer) ? problem.answer.join(' ') : String(problem.answer);
    const correct = normalizeAnswer(answer) === normalizeAnswer(correctStr);
    setSdRound(prev => prev ? { ...prev, playerAnswer: answer } : prev);

    if (phase === 'player_buzzed') {
      if (correct) {
        sdResolveRound('player_win');
      } else {
        // Wrong → CPU gets second chance (always answers correctly in CPU mode)
        setSdRound(prev => prev ? { ...prev, phase: 'opponent_chance' } : prev);
        sdSecondChanceRef.current = setTimeout(() => {
          sdResolveRound('cpu_win');
        }, SPEED_DUEL_SECOND_CHANCE_TIME);
      }
    } else {
      // opponent_chance — player gets second shot
      sdResolveRound(correct ? 'player_win' : 'draw');
    }
  }, [sdRound, sdClearTimers, sdResolveRound]);

  const startSpeedDuel = useCallback((setup: SpeedDuelSetup) => {
    // PvPモードはマッチメイキングへ遷移
    if (setup.mode === 'pvp') {
      pendingSdSetupRef.current = setup;
      setSdSetup(setup);
      setGameMode('pvp');
      setGameState('sd_matchmaking');
      return;
    }
    const pool = getMultiCategoryProblemSet(setup.categories, 50);
    if (pool.length === 0) return;
    sdLiveRef.current = {
      playerHP: INITIAL_HP, opponentHP: INITIAL_HP,
      playerRoundWins: 0, opponentRoundWins: 0,
      currentRound: 1, poolIndex: 0,
      setup, pool,
    };
    setSdSetup(setup);
    setSdPlayerHP(INITIAL_HP);
    setSdOpponentHP(INITIAL_HP);
    setSdPlayerRoundWins(0);
    setSdOpponentRoundWins(0);
    setSdCurrentRound(1);
    setSdGameLog([]);
    setWinner(null);
    setChainCount(0);
    setGameState('speed_duel');
    sdAdvanceQuestion(pool, 0);
  }, [sdAdvanceQuestion]);

  // ============================
  // Speed Duel Online (PvP)
  // ============================
  const sdOnlinePoolRef = useRef<Problem[]>([]);
  const sdOnlineAnsweredRef = useRef(false);

  /** SD PvP: ゲーム開始（マッチ成立後） */
  const startSdOnline = useCallback((setup: SpeedDuelSetup, roomId: string, amHost: boolean) => {
    const pool = getMultiCategoryProblemSet(setup.categories, 50);
    if (pool.length === 0) return;
    sdOnlinePoolRef.current = pool;
    sdOnlineAnsweredRef.current = false;
    sdLiveRef.current = {
      playerHP: INITIAL_HP, opponentHP: INITIAL_HP,
      playerRoundWins: 0, opponentRoundWins: 0,
      currentRound: 1, poolIndex: 0,
      setup, pool,
    };
    setSdSetup(setup);
    setGameMode('pvp');
    setSdPlayerHP(INITIAL_HP);
    setSdOpponentHP(INITIAL_HP);
    setSdPlayerRoundWins(0);
    setSdOpponentRoundWins(0);
    setSdCurrentRound(1);
    setSdGameLog([]);
    setWinner(null);
    setChainCount(0);
    setGameState('speed_duel');

    // ホストが最初の問題を書き込む
    if (amHost && db) {
      const q = pool[0];
      updateDoc(doc(db, 'rooms', roomId), {
        sdQuestion: { type: q.type, data: q.data, answer: q.answer },
        sdQuestionIndex: 1,
        sdHostAnswer: null, sdGuestAnswer: null,
        sdHostBuzz: null, sdGuestBuzz: null,
        sdRoundResult: null,
      }).catch(() => {});
    }
  }, []);

  /** SD PvP: ルームからの問題表示 */
  const sdShowOnlineQuestion = useCallback((q: Problem) => {
    sdClearTimers();
    sdOnlineAnsweredRef.current = false;
    setSdTimeRemaining(SPEED_DUEL_TIME_LIMIT);
    setSdRound({
      problem: q,
      phase: 'player_buzzed', // PvPでは即回答モード
      playerBuzzed: true,
      cpuBuzzed: false,
      playerAnswer: null,
      cpuAnswered: false,
      result: null,
      startedAt: Date.now(),
    });
  }, [sdClearTimers]);

  /** SD PvP: 回答送信 */
  const sdOnlineAnswer = useCallback((answer: string) => {
    if (!sdRound || sdOnlineAnsweredRef.current) return;
    const roomId = currentRoomIdRef.current;
    if (!roomId || !db) return;
    sdOnlineAnsweredRef.current = true;
    const field = isHostRef.current ? 'sdHostAnswer' : 'sdGuestAnswer';
    updateDoc(doc(db, 'rooms', roomId), { [field]: answer }).catch(() => {});
    // ローカルUI: 相手待ち表示
    setSdRound(prev => prev ? { ...prev, phase: 'opponent_chance', playerAnswer: answer } : prev);
  }, [sdRound]);

  /** SD PvP: ルーム更新ハンドラ */
  const sdHandleRoomUpdate = useCallback((data: Room, amHost: boolean) => {
    const hostAns = data.sdHostAnswer;
    const guestAns = data.sdGuestAnswer;
    const qIdx = data.sdQuestionIndex ?? 0;
    const live = sdLiveRef.current;

    // 新しい問題が書き込まれた場合、表示する
    if (data.sdQuestion && qIdx > (live.poolIndex + 1)) {
      // poolIndex tracks displayed question (0-based), sdQuestionIndex is 1-based
    }
    if (data.sdQuestion && !sdOnlineAnsweredRef.current && sdRound?.phase === undefined) {
      sdShowOnlineQuestion(data.sdQuestion as unknown as Problem);
    }

    // HP/ラウンド勝ち数の同期
    const myHP = amHost ? data.p1Hp : data.p2Hp;
    const opHP = amHost ? data.p2Hp : data.p1Hp;
    const myWins = amHost ? (data.sdHostRoundWins ?? 0) : (data.sdGuestRoundWins ?? 0);
    const opWins = amHost ? (data.sdGuestRoundWins ?? 0) : (data.sdHostRoundWins ?? 0);
    setSdPlayerHP(myHP);
    setSdOpponentHP(opHP);
    setSdPlayerRoundWins(myWins);
    setSdOpponentRoundWins(opWins);
    sdLiveRef.current = { ...live, playerHP: myHP, opponentHP: opHP, playerRoundWins: myWins, opponentRoundWins: opWins };

    // 両者回答済み → ホストが判定・次の問題へ進む
    if (hostAns !== null && hostAns !== undefined && guestAns !== null && guestAns !== undefined && data.sdRoundResult === null) {
      if (amHost) {
        // ホストが判定する
        const q = data.sdQuestion as unknown as Problem;
        if (!q) return;
        const correctStr = Array.isArray(q.answer) ? q.answer.join(' ') : String(q.answer);
        const hostCorrect = normalizeAnswer(hostAns) === normalizeAnswer(correctStr);
        const guestCorrect = normalizeAnswer(guestAns) === normalizeAnswer(correctStr);

        let result: 'host' | 'guest' | 'draw';
        if (hostCorrect && guestCorrect) result = 'draw'; // 両者正解→ドロー
        else if (hostCorrect) result = 'host';
        else if (guestCorrect) result = 'guest';
        else result = 'draw'; // 両者不正解

        const roomId = currentRoomIdRef.current;
        if (!roomId || !db) return;

        let newP1Hp = data.p1Hp;
        let newP2Hp = data.p2Hp;
        let newHostWins = data.sdHostRoundWins ?? 0;
        let newGuestWins = data.sdGuestRoundWins ?? 0;

        if (result === 'host') {
          newP2Hp = Math.max(0, newP2Hp - SPEED_DUEL_DAMAGE);
          newHostWins += 1;
        } else if (result === 'guest') {
          newP1Hp = Math.max(0, newP1Hp - SPEED_DUEL_DAMAGE);
          newGuestWins += 1;
        }

        updateDoc(doc(db, 'rooms', roomId), {
          sdRoundResult: result,
          p1Hp: newP1Hp, p2Hp: newP2Hp,
          sdHostRoundWins: newHostWins, sdGuestRoundWins: newGuestWins,
        }).catch(() => {});
      }
      return; // ホスト判定待ち
    }

    // 結果が出た → リビール表示 & 次の問題へ
    if (data.sdRoundResult && sdRound?.phase !== 'reveal') {
      const resultForMe: 'player_win' | 'cpu_win' | 'draw' =
        data.sdRoundResult === (amHost ? 'host' : 'guest') ? 'player_win' :
        data.sdRoundResult === 'draw' ? 'draw' : 'cpu_win';

      if (resultForMe === 'player_win') {
        setSdGameLog(prev => [...prev, `R${qIdx}: 正解！`]);
        onCorrectAnswerEvent(true, '');
      } else if (resultForMe === 'cpu_win') {
        setSdGameLog(prev => [...prev, `R${qIdx}: 相手が正解...`]);
        onCorrectAnswerEvent(false, '');
      } else {
        setSdGameLog(prev => [...prev, `R${qIdx}: ドロー`]);
      }

      setSdRound(prev => prev ? { ...prev, phase: 'reveal', result: resultForMe } : prev);

      // ゲームオーバー判定
      const myHPAfter = amHost ? data.p1Hp : data.p2Hp;
      const opHPAfter = amHost ? data.p2Hp : data.p1Hp;
      const myWinsAfter = amHost ? (data.sdHostRoundWins ?? 0) : (data.sdGuestRoundWins ?? 0);
      const opWinsAfter = amHost ? (data.sdGuestRoundWins ?? 0) : (data.sdHostRoundWins ?? 0);
      const format = data.sdFormat ?? 'best_of_5';
      const reqWins = sdGetRequiredWins(format);
      const gameOver = format === 'master_duel'
        ? (myHPAfter <= 0 || opHPAfter <= 0)
        : (reqWins > 0 && (myWinsAfter >= reqWins || opWinsAfter >= reqWins));

      if (gameOver) {
        // ゲーム終了
        setTimeout(() => {
          const isWin = format === 'master_duel' ? opHPAfter <= 0 && myHPAfter > 0 : myWinsAfter >= reqWins;
          const isDraw = format === 'master_duel' ? myHPAfter <= 0 && opHPAfter <= 0 : false;
          setWinner(isDraw ? '引き分け' : isWin ? '勝利！' : '敗北...');
          if (isWin) { addExp(500); setMathPoints(p => p + 300); }
          else { addExp(100); }
          handleQuestProgress('pvp_match');
          flushSessionData().catch(() => {});
          setGameState('end');
          // ルームを終了
          if (amHost && currentRoomIdRef.current && db) {
            const winnerId = isDraw ? 'draw' : isWin ? 'host' : 'guest';
            updateDoc(doc(db, 'rooms', currentRoomIdRef.current), {
              status: 'finished', winnerId,
            }).catch(() => {});
          }
        }, 2500);
        return;
      }

      // ホスト: 次の問題を書き込む（2.5秒後）
      if (amHost) {
        setTimeout(() => {
          const pool = sdOnlinePoolRef.current;
          const nextIdx = (qIdx) % Math.max(1, pool.length);
          const nextQ = pool[nextIdx];
          if (!nextQ || !currentRoomIdRef.current || !db) return;
          sdLiveRef.current.poolIndex = nextIdx;
          updateDoc(doc(db, 'rooms', currentRoomIdRef.current), {
            sdQuestion: { type: nextQ.type, data: nextQ.data, answer: nextQ.answer },
            sdQuestionIndex: qIdx + 1,
            sdHostAnswer: null, sdGuestAnswer: null,
            sdHostBuzz: null, sdGuestBuzz: null,
            sdRoundResult: null,
          }).catch(() => {});
        }, 2500);
      }
    }

    // 新しい問題が来た（answerがnull + questionIndex変更）
    if (data.sdQuestion && data.sdRoundResult === null && !sdOnlineAnsweredRef.current) {
      const q = data.sdQuestion as unknown as Problem;
      const currentStarted = sdRound?.startedAt ?? 0;
      // 新しい問題の判定: questionIndexが変わった
      if (qIdx > sdLiveRef.current.poolIndex + 1 || sdRound?.phase === 'reveal' || !sdRound) {
        sdLiveRef.current.poolIndex = qIdx - 1;
        sdShowOnlineQuestion(q);
      }
    }
  }, [sdRound, sdShowOnlineQuestion, sdClearTimers, onCorrectAnswerEvent]); // eslint-disable-line react-hooks/exhaustive-deps

  // CPU think timer — fires when question is shown (CPU mode only)
  useEffect(() => {
    if (gameState !== 'speed_duel' || !sdRound || sdRound.phase !== 'showing_question' || gameModeRef.current === 'pvp') return;
    const delay = 4000 + Math.random() * 8000;
    sdCpuThinkRef.current = setTimeout(() => {
      setSdRound(prev => {
        if (!prev || prev.phase !== 'showing_question') return prev;
        return { ...prev, cpuBuzzed: true };
      });
      // Short pause then CPU "answers" correctly
      sdSecondChanceRef.current = setTimeout(() => {
        sdResolveRound('cpu_win');
      }, 800);
    }, delay);
    return () => {
      if (sdCpuThinkRef.current) clearTimeout(sdCpuThinkRef.current);
    };
  }, [sdRound?.startedAt, gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown display timer
  useEffect(() => {
    if (gameState !== 'speed_duel' || !sdRound) return;
    const { phase, startedAt } = sdRound;
    if (phase !== 'showing_question' && phase !== 'player_buzzed' && phase !== 'opponent_chance') return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, SPEED_DUEL_TIME_LIMIT - (Date.now() - startedAt));
      setSdTimeRemaining(remaining);
    }, 100);
    return () => clearInterval(interval);
  }, [sdRound?.startedAt, sdRound?.phase, gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  // Hard timeout — if no one answers in 15s (CPU mode only)
  useEffect(() => {
    if (gameState !== 'speed_duel' || !sdRound || sdRound.phase !== 'showing_question' || gameModeRef.current === 'pvp') return;
    const elapsed = Date.now() - sdRound.startedAt;
    const remaining = Math.max(0, SPEED_DUEL_TIME_LIMIT - elapsed);
    const t = setTimeout(() => sdResolveRound('timeout'), remaining);
    return () => clearTimeout(t);
  }, [sdRound?.startedAt, gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  // PvP timeout — auto-submit empty answer if time runs out
  useEffect(() => {
    if (gameState !== 'speed_duel' || !sdRound || gameModeRef.current !== 'pvp') return;
    if (sdRound.phase !== 'player_buzzed') return; // only when answering
    if (sdOnlineAnsweredRef.current) return;
    const elapsed = Date.now() - sdRound.startedAt;
    const remaining = Math.max(0, SPEED_DUEL_TIME_LIMIT - elapsed);
    const t = setTimeout(() => {
      if (!sdOnlineAnsweredRef.current) {
        sdOnlineAnswer('__TIMEOUT__');
      }
    }, remaining);
    return () => clearTimeout(t);
  }, [sdRound?.startedAt, sdRound?.phase, gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reveal phase → advance to next question (CPU mode only; PvP uses sdHandleRoomUpdate)
  useEffect(() => {
    if (gameState !== 'speed_duel' || !sdRound || sdRound.phase !== 'reveal' || gameModeRef.current === 'pvp') return;
    const live = sdLiveRef.current;
    const setup = live.setup!;
    const required = sdGetRequiredWins(setup.format);
    const isGameOver = setup.format === 'master_duel'
      ? live.playerHP <= 0 || live.opponentHP <= 0
      : live.playerRoundWins >= required || live.opponentRoundWins >= required;

    const t = setTimeout(() => {
      if (isGameOver) {
        const isDraw = live.playerHP <= 0 && live.opponentHP <= 0;
        const isWin = setup.format === 'master_duel'
          ? live.opponentHP <= 0
          : live.playerRoundWins >= required;
        if (isDraw) {
          setWinner('引き分け\nよく戦いました！');
          addExp(200);
        } else if (isWin) {
          setWinner('勝利！\nスピードデュエル制覇！');
          addExp(500);
          setMathPoints(p => p + 300);
          earnBadge('first_win');
        } else {
          setWinner('敗北...\n次こそ勝とう！');
          addExp(100);
        }
        setSdRound(prev => prev ? { ...prev, phase: 'game_over' } : prev);
        setGameState('end');
      } else {
        const nextRound = live.currentRound + 1;
        const nextIdx = (live.poolIndex + 1) % live.pool.length;
        sdLiveRef.current.currentRound = nextRound;
        setSdCurrentRound(nextRound);
        sdAdvanceQuestion(live.pool, nextIdx);
      }
    }, 2500);
    return () => clearTimeout(t);
  }, [sdRound?.phase, sdRound?.result, gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  // エビデンスA: MDN beforeunload + visibilitychange
  // ブラウザ閉じ/タブ閉じ時にルームをクリーンアップ
  useEffect(() => {
    const handleBeforeUnload = () => {
      const rid = currentRoomIdRef.current;
      if (!rid || !db) return;
      // sendBeacon で非同期的にクリーンアップ（信頼性は低いが最善策）
      // Firestore REST APIへのbeaconは複雑なため、updateDocを試みる
      const roomRef = doc(db, 'rooms', rid);
      updateDoc(roomRef, {
        status: 'finished',
        winnerId: isHostRef.current ? 'guest' : 'host',
      }).catch(() => {});
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const listenToRoom = (roomId: string) => {
    if (!db) return;
    if (unsubscribeRoomRef.current) unsubscribeRoomRef.current();
    unsubscribeRoomRef.current = onSnapshot(doc(db, 'rooms', roomId), snap => {
      if (!snap.exists()) {
        // ルームが削除された場合
        setOpponentDisconnected(true);
        return;
      }
      const data = snap.data() as Room;
      const isHostVal = isHostRef.current;

      // エビデンスB: 相手の切断検知（lastActiveが90秒以上古い場合）
      if (data.status === 'playing') {
        const opponentLastActive = isHostVal ? data.guestLastActive : data.hostLastActive;
        if (opponentLastActive) {
          const lastActiveMs = opponentLastActive.toDate ? opponentLastActive.toDate().getTime() : 0;
          const staleThreshold = 180000; // 180秒（ハートビート120秒に合わせて余裕を持たせる）
          if (lastActiveMs > 0 && Date.now() - lastActiveMs > staleThreshold) {
            setOpponentDisconnected(true);
          } else {
            setOpponentDisconnected(false);
          }
        }
      }

      // ルームが外部要因で finished になった場合（相手離脱・管理者終了等）
      if (data.status === 'finished' && data.winnerId === 'abandoned') {
        cleanupGameSession();
        if (data.battleType === 'speed_duel') {
          setGameState('speed_duel_setup');
        } else {
          setGameState('deck_building');
        }
        return;
      }

      // --- デッキバトル: マッチング成立 → ゲーム開始 (重複起動防止: processedMatchIdRef) ---
      if (data.status === 'playing' && gameStateRef.current === 'matchmaking' && processedMatchIdRef.current !== roomId) {
        processedMatchIdRef.current = roomId;
        const pvpDeck = pendingPvpDeckRef.current.length > 0 ? pendingPvpDeckRef.current : playerDeck;
        setCurrentRound(1);
        setTimeout(() => {
          startGame(pvpDeck, false, data);
          setGameState('in_game');
        }, 500);
      }

      // --- スピードデュエル: マッチング成立 → SD開始 (重複起動防止: processedMatchIdRef) ---
      if (data.status === 'playing' && gameStateRef.current === 'sd_matchmaking' && processedMatchIdRef.current !== roomId) {
        processedMatchIdRef.current = roomId;
        setTimeout(() => {
          const setup: SpeedDuelSetup = pendingSdSetupRef.current ?? {
            categories: (data.sdCategories ?? []) as any,
            format: data.sdFormat ?? 'best_of_5',
            mode: 'pvp',
          };
          startSdOnline(setup, roomId, isHostVal);
        }, 500);
      }

      // --- スピードデュエルPvP: リアルタイム同期 ---
      if (gameStateRef.current === 'speed_duel' && data.battleType === 'speed_duel') {
        sdHandleRoomUpdate(data, isHostVal);
      }

      if (gameStateRef.current === 'in_game') {
        setPlayerHP(isHostVal ? data.p1Hp : data.p2Hp);
        setPcHP(isHostVal ? data.p2Hp : data.p1Hp);

        if (data.winnerId && processedMatchIdRef.current !== roomId) {
          processedMatchIdRef.current = roomId;
          const isWinner = (data.winnerId === 'host' && isHostVal) || (data.winnerId === 'guest' && !isHostVal);
          const isAbandoned = data.winnerId === 'abandoned' || data.winnerId === 'admin_terminated';
          if (isAbandoned) {
            setWinner('中断されました');
          } else {
            setWinner(data.winnerId === 'draw' ? '引き分け' : isWinner ? '勝利！' : '敗北...');
          }
          if (isWinner && !isAbandoned) {
            addExp(500);
            setMathPoints(p => p + 300);
            saveUserToFirestore({ totalWins: increment(1), totalMatches: increment(1) });
            earnBadge('first_pvp_win');
            // PvP10勝バッジチェックはサーバー側totalWinsで判断できないので省略
          } else if (!isAbandoned) {
            addExp(100);
            saveUserToFirestore({ totalMatches: increment(1) });
          }
          if (!isAbandoned) handleQuestProgress('pvp_match');
          flushSessionData().catch(() => {}); // fire-and-forget
          setChainCount(0);
          setGameState('end');
        }
      }
    }, (error) => {
      const msg = error?.message || '';
      if (msg.includes('not found') || msg.includes('404') || error?.code === 'not-found') {
        console.error('[BattleENG] Firestoreデータベースが未作成です');
      } else {
        console.error('[BattleENG] Room listener error:', msg);
      }
    });
  };

  const handleJoinRoom = async (roomId: string, battleType?: 'deck' | 'speed_duel') => {
    if (!user || !db) {
      alert('PvP対戦にはログインが必要です');
      return;
    }
    // 既存ルームを Firestore でも終了させてからクリーンアップ（ゾンビ防止）
    const prevRoomId = currentRoomId;
    const wasHost = isHost;
    cleanupGameSession(false);
    if (prevRoomId) {
      await leaveRoom(prevRoomId, wasHost);
    }
    try {
      const roomRef = doc(db, 'rooms', roomId);
      const uid = user.uid.trim();
      const sdSetup = pendingSdSetupRef.current;
      const result = await runTransaction(db, async (tx) => {
        const roomDoc = await tx.get(roomRef);
        const base: Record<string, any> = {
          roomId, status: 'waiting', hostId: uid,
          hostName: user.displayName || 'Player',
          guestId: null, guestName: null,
          createdAt: serverTimestamp(), hostLastActive: serverTimestamp(),
          guestLastActive: null, hostReady: true, guestReady: false,
          round: 1, p1Move: null, p2Move: null,
          p1Hp: INITIAL_HP, p2Hp: INITIAL_HP, winnerId: null,
        };
        // Speed Duel 固有フィールド
        if (battleType === 'speed_duel' && sdSetup) {
          base.battleType = 'speed_duel';
          base.sdCategories = sdSetup.categories;
          base.sdFormat = sdSetup.format;
          base.sdQuestion = null;
          base.sdQuestionIndex = 0;
          base.sdHostBuzz = null;
          base.sdGuestBuzz = null;
          base.sdHostAnswer = null;
          base.sdGuestAnswer = null;
          base.sdRoundResult = null;
          base.sdHostRoundWins = 0;
          base.sdGuestRoundWins = 0;
        } else {
          base.battleType = 'deck';
        }
        if (!roomDoc.exists() || (roomDoc.data() as Room).status === 'finished') {
          tx.set(roomRef, base);
          return 'host';
        }
        const d = roomDoc.data() as Room;
        if ((d.hostId || '').trim() === uid) return 'host';
        if ((d.guestId || '').trim() === uid) return 'guest';
        if (d.status === 'waiting') {
          tx.update(roomRef, {
            status: 'playing', guestId: uid,
            guestName: user.displayName || 'Player',
            guestReady: true, guestLastActive: serverTimestamp()
          });
          return 'guest';
        }
        throw new Error('ROOM_FULL');
      });
      setIsHost(result === 'host');
      setCurrentRoomId(roomId);
    } catch (e: any) {
      const msg = e?.message || '';
      if (msg === 'ROOM_FULL') {
        alert('この部屋は満員です。');
      } else if (msg.includes('not found') || msg.includes('404') || e?.code === 'not-found') {
        alert('Firestoreデータベースが未作成です。\nFirebase Console → Firestore Database → 「データベースを作成」を実行してください。');
      } else if (msg.includes('offline') || msg.includes('unavailable')) {
        alert('サーバーに接続できません。インターネット接続を確認してください。');
      } else {
        console.error('Room join error:', e);
        alert(`入室エラー: ${msg || '不明なエラーが発生しました'}`);
      }
    }
  };

  useEffect(() => { if (currentRoomId) listenToRoom(currentRoomId); }, [currentRoomId]);

  // エビデンスB: ハートビートパターン - 120秒ごとにlastActiveを更新（Firestore無料枠節約）
  useEffect(() => {
    if (!currentRoomId || !db || !user) return;
    const field = isHostRef.current ? 'hostLastActive' : 'guestLastActive';
    const interval = setInterval(() => {
      updateDoc(doc(db, 'rooms', currentRoomId), {
        [field]: serverTimestamp(),
      }).catch(() => {});
    }, 120000);
    // 初回も即時更新
    updateDoc(doc(db, 'rooms', currentRoomId), {
      [field]: serverTimestamp(),
    }).catch(() => {});
    return () => clearInterval(interval);
  }, [currentRoomId, user]);

  // ============================
  // Game Start
  // ============================
  // ZPD重み付きデッキ構築（エビデンスA: Vygotsky 1978）
  const buildAdaptiveCpuDeck = useCallback((): ProblemCard[] => {
    const weights = getCategoryWeights();
    const cards = [...CARD_DEFINITIONS];
    // 各カードに重みを割り当て（未記録カテゴリはデフォルト2）
    const weighted = cards.map(c => ({ card: c, weight: weights[c.category] || 2 }));
    const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);

    // 重み付きサンプリング（復元なし）
    const selected: ProblemCard[] = [];
    const pool = [...weighted];
    while (selected.length < DECK_SIZE && pool.length > 0) {
      let roll = Math.random() * pool.reduce((s, w) => s + w.weight, 0);
      let idx = 0;
      for (; idx < pool.length - 1; idx++) {
        roll -= pool[idx].weight;
        if (roll <= 0) break;
      }
      selected.push(pool[idx].card);
      pool.splice(idx, 1);
    }
    return selected;
  }, []);

  const startGame = useCallback((playerDeckSetup: ProblemCard[], isCpu: boolean, roomData?: Room, format?: BattleFormat) => {
    cleanupGameSession(true);
    const pcDeckSetup = isCpu ? buildAdaptiveCpuDeck() : shuffleDeck([...CARD_DEFINITIONS]).slice(0, DECK_SIZE);
    const shuffledP = shuffleDeck(playerDeckSetup);
    const shuffledC = shuffleDeck(pcDeckSetup);
    setPlayerHand(shuffledP.slice(0, HAND_SIZE));
    setPlayerDeck(shuffledP.slice(HAND_SIZE));
    setPcHand(shuffledC.slice(0, HAND_SIZE));
    setPcDeck(shuffledC.slice(HAND_SIZE));
    if (roomData) {
      setPlayerHP(isHostRef.current ? roomData.p1Hp : roomData.p2Hp);
      setPcHP(isHostRef.current ? roomData.p2Hp : roomData.p1Hp);
    } else {
      setPlayerHP(INITIAL_HP);
      setPcHP(INITIAL_HP);
    }
    setPlayerScore(0);
    setPcScore(0);
    setWinner(null);
    setRoundResult(null);
    setPlayerAnswered(false);
    setPcAnswered(false);
    setInitiative(Math.random() > 0.5 ? 'player' : 'pc');
    setTurnPhase('selecting_card');
    if (format) setBattleFormat(format);
    setPlayerRoundWins(0);
    setPcRoundWins(0);
    setCurrentRound(1);
    const formatLabel = format === 'best_of_3' ? '【3本勝負】' : format === 'best_of_5' ? '【5本勝負】' : format === 'best_of_7' ? '【7本勝負】' : '【マスターデュエル】';
    setGameLog([`${formatLabel} バトル開始！問題に答えてダメージを与えよう！`]);
  }, [cleanupGameSession, buildAdaptiveCpuDeck]);

  // ============================
  // Auto-draw helper
  // ============================
  const handleAutoDraw = useCallback((
    hand: ProblemCard[], deck: ProblemCard[], targetLevel: number
  ) => {
    const idx = deck.findIndex(c => c.difficulty === targetLevel);
    if (idx !== -1) {
      const newCard = deck[idx];
      const newDeck = [...deck];
      newDeck.splice(idx, 1);
      const oldCard = hand[Math.floor(Math.random() * hand.length)];
      const newHand = [...hand.filter(c => c.id !== oldCard.id), newCard];
      newDeck.push(oldCard);
      return { newHand, newDeck, success: true };
    }
    return { newHand: hand, newDeck: deck, success: false };
  }, []);

  // ============================
  // HP Battle Resolution
  // エビデンスB: ATK/DEF + 正解ダメージ統合設計
  // ============================
  const resolveHpBattle = useCallback((
    playerCorrect: boolean,
    playerCard: ProblemCard,
    pcCard: ProblemCard
  ) => {
    // Damage formula: difficulty × 2 HP
    // SCORE_BOOST: +2 bonus damage on correct answer
    // DEFENSIVE_STANCE: block damage when wrong
    if (playerCorrect) {
      let dmg = calcDamage(playerCard.difficulty);
      if (playerCard.ability?.type === 'SCORE_BOOST') dmg += (playerCard.ability.value || 1) * 2;
      addLog(`正解！${(pcCard.problem.data as Record<string, unknown>).question ? String((pcCard.problem.data as Record<string, unknown>).question).slice(0, 20) : ''}... → ${dmg}ダメージ！`);
      setPcHP(prev => Math.max(0, prev - dmg));
      setPlayerScore(s => s + 1);
      return 'player_win';
    } else {
      if (playerCard.ability?.type === 'DEFENSIVE_STANCE') {
        addLog(`不正解 [防御スタンス] ダメージをガード！`);
        return 'defended';
      }
      const dmg = calcDamage(pcCard.difficulty);
      addLog(`不正解… ${dmg}ダメージを受けた`);
      setPlayerHP(prev => Math.max(0, prev - dmg));
      setPcScore(s => s + 1);
      return 'pc_win';
    }
  }, []);

  const addLog = useCallback((msg: string) => {
    setGameLog(prev => [...prev.slice(-10), msg]);
  }, []);

  // ============================
  // Player Answer Handler
  // ============================
  const handlePlayerAnswer = (answer: string) => {
    if (playerAnswered || pcAnswered || !pcPlayedCard || !playerPlayedCard) return;
    setPlayerAnswered(true);
    const solveTime = Date.now() - roundStartTime;
    // Proof problems are auto-correct (same as practice mode)
    // Multiple-choice: compare as sorted sets so answer order doesn't matter
    const problemData = pcPlayedCard.problem.data as any;
    const correctAnswerStr = Array.isArray(pcPlayedCard.problem.answer)
      ? pcPlayedCard.problem.answer.join(' ')
      : String(pcPlayedCard.problem.answer);
    const correct = normalizeAnswer(answer) === normalizeAnswer(correctAnswerStr);

    if (correct) {
      // Update DDA stats
      const diff = pcPlayedCard.difficulty;
      setUserLevelStats(prev => {
        const s = prev[diff] || { avgTime: 20000, count: 0 };
        return { ...prev, [diff]: { avgTime: (s.avgTime * s.count + solveTime) / (s.count + 1), count: s.count + 1 } };
      });
      // スピードバッジ: 3秒以内正解
      if (solveTime < 3000) earnBadge('speed_demon');
    }

    // ゲーミフィケーション: チェイン・バッジ・クエスト更新
    onCorrectAnswerEvent(correct, correctAnswerStr);

    // メタ認知: カテゴリ別正答率を記録（エビデンスA: Wang et al. 1993, ES=0.69）
    recordAttempt(pcPlayedCard.category, correct);

    // 精緻化フィードバック: 不正解時にプレイヤーの回答とカテゴリを記録
    if (!correct) {
      setPlayerWrongAnswer(answer);
      setWrongCategory(pcPlayedCard.category);
      // SRS: 不正解を間隔反復キューに追加（エビデンスA: Cepeda 2006, d=0.42）
      const qData = pcPlayedCard.problem.data as Record<string, unknown>;
      addIncorrectToSrs(
        pcPlayedCard.category,
        String(qData.question || '').slice(0, 50),
        correctAnswerStr,
        pcPlayedCard.problem.type
      );
    } else {
      setPlayerWrongAnswer(null);
      setWrongCategory(null);
    }

    const outcome = resolveHpBattle(correct, playerPlayedCard, pcPlayedCard);
    setRoundResult(outcome === 'player_win' ? 'ラウンド勝利！' : 'ラウンド敗北...');
    if (!pcAnswered) setPcAnswered(true);
    setTurnPhase('round_end');
  };

  // ============================
  // Card Selection
  // ============================
  // 手札+デッキに同レベルカードがあるか判定
  const hasMatchingCard = useCallback((targetDiff: number): boolean => {
    return playerHand.some(c => c.difficulty === targetDiff) ||
           playerDeck.some(c => c.difficulty === targetDiff);
  }, [playerHand, playerDeck]);

  const handleCardClickInHand = (card: ProblemCard) => {
    if (turnPhase !== 'selecting_card') return;

    // PC先攻時: 同レベルマッチング制約
    if (initiative === 'pc' && pcPlayedCard !== null) {
      const canMatch = hasMatchingCard(pcPlayedCard.difficulty);
      if (canMatch && card.difficulty !== pcPlayedCard.difficulty) {
        // 同レベルカードが存在するなら、それを選ぶよう促す
        addLog('同じ難易度のカードを選んでください');
        return;
      }
      // 同レベルカードが無い場合 → 任意カードで応戦OK（mismatch round）
    }

    if (selectedCardId === card.id) {
      // 難易度不一致ラウンド判定
      const isMismatch = initiative === 'pc' && pcPlayedCard !== null &&
                          card.difficulty !== pcPlayedCard.difficulty;
      setMismatchRound(isMismatch);
      if (isMismatch) {
        addLog(`⚡ レベル不一致で応戦！ 解答時間ボーナス獲得（+50%）`);
      }

      setPlayerPlayedCard(card);
      setPlayerHand(prev => prev.filter(c => c.id !== card.id));
      if (initiative === 'player') {
        let pcMatchingCard = pcHand.find(c => c.difficulty === card.difficulty);
        if (!pcMatchingCard) {
          const res = handleAutoDraw(pcHand, pcDeck, card.difficulty);
          if (res.success) {
            addLog('PC: カードを引き直しています...');
            setPcHand(res.newHand);
            setPcDeck(res.newDeck);
            pcMatchingCard = res.newHand.find(c => c.difficulty === card.difficulty);
          }
        }
        const pcCard = pcMatchingCard || pcHand[Math.floor(Math.random() * pcHand.length)];
        setPcPlayedCard(pcCard);
        setPcHand(prev => prev.filter(c => c.id !== pcCard.id));
        setTurnPhase('solving_problem');
        setRoundStartTime(Date.now());
      } else {
        setTurnPhase('solving_problem');
        setRoundStartTime(Date.now());
      }
    } else {
      setSelectedCardId(card.id);
    }
  };

  // ============================
  // PC Initiative
  // ============================
  useEffect(() => {
    if (gameState !== 'in_game' || turnPhase !== 'selecting_card' || initiative !== 'pc' || pcPlayedCard !== null) return;
    const timer = setTimeout(() => {
      const pcCard = pcHand[Math.floor(Math.random() * pcHand.length)];
      if (!pcCard) return;
      setPcPlayedCard(pcCard);
      setPcHand(prev => prev.filter(c => c.id !== pcCard.id));
      addLog(`PC: レベル${pcCard.difficulty} の問題を出題`);
      const hasMatch = playerHand.some(c => c.difficulty === pcCard.difficulty);
      if (!hasMatch) {
        // まずデッキから同レベルカードを自動補充
        const res = handleAutoDraw(playerHand, playerDeck, pcCard.difficulty);
        if (res.success) {
          addLog('カードを自動補充しました');
          setPlayerHand(res.newHand);
          setPlayerDeck(res.newDeck);
        } else {
          // 手札にもデッキにも同レベルがない → 任意カードで応戦可能
          addLog('⚠ 同レベルカードがありません — 手持ちのカードで応戦しましょう！');
        }
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [gameState, turnPhase, initiative, pcPlayedCard, pcHand, playerHand, playerDeck, handleAutoDraw, addLog]);

  // ============================
  // PC Solve Timer (DDA)
  // エビデンスB: Dynamic Difficulty Adjustment
  // ============================
  useEffect(() => {
    if (turnPhase !== 'solving_problem' || pcAnswered || !pcPlayedCard) return;
    const diff = pcPlayedCard.difficulty;
    const stats = userLevelStats[diff] || { avgTime: diff * 12000, count: 0 };
    const baseTime = stats.count > 2 ? stats.avgTime : diff * 12000;
    let finalTime = baseTime * 1.25;
    // レベル不一致ラウンド: 解答時間+50%ボーナス
    if (mismatchRound) finalTime *= 1.5;
    if (pcPlayedCard.ability?.type === 'TIME_PRESSURE') finalTime -= (pcPlayedCard.ability.value || 3) * 1000;
    const solveTime = Math.max(3000, Math.min(120000, finalTime));

    const timer = setTimeout(() => {
      if (!playerAnswered) {
        if (playerPlayedCard?.ability?.type !== 'DEFENSIVE_STANCE') {
          const dmg = calcDamage(pcPlayedCard.difficulty);
          setPlayerHP(prev => Math.max(0, prev - dmg));
          addLog(`時間切れ！${dmg}ダメージを受けた`);
          setPcScore(s => s + 1);
        }
        setRoundResult('ラウンド敗北...');
        setTurnPhase('round_end');
      }
      setPcAnswered(true);
    }, solveTime);
    return () => clearTimeout(timer);
  }, [turnPhase, pcAnswered, playerAnswered, pcPlayedCard, playerPlayedCard, userLevelStats, mismatchRound]);

  // ============================
  // Round End / Win Check (supports both HP and round-based formats)
  // ============================
  const getRequiredWins = useCallback((format: BattleFormat): number => {
    if (format === 'best_of_3') return 2;
    if (format === 'best_of_5') return 3;
    if (format === 'best_of_7') return 4;
    return 0; // master_duel uses HP
  }, []);

  useEffect(() => {
    if (turnPhase !== 'round_end') return;
    const timer = setTimeout(async () => {
      const isPlayerWonRound = roundResult?.includes('勝利');
      const isPlayerLostRound = roundResult?.includes('敗北');

      // Track round wins for best-of-N formats
      let newPlayerRoundWins = playerRoundWins;
      let newPcRoundWins = pcRoundWins;
      if (battleFormat !== 'master_duel') {
        if (isPlayerWonRound) {
          newPlayerRoundWins = playerRoundWins + 1;
          setPlayerRoundWins(newPlayerRoundWins);
        } else if (isPlayerLostRound) {
          newPcRoundWins = pcRoundWins + 1;
          setPcRoundWins(newPcRoundWins);
        }
      }

      // Determine if game is over
      let gameOver = false;
      let isWin = false;
      let isDraw = false;

      if (battleFormat === 'master_duel') {
        // HP-based win condition
        if (playerHP <= 0 || pcHP <= 0) {
          gameOver = true;
          isWin = pcHP <= 0 && playerHP > 0;
          isDraw = pcHP <= 0 && playerHP <= 0;
        }
      } else {
        // Round-based win condition
        const required = getRequiredWins(battleFormat);
        if (newPlayerRoundWins >= required || newPcRoundWins >= required) {
          gameOver = true;
          isWin = newPlayerRoundWins >= required;
          isDraw = false;
        }
        // Also end if HP reaches 0 (knockout in round format)
        if (!gameOver && (playerHP <= 0 || pcHP <= 0)) {
          gameOver = true;
          isWin = pcHP <= 0 && playerHP > 0;
          isDraw = pcHP <= 0 && playerHP <= 0;
        }
      }

      if (gameOver) {
        // Immediately exit 'round_end' phase to prevent this effect from re-firing
        // when state updates (addExp, setPlayerRoundWins, etc.) trigger a re-render
        setTurnPhase('selecting_card');
        const formatLabel = battleFormat === 'best_of_3' ? '3本勝負' : battleFormat === 'best_of_5' ? '5本勝負' : battleFormat === 'best_of_7' ? '7本勝負' : 'マスターデュエル';
        const formatWinKey = `formatWins.${battleFormat}`;
        const formatMatchKey = `formatMatches.${battleFormat}`;
        if (isDraw) {
          setWinner('引き分け\nお互い健闘しました！');
          addExp(200);
          saveUserToFirestore({ totalMatches: increment(1), [formatMatchKey]: increment(1) });
        } else if (isWin) {
          const winDetail = battleFormat !== 'master_duel' ? `\n${newPlayerRoundWins}-${newPcRoundWins} (${formatLabel})` : '';
          setWinner(`勝利！\nおめでとう！${winDetail}`);
          addExp(500);
          setMathPoints(p => p + 300);
          saveUserToFirestore({ totalWins: increment(1), totalMatches: increment(1), [formatWinKey]: increment(1), [formatMatchKey]: increment(1) });
          if (gameMode === 'cpu') earnBadge('first_cpu_win');
          else earnBadge('first_pvp_win');
          if (playerHP >= INITIAL_HP) earnBadge('perfect_battle');
          if (playerHP <= 5) earnBadge('comeback');
          checkCategoryMasterBadges();
        } else {
          const loseDetail = battleFormat !== 'master_duel' ? `\n${newPlayerRoundWins}-${newPcRoundWins} (${formatLabel})` : '';
          setWinner(`敗北...\n次こそ勝とう！${loseDetail}`);
          addExp(100);
          saveUserToFirestore({ totalMatches: increment(1), [formatMatchKey]: increment(1) });
        }
        await flushSessionData();
        setGameState('end');
        return;
      }

      // Round-based format: advance round counter and log score
      if (battleFormat !== 'master_duel') {
        setCurrentRound(prev => prev + 1);
        addLog(`第${currentRound}回戦終了 [${newPlayerRoundWins}-${newPcRoundWins}]`);
      }

      // PvP: update Firestore HP
      if (gameMode === 'pvp' && currentRoomId && db && isHostRef.current) {
        const p1Hp = playerHP;
        const p2Hp = pcHP;
        let wId = p1Hp <= 0 && p2Hp <= 0 ? 'draw' : p1Hp <= 0 ? 'guest' : p2Hp <= 0 ? 'host' : null;
        const updates: any = { p1Hp, p2Hp, p1Move: null, p2Move: null };
        if (wId) { updates.winnerId = wId; updates.status = 'finished'; }
        else { updates.round = increment(1); }
        await updateDoc(doc(db, 'rooms', currentRoomId), updates).catch(console.error);
      }

      // Next round setup
      setInitiative(isPlayerLostRound ? 'player' : 'pc');
      setPlayerHand(prev => {
        const needed = HAND_SIZE - prev.length;
        if (needed <= 0 || playerDeck.length === 0) return prev;
        const newCards = playerDeck.slice(0, needed);
        setPlayerDeck(d => d.slice(needed));
        return [...prev, ...newCards];
      });
      setPcHand(prev => {
        const needed = HAND_SIZE - prev.length;
        if (needed <= 0 || pcDeck.length === 0) return prev;
        const newCards = pcDeck.slice(0, needed);
        setPcDeck(d => d.slice(needed));
        return [...prev, ...newCards];
      });
      setPlayerPlayedCard(null);
      setPcPlayedCard(null);
      setRoundResult(null);
      setPlayerAnswered(false);
      setPcAnswered(false);
      setSelectedCardId(null);
      setMismatchRound(false);
      setTurnPhase('selecting_card');
    }, 3000);
    return () => clearTimeout(timer);
  }, [turnPhase, playerHP, pcHP, gameMode, currentRoomId, playerDeck, pcDeck, addExp, roundResult, battleFormat, playerRoundWins, pcRoundWins, currentRound, getRequiredWins]);

  // ============================
  // Render
  // ============================
  if (authLoading || showSplash) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-950">
        <div className="text-center animate-[fadeIn_1.5s_ease-in-out]">
          <p className="text-lg text-gray-400 font-mono tracking-[0.3em] opacity-80">
            presented by
          </p>
          <p className="text-2xl text-white font-bold font-mono tracking-[0.2em] mt-2">
            onokomachi
          </p>
        </div>
        <style>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(8px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  const renderContent = () => {
    switch (gameState) {
      case 'login_screen':
        return (
          <LoginScreen
            currentUser={user}
            onLogin={handleLogin}
            onGuestPlay={handleGuestPlay}
            onLogout={handleLogout}
            onOpenGameMaster={canAccessGameMaster ? handleOpenGameMaster : undefined}
            mathPoints={mathPoints}
            playerLevel={playerLevel}
            studentProfile={studentProfile}
            onStudentProfileSet={handleStudentProfileSet}
          />
        );

      case 'main_menu':
        return (
          <MainMenu
            onSelectMode={mode => setGameState(mode)}
            playerLevel={playerLevel}
            playerExp={playerExp}
            expForNextLevel={expForNextLevel(playerLevel)}
            user={user}
            mathPoints={mathPoints}
            onLogout={handleLogout}
            onOpenRanking={() => setShowRanking(true)}
            loginStreak={loginStreak}
            onOpenQuests={() => setShowQuestPanel(true)}
            onOpenLoginBonus={() => setShowLoginBonus(true)}
            canAccessGameMaster={canAccessGameMaster}
            onOpenGameMaster={handleOpenGameMaster}
            dailyQuestDefs={DAILY_QUEST_DEFS}
            dailyQuestProgress={dailyQuestProgress}
            dailyQuestDone={dailyQuestDone}
            onOpenClassBattle={() => setShowClassBattle(true)}
            hasStudentProfile={!!studentProfile}
            srsReviewCount={getDueCount()}
            onOpenWeakness={() => setShowWeaknessPanel(true)}
            onOpenItemShop={() => setShowItemShop(true)}
            equippedTitleName={equippedTitle ? SHOP_ITEMS.find(i => i.id === equippedTitle)?.name || null : null}
          />
        );

      case 'practice_mode':
        return (
          <PracticeMode
            onSessionComplete={pts => { setMathPoints(p => p + pts); setSrsReviewProblems(null); setGameState('main_menu'); }}
            db={db}
            user={user}
            studentProfile={studentProfile}
            srsReviewProblems={srsReviewProblems ?? undefined}
          />
        );

      case 'deck_building':
        return (
          <DeckBuilder
            ownedCards={ownedCards}
            onDeckSubmit={(deck, mode, format) => {
              const bmode: BattleMode = (mode as string) === 'pvp' ? 'pvp' : 'cpu';
              setGameMode(bmode);
              setBattleFormat(format);
              if (bmode === 'pvp') {
                pendingPvpDeckRef.current = deck;
                setGameState('matchmaking');
              } else {
                startGame(deck, true, undefined, format);
                setGameState('in_game');
              }
            }}
            onBack={() => setGameState('main_menu')}
          />
        );

      case 'matchmaking':
        return (
          <Matchmaking
            rooms={rooms.filter(r => r.battleType !== 'speed_duel')}
            onJoinRoom={(roomId) => handleJoinRoom(roomId, 'deck')}
            onCancel={async () => {
              await leaveRoom(currentRoomId, isHost);
              cleanupGameSession();
              setGameState('deck_building');
            }}
            currentRoomId={currentRoomId}
            user={user}
            connectionError={firestoreError}
          />
        );

      case 'card_shop':
        return (
          <CardShop
            mathPoints={mathPoints}
            onBuyPack={(categories, cost, _t) => {
              const catSet = new Set(categories);
              const cards = CARD_DEFINITIONS.filter(c => !ownedCardIds.has(c.id) && catSet.has(c.mainCategory));
              if (mathPoints < cost || cards.length === 0) return cards.length === 0 ? [] : null;
              // エビデンスA: 可変報酬スケジュール — 3〜6枚ランダム + 20%でCRITICAL!（Skinner 1938）
              const isCritical = Math.random() < 0.2;
              const baseCount = 3 + Math.floor(Math.random() * 2); // 3 or 4
              const packCount = Math.min(cards.length, isCritical ? baseCount + 2 : baseCount);
              const newCards = [...cards].sort(() => Math.random() - 0.5).slice(0, packCount);
              setMathPoints(p => p - cost);
              setOwnedCardIds(prev => {
                const next = new Set(prev);
                newCards.forEach(c => next.add(c.id));
                return next;
              });
              saveUserToFirestore({
                mathPoints: mathPoints - cost,
                ownedCardIds: arrayUnion(...newCards.map(c => c.id)),
              });
              return newCards;
            }}
            onExit={() => setGameState('main_menu')}
          />
        );

      case 'in_game':
        return (
          <>
            <GameBoard
              turnPhase={turnPhase}
              playerScore={playerScore}
              pcScore={pcScore}
              playerHP={playerHP}
              pcHP={pcHP}
              initialHP={INITIAL_HP}
              playerHand={playerHand}
              pcHandSize={pcHand.length}
              playerDeckSize={playerDeck.length}
              pcDeckSize={pcDeck.length}
              playerPlayedCard={playerPlayedCard}
              pcPlayedCard={pcPlayedCard}
              onCardSelect={handleCardClickInHand}
              onAnswerSubmit={handlePlayerAnswer}
              selectedCardId={selectedCardId}
              gameLog={gameLog}
              roundResult={roundResult}
              maxScore={INITIAL_HP}
              initiative={initiative}
              chainCount={chainCount}
              wrongAnswerText={wrongAnswerText}
              playerWrongAnswer={playerWrongAnswer}
              wrongCategory={wrongCategory}
              mismatchRound={mismatchRound}
              battleFormat={battleFormat}
              playerRoundWins={playerRoundWins}
              pcRoundWins={pcRoundWins}
              currentRound={currentRound}
            />
            {/* 相手切断通知バナー */}
            {opponentDisconnected && gameMode === 'pvp' && (
              <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-900/90 border border-red-500 rounded-xl px-6 py-3 flex items-center gap-4 shadow-2xl">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-200 text-sm font-bold">相手の接続が切れました</span>
                <button
                  onClick={async () => {
                    if (currentRoomId && db) {
                      await updateDoc(doc(db, 'rooms', currentRoomId), {
                        status: 'finished',
                        winnerId: isHost ? 'host' : 'guest',
                      }).catch(() => {});
                    }
                  }}
                  className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
                >
                  勝利を宣言
                </button>
              </div>
            )}
          </>
        );

      case 'end':
        return (
          <div className="text-center flex flex-col items-center justify-center h-full animate-level-up-reveal">
            <h1 className="text-7xl font-bold text-hologram mb-4 whitespace-pre-line uppercase tracking-widest leading-tight">
              {winner}
            </h1>
            <div className="flex gap-4 mt-12">
              <button
                onClick={() => {
                  if (sdSetup && sdSetup.mode === 'pvp') {
                    // SD PvP RETRY: マッチメイキングに戻る
                    cleanupGameSession();
                    pendingSdSetupRef.current = sdSetup;
                    setGameMode('pvp');
                    setGameState('sd_matchmaking');
                  } else if (sdSetup) {
                    // Speed Duel CPU RETRY: restart with same setup
                    startSpeedDuel(sdSetup);
                  } else {
                    cleanupGameSession(); setChainCount(0); setGameState('deck_building');
                  }
                }}
                className="btn-tactical py-4 px-10 rounded-lg text-xl tracking-[0.4em]"
              >
                RETRY
              </button>
              <button
                onClick={async () => {
                  await flushSessionData();
                  cleanupGameSession();
                  setChainCount(0);
                  setSdSetup(null);
                  setSdRound(null);
                  setGameState('main_menu');
                }}
                className="border border-gray-600 text-gray-400 hover:text-white py-4 px-10 rounded-lg text-xl tracking-[0.4em] transition-colors"
              >
                MENU
              </button>
            </div>
          </div>
        );

      case 'tutorial':
        return (
          <TutorialBattle
            onComplete={() => {
              setTutorialDone(true);
              localStorage.setItem('bm_tutorial_done', '1');
              earnBadge('tutorial_clear');
              setGameState('main_menu');
            }}
            onSkip={() => {
              setTutorialDone(true);
              localStorage.setItem('bm_tutorial_done', '1');
              setGameState('main_menu');
            }}
          />
        );

      case 'gamemaster':
        return db ? (
          <GameMaster db={db} onClose={() => setGameState('login_screen')} />
        ) : (
          <div className="text-center text-red-400 p-12">Firebase接続エラー</div>
        );

      case 'speed_duel_setup':
        return (
          <SpeedDuelSetupScreen
            onStart={(setup) => startSpeedDuel(setup)}
            onBack={() => setGameState('main_menu')}
            user={user}
          />
        );

      case 'sd_matchmaking':
        return (
          <Matchmaking
            rooms={rooms.filter(r => r.battleType === 'speed_duel')}
            onJoinRoom={(roomId) => handleJoinRoom(roomId, 'speed_duel')}
            onCancel={async () => {
              await leaveRoom(currentRoomId, isHost);
              cleanupGameSession();
              setGameState('speed_duel_setup');
            }}
            currentRoomId={currentRoomId}
            user={user}
            connectionError={firestoreError}
          />
        );

      case 'speed_duel':
        return sdRound ? (
          <>
            <SpeedDuelBoard
              round={sdRound}
              playerHP={sdPlayerHP}
              opponentHP={sdOpponentHP}
              playerRoundWins={sdPlayerRoundWins}
              opponentRoundWins={sdOpponentRoundWins}
              currentRound={sdCurrentRound}
              requiredWins={sdGetRequiredWins(sdSetup?.format ?? 'best_of_5')}
              battleFormat={sdSetup?.format ?? 'best_of_5'}
              gameMode={sdSetup?.mode ?? 'cpu'}
              timeRemaining={sdTimeRemaining}
              onBuzz={sdBuzz}
              onAnswer={sdSetup?.mode === 'pvp' ? sdOnlineAnswer : sdAnswer}
              gameLog={sdGameLog}
            />
            {/* 相手切断通知バナー（SD PvP） */}
            {opponentDisconnected && sdSetup?.mode === 'pvp' && (
              <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-900/90 border border-red-500 rounded-xl px-6 py-3 flex items-center gap-4 shadow-2xl">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-200 text-sm font-bold">相手の接続が切れました</span>
                <button
                  onClick={async () => {
                    if (currentRoomId && db) {
                      await updateDoc(doc(db, 'rooms', currentRoomId), {
                        status: 'finished',
                        winnerId: isHost ? 'host' : 'guest',
                      }).catch(() => {});
                    }
                    setWinner('勝利！');
                    addExp(500);
                    setMathPoints(p => p + 300);
                    setGameState('end');
                  }}
                  className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
                >
                  勝利を宣言
                </button>
              </div>
            )}
          </>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <main className="w-screen h-screen relative flex flex-col items-center justify-center font-sans">
      <GravityBackground />
      <div className="relative z-10 w-full h-full">
        {renderContent()}
        {levelUpInfo && <LevelUpModal {...levelUpInfo} onClose={() => setLevelUpInfo(null)} />}
        {showRanking && db && (
          <RankingBoard
            onClose={() => setShowRanking(false)}
            db={db}
            currentUserId={user?.uid}
          />
        )}
        {showQuestPanel && (
          <QuestPanel
            loginStreak={loginStreak}
            dailyProgress={dailyQuestProgress}
            dailyCompleted={Object.fromEntries([...dailyQuestDone].map(id => [id, true]))}
            weeklyProgress={weeklyQuestProgress}
            weeklyCompleted={Object.fromEntries([...weeklyQuestDone].map(id => [id, true]))}
            onClose={() => setShowQuestPanel(false)}
          />
        )}
        {pendingBadge && (
          <BadgeNotification
            badge={pendingBadge}
            onDismiss={() => setPendingBadge(null)}
          />
        )}
        {showLoginBonus && (
          <LoginBonusModal
            loginStreak={loginStreak}
            todayReward={getLoginReward(loginStreak)}
            alreadyClaimed={loginBonusClaimed}
            onClaim={handleClaimLoginBonus}
            onClose={() => setShowLoginBonus(false)}
          />
        )}
        {showClassBattle && db && (
          <ClassBattleBoard
            db={db}
            onClose={() => setShowClassBattle(false)}
            currentGrade={studentProfile?.grade}
            currentClass={studentProfile?.classNum}
          />
        )}
        {showWeaknessPanel && (
          <WeaknessPanel
            onClose={() => setShowWeaknessPanel(false)}
            onStartSrsReview={() => {
              const problems = getSrsProblemsForReview();
              setSrsReviewProblems(problems);
              setShowWeaknessPanel(false);
              setGameState('practice_mode');
            }}
          />
        )}
        {showItemShop && (
          <ItemShop
            mathPoints={mathPoints}
            ownedItems={ownedShopItems}
            equippedTitle={equippedTitle}
            onPurchase={handleShopPurchase}
            onEquipTitle={setEquippedTitle}
            onClose={() => setShowItemShop(false)}
          />
        )}
      </div>
    </main>
  );
};

export default App;
