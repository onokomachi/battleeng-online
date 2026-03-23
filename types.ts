
// types.ts - BattleENG Online (英語カードバトル)

// --- English Question Types ---
export type QuestionType = 'select' | 'input' | 'sort';

export type EnglishCategory =
  // ── 中学1年生 文法 ──────────────────────────────────────
  | 'be動詞'
  | '一般動詞'
  | '代名詞'
  | '名詞の複数形'
  | '現在進行形'
  | '過去形'
  | '過去進行形'
  | '疑問詞'
  | '命令文'
  | '感嘆文'
  | 'there is'
  // ── 中学2年生 文法 ──────────────────────────────────────
  | '未来'
  | '動名詞'
  | '不定詞'
  | '助動詞【must】'
  | '助動詞【have to】'
  | '助動詞【その他】'
  | '比較'
  | '接続詞'
  | '受け身'
  | '現在完了'
  // ── 中学3年生 文法 ──────────────────────────────────────
  | '現在完了進行形'
  | '不定詞2'
  | 'その他'
  | '関係代名詞'
  | '分詞の後置修飾'
  | '間接疑問文'
  | '仮定法'
  // ── 英単語 中1 ───────────────────────────────────────────
  | '英単語【動詞】中1'
  | '英単語【名詞】中1'
  | '英単語【形容詞・副詞】中1'
  // ── 英単語 中2 ───────────────────────────────────────────
  | '英単語【動詞】中2'
  | '英単語【名詞】中2'
  | '英単語【形容詞・副詞】中2'
  // ── 英単語 中3 ───────────────────────────────────────────
  | '英単語【動詞】中3'
  | '英単語【名詞】中3'
  | '英単語【形容詞・副詞】中3';

// --- Student Profile (学年・組・番号) ---
export interface StudentProfile {
  grade: number;    // 学年 (1, 2, 3)
  classNum: number; // 組 (1〜10)
  number: number;   // 出席番号 (1〜45)
  displayLabel: string; // e.g. "2年3組12番"
}

// --- Auth / Online Types ---

export interface DailyQuestDef {
  id: string;
  title: string;
  description: string;
  target: number;
  reward: { mp: number; exp: number };
  icon: string;
}

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  engPoints: number;        // mathPoints → engPoints
  playerLevel: number;
  playerExp: number;
  totalWins: number;
  totalMatches: number;
  ownedCardIds: number[];
  createdAt?: any;
  // 形式別勝敗 (denormalized for single-query ranking)
  formatWins?: {
    best_of_3?: number;
    best_of_5?: number;
    best_of_7?: number;
    master_duel?: number;
  };
  formatMatches?: {
    best_of_3?: number;
    best_of_5?: number;
    best_of_7?: number;
    master_duel?: number;
  };
}

/** MPシンク: 購入可能アイテム定義 */
export interface ShopItemDef {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  type: 'title' | 'streak_shield' | 'theme';
}

export type BattleMode = 'cpu' | 'pvp';
export type BattleFormat = 'best_of_3' | 'best_of_5' | 'best_of_7' | 'master_duel';

export interface SavedDeck {
  name: string;
  cardIds: number[];
  createdAt: number;
}

export interface Room {
  roomId: string;
  status: 'waiting' | 'playing' | 'finished';
  hostId: string;
  hostName: string;
  guestId: string | null;
  guestName: string | null;
  createdAt: any;
  hostLastActive: any;
  guestLastActive: any;
  hostReady: boolean;
  guestReady: boolean;
  round: number;
  // HP-based battle
  p1Hp: number;
  p2Hp: number;
  // Moves: serialized card IDs (not full card objects for Firestore)
  p1Move: { cardId: number; answeredCorrectly?: boolean } | null;
  p2Move: { cardId: number; answeredCorrectly?: boolean } | null;
  winnerId: 'host' | 'guest' | 'draw' | 'abandoned' | 'admin_terminated' | null;
  // Speed Duel PvP extension (optional fields)
  battleType?: 'deck' | 'speed_duel';
  sdCategories?: string[];
  sdFormat?: BattleFormat;
  sdQuestion?: { type: string; data: { question: string; japanese?: string; options?: string[] }; answer: string | string[] } | null;
  sdQuestionIndex?: number;
  sdHostBuzz?: any;
  sdGuestBuzz?: any;
  sdHostAnswer?: string | null;
  sdGuestAnswer?: string | null;
  sdRoundResult?: 'host' | 'guest' | 'draw' | 'timeout' | null;
  sdHostRoundWins?: number;
  sdGuestRoundWins?: number;
}

// --- Core Game Types ---

export type AbilityType = 'DEFENSIVE_STANCE' | 'TIME_PRESSURE' | 'SCORE_BOOST';

export interface Ability {
  type: AbilityType;
  value?: number;
  description: string;
}

// 英語問題データ構造
export interface Problem {
  type: QuestionType;
  data: {
    question: string;
    japanese?: string;       // 和訳ヒント
    options?: string[];      // select/sort で使用する選択肢
  };
  answer: string | string[]; // select/input は string, sort は string[]
}

export type ProblemSet = Record<string, Problem[]>;

// カードデータ（バトル用）
export interface ProblemCard {
  id: number;
  mainCategory: EnglishCategory; // "未来", "受け身" 等の文法カテゴリ
  category: string;              // サブ分類（問題タイプ: "select"/"input"/"sort"）
  difficulty: number;            // select=2, input=3, sort=4
  problem: Problem;
  ability?: Ability;
}

export type TurnPhase = 'selecting_card' | 'solving_problem' | 'round_end' | 'game_over' | 'waiting_for_opponent';
export type GameState = 'login_screen' | 'main_menu' | 'deck_building' | 'in_game' | 'end' | 'practice_mode' | 'card_shop' | 'matchmaking' | 'gamemaster' | 'tutorial' | 'speed_duel_setup' | 'speed_duel';
export type TurnInitiative = 'player' | 'pc';

// --- Speed Duel Types ---
export type SpeedDuelPhase =
  | 'showing_question'   // 問題表示中・早押し受付中
  | 'player_buzzed'      // プレイヤーが先押し → 回答入力中
  | 'opponent_chance'    // プレイヤー誤答 → 相手に回答権
  | 'reveal'             // 結果表示
  | 'game_over';

export interface SpeedDuelSetup {
  categories: EnglishCategory[];
  format: BattleFormat;
  mode: BattleMode;
}

export interface SpeedDuelRound {
  problem: Problem;
  phase: SpeedDuelPhase;
  playerBuzzed: boolean;
  cpuBuzzed: boolean;
  playerAnswer: string | null;
  cpuAnswered: boolean;
  result: 'player_win' | 'cpu_win' | 'draw' | 'timeout' | null;
  startedAt: number; // Date.now()
}

// --- Practice Mode Types ---
export interface SubCategoryGroup {
    name: string;
    subtopics: string[];
}
export interface CategoryDef {
    name: string;
    grade: 1 | 2 | 3;  // 学年 (1=中1, 2=中2, 3=中3)
    groups: SubCategoryGroup[];
}

export interface SessionStats {
  correct: number;
  incorrect: number;
  totalScore: number;
  problemCount: number;
}

export interface LearningRecord {
    id: string;
    date: string;
    category: string;
    subTopic: string;
    stats: SessionStats;
}
