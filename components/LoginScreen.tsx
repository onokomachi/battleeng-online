import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import type { StudentProfile } from '../types';

interface LoginScreenProps {
  currentUser: User | null;
  onLogin: () => void;
  onGuestPlay: () => void;
  onLogout: () => void;
  onOpenGameMaster?: () => void;
  mathPoints: number;
  playerLevel: number;
  studentProfile: StudentProfile | null;
  onStudentProfileSet: (profile: StudentProfile) => void;
}

const GRADES = [1, 2, 3];
const CLASSES = Array.from({ length: 10 }, (_, i) => i + 1);
const NUMBERS = Array.from({ length: 45 }, (_, i) => i + 1);

// ── Student Profile Setup ──────────────────────────────────────────────────
const ProfileSetup: React.FC<{
  onSubmit: (p: StudentProfile) => void;
}> = ({ onSubmit }) => {
  const [grade, setGrade] = useState(2);
  const [cls, setCls] = useState(1);
  const [num, setNum] = useState(1);

  const handleSubmit = () => {
    onSubmit({
      grade,
      classNum: cls,
      number: num,
      displayLabel: `${grade}年${cls}組${num}番`,
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs text-sky-400 tracking-[0.4em] uppercase font-bold mb-2">
            STUDENT REGISTRATION
          </p>
          <h2 className="text-5xl font-black text-hologram">STUDENT ID</h2>
          <p className="text-sm text-slate-400 mt-2">学年・組・番号を選択してください</p>
        </div>

        <div className="hud-panel rounded-2xl p-7 space-y-6 border border-sky-500/20">
          {/* 学年 */}
          <div>
            <label className="block text-[11px] text-sky-400 tracking-[0.3em] uppercase font-bold mb-3">
              学年 / GRADE
            </label>
            <div className="grid grid-cols-3 gap-3">
              {GRADES.map(g => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`py-4 rounded-xl text-xl font-black transition-all duration-200 ${
                    grade === g
                      ? 'btn-tactical scale-105'
                      : 'bg-slate-800/60 text-slate-400 border border-slate-700 hover:border-sky-500/50 hover:text-white'
                  }`}
                >
                  {g}年
                </button>
              ))}
            </div>
          </div>

          {/* 組 */}
          <div>
            <label className="block text-[11px] text-sky-400 tracking-[0.3em] uppercase font-bold mb-3">
              組 / CLASS
            </label>
            <div className="grid grid-cols-5 gap-2">
              {CLASSES.map(c => (
                <button
                  key={c}
                  onClick={() => setCls(c)}
                  className={`py-3 rounded-lg text-base font-bold transition-all duration-200 ${
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
          <div>
            <label className="block text-[11px] text-sky-400 tracking-[0.3em] uppercase font-bold mb-3">
              出席番号 / NUMBER
            </label>
            <div className="grid grid-cols-9 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {NUMBERS.map(n => (
                <button
                  key={n}
                  onClick={() => setNum(n)}
                  className={`py-2 rounded text-sm font-bold transition-all duration-150 ${
                    num === n
                      ? 'btn-tactical'
                      : 'bg-slate-800/60 text-slate-500 border border-slate-700 hover:border-sky-500/50 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* 確定 */}
          <div className="pt-3 border-t border-slate-700/60">
            <div className="text-center mb-4">
              <p className="text-[11px] text-slate-500 mb-1">選択中</p>
              <p className="text-2xl font-black" style={{ color: '#38BDF8' }}>
                {grade}年{cls}組{num}番
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="btn-tactical w-full py-4 rounded-xl text-lg font-black tracking-[0.2em]"
            >
              決定 / CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Login Screen ──────────────────────────────────────────────────────
const LoginScreen: React.FC<LoginScreenProps> = ({
  currentUser, onLogin, onGuestPlay, onLogout, onOpenGameMaster,
  mathPoints, playerLevel, studentProfile, onStudentProfileSet,
}) => {
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    if (currentUser && !studentProfile) setShowProfileSetup(true);
  }, [currentUser, studentProfile]);

  const handleProfileSubmit = (profile: StudentProfile) => {
    onStudentProfileSet(profile);
    setShowProfileSetup(false);
  };

  if (currentUser && (showProfileSetup || !studentProfile)) {
    return <ProfileSetup onSubmit={handleProfileSubmit} />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
      {/* === iPad landscape: side-by-side === */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16 animate-slide-up">

        {/* ── LEFT: Branding ── */}
        <div className="flex-1 text-center lg:text-left">
          {/* Eyebrow */}
          <p className="text-xs text-sky-400 tracking-[0.5em] uppercase font-bold mb-4">
            English Battle Platform
          </p>

          {/* Title */}
          <h1 className="text-[clamp(5rem,14vw,9rem)] leading-none font-black text-hologram mb-2">
            BATTLE
          </h1>
          <div className="flex items-center gap-3 lg:justify-start justify-center mb-6">
            <div className="h-1 w-12 rounded-full" style={{ background: '#F97316' }} />
            <h2 className="text-[clamp(3rem,8vw,5.5rem)] leading-none font-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#F97316' }}>
              -ENG
            </h2>
            <div className="h-1 w-12 rounded-full" style={{ background: '#F97316' }} />
          </div>

          {/* Tagline */}
          <p className="text-base text-slate-300 font-bold tracking-wide mb-2">
            英語でバトル。実力を証明せよ。
          </p>
          <p className="text-sm text-slate-500 tracking-wider">
            全国のプレイヤーと対戦・ランキング競争
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
            {['バトルモード', '練習モード', 'クラス対抗', 'ランキング'].map(f => (
              <span key={f}
                className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{ borderColor: 'rgba(56,189,248,0.3)', color: '#38BDF8', background: 'rgba(14,165,233,0.08)' }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Login Panel ── */}
        <div className="w-full lg:w-80 xl:w-96">
          <div className="hud-panel rounded-2xl p-7 shadow-2xl"
               style={{ boxShadow: '0 0 40px rgba(14,165,233,0.15), 0 8px 32px rgba(0,0,0,0.5)' }}>

            {currentUser ? (
              /* === Logged in === */
              <div className="flex flex-col gap-5">
                {/* User info card */}
                <div className="flex items-center gap-3 p-3 rounded-xl"
                     style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)' }}>
                  {currentUser.photoURL && (
                    <img src={currentUser.photoURL} alt=""
                         className="w-14 h-14 rounded-full"
                         style={{ border: '2px solid #0EA5E9', boxShadow: '0 0 12px rgba(14,165,233,0.4)' }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-sky-400 font-bold tracking-wider mb-0.5">PLAYER</p>
                    <p className="text-base font-black text-white truncate">{currentUser.displayName}</p>
                    {studentProfile && (
                      <p className="text-xs mt-0.5" style={{ color: '#F97316' }}>
                        {studentProfile.displayLabel}
                        <button onClick={() => setShowProfileSetup(true)}
                                className="ml-2 text-slate-500 hover:text-sky-400 transition-colors">
                          [変更]
                        </button>
                      </p>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="stat-badge text-center">
                    <p className="text-[10px] text-sky-400 font-bold tracking-wider">LEVEL</p>
                    <p className="text-2xl font-black text-white">{playerLevel}</p>
                  </div>
                  <div className="stat-badge text-center">
                    <p className="text-[10px] font-bold tracking-wider" style={{ color: '#F59E0B' }}>POINTS</p>
                    <p className="text-2xl font-black" style={{ color: '#F59E0B' }}>{mathPoints.toLocaleString()}</p>
                  </div>
                </div>

                {/* Start button */}
                <button onClick={onGuestPlay}
                        className="btn-orange w-full py-4 rounded-xl text-lg font-black tracking-[0.15em]">
                  START GAME
                </button>

                {/* Secondary actions */}
                <div className="flex gap-3">
                  {onOpenGameMaster && (
                    <button onClick={onOpenGameMaster}
                            className="flex-1 py-2 rounded-lg text-sm font-bold text-red-400 border border-red-800/50 hover:bg-red-900/20 transition-colors">
                      管理者
                    </button>
                  )}
                  <button onClick={onLogout}
                          className="flex-1 py-2 rounded-lg text-sm font-bold text-slate-400 border border-slate-700 hover:bg-slate-800/60 transition-colors">
                    ログアウト
                  </button>
                </div>
              </div>
            ) : (
              /* === Not logged in === */
              <div className="flex flex-col gap-5">
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-300 mb-1">
                    ログインしてバトルに参加しよう
                  </p>
                  <p className="text-xs text-slate-500">ランキング・対戦・クラス対抗に参加できます</p>
                </div>

                {/* Google login */}
                <button onClick={onLogin}
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-black py-3.5 px-6 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 shadow-lg font-sans text-base">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Googleでログイン
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-slate-700" />
                  <span className="text-xs text-slate-500">または</span>
                  <div className="flex-1 h-px bg-slate-700" />
                </div>

                <button onClick={onGuestPlay}
                        className="btn-tactical w-full py-3 rounded-xl text-sm font-bold tracking-[0.2em]">
                  ゲストプレイ
                </button>
                <p className="text-[10px] text-slate-600 text-center -mt-2">
                  ※ ゲストはデータが保存されません
                </p>
              </div>
            )}
          </div>

          {/* Bottom ping */}
          <div className="flex justify-center mt-5">
            <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: '#0EA5E9' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
