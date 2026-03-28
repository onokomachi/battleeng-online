/**
 * NewYearPrompt.tsx — 新年度プロフィール確認モーダル
 *
 * 表示条件: studentProfile.schoolYear < getCurrentSchoolYear()
 * かつ前回スキップから3日以上経過している場合
 *
 * 動作:
 *   - grade <= 3 → 新クラス登録フォームを表示
 *   - grade > 3  → 卒業生として確認（ランキング除外、アプリは継続利用可）
 *   - 「後で」   → localStorage に timestamp を保存、3日後に再表示
 */
import React, { useState } from 'react';
import type { StudentProfile } from '../types';
import { ISESAKI_SCHOOLS } from '../constants';

const CLASSES = Array.from({ length: 10 }, (_, i) => i + 1);
const NUMBERS = Array.from({ length: 45 }, (_, i) => i + 1);

interface NewYearPromptProps {
  profile: StudentProfile;
  currentSchoolYear: number;
  onConfirm: (updated: StudentProfile) => void;
  onSkip: () => void;
}

const NewYearPrompt: React.FC<NewYearPromptProps> = ({
  profile,
  currentSchoolYear,
  onConfirm,
  onSkip,
}) => {
  const yearDiff = currentSchoolYear - (profile.schoolYear ?? 2025);
  const newGrade = profile.grade + yearDiff;
  const isGraduated = newGrade > 3;

  const [cls, setCls] = useState(1);
  const [num, setNum] = useState(1);

  const schoolShort = ISESAKI_SCHOOLS.find(s => s.name === profile.school)?.short ?? profile.school;

  const handleConfirm = () => {
    if (isGraduated) {
      onConfirm({
        ...profile,
        grade: 4,
        schoolYear: currentSchoolYear,
        displayLabel: `${schoolShort} 卒業生`,
      });
    } else {
      onConfirm({
        ...profile,
        grade: newGrade,
        classNum: cls,
        number: num,
        schoolYear: currentSchoolYear,
        displayLabel: `${schoolShort} ${newGrade}年${cls}組${num}番`,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-math-fade-in">
      <div className="w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
           style={{
             background: 'rgba(4,11,22,0.98)',
             border: '1px solid rgba(34,211,238,0.18)',
             boxShadow: '0 0 100px rgba(34,211,238,0.07), 0 30px 60px rgba(0,0,0,0.7)',
           }}>
        {/* Top accent bar */}
        <div className="h-[2px]"
             style={{ background: 'linear-gradient(90deg, #38BDF8, #22d3ee 40%, #F97316)' }} />

        <div className="p-6">
          {isGraduated ? (
            /* ── 卒業生パス ── */
            <>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🎓</div>
                <h2 className="text-xl font-black text-white mb-2">
                  中学校卒業おめでとう！
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {currentSchoolYear}年度より
                  <span className="text-amber-400 font-bold"> ランキングから除外 </span>
                  されますが、<br />引き続き練習・バトルは楽しめます！
                </p>
              </div>
              <div className="mb-4 p-3 rounded-xl text-center"
                   style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.08)' }}>
                <p className="text-[9px] text-slate-500 font-mono tracking-wider mb-1">PLAYER</p>
                <p className="text-sm font-black text-white">{profile.school}</p>
                <p className="text-xs text-slate-400">（卒業生として登録）</p>
              </div>
              <button
                onClick={handleConfirm}
                className="btn-tactical w-full py-3 rounded-xl font-black tracking-[0.2em]"
              >
                了解！
              </button>
            </>
          ) : (
            /* ── 新クラス登録パス ── */
            <>
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-px" style={{ background: 'rgba(34,211,238,0.5)' }} />
                  <span className="text-[8px] font-mono tracking-[0.45em] uppercase"
                        style={{ color: 'rgba(34,211,238,0.6)' }}>NEW YEAR UPDATE</span>
                </div>
                <h2 className="text-lg font-black text-white">
                  {currentSchoolYear}年度が始まりました！
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">新しい組・番号を登録してください</p>
              </div>

              {/* School & Grade（自動更新・変更不可） */}
              <div className="mb-4 p-3 rounded-xl flex justify-between items-center"
                   style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.08)' }}>
                <div>
                  <p className="text-[8px] text-slate-500 font-mono tracking-wider">SCHOOL</p>
                  <p className="text-sm font-black text-white">{profile.school}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-slate-500 font-mono tracking-wider">GRADE</p>
                  <p className="text-3xl font-black text-cyan-400 leading-none"
                     style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {newGrade}年
                  </p>
                </div>
              </div>

              {/* 組 */}
              <div className="mb-4">
                <label className="block text-[10px] text-sky-400 tracking-[0.3em] uppercase font-bold mb-2">
                  組 / CLASS
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {CLASSES.map(c => (
                    <button
                      key={c}
                      onClick={() => setCls(c)}
                      className={`py-2.5 rounded-lg text-sm font-bold transition-all duration-150 ${
                        cls === c
                          ? 'btn-tactical scale-105'
                          : 'bg-slate-800/60 text-slate-400 border border-slate-700 hover:border-sky-500/50 hover:text-white'
                      }`}
                    >
                      {c}組
                    </button>
                  ))}
                </div>
              </div>

              {/* 出席番号 */}
              <div className="mb-4">
                <label className="block text-[10px] text-sky-400 tracking-[0.3em] uppercase font-bold mb-2">
                  出席番号 / NUMBER
                </label>
                <div className="grid grid-cols-9 gap-1 max-h-24 overflow-y-auto pr-0.5">
                  {NUMBERS.map(n => (
                    <button
                      key={n}
                      onClick={() => setNum(n)}
                      className={`py-1.5 rounded text-xs font-bold transition-all duration-100 ${
                        num === n
                          ? 'btn-tactical'
                          : 'bg-slate-800/60 text-slate-500 border border-slate-700 hover:border-sky-500/50'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* プレビュー */}
              <div className="mb-4 text-center py-2 rounded-lg"
                   style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.12)' }}>
                <p className="text-sm font-black text-cyan-300">
                  {schoolShort} {newGrade}年{cls}組{num}番
                </p>
              </div>

              {/* ボタン */}
              <div className="flex gap-2">
                <button
                  onClick={onSkip}
                  className="flex-1 py-3 rounded-xl text-xs font-bold transition-colors"
                  style={{ color: 'rgba(100,116,139,0.7)', border: '1px solid rgba(30,41,59,0.8)' }}
                >
                  後で
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 btn-tactical py-3 rounded-xl font-black text-sm tracking-[0.2em]"
                >
                  更新する
                </button>
              </div>

              <p className="text-[9px] text-center mt-3" style={{ color: 'rgba(51,65,85,0.8)' }}>
                更新するまでランキングから除外されます
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewYearPrompt;
