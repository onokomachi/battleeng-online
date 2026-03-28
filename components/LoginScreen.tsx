import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import type { StudentProfile } from '../types';
import { ISESAKI_SCHOOLS } from '../constants';

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
  const [school, setSchool] = useState('第三中学校');
  const [grade, setGrade] = useState(2);
  const [cls, setCls] = useState(1);
  const [num, setNum] = useState(1);

  const handleSubmit = () => {
    const schoolDef = ISESAKI_SCHOOLS.find(s => s.name === school);
    const short = schoolDef?.short ?? school;
    onSubmit({
      school,
      grade,
      classNum: cls,
      number: num,
      displayLabel: `${short} ${grade}年${cls}組${num}番`,
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-slide-up py-4">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs text-sky-400 tracking-[0.4em] uppercase font-bold mb-2">
            STUDENT REGISTRATION
          </p>
          <h2 className="text-5xl font-black text-hologram">STUDENT ID</h2>
          <p className="text-sm text-slate-400 mt-2">学校・学年・組・番号を選択してください</p>
        </div>

        <div className="hud-panel rounded-2xl p-6 space-y-5 border border-sky-500/20">

          {/* 学校 */}
          <div>
            <label className="block text-[11px] text-sky-400 tracking-[0.3em] uppercase font-bold mb-3">
              学校 / SCHOOL
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ISESAKI_SCHOOLS.map(s => (
                <button
                  key={s.name}
                  onClick={() => setSchool(s.name)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-bold text-left transition-all duration-200 ${
                    school === s.name
                      ? 'btn-tactical scale-[1.02]'
                      : 'bg-slate-800/60 text-slate-400 border border-slate-700 hover:border-sky-500/50 hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

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
              <p className="text-lg font-black" style={{ color: '#38BDF8' }}>
                {ISESAKI_SCHOOLS.find(s => s.name === school)?.short ?? school}
              </p>
              <p className="text-xl font-black" style={{ color: '#38BDF8' }}>
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
    <div className="w-full h-full overflow-y-auto">
      <div className="min-h-full relative flex flex-col"
           style={{ background: 'linear-gradient(135deg, #020b16 0%, #040e1c 50%, #020b16 100%)' }}>

        {/* ── Background decoration ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }} />
          {/* Cyan radial glow top-left */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full"
               style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)' }} />
          {/* Orange radial glow bottom-right */}
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full"
               style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />
          {/* Horizontal mid-scan */}
          <div className="absolute top-1/2 left-0 right-0 h-px"
               style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.08) 50%, transparent 100%)' }} />
          {/* Corner brackets */}
          <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: 'rgba(34,211,238,0.25)' }} />
          <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: 'rgba(249,115,22,0.25)' }} />
          <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: 'rgba(249,115,22,0.25)' }} />
          <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: 'rgba(34,211,238,0.25)' }} />
        </div>

        {/* ── Main layout ── */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 px-6 py-14 relative z-10">

          {/* === Title area === */}
          <div className="flex flex-col items-center lg:items-start animate-slide-up">
            {/* System label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px" style={{ background: 'rgba(34,211,238,0.5)' }} />
              <span className="text-[8px] font-bold tracking-[0.55em] uppercase font-mono"
                    style={{ color: 'rgba(34,211,238,0.5)' }}>
                ISESAKI // ENG BATTLE SYS
              </span>
              <div className="w-5 h-px" style={{ background: 'rgba(34,211,238,0.5)' }} />
            </div>

            {/* Giant title */}
            <h1 className="font-black leading-none text-center lg:text-left"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              <div className="leading-none tracking-[0.04em] text-white"
                   style={{ fontSize: 'clamp(4.5rem, 16vw, 8.5rem)' }}>
                BATTLE
              </div>
              <div className="leading-none tracking-[0.04em]"
                   style={{
                     fontSize: 'clamp(4.5rem, 16vw, 8.5rem)',
                     background: 'linear-gradient(100deg, #38BDF8 0%, #22d3ee 35%, #F97316 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text',
                   }}>
                ENG
              </div>
            </h1>

            {/* Accent line */}
            <div className="mt-3 h-[2px] w-full max-w-[320px]"
                 style={{ background: 'linear-gradient(90deg, #38BDF8, #F97316, transparent)' }} />

            {/* Subtitle */}
            <p className="mt-3 text-[9px] font-mono tracking-[0.35em] uppercase text-center lg:text-left"
               style={{ color: 'rgba(100,116,139,0.8)' }}>
              英語文法バトル学習システム
            </p>

            {/* Stats (desktop) */}
            <div className="mt-8 hidden lg:flex gap-8">
              {[['12', '対応学校'], ['200+', 'カード'], ['3', 'モード']].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="font-black leading-none"
                     style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', color: '#38BDF8' }}>
                    {num}
                  </p>
                  <p className="text-[8px] font-bold tracking-[0.3em] mt-1"
                     style={{ color: 'rgba(100,116,139,0.7)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* === Auth card === */}
          <div className="w-full max-w-xs animate-slide-up" style={{ animationDelay: '80ms' }}>
            <div className="relative rounded-2xl overflow-hidden"
                 style={{
                   background: 'rgba(4,11,22,0.97)',
                   border: '1px solid rgba(34,211,238,0.1)',
                   boxShadow: '0 0 100px rgba(34,211,238,0.04), 0 30px 60px rgba(0,0,0,0.6)',
                 }}>
              {/* Top accent bar */}
              <div className="h-[2px] w-full"
                   style={{ background: 'linear-gradient(90deg, #38BDF8, #22d3ee 40%, #F97316)' }} />

              <div className="p-7">
                {currentUser ? (
                  /* Logged-in state */
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4"
                         style={{ borderBottom: '1px solid rgba(30,41,59,0.8)' }}>
                      {currentUser.photoURL && (
                        <img src={currentUser.photoURL} alt=""
                             className="w-10 h-10 rounded-full flex-shrink-0"
                             style={{ border: '2px solid rgba(34,211,238,0.35)' }} />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-bold tracking-[0.35em] uppercase font-mono"
                           style={{ color: '#38BDF8' }}>PLAYER ID</p>
                        <p className="text-sm font-black text-white truncate leading-tight">
                          {currentUser.displayName}
                        </p>
                        {studentProfile && (
                          <p className="text-[10px] mt-0.5" style={{ color: '#F97316' }}>
                            {studentProfile.displayLabel}
                            <button onClick={() => setShowProfileSetup(true)}
                                    className="ml-2 transition-colors hover:text-sky-400"
                                    style={{ color: 'rgba(100,116,139,0.6)', fontSize: '9px' }}>
                              [編集]
                            </button>
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#FBBF24', fontSize: '1.1rem' }}>
                          LV.{playerLevel}
                        </p>
                        <p className="text-[9px] font-mono" style={{ color: 'rgba(100,116,139,0.7)' }}>
                          {mathPoints.toLocaleString()} <span style={{ opacity: 0.5 }}>EP</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={onGuestPlay}
                      className="w-full py-4 rounded-xl font-black tracking-[0.4em] uppercase text-sm relative overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, rgba(12,74,110,0.8), rgba(3,105,161,0.6))',
                        border: '1px solid rgba(56,189,248,0.35)',
                        color: '#e0f2fe',
                      }}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                           style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.15), transparent)' }} />
                      <span className="relative">PLAY NOW</span>
                    </button>

                    {onOpenGameMaster && (
                      <button
                        onClick={onOpenGameMaster}
                        className="w-full py-2 rounded-lg text-[10px] font-bold transition-colors"
                        style={{ color: 'rgba(100,116,139,0.6)', border: '1px solid rgba(30,41,59,0.8)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.8)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(100,116,139,0.6)')}
                      >
                        GAMEMASTER PANEL
                      </button>
                    )}

                    <button
                      onClick={onLogout}
                      className="w-full py-2 text-[10px] font-bold transition-colors"
                      style={{ color: 'rgba(71,85,105,0.7)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(100,116,139,0.8)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(71,85,105,0.7)')}
                    >
                      ログアウト
                    </button>
                  </div>
                ) : (
                  /* Not logged-in state */
                  <div className="space-y-4">
                    <p className="text-[8px] tracking-[0.45em] uppercase font-mono text-center mb-5"
                       style={{ color: 'rgba(71,85,105,0.8)' }}>
                      AUTHENTICATION REQUIRED
                    </p>

                    <button
                      onClick={onLogin}
                      className="w-full py-4 rounded-xl font-black text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-3 relative overflow-hidden group transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34,211,238,0.05), rgba(249,115,22,0.05))',
                        border: '1px solid rgba(34,211,238,0.18)',
                        color: '#e2e8f0',
                      }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                           style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(249,115,22,0.08))' }} />
                      <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 relative z-10" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="relative z-10">Googleでログイン</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px"
                           style={{ background: 'linear-gradient(90deg, transparent, rgba(51,65,85,0.5))' }} />
                      <span className="text-[9px] font-mono tracking-[0.3em]"
                            style={{ color: 'rgba(51,65,85,0.8)' }}>OR</span>
                      <div className="flex-1 h-px"
                           style={{ background: 'linear-gradient(90deg, rgba(51,65,85,0.5), transparent)' }} />
                    </div>

                    <button
                      onClick={onGuestPlay}
                      className="w-full py-3 rounded-xl text-xs font-bold transition-all"
                      style={{ color: 'rgba(100,116,139,0.6)', border: '1px solid rgba(30,41,59,0.8)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'rgba(148,163,184,0.9)';
                        e.currentTarget.style.borderColor = 'rgba(51,65,85,0.8)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(100,116,139,0.6)';
                        e.currentTarget.style.borderColor = 'rgba(30,41,59,0.8)';
                      }}
                    >
                      ゲストとしてプレイ
                    </button>

                    <p className="text-[9px] text-center"
                       style={{ color: 'rgba(51,65,85,0.8)' }}>
                      ゲストモードでは進捗が保存されません
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
