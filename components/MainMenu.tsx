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

// ── Letter badge icons (B / P / S) ─────────────────────────────────────────
const LetterIcon: React.FC<{ letter: string; color: string }> = ({ letter, color }) => (
  <span className="text-xl sm:text-2xl font-black leading-none select-none"
        style={{ fontFamily: "'Bebas Neue', sans-serif", color, letterSpacing: '0.02em' }}>
    {letter}
  </span>
);

// ── Top Bar ────────────────────────────────────────────────────────────────
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
  <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 border-b flex-shrink-0"
       style={{ borderColor: 'rgba(249,115,22,0.2)', background: 'rgba(11,29,53,0.85)', backdropFilter: 'blur(12px)' }}>
    {/* Logo */}
    <div className="flex items-center gap-2 min-w-0">
      <span className="text-xl sm:text-2xl font-black whitespace-nowrap"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#F97316', letterSpacing: '0.04em' }}>
        Battle
      </span>
      <span className="text-xl sm:text-2xl font-black whitespace-nowrap"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#38BDF8', letterSpacing: '0.04em' }}>
        ENG
      </span>
      {equippedTitleName && (
        <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0"
              style={{ color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}>
          {equippedTitleName}
        </span>
      )}
    </div>

    {/* Right actions */}
    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
      {mathPoints !== undefined && (
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg"
             style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.35)' }}>
          <span className="text-[10px] font-black" style={{ color: '#FB923C' }}>EP</span>
          <span className="text-sm font-black" style={{ color: '#FB923C' }}>{mathPoints.toLocaleString()}</span>
        </div>
      )}
      {loginStreak !== undefined && loginStreak >= 1 && (
        <button onClick={onOpenLoginBonus}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-white text-xs font-black hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg,#F97316,#EF4444)', boxShadow: '0 2px 8px rgba(249,115,22,0.4)' }}>
          🔥{loginStreak}
        </button>
      )}
      {[
        onOpenRanking  && { label: 'ランキング', fn: onOpenRanking },
        onOpenQuests && user && { label: 'クエスト', fn: onOpenQuests },
        onOpenWeakness && { label: '弱点', fn: onOpenWeakness },
        onOpenItemShop && { label: 'アイテム', fn: onOpenItemShop },
        onOpenClassBattle && user && hasStudentProfile && { label: 'クラス', fn: onOpenClassBattle, orange: true },
      ].filter(Boolean).map((item: any) => item && (
        <button key={item.label} onClick={item.fn}
                className={`hidden md:block px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 ${
                  item.orange
                    ? 'text-orange-300 border border-orange-500/40 hover:bg-orange-900/30'
                    : 'text-sky-300 border border-sky-500/25 hover:bg-sky-900/25'
                }`}>
          {item.label}
        </button>
      ))}
      {canAccessGameMaster && onOpenGameMaster && (
        <button onClick={onOpenGameMaster}
                className="p-1.5 rounded-lg text-slate-500 border border-slate-700/50 hover:text-sky-400 transition-colors"
                title="管理画面">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}
      {user && onLogout && (
        <button onClick={onLogout}
                className="px-2 py-1.5 rounded-lg text-xs font-bold text-slate-500 border border-slate-700 hover:text-white transition-colors">
          OUT
        </button>
      )}
    </div>
  </div>
);

// ── Player Card ────────────────────────────────────────────────────────────
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
    <div className="flex flex-col gap-3 h-full">
      {/* Identity Card */}
      <div className="hud-panel rounded-2xl p-4 relative overflow-hidden flex-shrink-0"
           style={{ borderColor: 'rgba(249,115,22,0.3)', boxShadow: '0 0 24px rgba(249,115,22,0.08)' }}>
        {/* Top stripe: orange */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
             style={{ background: 'linear-gradient(90deg, #F97316, #38BDF8)' }} />

        {user ? (
          <div className="flex items-center gap-3 mt-1">
            {user.photoURL ? (
              <div className="relative flex-shrink-0">
                <img src={user.photoURL} alt=""
                     className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                     style={{ border: '2px solid #F97316', boxShadow: '0 0 14px rgba(249,115,22,0.4)' }} />
                <div className="absolute -bottom-1 -right-1 text-[10px] font-black px-1 py-0.5 rounded-full leading-none"
                     style={{ background: '#F97316', color: '#fff' }}>
                  {playerLevel}
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                   style={{ background: 'rgba(249,115,22,0.2)', border: '2px solid #F97316' }}>
                <span className="text-xl font-black" style={{ color: '#F97316' }}>{playerLevel}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-black text-white truncate">{user.displayName}</p>
              <p className="text-[10px] font-bold tracking-wider" style={{ color: '#F97316' }}>PLAYER</p>
              {mathPoints !== undefined && (
                <p className="text-xs sm:text-sm font-black" style={{ color: '#F59E0B' }}>
                  EP {mathPoints.toLocaleString()}
                </p>
              )}
            </div>
            {loginStreak !== undefined && loginStreak >= 1 && (
              <button onClick={onOpenLoginBonus}
                      className="flex-shrink-0 px-2 py-1.5 rounded-lg text-white text-xs font-black hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg,#F97316,#EF4444)', boxShadow: '0 2px 8px rgba(249,115,22,0.4)' }}>
                🔥{loginStreak}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-1 mt-1">
            <p className="text-xl font-black text-white">GUEST</p>
            <button onClick={() => onSelectMode('login_screen')}
                    className="mt-2 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors"
                    style={{ color: '#38BDF8', borderColor: 'rgba(56,189,248,0.3)' }}>
              ログインして記録を保存
            </button>
          </div>
        )}

        {/* EXP bar */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold tracking-wider" style={{ color: '#38BDF8' }}>EXPERIENCE</span>
            <span className="text-[10px] text-slate-400 font-mono">{playerExp}/{expForNextLevel}</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="exp-bar-fill h-full rounded-full transition-all duration-1000"
                 style={{ width: `${expPct}%` }} />
          </div>
          <div className="flex justify-between mt-0.5">
            <span className="text-[9px] text-slate-600">Lv.{playerLevel}</span>
            <span className="text-[9px] text-slate-600">Lv.{playerLevel + 1}</span>
          </div>
        </div>
      </div>

      {/* Daily Missions */}
      {user && dailyQuestDefs && dailyQuestProgress && dailyQuestDone && (
        <button onClick={onOpenQuests}
                className="hud-panel rounded-2xl p-3 sm:p-4 text-left cursor-pointer transition-all hover:scale-[1.01] flex-shrink-0"
                style={{ borderColor: 'rgba(249,115,22,0.25)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: '#F97316' }}>
              Daily Mission
            </p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    color: dailyQuestDone.size === dailyQuestDefs.length ? '#22C55E' : '#F97316',
                    background: dailyQuestDone.size === dailyQuestDefs.length ? 'rgba(34,197,94,0.12)' : 'rgba(249,115,22,0.12)',
                  }}>
              {dailyQuestDone.size}/{dailyQuestDefs.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {dailyQuestDefs.slice(0, 3).map(q => {
              const prog = dailyQuestProgress[q.id] || 0;
              const done = dailyQuestDone.has(q.id);
              return (
                <div key={q.id} className="flex items-center gap-2">
                  <span className="text-xs flex-shrink-0">{done ? '✅' : q.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <span className={`text-[10px] font-bold truncate ${done ? 'text-green-400 line-through' : 'text-slate-300'}`}>
                        {q.title}
                      </span>
                      {!done && <span className="text-[9px] text-slate-500 ml-1 flex-shrink-0">{prog}/{q.target}</span>}
                    </div>
                    {!done && (
                      <div className="w-full h-0.5 rounded-full mt-0.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-full rounded-full transition-all"
                             style={{ width: `${Math.min(100,(prog/q.target)*100)}%`, background: '#F97316' }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </button>
      )}

      <div className="mt-auto text-center">
        <p className="text-[9px] text-slate-700 font-mono tracking-widest">presented by onokomachi</p>
      </div>
    </div>
  );
};

// ── Mode Button ─────────────────────────────────────────────────────────────
const ModeButton: React.FC<{
  mode: GameState;
  letter: string;
  label: string;
  labelEn: string;
  desc: string;
  badge?: number;
  accentHex: string;
  glowColor: string;
  delay?: number;
  onSelect: (mode: GameState) => void;
}> = ({ mode, letter, label, labelEn, desc, badge, accentHex, glowColor, delay = 0, onSelect }) => (
  <button
    onClick={() => onSelect(mode)}
    className="relative w-full rounded-xl p-2.5 sm:p-3 text-left flex items-center gap-3 group overflow-hidden
               transition-all duration-200 hover:scale-[1.015] hover:brightness-110 active:scale-[0.99]"
    style={{
      background: `${accentHex}09`,
      border: `2px solid ${accentHex}40`,
      boxShadow: `0 3px 14px ${glowColor}`,
      animationDelay: `${delay}ms`,
    }}
  >
    {badge !== undefined && badge > 0 && (
      <div className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-black rounded-full w-4 h-4
                      flex items-center justify-center animate-pulse z-10">
        {badge}
      </div>
    )}

    {/* Letter badge */}
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    transition-transform duration-200 group-hover:scale-110"
         style={{ background: `${accentHex}20`, border: `1.5px solid ${accentHex}50`,
                  boxShadow: `0 2px 10px ${glowColor}` }}>
      <LetterIcon letter={letter} color={accentHex} />
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-1.5 mb-0.5">
        <span className="text-sm sm:text-base font-black text-white">{label}</span>
        <span className="text-[9px] sm:text-[10px] font-black tracking-widest" style={{ color: accentHex }}>
          {labelEn}
        </span>
      </div>
      <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">{desc}</p>
    </div>

    <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
         fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

// ── Main Component ──────────────────────────────────────────────────────────
const MainMenu: React.FC<MainMenuProps> = ({
  onSelectMode, playerLevel, playerExp, expForNextLevel,
  user, mathPoints, onLogout, onOpenRanking,
  loginStreak, onOpenQuests, onOpenLoginBonus,
  canAccessGameMaster, onOpenGameMaster,
  dailyQuestDefs, dailyQuestProgress, dailyQuestDone,
  onOpenClassBattle, hasStudentProfile, srsReviewCount,
  onOpenWeakness, onOpenItemShop, equippedTitleName,
}) => (
  <div className="w-full h-full flex flex-col overflow-hidden">
    <TopBar
      user={user} mathPoints={mathPoints} loginStreak={loginStreak}
      onLogout={onLogout} onOpenLoginBonus={onOpenLoginBonus}
      onOpenRanking={onOpenRanking} onOpenQuests={onOpenQuests}
      onOpenWeakness={onOpenWeakness} onOpenItemShop={onOpenItemShop}
      onOpenClassBattle={onOpenClassBattle} hasStudentProfile={hasStudentProfile}
      canAccessGameMaster={canAccessGameMaster} onOpenGameMaster={onOpenGameMaster}
      equippedTitleName={equippedTitleName}
    />

    {/* Body */}
    <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

      {/* ── Left: Player Card (hidden on small phones, shown sm+) ── */}
      <div className="hidden sm:flex flex-col lg:w-64 xl:w-72 flex-shrink-0 p-3 sm:p-4 overflow-y-auto border-b lg:border-b-0 lg:border-r"
           style={{ borderColor: 'rgba(249,115,22,0.12)' }}>
        <PlayerCard
          user={user} playerLevel={playerLevel} playerExp={playerExp}
          expForNextLevel={expForNextLevel} mathPoints={mathPoints}
          loginStreak={loginStreak} dailyQuestDefs={dailyQuestDefs}
          dailyQuestProgress={dailyQuestProgress} dailyQuestDone={dailyQuestDone}
          onOpenQuests={onOpenQuests} onOpenLoginBonus={onOpenLoginBonus}
          onSelectMode={onSelectMode}
        />
      </div>

      {/* ── Right: Game Modes ── */}
      <div className="flex-1 flex flex-col justify-center p-3 sm:p-4 lg:p-6 overflow-y-auto min-h-0">
        {/* Section label */}
        <div className="mb-3 sm:mb-4">
          <p className="text-[9px] sm:text-[10px] font-black tracking-[0.4em] uppercase mb-0.5"
             style={{ color: '#F97316' }}>
            SELECT MODE
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#38BDF8', letterSpacing: '0.05em' }}>
            GAME SELECT
          </h2>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-2xl">
          <ModeButton
            mode="deck_building" letter="B"
            label="Battle mode" labelEn="BATTLE"
            desc="デッキを組んでCPUやプレイヤーと対戦"
            accentHex="#38BDF8" glowColor="rgba(56,189,248,0.18)"
            delay={0} onSelect={onSelectMode}
          />
          <ModeButton
            mode="speed_duel_setup" letter="S"
            label="スピードデュエル" labelEn="SPEED DUEL"
            desc="デッキ不要！早押しクイズでバトル"
            accentHex="#A855F7" glowColor="rgba(168,85,247,0.18)"
            delay={30} onSelect={onSelectMode}
          />
          <ModeButton
            mode="practice_mode" letter="P"
            label="Practice mode" labelEn="PRACTICE"
            desc="分野別に問題を解いて実力アップ"
            badge={srsReviewCount}
            accentHex="#F97316" glowColor="rgba(249,115,22,0.18)"
            delay={60} onSelect={onSelectMode}
          />
          <ModeButton
            mode="card_shop" letter="S"
            label="Shop mode" labelEn="SHOP"
            desc="EPでカードパックを購入してデッキを強化"
            accentHex="#22C55E" glowColor="rgba(34,197,94,0.15)"
            delay={120} onSelect={onSelectMode}
          />
        </div>

        {/* Guest / mobile EP */}
        <div className="mt-3 sm:mt-4 flex flex-col gap-2 max-w-2xl">
          {!user && (
            <button onClick={() => onSelectMode('login_screen')}
                    className="w-full text-xs font-bold px-4 py-2.5 rounded-xl border transition-colors hover:bg-sky-900/20"
                    style={{ color: '#38BDF8', borderColor: 'rgba(56,189,248,0.2)' }}>
              ログインしてランキング・対戦・クラス対抗に参加する
            </button>
          )}
          {/* Mobile EP (only visible on phones where left col is hidden) */}
          {user && mathPoints !== undefined && (
            <p className="sm:hidden text-center text-xs font-black" style={{ color: '#F59E0B' }}>
              EP {mathPoints.toLocaleString()}　Lv.{playerLevel}
            </p>
          )}
          {/* Admin panel button (visible to admins) */}
          {canAccessGameMaster && onOpenGameMaster && (
            <button onClick={onOpenGameMaster}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border transition-all hover:bg-slate-800/60"
                    style={{ color: '#94A3B8', borderColor: 'rgba(148,163,184,0.2)' }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              管理画面
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default MainMenu;
