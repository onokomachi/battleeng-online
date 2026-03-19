import React from 'react';
import type { GameState, DailyQuestDef } from '../types';
import type { User } from 'firebase/auth';

interface MainMenuProps {
  onSelectMode: (mode: GameState) => void;
  playerLevel: number;
  playerExp: number;
  expForNextLevel: number;
  user?: User | null;
  mathPoints?: number;
  onLogout?: () => void;
  onOpenRanking?: () => void;
  loginStreak?: number;
  onOpenQuests?: () => void;
  onOpenLoginBonus?: () => void;
  canAccessGameMaster?: boolean;
  onOpenGameMaster?: () => void;
  dailyQuestDefs?: DailyQuestDef[];
  dailyQuestProgress?: Record<string, number>;
  dailyQuestDone?: Set<string>;
  onOpenClassBattle?: () => void;
  hasStudentProfile?: boolean;
  srsReviewCount?: number;
  onOpenWeakness?: () => void;
  onOpenItemShop?: () => void;
  equippedTitleName?: string | null;
}

// ── Top Navigation Bar ────────────────────────────────────────────────────
const TopBar: React.FC<{
  user: User | null | undefined;
  mathPoints: number | undefined;
  loginStreak: number | undefined;
  onLogout: (() => void) | undefined;
  onOpenLoginBonus: (() => void) | undefined;
  onOpenRanking: (() => void) | undefined;
  onOpenQuests: (() => void) | undefined;
  onOpenWeakness: (() => void) | undefined;
  onOpenItemShop: (() => void) | undefined;
  onOpenClassBattle: (() => void) | undefined;
  hasStudentProfile: boolean | undefined;
  canAccessGameMaster: boolean | undefined;
  onOpenGameMaster: (() => void) | undefined;
  equippedTitleName: string | null | undefined;
}> = ({
  user, mathPoints, loginStreak, onLogout, onOpenLoginBonus,
  onOpenRanking, onOpenQuests, onOpenWeakness, onOpenItemShop,
  onOpenClassBattle, hasStudentProfile, canAccessGameMaster, onOpenGameMaster,
  equippedTitleName,
}) => (
  <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b"
       style={{ borderColor: 'rgba(56,189,248,0.15)', background: 'rgba(11,29,53,0.7)', backdropFilter: 'blur(12px)' }}>
    {/* Logo */}
    <div className="flex items-center gap-3">
      <span className="text-2xl lg:text-3xl font-black text-hologram" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        BATTLE-ENG
      </span>
      {equippedTitleName && (
        <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full font-bold"
              style={{ color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}>
          {equippedTitleName}
        </span>
      )}
    </div>

    {/* Right actions */}
    <div className="flex items-center gap-2">
      {/* MP */}
      {mathPoints !== undefined && (
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
             style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <span className="text-[10px] font-bold" style={{ color: '#F59E0B' }}>EP</span>
          <span className="text-sm font-black" style={{ color: '#F59E0B' }}>{mathPoints.toLocaleString()}</span>
        </div>
      )}

      {/* Streak */}
      {loginStreak !== undefined && loginStreak >= 1 && (
        <button onClick={onOpenLoginBonus}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg streak-badge text-white text-xs font-black hover:opacity-90 transition-opacity">
          🔥 {loginStreak}日
        </button>
      )}

      {/* Nav buttons */}
      {[
        onOpenRanking  && { label: 'ランキング', fn: onOpenRanking },
        onOpenQuests && user && { label: 'クエスト', fn: onOpenQuests },
        onOpenWeakness && { label: '弱点', fn: onOpenWeakness },
        onOpenItemShop && { label: 'ショップ', fn: onOpenItemShop },
        onOpenClassBattle && user && hasStudentProfile && { label: 'クラス対抗', fn: onOpenClassBattle, orange: true },
      ].filter(Boolean).map((item: any) => item && (
        <button key={item.label} onClick={item.fn}
                className={`hidden sm:block px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:-translate-y-0.5 ${
                  item.orange
                    ? 'text-orange-400 border border-orange-500/30 hover:bg-orange-900/20'
                    : 'text-sky-300 border border-sky-500/20 hover:bg-sky-900/20'
                }`}>
          {item.label}
        </button>
      ))}

      {canAccessGameMaster && onOpenGameMaster && (
        <button onClick={onOpenGameMaster}
                className="p-1.5 rounded-lg text-slate-500 border border-slate-700/50 hover:text-sky-400 hover:border-sky-500/30 transition-colors"
                title="管理画面">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}

      {user && onLogout && (
        <button onClick={onLogout}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-500 border border-slate-700 hover:text-white transition-colors">
          OUT
        </button>
      )}
    </div>
  </div>
);

// ── Player Card (left column) ──────────────────────────────────────────────
const PlayerCard: React.FC<{
  user: User | null | undefined;
  playerLevel: number;
  playerExp: number;
  expForNextLevel: number;
  mathPoints: number | undefined;
  loginStreak: number | undefined;
  dailyQuestDefs: DailyQuestDef[] | undefined;
  dailyQuestProgress: Record<string, number> | undefined;
  dailyQuestDone: Set<string> | undefined;
  onOpenQuests: (() => void) | undefined;
  onOpenLoginBonus: (() => void) | undefined;
  onSelectMode: (mode: GameState) => void;
}> = ({
  user, playerLevel, playerExp, expForNextLevel, mathPoints, loginStreak,
  dailyQuestDefs, dailyQuestProgress, dailyQuestDone, onOpenQuests, onOpenLoginBonus,
  onSelectMode,
}) => {
  const expPct = Math.min(100, (playerExp / expForNextLevel) * 100);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Player Identity Card */}
      <div className="hud-panel rounded-2xl p-5 relative overflow-hidden"
           style={{ borderColor: 'rgba(14,165,233,0.3)', boxShadow: '0 0 30px rgba(14,165,233,0.1)' }}>
        <div className="corner-accent lt" /><div className="corner-accent rb" />

        {/* Top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
             style={{ background: 'linear-gradient(90deg, #0EA5E9, #F97316)' }} />

        {user ? (
          <div className="flex items-center gap-4 mt-1">
            {user.photoURL && (
              <div className="relative flex-shrink-0">
                <img src={user.photoURL} alt=""
                     className="w-16 h-16 rounded-full"
                     style={{ border: '3px solid #0EA5E9', boxShadow: '0 0 16px rgba(14,165,233,0.5)' }} />
                <div className="absolute -bottom-1 -right-1 text-xs font-black px-1.5 py-0.5 rounded-full"
                     style={{ background: '#0EA5E9', color: '#fff', fontSize: '10px' }}>
                  Lv.{playerLevel}
                </div>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-base font-black text-white truncate">{user.displayName}</p>
              <p className="text-[10px] text-sky-400 font-bold tracking-wider">PLAYER</p>
              {mathPoints !== undefined && (
                <p className="text-sm font-black mt-0.5" style={{ color: '#F59E0B' }}>
                  EP: {mathPoints.toLocaleString()}
                </p>
              )}
            </div>
            {loginStreak !== undefined && loginStreak >= 1 && (
              <button onClick={onOpenLoginBonus}
                      className="flex-shrink-0 streak-badge px-2.5 py-1.5 rounded-lg text-white text-sm font-black">
                🔥{loginStreak}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-2xl font-black text-white">GUEST</p>
            <button onClick={() => onSelectMode('login_screen')}
                    className="mt-2 text-xs text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-lg hover:bg-sky-900/20 transition-colors font-bold">
              ログインして記録を保存
            </button>
          </div>
        )}

        {/* EXP bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] text-sky-400 font-bold tracking-wider">EXPERIENCE</span>
            <span className="text-[10px] text-slate-400 font-mono">{playerExp} / {expForNextLevel}</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/50">
            <div className="exp-bar-fill h-full rounded-full transition-all duration-1000"
                 style={{ width: `${expPct}%` }} />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-slate-500">Lv.{playerLevel}</span>
            <span className="text-[10px] text-slate-500">Lv.{playerLevel + 1}</span>
          </div>
        </div>
      </div>

      {/* Daily Missions */}
      {user && dailyQuestDefs && dailyQuestProgress && dailyQuestDone && (
        <button onClick={onOpenQuests}
                className="hud-panel rounded-2xl p-4 text-left cursor-pointer hover:border-amber-500/30 transition-all group"
                style={{ borderColor: 'rgba(245,158,11,0.2)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: '#F59E0B' }}>
                Daily Mission
              </p>
              <p className="text-xs text-slate-400">デイリーミッション</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full"
                  style={{
                    color: dailyQuestDone.size === dailyQuestDefs.length ? '#22C55E' : '#F59E0B',
                    background: dailyQuestDone.size === dailyQuestDefs.length ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)',
                  }}>
              {dailyQuestDone.size}/{dailyQuestDefs.length}
            </span>
          </div>
          <div className="space-y-2">
            {dailyQuestDefs.slice(0, 3).map(q => {
              const prog = dailyQuestProgress[q.id] || 0;
              const done = dailyQuestDone.has(q.id);
              return (
                <div key={q.id} className="flex items-center gap-2">
                  <span className="text-sm flex-shrink-0">{done ? '✅' : q.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-bold truncate ${done ? 'text-green-400 line-through' : 'text-slate-300'}`}>
                        {q.title}
                      </span>
                      {!done && <span className="text-[9px] text-slate-500 ml-1 flex-shrink-0">{prog}/{q.target}</span>}
                    </div>
                    {!done && (
                      <div className="w-full h-1 bg-slate-800 rounded-full mt-0.5">
                        <div className="h-full rounded-full transition-all duration-500"
                             style={{ width: `${Math.min(100, (prog / q.target) * 100)}%`, background: '#F59E0B' }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </button>
      )}

      {/* Bottom credit */}
      <div className="text-center mt-auto">
        <p className="text-[9px] text-slate-600 font-mono tracking-widest">
          presented by onokomachi
        </p>
      </div>
    </div>
  );
};

// ── Game Mode Button ───────────────────────────────────────────────────────
const ModeButton: React.FC<{
  mode: GameState;
  icon: string;
  label: string;
  labelEn: string;
  desc: string;
  badge?: number;
  color: 'blue' | 'orange' | 'green';
  delay?: number;
  onSelect: (mode: GameState) => void;
}> = ({ mode, icon, label, labelEn, desc, badge, color, delay = 0, onSelect }) => {
  const colorMap = {
    blue:   { border: 'rgba(14,165,233,0.35)', glow: 'rgba(14,165,233,0.2)',  accent: '#0EA5E9', bg: 'rgba(14,165,233,0.06)'   },
    orange: { border: 'rgba(249,115,22,0.35)',  glow: 'rgba(249,115,22,0.2)',   accent: '#F97316', bg: 'rgba(249,115,22,0.06)'   },
    green:  { border: 'rgba(34,197,94,0.35)',   glow: 'rgba(34,197,94,0.2)',    accent: '#22C55E', bg: 'rgba(34,197,94,0.06)'    },
  };
  const c = colorMap[color];

  return (
    <button
      onClick={() => onSelect(mode)}
      className="relative w-full rounded-2xl p-5 text-left flex items-center gap-4 group overflow-hidden transition-all duration-250 animate-slide-up"
      style={{
        background: c.bg,
        border: `2px solid ${c.border}`,
        boxShadow: `0 4px 16px ${c.glow}`,
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${c.glow}, 0 0 0 1px ${c.accent}40`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${c.glow}`;
      }}
    >
      {/* Badge */}
      {(badge || 0) > 0 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
          {badge}
        </div>
      )}

      {/* Icon */}
      <div className="text-4xl w-12 flex-shrink-0 text-center group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-xl font-black text-white">{label}</span>
          <span className="text-xs font-bold tracking-widest" style={{ color: c.accent }}>{labelEn}</span>
        </div>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>

      {/* Arrow */}
      <svg className="w-5 h-5 flex-shrink-0 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const MainMenu: React.FC<MainMenuProps> = ({
  onSelectMode, playerLevel, playerExp, expForNextLevel,
  user, mathPoints, onLogout, onOpenRanking,
  loginStreak, onOpenQuests, onOpenLoginBonus,
  canAccessGameMaster, onOpenGameMaster,
  dailyQuestDefs, dailyQuestProgress, dailyQuestDone,
  onOpenClassBattle, hasStudentProfile, srsReviewCount, onOpenWeakness, onOpenItemShop,
  equippedTitleName,
}) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Top navigation bar */}
      <TopBar
        user={user}
        mathPoints={mathPoints}
        loginStreak={loginStreak}
        onLogout={onLogout}
        onOpenLoginBonus={onOpenLoginBonus}
        onOpenRanking={onOpenRanking}
        onOpenQuests={onOpenQuests}
        onOpenWeakness={onOpenWeakness}
        onOpenItemShop={onOpenItemShop}
        onOpenClassBattle={onOpenClassBattle}
        hasStudentProfile={hasStudentProfile}
        canAccessGameMaster={canAccessGameMaster}
        onOpenGameMaster={onOpenGameMaster}
        equippedTitleName={equippedTitleName}
      />

      {/* Body: 2-column on lg (iPad landscape) */}
      <div className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">

        {/* ── LEFT COLUMN: Player Card ── */}
        <div className="lg:w-72 xl:w-80 flex-shrink-0 p-4 lg:p-5 overflow-y-auto border-r"
             style={{ borderColor: 'rgba(56,189,248,0.1)' }}>
          <PlayerCard
            user={user}
            playerLevel={playerLevel}
            playerExp={playerExp}
            expForNextLevel={expForNextLevel}
            mathPoints={mathPoints}
            loginStreak={loginStreak}
            dailyQuestDefs={dailyQuestDefs}
            dailyQuestProgress={dailyQuestProgress}
            dailyQuestDone={dailyQuestDone}
            onOpenQuests={onOpenQuests}
            onOpenLoginBonus={onOpenLoginBonus}
            onSelectMode={onSelectMode}
          />
        </div>

        {/* ── RIGHT COLUMN: Game Modes ── */}
        <div className="flex-1 p-4 lg:p-6 flex flex-col justify-center overflow-y-auto">

          {/* Section header */}
          <div className="mb-5">
            <p className="text-[10px] text-sky-400 tracking-[0.4em] uppercase font-bold mb-1">
              SELECT MODE
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-hologram">
              GAME SELECT
            </h2>
          </div>

          {/* Mode buttons */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <ModeButton
              mode="deck_building"
              icon="⚔️"
              label="バトル"
              labelEn="BATTLE"
              desc="デッキを組んでCPUやプレイヤーと対戦"
              color="blue"
              delay={0}
              onSelect={onSelectMode}
            />
            <ModeButton
              mode="practice_mode"
              icon="📖"
              label="練習"
              labelEn="PRACTICE"
              desc="分野別に問題を解いて実力アップ"
              badge={srsReviewCount}
              color="orange"
              delay={80}
              onSelect={onSelectMode}
            />
            <ModeButton
              mode="card_shop"
              icon="🎴"
              label="ショップ"
              labelEn="SHOP"
              desc="EPでカードパックを購入してデッキを強化"
              color="green"
              delay={160}
              onSelect={onSelectMode}
            />
          </div>

          {/* Guest notice */}
          {!user && (
            <div className="mt-5 max-w-2xl">
              <button onClick={() => onSelectMode('login_screen')}
                      className="w-full text-xs text-sky-400 border border-sky-500/20 px-4 py-2.5 rounded-xl hover:bg-sky-900/20 transition-colors font-bold tracking-wider">
                ログインしてランキング・対戦・クラス対抗に参加する
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
