
import React, { useState, useEffect } from 'react';
import type { CategoryDef, SubCategoryGroup } from '../types';
import { ENG_CATEGORIES } from '../constants';
import { ArchiveIcon, TrophyIcon } from './Icons';
import type { Firestore } from 'firebase/firestore';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

interface MenuScreenProps {
  onSelectSubTopic: (category: string, subTopic: string) => void;
  onSelectSpecial: (categories: string[], label: string) => void;
  onShowRecords: () => void;
  onExit: () => void;
  db?: Firestore | null;
}

/** 単元別ランキングモーダル */
const TopicRankingModal: React.FC<{
  subTopic: string;
  db: Firestore;
  onClose: () => void;
}> = ({ subTopic, db, onClose }) => {
  const [entries, setEntries] = useState<Array<{ displayName: string; studentLabel: string | null; score: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const month = new Date().toISOString().slice(0, 7);
    const fetchRanking = async () => {
      try {
        const q = query(
          collection(db, 'rankings'),
          where('month', '==', month),
          where('subTopic', '==', subTopic),
          orderBy('score', 'desc'),
          limit(20)
        );
        const snap = await getDocs(q);
        setEntries(snap.docs.map(d => {
          const data = d.data();
          return { displayName: data.displayName, studentLabel: data.studentLabel, score: data.score };
        }));
      } catch (e) {
        console.warn('Ranking fetch failed:', e);
      }
      setLoading(false);
    };
    fetchRanking();
  }, [db, subTopic]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
      <div className="hud-panel rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-math-fade-in max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{subTopic}</h3>
            <p className="text-xs text-cyan-400">{new Date().toISOString().slice(0, 7)} 月間ランキング</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl px-2">×</button>
        </div>
        <div className="flex-grow overflow-y-auto space-y-2">
          {loading ? (
            <div className="text-center text-cyan-600 py-8 animate-pulse">読み込み中...</div>
          ) : entries.length === 0 ? (
            <div className="text-center text-cyan-700 py-8">
              <p className="text-sm">まだ記録がありません</p>
              <p className="text-xs mt-1 text-cyan-800">この単元を練習して1位を目指そう！</p>
            </div>
          ) : (
            entries.map((entry, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${
                i === 0 ? 'bg-amber-900/20 border-amber-500/30' :
                i === 1 ? 'bg-gray-700/10 border-gray-500/20' :
                i === 2 ? 'bg-amber-800/10 border-amber-700/20' :
                'bg-slate-900/30 border-cyan-500/5'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  i === 0 ? 'bg-amber-500 text-black' :
                  i === 1 ? 'bg-gray-400 text-black' :
                  i === 2 ? 'bg-amber-700 text-white' :
                  'bg-slate-800 text-cyan-400'
                }`}>{i + 1}</div>
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-white text-sm truncate">{entry.displayName}</p>
                  {entry.studentLabel && <p className="text-xs text-cyan-500">{entry.studentLabel}</p>}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold font-mono text-cyan-300">{entry.score}</p>
                  <p className="text-[10px] text-cyan-600">pts</p>
                </div>
              </div>
            ))
          )}
        </div>
        <button onClick={onClose} className="mt-4 btn-tactical w-full py-3 rounded-lg font-bold text-cyan-400">
          閉じる
        </button>
      </div>
    </div>
  );
};

const GRADE_LABELS: Record<number, string> = { 1: '中1', 2: '中2', 3: '中3' };
const GRADE_COLORS: Record<number, string> = {
  1: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  2: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  3: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
};
const GRADE_TAB_COLORS: Record<number, string> = {
  1: 'bg-emerald-600 text-white border-emerald-400',
  2: 'bg-blue-600 text-white border-blue-400',
  3: 'bg-purple-600 text-white border-purple-400',
};

// ── Master mode configs ──────────────────────────────────────────────────────
const MASTER_MODES = [
  {
    label: '中1 Master',
    grade: 1 as const,
    color: '#34D399',
    bgColor: 'rgba(52,211,153,0.1)',
    borderColor: 'rgba(52,211,153,0.35)',
  },
  {
    label: '中2 Master',
    grade: 2 as const,
    color: '#38BDF8',
    bgColor: 'rgba(56,189,248,0.1)',
    borderColor: 'rgba(56,189,248,0.35)',
  },
  {
    label: '中3 Master',
    grade: 3 as const,
    color: '#A78BFA',
    bgColor: 'rgba(167,139,250,0.1)',
    borderColor: 'rgba(167,139,250,0.35)',
  },
  {
    label: '全学年 Master',
    grade: null,
    color: '#F97316',
    bgColor: 'rgba(249,115,22,0.1)',
    borderColor: 'rgba(249,115,22,0.35)',
  },
];

type Tab = 'standard' | 'special';

const MenuScreen: React.FC<MenuScreenProps> = ({ onSelectSubTopic, onSelectSpecial, onShowRecords, onExit, db }) => {
  const [activeTab, setActiveTab] = useState<Tab>('standard');
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3 | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDef | null>(null);
  const [rankingTopic, setRankingTopic] = useState<string | null>(null);

  // Custom selection state
  const [checkedCategories, setCheckedCategories] = useState<Set<string>>(new Set());
  const [customGradeFilter, setCustomGradeFilter] = useState<1 | 2 | 3 | null>(null);

  const filteredCategories = selectedGrade
    ? ENG_CATEGORIES.filter(cat => cat.grade === selectedGrade)
    : ENG_CATEGORIES;

  const customFilteredCategories = customGradeFilter
    ? ENG_CATEGORIES.filter(cat => cat.grade === customGradeFilter)
    : ENG_CATEGORIES;

  const toggleCategory = (name: string) => {
    setCheckedCategories(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const selectAllInGrade = (grade: 1 | 2 | 3 | null) => {
    const cats = grade ? ENG_CATEGORIES.filter(c => c.grade === grade) : ENG_CATEGORIES;
    setCheckedCategories(prev => {
      const next = new Set(prev);
      cats.forEach(c => next.add(c.name));
      return next;
    });
  };

  const clearAll = () => setCheckedCategories(new Set());

  const handleMasterMode = (grade: 1 | 2 | 3 | null) => {
    const cats = grade
      ? ENG_CATEGORIES.filter(c => c.grade === grade).map(c => c.name)
      : ENG_CATEGORIES.map(c => c.name);
    const label = grade ? `中${grade} Master` : '全学年 Master';
    onSelectSpecial(cats, label);
  };

  const handleCustomStart = () => {
    if (checkedCategories.size === 0) return;
    const cats = Array.from(checkedCategories);
    onSelectSpecial(cats, `カスタム (${cats.length}分野)`);
  };

  return (
    <div className="w-full h-full flex flex-col text-white overflow-hidden">
      {rankingTopic && db && (
        <TopicRankingModal subTopic={rankingTopic} db={db} onClose={() => setRankingTopic(null)} />
      )}

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
           style={{ background: 'rgba(11,29,53,0.85)', borderBottom: '1px solid rgba(249,115,22,0.15)', backdropFilter: 'blur(12px)' }}>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#F97316' }}>
            Practice mode
          </h1>
          <p className="text-[10px] text-slate-500 font-bold tracking-wider">分野を選んで問題を解こう</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onShowRecords}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors hover:text-white"
                  style={{ color: '#38BDF8', borderColor: 'rgba(56,189,248,0.25)' }}>
            <ArchiveIcon className="w-3.5 h-3.5" /> 学習記録
          </button>
          <button onClick={onExit}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold border text-slate-400 border-slate-700 hover:text-white transition-colors">
            戻る
          </button>
        </div>
      </div>

      {/* ── Mode tabs ── */}
      <div className="flex gap-1 px-4 pt-3 pb-0 flex-shrink-0">
        {([['standard', '通常練習'], ['special', 'Special Practice']] as [Tab, string][]).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-t-xl font-black text-xs sm:text-sm transition-all border-b-2"
            style={activeTab === tab
              ? { background: 'rgba(249,115,22,0.15)', color: '#F97316', borderColor: '#F97316' }
              : { background: 'transparent', color: '#475569', borderColor: 'transparent' }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 min-h-0 overflow-hidden">

        {/* ====== Standard Practice ====== */}
        {activeTab === 'standard' && (
          <div className="w-full h-full flex flex-col p-3 sm:p-4">
            {/* Grade filter tabs */}
            <div className="flex gap-1.5 mb-3 flex-shrink-0">
              <button
                onClick={() => { setSelectedGrade(null); setSelectedCategory(null); }}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs border transition-all ${
                  selectedGrade === null ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-transparent text-cyan-600 border-cyan-800 hover:border-cyan-500 hover:text-cyan-400'
                }`}>全学年</button>
              {([1, 2, 3] as const).map(g => (
                <button key={g}
                  onClick={() => { setSelectedGrade(g); setSelectedCategory(null); }}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs border transition-all ${
                    selectedGrade === g ? GRADE_TAB_COLORS[g] : 'bg-transparent text-cyan-600 border-cyan-800 hover:border-cyan-500 hover:text-cyan-400'
                  }`}>{GRADE_LABELS[g]}</button>
              ))}
            </div>

            <div className="flex-1 min-h-0 hud-panel rounded-2xl overflow-hidden flex flex-col md:flex-row"
                 style={{ borderColor: 'rgba(56,189,248,0.1)' }}>
              {/* Left: category list */}
              <div className="w-full md:w-56 flex-shrink-0 bg-slate-950/60 border-b md:border-b-0 md:border-r border-cyan-500/10 flex md:flex-col p-3 gap-1.5 overflow-x-auto md:overflow-x-visible md:overflow-y-auto">
                <p className="text-[10px] font-bold text-cyan-600 mb-1 hidden md:block tracking-wider">分野を選択</p>
                {filteredCategories.map(cat => (
                  <button key={cat.name}
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-2 sm:p-2.5 text-left rounded-lg transition-all font-bold text-xs border whitespace-nowrap md:whitespace-normal flex-shrink-0 ${
                      selectedCategory?.name === cat.name
                        ? 'bg-orange-500/15 text-white border-orange-400/50'
                        : 'bg-transparent border-transparent text-cyan-700 hover:text-cyan-300 hover:bg-slate-900/40'
                    }`}>
                    <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded border mr-1.5 ${GRADE_COLORS[cat.grade]}`}>
                      {GRADE_LABELS[cat.grade]}
                    </span>
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Right: subtopics */}
              {selectedCategory ? (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <header className="mb-5 pb-3 border-b border-cyan-500/10 flex items-end justify-between">
                    <div>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border mb-1.5 ${GRADE_COLORS[selectedCategory.grade]}`}>
                        {GRADE_LABELS[selectedCategory.grade]}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedCategory.name}</h2>
                    </div>
                    <p className="text-[10px] text-cyan-600 hidden sm:block">
                      {selectedCategory.groups.reduce((acc, g) => acc + g.subtopics.length, 0)} 単元
                    </p>
                  </header>
                  <div className="space-y-6">
                    {selectedCategory.groups.map((group: SubCategoryGroup) => (
                      <section key={group.name}>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xs font-bold text-cyan-400 whitespace-nowrap">{group.name}</h3>
                          <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/20 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {group.subtopics.map((subTopic: string) => (
                            <div key={subTopic} className="relative group">
                              <button
                                onClick={() => onSelectSubTopic(selectedCategory.name, subTopic)}
                                className="w-full bg-slate-950/40 border border-cyan-500/10 text-cyan-100/90 p-3 rounded-xl text-sm font-bold hover:bg-orange-500/15 hover:border-orange-400/40 hover:text-white transition-all text-left pr-10 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/20 group-hover:bg-orange-400/60 transition-colors rounded-l-xl" />
                                <span className="relative z-10 block">{subTopic}</span>
                              </button>
                              {db && (
                                <button
                                  onClick={e => { e.stopPropagation(); setRankingTopic(subTopic); }}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-cyan-700 hover:text-amber-400 transition-colors z-10"
                                  title="ランキングを見る">
                                  <TrophyIcon className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-slate-600 text-sm">← 左の分野を選択してください</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====== Special Practice ====== */}
        {activeTab === 'special' && (
          <div className="w-full h-full flex flex-col lg:flex-row gap-3 p-3 sm:p-4 overflow-y-auto">

            {/* ── Master modes ── */}
            <div className="flex flex-col gap-3 lg:w-56 flex-shrink-0">
              <div className="mb-1">
                <p className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: '#F97316' }}>
                  Master Mode
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">ランダム5問で腕試し</p>
              </div>
              {MASTER_MODES.map(mode => (
                <button
                  key={mode.label}
                  onClick={() => handleMasterMode(mode.grade)}
                  className="w-full rounded-xl p-3 text-left flex items-center gap-3 group transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
                  style={{ background: mode.bgColor, border: `1.5px solid ${mode.borderColor}` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: `${mode.color}20`, border: `1px solid ${mode.color}40` }}>
                    <span className="text-base font-black"
                          style={{ fontFamily: "'Bebas Neue', sans-serif", color: mode.color }}>
                      {mode.grade ?? 'ALL'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-white">{mode.label}</p>
                    <p className="text-[10px] text-slate-500">
                      {mode.grade
                        ? `中${mode.grade}の全カテゴリからランダム5問`
                        : '全学年からランダム5問'}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            {/* ── Custom selection ── */}
            <div className="flex-1 min-w-0 flex flex-col hud-panel rounded-2xl overflow-hidden"
                 style={{ borderColor: 'rgba(249,115,22,0.15)' }}>
              {/* Custom header */}
              <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
                   style={{ borderColor: 'rgba(249,115,22,0.12)', background: 'rgba(249,115,22,0.05)' }}>
                <div>
                  <p className="text-sm font-black text-white">カスタム選択</p>
                  <p className="text-[10px] text-slate-500">
                    チェックした分野の問題をランダム5問出題
                    {checkedCategories.size > 0 && (
                      <span className="ml-2 font-bold" style={{ color: '#F97316' }}>
                        {checkedCategories.size}分野選択中
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Grade filter for custom */}
                  <div className="flex gap-1">
                    {([null, 1, 2, 3] as const).map(g => (
                      <button key={g ?? 'all'}
                        onClick={() => setCustomGradeFilter(g)}
                        className="px-2 py-1 rounded text-[10px] font-bold border transition-all"
                        style={customGradeFilter === g
                          ? { background: 'rgba(249,115,22,0.2)', color: '#F97316', borderColor: 'rgba(249,115,22,0.5)' }
                          : { background: 'transparent', color: '#475569', borderColor: 'rgba(71,85,105,0.4)' }}>
                        {g == null ? '全' : `中${g}`}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => selectAllInGrade(customGradeFilter)}
                          className="px-2 py-1 rounded text-[10px] font-bold border transition-colors"
                          style={{ color: '#38BDF8', borderColor: 'rgba(56,189,248,0.3)' }}>
                    全選択
                  </button>
                  <button onClick={clearAll}
                          className="px-2 py-1 rounded text-[10px] font-bold border transition-colors text-slate-500 border-slate-700 hover:text-white">
                    リセット
                  </button>
                </div>
              </div>

              {/* Category checkboxes */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
                  {customFilteredCategories.map(cat => {
                    const checked = checkedCategories.has(cat.name);
                    return (
                      <label key={cat.name}
                             className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all group"
                             style={{
                               background: checked ? 'rgba(249,115,22,0.1)' : 'rgba(255,255,255,0.02)',
                               border: `1px solid ${checked ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.06)'}`,
                             }}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCategory(cat.name)}
                          className="sr-only"
                        />
                        {/* Custom checkbox */}
                        <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                             style={{
                               background: checked ? '#F97316' : 'rgba(255,255,255,0.06)',
                               border: `1.5px solid ${checked ? '#F97316' : 'rgba(71,85,105,0.6)'}`,
                             }}>
                          {checked && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`inline-block text-[9px] font-bold px-1 py-0.5 rounded border mr-1 ${GRADE_COLORS[cat.grade]}`}>
                            {GRADE_LABELS[cat.grade]}
                          </span>
                          <span className={`text-xs font-bold ${checked ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                            {cat.name}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Start button */}
              <div className="flex-shrink-0 p-3 border-t" style={{ borderColor: 'rgba(249,115,22,0.12)' }}>
                <button
                  onClick={handleCustomStart}
                  disabled={checkedCategories.size === 0}
                  className="w-full py-3 rounded-xl font-black text-sm tracking-wide transition-all"
                  style={checkedCategories.size > 0
                    ? { background: 'linear-gradient(135deg,#F97316,#EA580C)', color: '#fff', boxShadow: '0 4px 16px rgba(249,115,22,0.4)' }
                    : { background: 'rgba(255,255,255,0.04)', color: '#475569', cursor: 'not-allowed' }}>
                  {checkedCategories.size > 0
                    ? `選択した ${checkedCategories.size} 分野で開始 →`
                    : '分野にチェックを入れてください'}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default MenuScreen;
