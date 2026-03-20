
import type { Problem, ProblemCard, CategoryDef, EnglishCategory, Ability, AbilityType, DailyQuestDef, BadgeDef, ShopItemDef } from './types';
import { ENGLISH_PROBLEMS } from './data/index';

export const MAX_SCORE = 5;
export const DECK_SIZE = 20;
export const HAND_SIZE = 5;
export const MAX_DUPLICATES = 2;

// HP Battle System
// エビデンスA: Testing Effect (Roediger & Butler 2011) — 想起回数が学習効果に比例
// HP40 + ダメージ式 → 平均7-8ラウンド/試合
export const INITIAL_HP = 40;

// Damage formula: difficulty × 1.5 + 1
// select(2)=4, input(3)=5.5→6, sort(4)=7
export const calcDamage = (difficulty: number): number =>
  Math.round(difficulty * 1.5 + 1);

// Admin settings
export const ADMIN_EMAILS: string[] = []; // Add admin email addresses here
export const GAMEMASTER_PASSWORD = '215124'; // Change in production

export const DECK_CONSTRAINTS: Record<number, number> = {
  4: 7,
  5: 3,
};

// 英語文法カテゴリ × 問題タイプ別に構造化（学年別）
export const ENG_CATEGORIES: CategoryDef[] = [
  // ── 中学1年生 文法 ──────────────────────────────────────
  {
    name: 'be動詞',
    grade: 1,
    groups: [{ name: 'am / is / are の肯定・否定・疑問', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '一般動詞',
    grade: 1,
    groups: [{ name: '一般動詞の肯定・否定・疑問', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '代名詞',
    grade: 1,
    groups: [{ name: '主格・目的格・所有格', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '名詞の複数形',
    grade: 1,
    groups: [{ name: '規則変化・不規則変化', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '現在進行形',
    grade: 1,
    groups: [{ name: 'be動詞 + -ing 形', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '過去形',
    grade: 1,
    groups: [{ name: '規則動詞・不規則動詞の過去形', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '過去進行形',
    grade: 1,
    groups: [{ name: 'was / were + -ing 形', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '疑問詞',
    grade: 1,
    groups: [{ name: 'what / who / when / where / why / how', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '命令文',
    grade: 1,
    groups: [{ name: '肯定命令・否定命令・Let\'s', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '感嘆文',
    grade: 1,
    groups: [{ name: 'What a ...! / How ...!', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: 'there is',
    grade: 1,
    groups: [{ name: 'there is/are 構文', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  // ── 中学2年生 文法 ──────────────────────────────────────
  {
    name: '未来',
    grade: 2,
    groups: [{ name: 'will / be going to', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '動名詞',
    grade: 2,
    groups: [{ name: '動名詞の用法', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '不定詞',
    grade: 2,
    groups: [{ name: '不定詞3用法', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '助動詞【must】',
    grade: 2,
    groups: [{ name: 'must / have to', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '助動詞【have to】',
    grade: 2,
    groups: [{ name: 'have to の用法', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '助動詞【その他】',
    grade: 2,
    groups: [{ name: 'can / may / should / shall', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '比較',
    grade: 2,
    groups: [{ name: '比較級・最上級・原級', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '接続詞',
    grade: 2,
    groups: [{ name: '接続詞の用法', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '受け身',
    grade: 2,
    groups: [{ name: '受動態', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '現在完了',
    grade: 2,
    groups: [{ name: '現在完了の3用法', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  // ── 中学3年生 文法 ──────────────────────────────────────
  {
    name: '現在完了進行形',
    grade: 3,
    groups: [{ name: '現在完了進行形', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '不定詞2',
    grade: 3,
    groups: [{ name: '不定詞の発展', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: 'その他',
    grade: 3,
    groups: [{ name: 'その他の文法', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '関係代名詞',
    grade: 3,
    groups: [{ name: 'who / which / that', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '分詞の後置修飾',
    grade: 3,
    groups: [{ name: '現在分詞・過去分詞', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '間接疑問文',
    grade: 3,
    groups: [{ name: '疑問詞 + 主語 + 動詞', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '仮定法',
    grade: 3,
    groups: [{ name: 'if / wish 仮定法', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  // ── 英単語 中1 ────────────────────────────────────────────
  {
    name: '英単語【動詞】中1',
    grade: 1,
    groups: [{
      name: '動詞の英単語（中1）',
      subtopics: ['英→日（意味選択）', '日→英（単語選択）', '日→英（単語入力）'],
    }],
  },
  {
    name: '英単語【名詞】中1',
    grade: 1,
    groups: [{
      name: '名詞の英単語（中1）',
      subtopics: ['英→日（意味選択）', '日→英（単語選択）', '日→英（単語入力）'],
    }],
  },
  {
    name: '英単語【形容詞・副詞】中1',
    grade: 1,
    groups: [{
      name: '形容詞・副詞の英単語（中1）',
      subtopics: ['英→日（意味選択）', '日→英（単語選択）', '日→英（単語入力）'],
    }],
  },
  // ── 英単語 中2 ────────────────────────────────────────────
  {
    name: '英単語【動詞】中2',
    grade: 2,
    groups: [{
      name: '動詞の英単語（中2）',
      subtopics: ['英→日（意味選択）', '日→英（単語選択）', '日→英（単語入力）'],
    }],
  },
  {
    name: '英単語【名詞】中2',
    grade: 2,
    groups: [{
      name: '名詞の英単語（中2）',
      subtopics: ['英→日（意味選択）', '日→英（単語選択）', '日→英（単語入力）'],
    }],
  },
  {
    name: '英単語【形容詞・副詞】中2',
    grade: 2,
    groups: [{
      name: '形容詞・副詞の英単語（中2）',
      subtopics: ['英→日（意味選択）', '日→英（単語選択）', '日→英（単語入力）'],
    }],
  },
  // ── 英単語 中3 ────────────────────────────────────────────
  {
    name: '英単語【動詞】中3',
    grade: 3,
    groups: [{
      name: '動詞の英単語（中3）',
      subtopics: ['英→日（意味選択）', '日→英（単語選択）', '日→英（単語入力）'],
    }],
  },
  {
    name: '英単語【名詞】中3',
    grade: 3,
    groups: [{
      name: '名詞の英単語（中3）',
      subtopics: ['英→日（意味選択）', '日→英（単語選択）', '日→英（単語入力）'],
    }],
  },
  {
    name: '英単語【形容詞・副詞】中3',
    grade: 3,
    groups: [{
      name: '形容詞・副詞の英単語（中3）',
      subtopics: ['英→日（意味選択）', '日→英（単語選択）', '日→英（単語入力）'],
    }],
  },
];

const ABILITIES: Ability[] = [
  { type: 'DEFENSIVE_STANCE', description: '[防御] このラウンドで敗北しても失点しない。' },
  { type: 'TIME_PRESSURE', value: 3, description: '[速攻] 相手の解答時間を3秒短縮する。' },
  { type: 'SCORE_BOOST', value: 1, description: '[激励] このラウンドで勝利した場合、追加で1スコアを得る。' },
];

const assignAbility = (card: ProblemCard): Ability | undefined => {
  // select(difficulty=2)はアビリティなし。input/sort のみ
  if (card.difficulty < 3) return undefined;
  const abilityMap: { [key: string]: AbilityType[] } = {
    // 中1
    'be動詞':         ['SCORE_BOOST'],
    '一般動詞':       ['SCORE_BOOST'],
    '現在進行形':     ['TIME_PRESSURE'],
    '過去形':         ['DEFENSIVE_STANCE', 'SCORE_BOOST'],
    '過去進行形':     ['TIME_PRESSURE'],
    // 中2
    '受け身':         ['DEFENSIVE_STANCE'],
    '現在完了':       ['DEFENSIVE_STANCE', 'SCORE_BOOST'],
    '現在完了進行形': ['TIME_PRESSURE'],
    '比較':           ['TIME_PRESSURE', 'SCORE_BOOST'],
    '不定詞':         ['SCORE_BOOST'],
    '不定詞2':        ['SCORE_BOOST'],
    '動名詞':         ['DEFENSIVE_STANCE', 'SCORE_BOOST'],
    '接続詞':         ['DEFENSIVE_STANCE'],
    '未来':           ['SCORE_BOOST'],
  };
  const possibleTypes = abilityMap[card.mainCategory];
  if (!possibleTypes) return undefined;
  if (Math.random() < 0.25) {
    const randomType = possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
    return ABILITIES.find(a => a.type === randomType);
  }
  return undefined;
};

const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const processProblems = (): ProblemCard[] => {
  const allProblems: ProblemCard[] = [];
  let idCounter = 0;

  for (const [mainCat, problems] of Object.entries(ENGLISH_PROBLEMS)) {
    for (const rawProblem of problems) {
      // input problems with multi-word answers (sentences) → convert to sort type
      let problem = rawProblem;
      if (
        rawProblem.type === 'input' &&
        typeof rawProblem.answer === 'string' &&
        rawProblem.answer.trim().split(/\s+/).length >= 3
      ) {
        const words = rawProblem.answer.trim().split(/\s+/);
        problem = {
          ...rawProblem,
          type: 'sort',
          answer: words,
          data: {
            ...rawProblem.data,
            options: shuffleArray(words),
          },
        };
      }

      // 難易度はモードで決定: select=2, input=3, sort=4
      const difficulty = problem.type === 'select' ? 2 : problem.type === 'input' ? 3 : 4;
      const card: ProblemCard = {
        id: idCounter++,
        mainCategory: mainCat as EnglishCategory,
        category: problem.type,
        difficulty,
        problem,
      };
      card.ability = assignAbility(card);
      allProblems.push(card);
    }
  }
  return allProblems;
};

export const CARD_DEFINITIONS: ProblemCard[] = processProblems();

// ============================
// Gamification Helpers
// ============================
export const getTodayStr = (): string => new Date().toISOString().slice(0, 10);

export const getWeekStart = (): string => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // Monday
  return d.toISOString().slice(0, 10);
};

// ============================
// Badge Definitions
// エビデンスB: 達成バッジ × 自己決定理論（有能感欲求）
// ============================
export const BADGE_DEFS: BadgeDef[] = [
  // --- 正解マイルストーン ---
  { id: 'first_correct', title: '初正解', description: 'はじめて問題に正解した', icon: '⭐' },
  { id: 'correct_50', title: '50問達成', description: '通算50問正解した', icon: '🎯' },
  { id: 'correct_100', title: '100問達成', description: '通算100問正解した', icon: '💯' },
  { id: 'correct_500', title: '500問達成', description: '通算500問正解した', icon: '🌟' },
  { id: 'correct_1000', title: '1000問達成', description: '通算1000問正解した', icon: '🏅' },
  // --- PvPバトル ---
  { id: 'first_pvp_win', title: '初勝利', description: 'はじめてPvPで勝利した', icon: '⚔️' },
  { id: 'pvp_10wins', title: 'PvP10勝', description: 'PvPで10勝した', icon: '🏆' },
  { id: 'pvp_50wins', title: 'PvP50勝', description: 'PvPで50勝した', icon: '🥇' },
  { id: 'first_cpu_win', title: 'CPU撃破', description: 'はじめてCPU戦に勝利した', icon: '🤖' },
  { id: 'perfect_battle', title: '完全勝利', description: 'HP満タンで勝利した', icon: '💎' },
  // --- ログインストリーク ---
  { id: 'streak_3', title: '3日連続', description: '3日連続でログインした', icon: '🔥' },
  { id: 'streak_7', title: '7日連続', description: '7日連続でログインした', icon: '🔥🔥' },
  { id: 'streak_14', title: '14日連続', description: '14日連続でログインした', icon: '🔥🔥🔥' },
  { id: 'streak_30', title: '30日連続', description: '30日連続でログインした', icon: '👑' },
  // --- 連鎖 ---
  { id: 'chain_5', title: '5連鎖', description: '5問連続正解した', icon: '⚡' },
  { id: 'chain_10', title: '10連鎖', description: '10問連続正解した', icon: '⚡⚡' },
  { id: 'chain_20', title: '20連鎖', description: '20問連続正解した', icon: '⚡⚡⚡' },
  // --- 文法マスター ---
  { id: 'master_future', title: '未来形マスター', description: '未来形の正答率85%以上', icon: '🚀' },
  { id: 'master_gerund', title: '動名詞マスター', description: '動名詞の正答率85%以上', icon: '📝' },
  { id: 'master_infinitive', title: '不定詞マスター', description: '不定詞の正答率85%以上', icon: '✏️' },
  { id: 'master_passive', title: '受け身マスター', description: '受け身の正答率85%以上', icon: '🛡️' },
  { id: 'master_perfect', title: '現在完了マスター', description: '現在完了の正答率85%以上', icon: '⏰' },
  { id: 'master_comparison', title: '比較マスター', description: '比較の正答率85%以上', icon: '⚖️' },
  { id: 'all_master', title: '全文法制覇', description: '全カテゴリの正答率85%以上', icon: '🎓' },
  // --- コレクション ---
  { id: 'deck_full', title: 'フルデッキ', description: 'カードを50枚以上所持', icon: '🃏' },
  { id: 'shop_first', title: '初めての買い物', description: 'ショップで初購入', icon: '🛒' },
  { id: 'title_collector', title: '称号コレクター', description: '称号を3つ以上購入', icon: '🏷️' },
  // --- クエスト ---
  { id: 'daily_complete', title: 'デイリー完遂', description: '全デイリークエストを達成', icon: '📋' },
  { id: 'weekly_complete', title: 'ウィークリー完遂', description: '全ウィークリークエストを達成', icon: '📅' },
  // --- チュートリアル ---
  { id: 'tutorial_clear', title: 'チュートリアル完了', description: 'チュートリアルバトルをクリア', icon: '🎮' },
  // --- スペシャル ---
  { id: 'speed_demon', title: 'スピードデーモン', description: '3秒以内に正解した', icon: '⏱️' },
  { id: 'comeback', title: '逆転勝利', description: 'HP5以下から勝利した', icon: '🔄' },
];

// ============================
// Quest Definitions
// エビデンスA: 目標設定理論（Locke & Latham 1990, d=0.48）
// 3層設計: Easy(確実達成) → Medium(努力で達成) → Hard(チャレンジ)
// ============================
export const DAILY_QUEST_DEFS: DailyQuestDef[] = [
  // Easy層: ほぼ全員が達成でき、毎日の起動動機になる
  { id: 'dq_5', title: '今日の5問', description: '5問正解しよう', target: 5, reward: { mp: 150, exp: 80 }, icon: '⚡' },
  // Medium層: 15-20分の学習を要する。目標設定理論の最適難度
  { id: 'dq_15', title: '15問突破', description: '15問正解しよう', target: 15, reward: { mp: 400, exp: 200 }, icon: '🔥' },
  // Hard層: 30分以上+高品質。達成感が最大のチャレンジ目標
  { id: 'dq_30', title: '30問＆正答率80%', description: '30問正解（正答率80%以上）', target: 30, reward: { mp: 1000, exp: 500 }, icon: '💎' },
  // PvP: 社会的動機づけ（SDT関係性欲求）
  { id: 'dq_pvp', title: 'PvP参戦', description: 'PvP対戦を1回行おう', target: 1, reward: { mp: 200, exp: 100 }, icon: '⚔️' },
];

export const WEEKLY_QUEST_DEFS: DailyQuestDef[] = [
  { id: 'wq_50', title: '週50問チャレンジ', description: '今週50問正解しよう', target: 50, reward: { mp: 800, exp: 400 }, icon: '🌟' },
  { id: 'wq_pvp3', title: '週3回PvP', description: '今週PvPを3回行おう', target: 3, reward: { mp: 800, exp: 400 }, icon: '🏆' },
  { id: 'wq_100', title: '週100問マスター', description: '今週100問正解しよう', target: 100, reward: { mp: 2000, exp: 1000 }, icon: '👑' },
];

/**
 * MPシンク — 称号・ストリークシールド・テーマ
 * エビデンスB: 仮想経済バランス（Castronova 2005）
 *   消費先がないとインフレ → モチベーション低下
 */
export const SHOP_ITEMS: ShopItemDef[] = [
  // 称号（プレイヤー名横に表示）
  { id: 'title_beginner', name: '英語初心者', description: '最初の一歩を踏み出した証', cost: 500, icon: '🔰', type: 'title' },
  { id: 'title_challenger', name: '挑戦者', description: '果敢に問題に挑む姿勢', cost: 1500, icon: '⚡', type: 'title' },
  { id: 'title_strategist', name: '戦略家', description: 'デッキ構築の達人', cost: 3000, icon: '🧠', type: 'title' },
  { id: 'title_speaker', name: '英語の鬼', description: '解答速度に定評あり', cost: 5000, icon: '🔥', type: 'title' },
  { id: 'title_master', name: '英語マスター', description: '全文法を制覇した者', cost: 10000, icon: '👑', type: 'title' },
  { id: 'title_legend', name: '伝説の英語使い', description: '最高峰の称号', cost: 25000, icon: '🌟', type: 'title' },
  // ストリークシールド（ログイン連続日数を1回保護）
  { id: 'streak_shield', name: 'ストリークシールド', description: 'ログイン途切れを1回だけ防ぐ', cost: 2000, icon: '🛡️', type: 'streak_shield' },
  // バトルテーマ
  { id: 'theme_fire', name: '炎のテーマ', description: 'バトル画面が炎に包まれる', cost: 4000, icon: '🔴', type: 'theme' },
  { id: 'theme_ice', name: '氷のテーマ', description: '冷徹な戦場で戦う', cost: 4000, icon: '🔵', type: 'theme' },
  { id: 'theme_gold', name: '黄金のテーマ', description: '栄光のゴールドバトル', cost: 8000, icon: '🟡', type: 'theme' },
];
