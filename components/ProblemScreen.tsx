
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Problem, SessionStats } from '../types';
import { getShuffledProblemSet } from '../services/problemService';
import { ENG_CATEGORIES } from '../constants';
import DrawingCanvas from './DrawingCanvas';
import ProblemControls from './ProblemControls';
import ProblemResultDisplay from './ProblemResultDisplay';
import { BackIcon, PencilIcon, HomeIcon } from './Icons';

interface ProblemScreenProps {
  category: string;
  subTopic: string;
  initialProblems?: Problem[]; // master/custom mode で外から渡す
  onBack: (stats: SessionStats) => void;
  onHome: () => void;
}

const HintModal: React.FC<{ hint: string | string[]; onClose: () => void }> = ({ hint, onClose }) => (
  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
    <div className="hud-panel rounded-2xl p-8 max-w-xl w-full shadow-2xl border-cyan-400/40 animate-math-fade-in relative">
      <div className="corner-accent lt border-cyan-400"></div>
      <div className="corner-accent rb border-cyan-400"></div>
      <h3 className="text-cyan-400 text-2xl font-bold mb-4 flex items-center gap-3">
        💡 ヒント
      </h3>
      <div className="text-white/90 text-lg space-y-3 leading-relaxed border-l-2 border-cyan-500/30 pl-4">
        {Array.isArray(hint) ? hint.map((h, i) => <p key={i}>{h}</p>) : <p>{hint}</p>}
      </div>
      <button
        onClick={onClose}
        className="mt-8 w-full btn-tactical py-3 rounded-lg font-bold text-cyan-400 border-cyan-400/40 hover:bg-cyan-400/20 text-lg"
      >
        閉じる
      </button>
    </div>
  </div>
);

/**
 * スコアに基づくMP報酬計算
 * エビデンス: 可変比率報酬スケジュール (Ferster & Skinner, 1957)
 * - Sランク: スコア×3 MP
 * - Aランク: スコア×2 MP
 * - Bランク: スコア×1.5 MP
 * - C/Dランク: スコア×1 MP
 */
const calcMpReward = (score: number, rank: string): number => {
  const multiplier = rank === 'S' ? 3 : rank === 'A' ? 2 : rank === 'B' ? 1.5 : 1;
  return Math.floor(score * multiplier);
};

const PracticeSummary: React.FC<{ stats: SessionStats, subTopic: string, elapsedTime: number, onBack: (mpReward: number) => void }> = ({ stats, subTopic, elapsedTime, onBack }) => {
    const accuracy = stats.problemCount > 0 ? (stats.correct / stats.problemCount) * 100 : 0;

    // ランク計算: 正答率 + 速度ボーナス
    let rank = 'D';
    if (accuracy === 100) rank = 'A';
    else if (accuracy >= 75) rank = 'B';
    else if (accuracy >= 50) rank = 'C';

    if (rank === 'A') {
        const totalPoints = stats.totalScore;
        const maxPossiblePoints = stats.problemCount * 25;
        if (totalPoints > maxPossiblePoints * 0.8) rank = 'S';
    }

    const mpReward = calcMpReward(stats.totalScore, rank);
    const elapsedMin = Math.floor(elapsedTime / 60);
    const elapsedSec = elapsedTime % 60;

    return (
        <div className="flex flex-col items-center animate-level-up-reveal w-full max-w-xl mx-auto">
             <div className="text-center mb-4 sm:mb-6">
                <p className="text-cyan-400 font-bold tracking-[0.3em] text-xs sm:text-sm mb-1">セッション完了</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wide">結果発表</h2>
             </div>

             <div className="hud-panel w-full rounded-2xl p-5 sm:p-8 flex flex-col items-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full"></div>

                <div className="text-5xl sm:text-6xl font-black mb-2 sm:mb-3 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                    <span className={rank === 'S' ? 'text-amber-400' : rank === 'A' ? 'text-cyan-400' : rank === 'B' ? 'text-blue-400' : 'text-slate-400'}>{rank}</span>
                    <span className="text-xs sm:text-sm text-white/50 block text-center font-bold mt-1">ランク</span>
                </div>

                <p className="text-cyan-300/70 text-xs sm:text-sm mb-4 sm:mb-6 text-center">
                  {rank === 'S' ? '素晴らしい！完璧な理解力です！' :
                   rank === 'A' ? 'よくできました！この調子で頑張ろう！' :
                   rank === 'B' ? 'いい感じ！もう少し練習すればAランクも近い！' :
                   rank === 'C' ? '基礎は掴めています。繰り返し練習で伸びます！' :
                   '間違いは学びのチャンス。もう一度挑戦してみよう！'}
                </p>

                <div className="grid grid-cols-3 gap-4 w-full mb-4 sm:mb-6 border-t border-cyan-500/10 pt-4 sm:pt-6">
                    <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-cyan-400 font-bold mb-1">正解数</p>
                        <p className="text-lg sm:text-xl text-white font-bold font-mono">{stats.correct} <span className="text-xs text-cyan-600">/ {stats.problemCount}</span></p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-cyan-400 font-bold mb-1">所要時間</p>
                        <p className="text-lg sm:text-xl text-white font-bold font-mono">{elapsedMin}:{elapsedSec.toString().padStart(2, '0')}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-cyan-400 font-bold mb-1">スコア</p>
                        <p className="text-lg sm:text-xl text-cyan-300 font-bold font-mono">{stats.totalScore}</p>
                    </div>
                </div>

                <div className="w-full bg-amber-900/20 border border-amber-500/30 rounded-xl p-3 mb-4 sm:mb-6 text-center">
                    <p className="text-[10px] sm:text-xs text-amber-400 font-bold mb-0.5">獲得ポイント（{rank}ランクボーナス ×{rank === 'S' ? 3 : rank === 'A' ? 2 : rank === 'B' ? 1.5 : 1}）</p>
                    <p className="text-2xl sm:text-3xl text-amber-400 font-bold font-mono">+{mpReward} <span className="text-sm text-amber-600">EP</span></p>
                </div>

                <button onClick={() => onBack(mpReward)} className="btn-tactical w-full py-3 rounded-xl font-bold text-base sm:text-lg tracking-wide text-cyan-400 border-cyan-400/40">
                    戻る
                </button>
             </div>
        </div>
    );
};

const ProblemScreen: React.FC<ProblemScreenProps> = ({ category, subTopic, initialProblems, onBack, onHome }) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [result, setResult] = useState<'correct' | 'incorrect' | 'proof' | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [sessionStats, setSessionStats] = useState<SessionStats>({ correct: 0, incorrect: 0, totalScore: 0, problemCount: 0 });
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [vfxClass, setVfxClass] = useState('');
  // セッション経過時間タイマー（結果確認中は一時停止）
  const [sessionStartTime] = useState<number>(Date.now());
  const [elapsedDisplay, setElapsedDisplay] = useState('0:00');
  const pausedTimeRef = useRef<number>(0);     // 一時停止した累計時間
  const pauseStartRef = useRef<number | null>(null); // 一時停止開始時刻

  // 結果表示時にタイマーを一時停止
  useEffect(() => {
    if (showAnswer) {
      // 一時停止開始
      pauseStartRef.current = Date.now();
    } else {
      // 一時停止解除（累計に加算）
      if (pauseStartRef.current !== null) {
        pausedTimeRef.current += Date.now() - pauseStartRef.current;
        pauseStartRef.current = null;
      }
    }
  }, [showAnswer]);

  // セッション経過時間の表示更新（一時停止中はカウントしない）
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      const now = Date.now();
      const totalPaused = pausedTimeRef.current + (pauseStartRef.current !== null ? now - pauseStartRef.current : 0);
      const elapsed = Math.floor((now - sessionStartTime - totalPaused) / 1000);
      const min = Math.floor(elapsed / 60);
      const sec = elapsed % 60;
      setElapsedDisplay(`${min}:${sec.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStartTime, isFinished]);

  // 現在の階層パスを取得
  const getHierarchyLabel = useCallback(() => {
    const cat = ENG_CATEGORIES.find(c => c.name === category);
    if (!cat) return category;
    const group = cat.groups.find(g => g.subtopics.includes(subTopic));
    return group ? `${category} / ${group.name}` : category;
  }, [category, subTopic]);

  useEffect(() => {
    const loadedProblems = initialProblems ?? getShuffledProblemSet(category, subTopic);
    setProblems(loadedProblems);
    setIsLoading(false);
    setStartTime(Date.now());
  }, [category, subTopic, initialProblems]);

  const currentProblem = problems[currentIndex] || null;
  const problemHint = currentProblem?.data?.hint;

  // Sort type state
  const [sortWords, setSortWords] = useState<string[]>([]);
  const [sortRemaining, setSortRemaining] = useState<string[]>([]);

  const handleNextProblem = useCallback(() => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setShowAnswer(false);
      setResult(null);
      setTimeTaken(null);
      setScore(null);
      setStartTime(Date.now());
      setVfxClass('');
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, problems.length]);

  const checkAnswerWithValue = useCallback((answerToCheck: string) => {
    if (!currentProblem || result !== null) return;

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    setTimeTaken(duration);

    const normalizeStr = (s: string) =>
      s.trim()
        .replace(/[！-～]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
        .toLowerCase();

    let isCorrect: boolean;
    if (currentProblem.type === 'sort') {
      const correctAnswer = Array.isArray(currentProblem.answer)
        ? currentProblem.answer.join(' ')
        : String(currentProblem.answer);
      isCorrect = normalizeStr(answerToCheck) === normalizeStr(correctAnswer);
    } else {
      const correctAnswer = String(currentProblem.answer);
      isCorrect = normalizeStr(answerToCheck) === normalizeStr(correctAnswer);
    }

    if (isCorrect) {
      setResult('correct');
      setVfxClass('vfx-success ring-2 ring-cyan-500');
      const points = Math.max(5, Math.floor(25 - duration));
      setScore(points);
      setSessionStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        totalScore: prev.totalScore + points,
        problemCount: prev.problemCount + 1
      }));
    } else {
      setResult('incorrect');
      setVfxClass('vfx-shake ring-2 ring-red-500');
      setSessionStats(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        problemCount: prev.problemCount + 1
      }));
    }
    setShowAnswer(true);
  }, [currentProblem, result, startTime]);

  const checkAnswer = useCallback(() => {
    checkAnswerWithValue(userAnswer);
  }, [checkAnswerWithValue, userAnswer]);

  // Enter key → next problem when answer is showing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showAnswer && e.key === 'Enter') handleNextProblem();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, handleNextProblem]);

  // Reset sort state when problem changes
  useEffect(() => {
    if (currentProblem?.type === 'sort' && currentProblem.data.options) {
      setSortWords([]);
      setSortRemaining([...currentProblem.data.options].sort(() => Math.random() - 0.5));
    } else {
      setSortWords([]);
      setSortRemaining([]);
    }
  }, [currentProblem]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-cyan-400 font-mono">
        <div className="w-16 h-16 border-2 border-cyan-900 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
        <p className="animate-pulse tracking-[0.2em]">INITIALIZING_HUD...</p>
      </div>
    );
  }

  const sessionElapsedSec = Math.floor((Date.now() - sessionStartTime - pausedTimeRef.current) / 1000);

  if (isFinished) {
      return (
        <div className="h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xl overflow-y-auto">
            <PracticeSummary
              stats={sessionStats}
              subTopic={subTopic}
              elapsedTime={sessionElapsedSec}
              onBack={(mpReward: number) => {
                // MP報酬をセッションスコアに上書きして返す
                onBack({ ...sessionStats, totalScore: mpReward });
              }}
            />
        </div>
      );
  }

  return (
    <div className="h-[100dvh] w-full p-1.5 sm:p-2 flex items-start justify-center relative overflow-hidden font-['Inter'] text-white">
      {isHintVisible && problemHint && <HintModal hint={problemHint} onClose={() => setIsHintVisible(false)} />}
      <DrawingCanvas isVisible={isMemoVisible} />

      <div className="relative w-full max-w-6xl h-full">
        <div className={`w-full h-full hud-panel rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 z-10 relative transition-all duration-300 flex flex-col overflow-hidden ${vfxClass}`}>
           <div className="corner-accent lt border-cyan-500/40"></div>
           <div className="corner-accent rt border-cyan-500/40"></div>
           <div className="corner-accent lb border-cyan-500/40"></div>
           <div className="corner-accent rb border-cyan-500/40"></div>

           <header className='flex justify-between items-center mb-1.5 border-b border-cyan-500/10 pb-1.5 flex-shrink-0'>
              <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
                <button onClick={() => onBack(sessionStats)} className='text-cyan-400 hover:text-white transition-all p-1.5 sm:p-2 bg-blue-900/20 rounded-lg border border-cyan-500/20 flex-shrink-0' title="前の画面へ">
                  <BackIcon className='w-4 h-4 sm:w-5 sm:h-5' />
                </button>
                <button onClick={onHome} className='text-cyan-400 hover:text-white transition-all p-1.5 sm:p-2 bg-blue-900/20 rounded-lg border border-cyan-500/20 flex-shrink-0' title="メインメニューへ">
                  <HomeIcon className='w-4 h-4 sm:w-5 sm:h-5' />
                </button>
                <div className="min-w-0">
                  <h2 className='text-[9px] sm:text-[10px] text-cyan-300 tracking-[0.2em] font-bold truncate'>{getHierarchyLabel()}</h2>
                  <h1 className='text-sm sm:text-base lg:text-lg font-bold tracking-wide text-white truncate'>{subTopic}</h1>
                </div>
              </div>
              <div className='flex items-center gap-3 sm:gap-5 flex-shrink-0'>
                <div className='text-center'>
                  <p className='text-[9px] sm:text-[10px] text-amber-400 font-bold'>経過時間</p>
                  <p className='text-sm sm:text-base font-bold font-mono text-amber-300'>{elapsedDisplay}</p>
                </div>
                <div className='text-right'>
                  <p className='text-[9px] sm:text-[10px] text-cyan-400 font-bold tracking-wide'>進捗</p>
                  <p className='text-base sm:text-lg font-bold font-mono text-cyan-300'>{currentIndex + 1} <span className="text-xs text-cyan-600">/ {problems.length}</span></p>
                  <div className="w-16 sm:w-20 bg-slate-900 h-1 rounded-full overflow-hidden mt-0.5">
                    <div className="bg-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }} />
                  </div>
                </div>
              </div>
           </header>

           <main className='grid lg:grid-cols-[1fr_220px] gap-2 lg:gap-3 flex-1 min-h-0 overflow-y-auto'>
              <div className='space-y-1.5 sm:space-y-2'>
                <div className='w-full bg-slate-950/40 rounded-xl p-2.5 sm:p-3 border border-cyan-500/5 shadow-inner overflow-y-auto max-h-[38vh] lg:max-h-[52vh]'>
                  {/* Question text */}
                  <p className="text-white text-base sm:text-lg lg:text-xl font-bold leading-relaxed mb-2 text-center">
                    {currentProblem?.data.question || '問題文なし'}
                  </p>
                  {currentProblem?.data.japanese && (
                    <p className="text-cyan-400/70 text-sm mb-4 text-center italic">{currentProblem.data.japanese}</p>
                  )}

                  {/* select type */}
                  {currentProblem?.type === 'select' && currentProblem.data.options && (
                    <div className="grid gap-2 max-w-lg mx-auto mt-2">
                      {currentProblem.data.options.map((opt: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => { if (!showAnswer) { setUserAnswer(opt); checkAnswerWithValue(opt); } }}
                          disabled={showAnswer}
                          className={`w-full text-left px-4 py-2.5 rounded-xl border-2 transition-all text-sm sm:text-base
                            ${userAnswer === opt
                              ? 'border-cyan-400 bg-cyan-900/30 text-cyan-200'
                              : 'border-cyan-900/30 bg-slate-900/60 text-white hover:border-cyan-600/50 hover:bg-slate-800/60'}
                            ${showAnswer ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span className="text-cyan-500 mr-2 font-bold">{String.fromCharCode(65 + i)}.</span>{opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* input type */}
                  {currentProblem?.type === 'input' && (
                    <div className="flex flex-col gap-2 max-w-lg mx-auto mt-2">
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => { if (!showAnswer) setUserAnswer(e.target.value); }}
                        onKeyDown={(e) => { if (e.key === 'Enter' && userAnswer.trim() && !showAnswer) checkAnswerWithValue(userAnswer.trim()); }}
                        disabled={showAnswer}
                        placeholder="ここに入力..."
                        autoFocus
                        className="w-full bg-slate-950 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white text-lg font-mono outline-none focus:border-cyan-400 placeholder:text-cyan-800 disabled:opacity-50"
                      />
                    </div>
                  )}

                  {/* sort type */}
                  {currentProblem?.type === 'sort' && (
                    <div className="flex flex-col gap-3 max-w-lg mx-auto mt-2">
                      {/* Answer area */}
                      <div className="min-h-[3rem] bg-slate-900/60 border-2 border-cyan-500/20 rounded-xl p-3 flex flex-wrap gap-2 items-center">
                        {sortWords.length === 0 && (
                          <span className="text-cyan-800 text-sm">単語をクリックして並べよう</span>
                        )}
                        {sortWords.map((word, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              if (showAnswer) return;
                              const newWords = sortWords.filter((_, idx) => idx !== i);
                              setSortWords(newWords);
                              setSortRemaining(prev => [...prev, word]);
                            }}
                            disabled={showAnswer}
                            className="px-3 py-1.5 bg-cyan-900/60 border border-cyan-400/40 text-cyan-200 rounded-lg text-sm font-bold hover:bg-red-900/40 hover:border-red-400/40 transition-all"
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                      {/* Word bank */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {sortRemaining.map((word, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              if (showAnswer) return;
                              const newWords = [...sortWords, word];
                              const newRemaining = sortRemaining.filter((_, idx) => idx !== i);
                              setSortWords(newWords);
                              setSortRemaining(newRemaining);
                              if (newRemaining.length === 0) {
                                const joined = newWords.join(' ');
                                setUserAnswer(joined);
                                checkAnswerWithValue(joined);
                              }
                            }}
                            disabled={showAnswer}
                            className="px-3 py-1.5 bg-slate-800 border border-slate-600 text-white rounded-lg text-sm font-bold hover:bg-cyan-900/40 hover:border-cyan-400/40 transition-all"
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <ProblemResultDisplay
                  showAnswer={showAnswer}
                  problemData={currentProblem}
                  result={result}
                  userAnswer={userAnswer}
                  timeTaken={timeTaken}
                  score={score}
                  getResultRingColor={() => showAnswer ? (result === 'correct' ? 'border-cyan-400' : 'border-red-500') : 'border-transparent'}
                />
              </div>

              <div className="flex flex-col gap-2 sm:gap-3">
                <ProblemControls
                  isProof={false}
                  isLoading={isLoading}
                  userAnswer={userAnswer}
                  result={result}
                  isSessionComplete={currentIndex >= problems.length}
                  hasHint={!!problemHint}
                  onCheckAnswer={checkAnswer}
                  onLoadNextProblem={handleNextProblem}
                  onShowHint={() => setIsHintVisible(true)}
                />

                {/* Session stats */}
                <div className="hud-panel p-2.5 sm:p-3 rounded-xl text-sm space-y-2 mt-auto border-cyan-500/10">
                   <div className="flex justify-between items-center"><span className="text-cyan-500 font-bold text-xs">正解数</span><span className="text-white font-bold text-sm">{sessionStats.correct} / {sessionStats.problemCount}</span></div>
                   <div className="flex justify-between items-center"><span className="text-cyan-500 font-bold text-xs">獲得MP</span><span className="text-amber-400 font-bold text-sm">{sessionStats.totalScore}</span></div>
                   {sessionStats.problemCount > 0 && (
                     <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                       <div className={`h-full rounded-full transition-all duration-500 ${(sessionStats.correct / sessionStats.problemCount) >= 0.7 ? 'bg-cyan-400' : 'bg-amber-500'}`} style={{ width: `${(sessionStats.correct / sessionStats.problemCount) * 100}%` }}></div>
                     </div>
                   )}
                </div>
              </div>
           </main>
        </div>

        <button
          onClick={() => setIsMemoVisible(prev => !prev)}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-3 sm:p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-50 ${isMemoVisible ? 'bg-cyan-500 text-slate-950 ring-2 ring-white' : 'bg-slate-900/80 text-cyan-400 border border-cyan-500/40'}`}
        >
          <PencilIcon className='w-6 h-6 sm:w-7 sm:h-7' />
        </button>
      </div>
    </div>
  );
};

export default ProblemScreen;
