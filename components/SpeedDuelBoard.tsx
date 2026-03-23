import React, { useState, useEffect, useRef } from 'react';
import type { SpeedDuelRound, BattleFormat, BattleMode } from '../types';
import { INITIAL_HP, SPEED_DUEL_TIME_LIMIT } from '../constants';

// ── HP Bar ───────────────────────────────────────────────────────────────────
const HpBar: React.FC<{ current: number; max: number; label: string; isPlayer: boolean }> = ({
  current, max, label, isPlayer,
}) => {
  const pct = Math.max(0, (current / max) * 100);
  const color = pct > 50 ? '#34D399' : pct > 25 ? '#FBBF24' : '#F87171';
  return (
    <div className={`flex-1 ${isPlayer ? '' : 'items-end'}`}>
      <div className={`flex items-center justify-between mb-1 ${isPlayer ? '' : 'flex-row-reverse'}`}>
        <span className="text-[9px] sm:text-[10px] font-black tracking-wider text-slate-400">{label}</span>
        <span className="text-sm sm:text-base font-black text-white">{Math.max(0, current)}</span>
      </div>
      <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full rounded-full transition-all duration-500"
             style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}60` }} />
      </div>
    </div>
  );
};

// ── Round Win Pips ───────────────────────────────────────────────────────────
const RoundPips: React.FC<{ wins: number; required: number; color: string; reversed?: boolean }> = ({
  wins, required, color, reversed,
}) => {
  if (required === 0) return null;
  const pips = Array.from({ length: required }, (_, i) => i < wins);
  return (
    <div className={`flex gap-1 ${reversed ? 'flex-row-reverse' : ''}`}>
      {pips.map((filled, i) => (
        <div key={i} className="w-2.5 h-2.5 rounded-full transition-all duration-300"
             style={{ background: filled ? color : 'rgba(255,255,255,0.1)', boxShadow: filled ? `0 0 6px ${color}` : 'none' }} />
      ))}
    </div>
  );
};

// ── Sort Answer UI ───────────────────────────────────────────────────────────
const SortAnswerUI: React.FC<{
  options: string[];
  onSubmit: (answer: string) => void;
  disabled: boolean;
}> = ({ options, onSubmit, disabled }) => {
  const [arranged, setArranged] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<string[]>([...options]);

  const addWord = (word: string, idx: number) => {
    if (disabled) return;
    setArranged(prev => [...prev, word]);
    setRemaining(prev => prev.filter((_, i) => i !== idx));
  };
  const removeWord = (idx: number) => {
    if (disabled) return;
    const word = arranged[idx];
    setArranged(prev => prev.filter((_, i) => i !== idx));
    setRemaining(prev => [...prev, word]);
  };

  return (
    <div className="space-y-3">
      {/* Arranged */}
      <div className="min-h-[40px] rounded-xl p-2 flex flex-wrap gap-1.5"
           style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)' }}>
        {arranged.length === 0 && (
          <span className="text-xs text-slate-500 self-center px-1">ここに単語を並べる</span>
        )}
        {arranged.map((w, i) => (
          <button key={i} onClick={() => removeWord(i)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-white transition-all hover:opacity-80"
                  style={{ background: 'rgba(168,85,247,0.3)', border: '1px solid rgba(168,85,247,0.5)' }}>
            {w}
          </button>
        ))}
      </div>
      {/* Remaining word pool */}
      <div className="flex flex-wrap gap-1.5">
        {remaining.map((w, i) => (
          <button key={i} onClick={() => addWord(w, i)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105"
                  style={{ color: '#CBD5E1', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}>
            {w}
          </button>
        ))}
      </div>
      <button onClick={() => onSubmit(arranged.join(' '))}
              disabled={disabled || arranged.length === 0}
              className="w-full py-2.5 rounded-xl font-black text-sm transition-all
                         disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#A855F7)', color: '#fff' }}>
        解答する
      </button>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
interface SpeedDuelBoardProps {
  round: SpeedDuelRound;
  playerHP: number;
  opponentHP: number;
  playerRoundWins: number;
  opponentRoundWins: number;
  currentRound: number;
  requiredWins: number;
  battleFormat: BattleFormat;
  gameMode: BattleMode;
  timeRemaining: number; // ms
  onBuzz: () => void;
  onAnswer: (answer: string) => void;
  gameLog: string[];
}

const SpeedDuelBoard: React.FC<SpeedDuelBoardProps> = ({
  round, playerHP, opponentHP, playerRoundWins, opponentRoundWins,
  currentRound, requiredWins, battleFormat, gameMode, timeRemaining,
  onBuzz, onAnswer, gameLog,
}) => {
  const [inputAnswer, setInputAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when player buzzes in
  useEffect(() => {
    if (round.phase === 'player_buzzed' && round.problem.type === 'input') {
      inputRef.current?.focus();
    }
  }, [round.phase, round.problem.type]);

  // Reset input when new round starts
  useEffect(() => {
    if (round.phase === 'showing_question') {
      setInputAnswer('');
    }
  }, [round.phase]);

  const timeSec = Math.ceil(timeRemaining / 1000);
  const timePct = (timeRemaining / SPEED_DUEL_TIME_LIMIT) * 100;
  const timeColor = timePct > 50 ? '#34D399' : timePct > 25 ? '#FBBF24' : '#F87171';

  const { problem, phase, result } = round;
  const isAnswering = phase === 'player_buzzed' || phase === 'opponent_chance';
  const isReveal = phase === 'reveal';

  const handleSelectAnswer = (option: string) => {
    if (phase !== 'player_buzzed' && phase !== 'opponent_chance') return;
    onAnswer(option);
  };

  const handleInputSubmit = () => {
    if (!inputAnswer.trim()) return;
    onAnswer(inputAnswer.trim());
    setInputAnswer('');
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden select-none"
         style={{ background: 'linear-gradient(135deg, #050d1a 0%, #0a1628 60%, #0d1f3c 100%)' }}>

      {/* ── HP / Score Header ── */}
      <div className="flex-shrink-0 px-3 pt-2.5 pb-2 border-b"
           style={{ borderColor: 'rgba(168,85,247,0.15)' }}>
        <div className="flex items-center gap-3">
          {/* Player HP */}
          <HpBar current={playerHP} max={INITIAL_HP} label="YOU" isPlayer={true} />

          {/* Center info */}
          <div className="flex flex-col items-center flex-shrink-0 gap-1">
            {/* Round win pips */}
            <div className="flex items-center gap-2">
              {battleFormat !== 'master_duel' && (
                <>
                  <RoundPips wins={playerRoundWins} required={requiredWins} color="#A855F7" />
                  <span className="text-[9px] text-slate-600 font-mono">vs</span>
                  <RoundPips wins={opponentRoundWins} required={requiredWins} color="#F87171" reversed />
                </>
              )}
            </div>
            <span className="text-[9px] font-black tracking-widest"
                  style={{ color: '#A855F7', fontFamily: "'Bebas Neue', sans-serif" }}>
              {battleFormat === 'master_duel' ? 'MASTER DUEL' : `R.${currentRound}`}
            </span>
          </div>

          {/* CPU HP */}
          <div className="flex-1">
            <HpBar current={opponentHP} max={INITIAL_HP}
                   label={gameMode === 'cpu' ? 'CPU' : 'OPPONENT'}
                   isPlayer={false} />
          </div>
        </div>
      </div>

      {/* ── Timer Bar ── */}
      {(phase === 'showing_question' || phase === 'player_buzzed' || phase === 'opponent_chance') && (
        <div className="flex-shrink-0 h-1.5 w-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="h-full transition-all duration-100 rounded-r-full"
               style={{ width: `${timePct}%`, background: timeColor, boxShadow: `0 0 6px ${timeColor}80` }} />
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col justify-center p-3 sm:p-4 gap-3 overflow-y-auto min-h-0">

        {/* Timer digit */}
        {(phase === 'showing_question' || phase === 'player_buzzed' || phase === 'opponent_chance') && (
          <div className="text-center">
            <span className="text-3xl font-black"
                  style={{ color: timeColor, fontFamily: "'Bebas Neue', sans-serif", textShadow: `0 0 16px ${timeColor}` }}>
              {timeSec}
            </span>
          </div>
        )}

        {/* Question Card */}
        <div className="hud-panel rounded-2xl p-4 sm:p-5 w-full max-w-xl mx-auto"
             style={{ borderColor: 'rgba(168,85,247,0.3)', boxShadow: '0 0 30px rgba(168,85,247,0.1)' }}>
          {problem.data.japanese && (
            <p className="text-[10px] sm:text-xs text-slate-400 mb-2 text-center">{problem.data.japanese}</p>
          )}
          <p className="text-base sm:text-lg font-bold text-white text-center leading-snug">
            {problem.data.question}
          </p>
        </div>

        {/* Buzz status label */}
        {phase === 'showing_question' && !round.playerBuzzed && !round.cpuBuzzed && gameMode === 'cpu' && (
          <p className="text-center text-xs text-slate-500 animate-pulse">
            ⚡ BUZZ！ボタンを押して解答権を獲得
          </p>
        )}
        {phase === 'player_buzzed' && gameMode === 'pvp' && (
          <p className="text-center text-xs font-bold animate-pulse" style={{ color: '#A855F7' }}>
            ⏱️ 解答してください！
          </p>
        )}
        {phase === 'player_buzzed' && gameMode === 'cpu' && (
          <p className="text-center text-xs font-bold animate-pulse" style={{ color: '#A855F7' }}>
            ✋ あなたが先押し！解答してください
          </p>
        )}
        {phase === 'opponent_chance' && gameMode === 'pvp' && (
          <p className="text-center text-xs font-bold animate-pulse" style={{ color: '#38BDF8' }}>
            ⏳ 相手の回答を待っています...
          </p>
        )}
        {phase === 'opponent_chance' && gameMode === 'cpu' && (
          <p className="text-center text-xs font-bold animate-pulse" style={{ color: '#F59E0B' }}>
            ⚠️ 相手に解答権が移りました
          </p>
        )}

        {/* Answer UI */}
        {(phase === 'player_buzzed') && (
          <div className="w-full max-w-xl mx-auto">
            {problem.type === 'select' && problem.data.options && (
              <div className="grid grid-cols-2 gap-2">
                {problem.data.options.map((opt, i) => (
                  <button key={i} onClick={() => handleSelectAnswer(opt)}
                          className="rounded-xl p-2.5 text-xs font-bold text-white text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                          style={{ background: 'rgba(168,85,247,0.15)', border: '1.5px solid rgba(168,85,247,0.35)' }}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {problem.type === 'input' && (
              <div className="flex gap-2">
                <input ref={inputRef}
                       value={inputAnswer}
                       onChange={e => setInputAnswer(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && handleInputSubmit()}
                       className="flex-1 rounded-xl px-3 py-2.5 text-sm font-bold text-white outline-none"
                       style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(168,85,247,0.4)' }}
                       placeholder="英語で入力..."
                       autoComplete="off"
                />
                <button onClick={handleInputSubmit}
                        disabled={!inputAnswer.trim()}
                        className="px-4 py-2.5 rounded-xl font-black text-sm text-white transition-all disabled:opacity-40"
                        style={{ background: 'linear-gradient(135deg,#7C3AED,#A855F7)' }}>
                  解答
                </button>
              </div>
            )}
            {problem.type === 'sort' && problem.data.options && (
              <SortAnswerUI options={problem.data.options} onSubmit={onAnswer} disabled={false} />
            )}
          </div>
        )}

        {/* Opponent chance: show select options too (CPU mode - player gets second shot) */}
        {phase === 'opponent_chance' && gameMode === 'cpu' && problem.type === 'select' && problem.data.options && (
          <div className="w-full max-w-xl mx-auto">
            <div className="grid grid-cols-2 gap-2">
              {problem.data.options.map((opt, i) => (
                <button key={i} onClick={() => handleSelectAnswer(opt)}
                        className="rounded-xl p-2.5 text-xs font-bold text-white text-left transition-all hover:scale-[1.02]"
                        style={{ background: 'rgba(245,158,11,0.12)', border: '1.5px solid rgba(245,158,11,0.3)' }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
        {phase === 'opponent_chance' && gameMode === 'cpu' && problem.type === 'input' && (
          <div className="w-full max-w-xl mx-auto flex gap-2">
            <input value={inputAnswer}
                   onChange={e => setInputAnswer(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleInputSubmit()}
                   className="flex-1 rounded-xl px-3 py-2.5 text-sm font-bold text-white outline-none"
                   style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(245,158,11,0.4)' }}
                   placeholder="英語で入力..."
                   autoComplete="off"
            />
            <button onClick={handleInputSubmit}
                    disabled={!inputAnswer.trim()}
                    className="px-4 py-2.5 rounded-xl font-black text-sm text-white transition-all disabled:opacity-40"
                    style={{ background: 'linear-gradient(135deg,#B45309,#F59E0B)' }}>
              解答
            </button>
          </div>
        )}
        {phase === 'opponent_chance' && gameMode === 'cpu' && problem.type === 'sort' && problem.data.options && (
          <div className="w-full max-w-xl mx-auto">
            <SortAnswerUI options={problem.data.options} onSubmit={onAnswer} disabled={false} />
          </div>
        )}

        {/* Result Banner */}
        {isReveal && (
          <div className="w-full max-w-xl mx-auto rounded-2xl p-4 text-center animate-pulse-once"
               style={{
                 background: result === 'player_win'
                   ? 'rgba(52,211,153,0.12)'
                   : result === 'cpu_win'
                     ? 'rgba(248,113,113,0.12)'
                     : 'rgba(148,163,184,0.08)',
                 border: `2px solid ${result === 'player_win' ? '#34D399' : result === 'cpu_win' ? '#F87171' : '#64748B'}`,
               }}>
            <p className="text-2xl sm:text-3xl font-black"
               style={{
                 fontFamily: "'Bebas Neue', sans-serif",
                 color: result === 'player_win' ? '#34D399' : result === 'cpu_win' ? '#F87171' : '#94A3B8',
                 letterSpacing: '0.05em',
               }}>
              {result === 'player_win' ? '🎯 CORRECT!' : result === 'cpu_win' ? '❌ MISS' : '🤝 DRAW'}
            </p>
            {/* Show correct answer on miss or draw */}
            {(result === 'cpu_win' || result === 'draw' || result === 'timeout') && (
              <div className="mt-2">
                <p className="text-[10px] text-slate-400 mb-1">正解</p>
                <p className="text-sm font-black" style={{ color: '#38BDF8' }}>
                  {Array.isArray(problem.answer) ? problem.answer.join(' ') : problem.answer}
                </p>
              </div>
            )}
            {result === 'player_win' && (
              <p className="text-xs text-slate-400 mt-1">+5 HP ダメージ！</p>
            )}
          </div>
        )}

        {/* BUZZ Button (CPU mode only) */}
        {phase === 'showing_question' && !round.playerBuzzed && !round.cpuBuzzed && gameMode === 'cpu' && (
          <div className="flex-shrink-0 w-full max-w-xl mx-auto">
            <button onClick={onBuzz}
                    className="w-full py-5 rounded-2xl font-black text-2xl tracking-widest transition-all
                               hover:scale-[1.02] active:scale-[0.97]"
                    style={{
                      background: 'linear-gradient(135deg, #6D28D9, #A855F7, #7C3AED)',
                      color: '#fff',
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: '0.12em',
                      boxShadow: '0 6px 30px rgba(168,85,247,0.5)',
                    }}>
              ⚡ BUZZ！
            </button>
          </div>
        )}

        {/* CPU buzzed first notice (CPU mode only) */}
        {phase === 'showing_question' && round.cpuBuzzed && !round.playerBuzzed && gameMode === 'cpu' && (
          <div className="text-center py-4">
            <p className="text-sm font-black" style={{ color: '#F87171' }}>CPUが先押し！</p>
            <p className="text-xs text-slate-400 mt-1">解答中...</p>
          </div>
        )}
      </div>

      {/* ── Game Log ── */}
      {gameLog.length > 0 && (
        <div className="flex-shrink-0 px-3 py-2 border-t overflow-x-hidden"
             style={{ borderColor: 'rgba(168,85,247,0.1)' }}>
          <div className="flex gap-3 overflow-x-auto pb-0.5">
            {[...gameLog].reverse().slice(0, 5).map((log, i) => (
              <span key={i} className="text-[9px] text-slate-500 whitespace-nowrap flex-shrink-0"
                    style={{ opacity: 1 - i * 0.18 }}>
                {log}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedDuelBoard;
