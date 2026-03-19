/**
 * useGamification.ts — バッジ・チェイン・クエスト・ショップ統合
 *
 * エビデンスB: 自己決定理論（Deci & Ryan 1985）— 有能感フィードバック
 * エビデンスA: 目標設定理論（Locke & Latham 1990, d=0.48）
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from 'firebase/auth';
import type { BadgeDef, ShopItemDef } from '../types';
import {
  BADGE_DEFS, DAILY_QUEST_DEFS, WEEKLY_QUEST_DEFS,
  getTodayStr, getWeekStart, SHOP_ITEMS,
} from '../constants';

export const useGamification = (user: User | null) => {
  // --- チェイン ---
  const [chainCount, setChainCount] = useState(0);
  const [wrongAnswerText, setWrongAnswerText] = useState<string | null>(null);

  // --- バッジ ---
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<Set<string>>(new Set());
  const [pendingBadge, setPendingBadge] = useState<BadgeDef | null>(null);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  // --- クエスト ---
  const [dailyQuestProgress, setDailyQuestProgress] = useState<Record<string, number>>({});
  const [dailyQuestDone, setDailyQuestDone] = useState<Set<string>>(new Set());
  const [weeklyQuestProgress, setWeeklyQuestProgress] = useState<Record<string, number>>({});
  const [weeklyQuestDone, setWeeklyQuestDone] = useState<Set<string>>(new Set());

  // --- ショップ ---
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

  // --- セッション蓄積 ---
  const sessionCorrectRef = useRef(0);

  // MP変更を外部に通知するためのコールバック
  const [mpDelta, setMpDelta] = useState(0);

  /** MP変更量を取得しリセット（App側がポーリング or effect で消費） */
  const consumeMpDelta = useCallback(() => {
    const d = mpDelta;
    setMpDelta(0);
    return d;
  }, [mpDelta]);

  const addMp = useCallback((amount: number) => {
    setMpDelta(prev => prev + amount);
  }, []);

  // ショップの localStorage永続化
  useEffect(() => {
    localStorage.setItem('bm_owned_shop_items', JSON.stringify(Array.from(ownedShopItems)));
    if (equippedTitle) localStorage.setItem('bm_equipped_title', equippedTitle);
    else localStorage.removeItem('bm_equipped_title');
  }, [ownedShopItems, equippedTitle]);

  // 正解ヒント自動クリア
  useEffect(() => {
    if (!wrongAnswerText) return;
    const t = setTimeout(() => setWrongAnswerText(null), 3000);
    return () => clearTimeout(t);
  }, [wrongAnswerText]);

  // Firestoreデータ読み込み時の初期化
  const initFromFirestore = useCallback((data: Record<string, any>) => {
    if (data.earnedBadgeIds) setEarnedBadgeIds(new Set(data.earnedBadgeIds));
    if (data.totalCorrectAnswers !== undefined) setTotalCorrectAnswers(data.totalCorrectAnswers);
    // クエスト進捗をlocalStorageから復元
    const dqKey = `bm_dq_${getTodayStr()}`;
    const wqKey = `bm_wq_${getWeekStart()}`;
    try {
      setDailyQuestProgress(JSON.parse(localStorage.getItem(dqKey) || '{}'));
      setWeeklyQuestProgress(JSON.parse(localStorage.getItem(wqKey) || '{}'));
      setDailyQuestDone(new Set(JSON.parse(localStorage.getItem(`${dqKey}_done`) || '[]')));
      setWeeklyQuestDone(new Set(JSON.parse(localStorage.getItem(`${wqKey}_done`) || '[]')));
    } catch {}
  }, []);

  // バッジ獲得
  const earnBadge = useCallback((badgeId: string) => {
    setEarnedBadgeIds(prev => {
      if (prev.has(badgeId)) return prev;
      const badge = BADGE_DEFS.find(b => b.id === badgeId);
      if (!badge) return prev;
      setPendingBadge(badge);
      addMp(100);
      if (user && db) {
        updateDoc(doc(db, 'users', user.uid), {
          earnedBadgeIds: arrayUnion(badgeId),
          mathPoints: increment(100),
        }).catch(() => {});
      }
      return new Set(prev).add(badgeId);
    });
  }, [user, addMp]);

  // クエスト進捗
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
      setDailyQuestDone(prevDone => {
        const newDone = new Set(prevDone);
        DAILY_QUEST_DEFS.forEach(q => {
          if (!newDone.has(q.id) && (next[q.id] || 0) >= q.target) {
            newDone.add(q.id);
            addMp(q.reward.mp);
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
            addMp(q.reward.mp);
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
  }, [user, addMp]);

  // 正解イベント統合
  const onCorrectAnswerEvent = useCallback((isCorrect: boolean, correctAnswer: string) => {
    if (isCorrect) {
      setChainCount(prev => {
        const next = prev + 1;
        if (next === 5) earnBadge('chain_5');
        if (next === 10) earnBadge('chain_10');
        if (next === 20) earnBadge('chain_20');
        return next;
      });
      setWrongAnswerText(null);
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
      handleQuestProgress('correct');
    } else {
      setChainCount(0);
      setWrongAnswerText(correctAnswer);
    }
  }, [earnBadge, handleQuestProgress]);

  // セッションデータ書き込み
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

  // ショップ購入
  const handleShopPurchase = useCallback((item: ShopItemDef, currentMp: number) => {
    if (ownedShopItems.has(item.id) || currentMp < item.cost) return false;
    addMp(-item.cost);
    setOwnedShopItems(prev => new Set([...prev, item.id]));
    if (user && db) {
      updateDoc(doc(db, 'users', user.uid), {
        mathPoints: increment(-item.cost),
      }).catch(() => {});
    }
    return true;
  }, [ownedShopItems, user, addMp]);

  const equippedTitleName = equippedTitle ? SHOP_ITEMS.find(i => i.id === equippedTitle)?.name || null : null;

  return {
    // チェイン
    chainCount, setChainCount, wrongAnswerText,
    // バッジ
    earnedBadgeIds, pendingBadge, setPendingBadge, totalCorrectAnswers, earnBadge,
    // クエスト
    dailyQuestProgress, dailyQuestDone, weeklyQuestProgress, weeklyQuestDone, handleQuestProgress,
    // ショップ
    ownedShopItems, equippedTitle, setEquippedTitle, equippedTitleName, handleShopPurchase,
    // イベント
    onCorrectAnswerEvent, flushSessionData,
    // Firestoreデータ初期化
    initFromFirestore,
    // MP差分
    mpDelta, consumeMpDelta, addMp,
  };
};
