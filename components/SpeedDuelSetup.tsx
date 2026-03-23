import React, { useState } from 'react';
import type { BattleFormat, BattleMode, EnglishCategory, SpeedDuelSetup } from '../types';
import type { User } from 'firebase/auth';
import { ENG_CATEGORIES } from '../constants';

const BATTLE_FORMATS: { key: BattleFormat; label: string; desc: string }[] = [
  { key: 'best_of_3',    label: '3本勝負',       desc: '先に2勝で決着' },
  { key: 'best_of_5',    label: '5本勝負',       desc: '先に3勝で決着' },
  { key: 'best_of_7',    label: '7本勝負',       desc: '先に4勝で決着' },
  { key: 'master_duel',  label: 'マスターデュエル', desc: 'HPを0にするまで戦う' },
];

const GRADE_COLORS: Record<number, { text: string; border: string; bg: string }> = {
  1: { text: '#34D399', border: 'rgba(52,211,153,0.4)',  bg: 'rgba(52,211,153,0.1)' },
  2: { text: '#38BDF8', border: 'rgba(56,189,248,0.4)',  bg: 'rgba(56,189,248,0.1)' },
  3: { text: '#A78BFA', border: 'rgba(167,139,250,0.4)', bg: 'rgba(167,139,250,0.1)' },
};

interface Props {
  onStart: (setup: SpeedDuelSetup) => void;
  onBack: () => void;
  user: User | null | undefined;
}

const SpeedDuelSetup: React.FC<Props> = ({ onStart, onBack, user }) => {
  const [selectedCategories, setSelectedCategories] = useState<Set<EnglishCategory>>(new Set());
  const [battleFormat, setBattleFormat] = useState<BattleFormat>('best_of_5');
  const [mode, setMode] = useState<BattleMode>('cpu');

  const toggleCategory = (cat: EnglishCategory) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const selectGrade = (grade: 1 | 2 | 3) => {
    const gradeCats = ENG_CATEGORIES.filter(c => c.grade === grade).map(c => c.name as EnglishCategory);
    setSelectedCategories(prev => {
      const next = new Set(prev);
      const allSelected = gradeCats.every(c => next.has(c));
      if (allSelected) gradeCats.forEach(c => next.delete(c));
      else gradeCats.forEach(c => next.add(c));
      return next;
    });
  };

  const selectAll = () => {
    if (selectedCategories.size === ENG_CATEGORIES.length) {
      setSelectedCategories(new Set());
    } else {
      setSelectedCategories(new Set(ENG_CATEGORIES.map(c => c.name as EnglishCategory)));
    }
  };

  const handleStart = () => {
    if (selectedCategories.size === 0) return;
    onStart({ categories: Array.from(selectedCategories), format: battleFormat, mode });
  };

  const gradeGroups = [1, 2, 3] as const;

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden"
         style={{ background: 'linear-gradient(135deg, #050d1a 0%, #0a1628 60%, #0d1f3c 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b"
           style={{ borderColor: 'rgba(168,85,247,0.2)', background: 'rgba(11,18,35,0.9)' }}>
        <button onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          戻る
        </button>
        <div className="text-center">
          <p className="text-[9px] font-black tracking-[0.3em]" style={{ color: '#A855F7' }}>NO DECK NEEDED</p>
          <h1 className="text-lg sm:text-xl font-black text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em', lineHeight: 1 }}>
            SPEED DUEL
          </h1>
        </div>
        <div className="w-16" /> {/* spacer */}
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
        {/* Category Selection */}
        <div className="hud-panel rounded-2xl p-4" style={{ borderColor: 'rgba(168,85,247,0.25)' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-black tracking-widest" style={{ color: '#A855F7' }}>
              問題カテゴリ選択
            </p>
            <div className="flex gap-2">
              {gradeGroups.map(g => {
                const col = GRADE_COLORS[g];
                const gradeCats = ENG_CATEGORIES.filter(c => c.grade === g);
                const allSelected = gradeCats.every(c => selectedCategories.has(c.name as EnglishCategory));
                return (
                  <button key={g} onClick={() => selectGrade(g)}
                          className="text-[10px] font-bold px-2 py-1 rounded-lg transition-all"
                          style={{
                            color: allSelected ? '#fff' : col.text,
                            background: allSelected ? col.border : col.bg,
                            border: `1px solid ${col.border}`,
                          }}>
                    中{g}
                  </button>
                );
              })}
              <button onClick={selectAll}
                      className="text-[10px] font-bold px-2 py-1 rounded-lg transition-all"
                      style={{
                        color: selectedCategories.size === ENG_CATEGORIES.length ? '#fff' : '#94A3B8',
                        background: selectedCategories.size === ENG_CATEGORIES.length ? 'rgba(148,163,184,0.3)' : 'rgba(148,163,184,0.1)',
                        border: '1px solid rgba(148,163,184,0.3)',
                      }}>
                全て
              </button>
            </div>
          </div>

          {/* Grade grouped categories */}
          <div className="space-y-3">
            {gradeGroups.map(g => {
              const col = GRADE_COLORS[g];
              const gradeCats = ENG_CATEGORIES.filter(c => c.grade === g);
              return (
                <div key={g}>
                  <p className="text-[9px] font-black tracking-widest mb-1.5" style={{ color: col.text }}>
                    中学{g}年生
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {gradeCats.map(cat => {
                      const selected = selectedCategories.has(cat.name as EnglishCategory);
                      return (
                        <button key={cat.name}
                                onClick={() => toggleCategory(cat.name as EnglishCategory)}
                                className="text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg transition-all"
                                style={{
                                  color: selected ? '#fff' : col.text,
                                  background: selected ? col.border : col.bg,
                                  border: `1px solid ${selected ? col.text : col.border}`,
                                }}>
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedCategories.size > 0 && (
            <p className="mt-2 text-[10px] text-slate-400 text-right">
              {selectedCategories.size}カテゴリ選択中
            </p>
          )}
        </div>

        {/* Battle Format */}
        <div className="hud-panel rounded-2xl p-4" style={{ borderColor: 'rgba(168,85,247,0.2)' }}>
          <p className="text-xs font-black tracking-widest mb-3" style={{ color: '#A855F7' }}>対戦形式</p>
          <div className="grid grid-cols-2 gap-2">
            {BATTLE_FORMATS.map(f => (
              <button key={f.key}
                      onClick={() => setBattleFormat(f.key)}
                      className="rounded-xl p-2.5 text-left transition-all"
                      style={{
                        background: battleFormat === f.key ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.03)',
                        border: `1.5px solid ${battleFormat === f.key ? '#A855F7' : 'rgba(168,85,247,0.2)'}`,
                      }}>
                <p className="text-xs font-black text-white">{f.label}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{f.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Mode: CPU / PvP */}
        <div className="hud-panel rounded-2xl p-4" style={{ borderColor: 'rgba(168,85,247,0.2)' }}>
          <p className="text-xs font-black tracking-widest mb-3" style={{ color: '#A855F7' }}>対戦相手</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setMode('cpu')}
                    className="rounded-xl p-3 text-center transition-all"
                    style={{
                      background: mode === 'cpu' ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.03)',
                      border: `1.5px solid ${mode === 'cpu' ? '#A855F7' : 'rgba(168,85,247,0.2)'}`,
                    }}>
              <p className="text-base font-black text-white">🤖</p>
              <p className="text-xs font-black text-white mt-1">CPU対戦</p>
              <p className="text-[9px] text-slate-400 mt-0.5">すぐに開始</p>
            </button>
            <button onClick={() => user ? setMode('pvp') : undefined}
                    className={`rounded-xl p-3 text-center transition-all ${!user ? 'opacity-40 cursor-not-allowed' : ''}`}
                    style={{
                      background: mode === 'pvp' ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.03)',
                      border: `1.5px solid ${mode === 'pvp' ? '#A855F7' : 'rgba(168,85,247,0.2)'}`,
                    }}>
              <p className="text-base font-black text-white">⚔️</p>
              <p className="text-xs font-black text-white mt-1">オンライン対戦</p>
              <p className="text-[9px] text-slate-400 mt-0.5">{user ? 'ルームコードで対戦' : 'ログインが必要'}</p>
            </button>
          </div>
        </div>

        {/* Speed Duel Rules info */}
        <div className="rounded-xl p-3" style={{ background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.15)' }}>
          <p className="text-[10px] font-black tracking-wider mb-2" style={{ color: '#A855F7' }}>⚡ スピードデュエル ルール</p>
          <ul className="space-y-1 text-[10px] text-slate-300">
            <li>• デッキ不要！選んだカテゴリからランダムに出題</li>
            <li>• 問題を見たら「BUZZ！」ボタンを押して解答権を獲得</li>
            <li>• 先押しで正解 → HP{5}ダメージを与える</li>
            <li>• 先押しで誤答 → 相手に解答権が移る</li>
            <li>• 両者誤答 → ドロー（HPなし）で次の問題へ</li>
            <li>• 15秒以内に誰も解答しなければタイムアウト</li>
          </ul>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex-shrink-0 p-4 border-t" style={{ borderColor: 'rgba(168,85,247,0.2)' }}>
        <button onClick={handleStart}
                disabled={selectedCategories.size === 0}
                className="w-full py-3.5 rounded-2xl font-black text-base tracking-widest transition-all
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: selectedCategories.size > 0
                    ? 'linear-gradient(135deg, #7C3AED, #A855F7)'
                    : 'rgba(100,100,100,0.3)',
                  color: '#fff',
                  boxShadow: selectedCategories.size > 0 ? '0 4px 20px rgba(168,85,247,0.4)' : 'none',
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.1em',
                }}>
          {selectedCategories.size === 0
            ? 'カテゴリを1つ以上選択してください'
            : `SPEED DUEL START！`}
        </button>
      </div>
    </div>
  );
};

export default SpeedDuelSetup;
