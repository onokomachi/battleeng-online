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
    <div className="w-full h-full flex items-center justify-center p-4 overflow-y-auto">
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
    <div className="w-full h-full flex items-center justify-center p-3 sm:p-4 lg:p-8 overflow-y-auto">
      <div className="w-full max-w-md animate-slide-up">
        {/* Game Title */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs text-cyan-500 tracking-[0.5em] uppercase font-bold mb-2 opacity-80">
            ENGLISH BATTLE ONLINE
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-hologram tracking-widest leading-none">
            BATTLE<br />ENG
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-3 font-mono tracking-widest uppercase">
            English Grammar Battle System
          </p>
        </div>

        {currentUser ? (
          /* Logged-in state */
          <div className="space-y-4">
            <div className="hud-panel rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center gap-4">
                {currentUser.photoURL && (
                  <img src={currentUser.photoURL} alt="" className="w-12 h-12 rounded-full flex-shrink-0"
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
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-amber-400 font-bold">LV.{playerLevel}</p>
                  <p className="text-xs text-slate-400">{mathPoints.toLocaleString()} MP</p>
                </div>
              </div>
            </div>

            <button
              onClick={onLogin}
              className="btn-tactical w-full py-4 rounded-xl text-lg font-black tracking-[0.3em] uppercase"
            >
              PLAY
            </button>

            {onOpenGameMaster && (
              <button
                onClick={onOpenGameMaster}
                className="w-full py-2 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors border border-slate-800 hover:border-slate-600"
              >
                GAMEMASTER PANEL
              </button>
            )}

            <button
              onClick={onLogout}
              className="w-full py-2 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-400 transition-colors"
            >
              ログアウト
            </button>
          </div>
        ) : (
          /* Not logged-in state */
          <div className="space-y-4">
            <button
              onClick={onLogin}
              className="btn-tactical w-full py-5 rounded-xl text-lg font-black tracking-[0.3em] uppercase flex items-center justify-center gap-3"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Googleでログイン
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-xs text-slate-600 font-mono">OR</span>
              <div className="flex-1 h-px bg-slate-700" />
            </div>

            <button
              onClick={onGuestPlay}
              className="w-full py-3 rounded-xl text-sm font-bold text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-200 transition-all"
            >
              ゲストとしてプレイ
            </button>

            <p className="text-[10px] text-slate-600 text-center leading-relaxed">
              ゲストモードでは進捗が保存されません
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
