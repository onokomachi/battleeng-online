
import React, { useState, useEffect, useCallback } from 'react';
import type { ProblemCard, TurnPhase, TurnInitiative } from '../types';
import Card, { CardBack } from './Card';
import GameLog from './GameLog';
import DrawingCanvas from './DrawingCanvas';
import { PencilIcon } from './Icons';
import { THEME_CONFIGS } from '../constants';


// --- ProblemSolver Component ---
interface ProblemSolverProps {
  problemCard: ProblemCard;
  onAnswerSubmit: (answer: string) => void;
  isSolving: boolean;
  turnPhase: TurnPhase;
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({ problemCard, onAnswerSubmit, isSolving, turnPhase }) => {
  const [inputAnswer, setInputAnswer] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>([]);

  const problemType = problemCard.problem.type;
  const problemData = problemCard.problem.data;
  const isDisabled = turnPhase !== 'solving_problem';

  // Reset state when problem changes
  useEffect(() => {
    setInputAnswer('');
    setSelectedWords([]);
    if (problemType === 'sort' && problemData.options) {
      // Shuffle options for display
      setRemainingWords([...problemData.options].sort(() => Math.random() - 0.5));
    } else {
      setRemainingWords([]);
    }
  }, [problemCard, problemType]);

  // Enter key support for input type
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSolving || isDisabled) return;
      if (e.key === 'Enter' && problemType === 'input' && inputAnswer.trim()) {
        onAnswerSubmit(inputAnswer.trim());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSolving, isDisabled, problemType, inputAnswer, onAnswerSubmit]);

  const handleWordClick = (word: string, index: number) => {
    if (isDisabled) return;
    const newSelected = [...selectedWords, word];
    const newRemaining = remainingWords.filter((_, i) => i !== index);
    setSelectedWords(newSelected);
    setRemainingWords(newRemaining);
    // Auto-submit when all words placed
    if (newRemaining.length === 0) {
      onAnswerSubmit(newSelected.join(' '));
    }
  };

  const handleSelectedWordClick = (word: string, index: number) => {
    if (isDisabled) return;
    const newSelected = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(newSelected);
    setRemainingWords([...remainingWords, word]);
  };

  return (
    <div className="w-full max-w-4xl bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-3 sm:p-5 md:p-8 flex flex-col items-center shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-y-auto max-h-[75vh] sm:max-h-[80vh]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      <h3 className="text-cyan-400 font-bold text-sm mb-4">問題を解こう</h3>

      {/* Question */}
      <div className="w-full mb-4 bg-slate-900/50 border border-cyan-500/10 rounded-xl p-4 text-center">
        <p className="text-white text-base sm:text-lg md:text-xl font-bold leading-relaxed">{problemData.question}</p>
        {problemData.japanese && (
          <p className="text-cyan-400/70 text-sm mt-2 italic">{problemData.japanese}</p>
        )}
      </div>

      {/* select type: clickable options, auto-submit */}
      {problemType === 'select' && problemData.options && (
        <div className="grid gap-2 w-full max-w-lg">
          {problemData.options.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { if (!isDisabled) onAnswerSubmit(opt); }}
              disabled={isDisabled}
              className="w-full text-left px-4 py-3 rounded-lg border transition-all border-cyan-900/30 bg-slate-900/60 text-white hover:border-cyan-400 hover:bg-cyan-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-cyan-500 mr-2 font-bold">{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          ))}
        </div>
      )}

      {/* input type: text field + submit */}
      {problemType === 'input' && (
        <div className="w-full max-w-lg flex flex-col gap-3">
          <input
            type="text"
            value={inputAnswer}
            onChange={(e) => { if (!isDisabled) setInputAnswer(e.target.value); }}
            disabled={isDisabled}
            placeholder="ここに入力..."
            autoFocus
            className="w-full bg-slate-950 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white text-lg font-mono outline-none focus:border-cyan-400 placeholder:text-cyan-800 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => { if (inputAnswer.trim()) onAnswerSubmit(inputAnswer.trim()); }}
            disabled={isDisabled || !inputAnswer.trim()}
            className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-lg border border-blue-400/30"
          >
            解答する
          </button>
        </div>
      )}

      {/* sort type: word ordering UI */}
      {problemType === 'sort' && (
        <div className="w-full max-w-lg flex flex-col gap-4">
          {/* Answer area */}
          <div className="min-h-[3rem] bg-slate-900/60 border-2 border-cyan-500/20 rounded-xl p-3 flex flex-wrap gap-2 items-center">
            {selectedWords.length === 0 && (
              <span className="text-cyan-800 text-sm">単語をクリックして並べよう</span>
            )}
            {selectedWords.map((word, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectedWordClick(word, i)}
                disabled={isDisabled}
                className="px-3 py-1.5 bg-cyan-900/60 border border-cyan-400/40 text-cyan-200 rounded-lg text-sm font-bold hover:bg-red-900/40 hover:border-red-400/40 transition-all disabled:cursor-not-allowed"
              >
                {word}
              </button>
            ))}
          </div>

          {/* Word bank */}
          <div className="flex flex-wrap gap-2 justify-center">
            {remainingWords.map((word, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleWordClick(word, i)}
                disabled={isDisabled}
                className="px-3 py-1.5 bg-slate-800 border border-slate-600 text-white rounded-lg text-sm font-bold hover:bg-cyan-900/40 hover:border-cyan-400/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {word}
              </button>
            ))}
          </div>

          {/* Submit button (shown when all words placed but not yet auto-submitted) */}
          {selectedWords.length > 0 && remainingWords.length > 0 && (
            <button
              type="button"
              onClick={() => { if (selectedWords.length > 0) onAnswerSubmit(selectedWords.join(' ')); }}
              disabled={isDisabled || selectedWords.length === 0}
              className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-lg border border-blue-400/30"
            >
              解答する
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// --- HP Bar Component (aicardbattle2 integration) ---
const HpBar: React.FC<{ hp: number; maxHp: number; label: string; isPlayer: boolean }> = ({ hp, maxHp, label, isPlayer }) => {
  const pct = Math.max(0, (hp / maxHp) * 100);
  const color = pct > 50 ? (isPlayer ? 'bg-cyan-400' : 'bg-red-500') : pct > 25 ? 'bg-amber-400' : 'bg-red-600';
  return (
    <div className={`p-3 sm:p-4 rounded-2xl border-2 flex flex-col gap-2 w-full max-w-80 shadow-2xl backdrop-blur-md ${isPlayer ? 'bg-blue-900/20 border-cyan-500/40' : 'bg-slate-900/40 border-slate-700'}`}>
      <div className="flex justify-between items-center">
        <span className={`text-xs font-bold ${isPlayer ? 'text-cyan-400' : 'text-gray-400'}`}>{label}</span>
        <span className="text-xl font-bold font-mono text-white">{hp} <span className="text-sm text-white/40">/ {maxHp} HP</span></span>
      </div>
      <div className="bg-slate-950/80 h-3 rounded-full overflow-hidden p-[1px] border border-white/5">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(34,211,238,0.4)] ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// --- GameBoard Component ---
interface GameBoardProps {
  turnPhase: TurnPhase;
  playerScore: number;
  pcScore: number;
  playerHP: number;
  pcHP: number;
  initialHP: number;
  playerHand: ProblemCard[];
  pcHandSize: number;
  playerDeckSize: number;
  pcDeckSize: number;
  playerPlayedCard: ProblemCard | null;
  pcPlayedCard: ProblemCard | null;
  onCardSelect: (card: ProblemCard) => void;
  onAnswerSubmit: (answer: string) => void;
  selectedCardId: number | null;
  gameLog: string[];
  roundResult: string | null;
  maxScore: number;
  initiative: TurnInitiative;
  // ゲーミフィケーション拡張
  chainCount?: number;
  wrongAnswerText?: string | null;
  /** エビデンスA: 精緻化フィードバック (Hattie & Timperley 2007, ES=0.73) */
  playerWrongAnswer?: string | null;
  wrongCategory?: string | null;
  /** レベル不一致で応戦中 */
  mismatchRound?: boolean;
  /** バトル形式情報 */
  battleFormat?: string;
  playerRoundWins?: number;
  pcRoundWins?: number;
  currentRound?: number;
  battleTheme?: string | null;
}

const ScoreDisplay: React.FC<{ score: number; label: string; maxScore: number; isPlayer: boolean }> = ({ score, label, maxScore, isPlayer }) => (
  <div className={`p-3 sm:p-5 rounded-2xl border-2 flex items-center justify-between gap-4 sm:gap-6 w-full max-w-80 shadow-2xl backdrop-blur-md ${isPlayer ? 'bg-blue-900/20 border-cyan-500/40' : 'bg-slate-900/40 border-slate-700'}`}>
    <div className="flex flex-col">
      <span className={`text-[10px] font-black uppercase tracking-widest ${isPlayer ? 'text-cyan-400' : 'text-gray-500'}`}>{label}</span>
      <span className="text-3xl font-black font-mono text-white leading-none mt-1">{score} <span className="text-sm opacity-30">/ {maxScore}</span></span>
    </div>
    <div className="flex-grow bg-slate-950/80 h-3 rounded-full overflow-hidden p-[1px] border border-white/5">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)] ${isPlayer ? 'bg-cyan-400' : 'bg-slate-600'}`}
          style={{ width: `${(score / maxScore) * 100}%` }}
        ></div>
    </div>
  </div>
);

const GameBoard: React.FC<GameBoardProps> = ({
  turnPhase,
  playerScore,
  pcScore,
  playerHP,
  pcHP,
  initialHP,
  playerHand,
  pcHandSize,
  playerDeckSize,
  pcDeckSize,
  playerPlayedCard,
  pcPlayedCard,
  onCardSelect,
  onAnswerSubmit,
  selectedCardId,
  gameLog,
  roundResult,
  maxScore,
  initiative,
  chainCount = 0,
  wrongAnswerText,
  playerWrongAnswer,
  wrongCategory,
  mismatchRound = false,
  battleFormat,
  playerRoundWins = 0,
  pcRoundWins = 0,
  currentRound = 1,
  battleTheme,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const themeConfig = battleTheme ? THEME_CONFIGS[battleTheme] : null;

  const isPlayerSecond = initiative === 'pc';
  const playerMustMatchLevel = isPlayerSecond && pcPlayedCard !== null && playerPlayedCard === null;
  // 手札に同レベルカードがあるか（UIで禁止表示に使用）
  const hasMatchInHand = playerMustMatchLevel && pcPlayedCard
    ? playerHand.some(c => c.difficulty === pcPlayedCard.difficulty)
    : false;

  return (
    <div className={`w-full h-full flex flex-col justify-between items-center p-3 sm:p-4 md:p-6 relative overflow-hidden overflow-y-auto${themeConfig ? ` ${themeConfig.bgClass}` : ''}`}>
      {/* Star Field Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/5 blur-[60px] rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-cyan-500/5 blur-[80px] rounded-full"></div>

      {/* Round Score (for best-of-N formats) */}
      {battleFormat && battleFormat !== 'master_duel' && (
        <div className="w-full flex justify-center mb-1">
          <div className="flex items-center gap-3 bg-purple-950/40 border border-purple-500/30 rounded-xl px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] text-purple-400 font-bold">
              {battleFormat === 'best_of_3' ? '3本勝負' : battleFormat === 'best_of_5' ? '5本勝負' : '7本勝負'}
            </span>
            <span className="text-sm font-bold font-mono text-cyan-300">{playerRoundWins}</span>
            <span className="text-xs text-purple-400">-</span>
            <span className="text-sm font-bold font-mono text-red-300">{pcRoundWins}</span>
            <span className="text-[10px] text-slate-500">第{currentRound}回戦</span>
          </div>
        </div>
      )}

      {/* PC Area */}
      <div className="w-full flex justify-center items-center flex-col space-y-6">
        <HpBar hp={pcHP} maxHp={initialHP} label={`相手 HP  |  正解: ${pcScore}`} isPlayer={false} />
        <div className="flex justify-center items-center h-48 space-x-2">
          {[...Array(pcHandSize)].map((_, i) => (
            <div key={i} className="opacity-40 hover:opacity-60 transition-opacity relative group transform -translate-y-4">
              <CardBack />
              {i === 0 && <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-full">残り: {pcDeckSize}枚</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Battle Field */}
      <div className="w-full flex justify-center items-center min-h-[16rem] sm:min-h-[20rem] md:min-h-[28rem] gap-2 sm:gap-4 md:gap-8 lg:gap-12 relative">
        <div className="w-24 h-40 sm:w-36 sm:h-56 md:w-56 md:h-80 flex items-center justify-center relative flex-shrink-0">
          {playerPlayedCard ? (
            <div className="animate-math-fade-in"><Card card={playerPlayedCard} isSelected={true} /></div>
          ) : (
            <div className="w-full h-full rounded-2xl border-2 border-dashed border-cyan-500/10 flex items-center justify-center">
                <span className="text-cyan-700 text-xs font-bold animate-pulse">
                    {initiative === 'player' ? 'カードを選んでください' : '待機中...'}
                </span>
            </div>
          )}
          {playerPlayedCard && <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-cyan-400 text-[10px] font-bold">あなたのカード</div>}
        </div>

        <div className="flex-grow flex flex-col items-center justify-center max-w-4xl z-20">
          {/* レベル不一致ラウンドの時間ボーナス表示 */}
          {mismatchRound && turnPhase === 'solving_problem' && (
            <div className="mb-3 bg-purple-900/40 border border-purple-500/40 rounded-xl px-5 py-2 flex items-center gap-3 animate-math-fade-in">
              <span className="text-lg">⚡</span>
              <span className="text-purple-300 text-sm font-bold">レベル不一致応戦 — 解答時間+50%ボーナス</span>
            </div>
          )}
          {turnPhase === 'solving_problem' && pcPlayedCard ? (
            <ProblemSolver
              problemCard={pcPlayedCard}
              onAnswerSubmit={onAnswerSubmit}
              isSolving={turnPhase === 'solving_problem'}
              turnPhase={turnPhase}
            />
          ) : (
             <div className="text-center bg-slate-950/40 backdrop-blur-md p-10 rounded-full border border-cyan-500/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
                {turnPhase === 'selecting_card' ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                        <p className="text-cyan-200 text-2xl font-bold">
                            {initiative === 'player' ? (playerPlayedCard ? '相手が考え中...' : 'あなたの先攻！カードを選ぼう') : (pcPlayedCard ? '同じ難易度のカードを選ぼう' : '相手の先攻！')}
                        </p>
                        {playerMustMatchLevel && hasMatchInHand && (
                             <div className="bg-amber-500/20 border border-amber-500/40 px-4 py-1.5 rounded-lg text-sm text-amber-300 font-bold animate-pulse">
                                難易度 {pcPlayedCard!.difficulty} のカードを選んでください
                             </div>
                        )}
                        {playerMustMatchLevel && !hasMatchInHand && (
                             <div className="bg-purple-500/20 border border-purple-500/40 px-4 py-1.5 rounded-lg text-sm text-purple-300 font-bold animate-pulse">
                                ⚡ 同レベルなし — 任意のカードで応戦！（時間ボーナス+50%）
                             </div>
                        )}
                    </div>
                ) : (
                    <div className="text-cyan-500 text-6xl font-black tracking-widest animate-pulse font-['Cinzel_Decorative']">VS</div>
                )}
            </div>
          )}
          {/* チェインカウンター - Level A: 可変比率報酬スケジュール (Ferster & Skinner, 1957) */}
          {chainCount >= 2 && !roundResult && (
            <div className="mt-6 text-center animate-math-fade-in">
              <div className="inline-flex items-center gap-2 bg-amber-900/40 border border-amber-500/50 rounded-full px-5 py-2 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                <span className="text-amber-400 font-bold text-sm">連続正解</span>
                <span className="text-amber-300 font-bold text-2xl font-mono">×{chainCount}</span>
                <span className="text-xl">{chainCount >= 10 ? '⚡⚡' : chainCount >= 5 ? '⚡' : '🔥'}</span>
              </div>
            </div>
          )}
          {/* エビデンスA: 精緻化フィードバック (Hattie & Timperley 2007, ES=0.73)
              - 正解を表示するだけでなく「あなたの回答」との差分を示す
              - カテゴリを表示して「何の分野か」を意識させる（メタ認知支援）
              - Growth Mindset メッセージ（Dweck 2006） */}
          {wrongAnswerText && (
            <div className="mt-6 text-center animate-math-fade-in">
              <div className="inline-block bg-red-950/60 border border-red-500/40 rounded-xl px-6 py-4 shadow-lg max-w-md">
                {wrongCategory && (
                  <div className="text-red-300/40 text-[10px] font-bold mb-1 tracking-wider">{wrongCategory}</div>
                )}
                {playerWrongAnswer && (
                  <div className="mb-2">
                    <span className="text-red-400/60 text-xs">あなたの回答: </span>
                    <span className="text-red-300 font-mono text-sm line-through">{playerWrongAnswer}</span>
                  </div>
                )}
                <div className="text-green-400 text-sm font-bold mb-1">正解</div>
                <div className="text-white font-bold text-2xl font-mono">{wrongAnswerText}</div>
                <div className="text-cyan-300/50 text-xs mt-2 italic">間違いは学びのチャンス。この問題は後で復習に出るよ！</div>
              </div>
            </div>
          )}
          {roundResult && <div className={`mt-8 text-5xl font-black text-center animate-math-fade-in tracking-tighter drop-shadow-[0_0_20px_rgba(34,211,238,0.5)] ${roundResult.includes('勝利') ? 'text-cyan-300' : 'text-red-500'}`}>{roundResult}</div>}
        </div>

        <div className="w-24 h-40 sm:w-36 sm:h-56 md:w-56 md:h-80 flex items-center justify-center relative flex-shrink-0">
          {pcPlayedCard ? (
            <div className="animate-math-fade-in"><Card card={pcPlayedCard} isSelected={true} /></div>
          ) : (
            <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-700/30 flex items-center justify-center">
                <span className="text-slate-700 text-xs font-bold">
                    {initiative === 'pc' ? '選択中...' : '待機中'}
                </span>
            </div>
          )}
          {pcPlayedCard && <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-slate-400 text-[10px] font-bold">相手のカード</div>}
        </div>
      </div>

      {/* Player Area */}
      <div className="w-full flex justify-center items-center flex-col space-y-6">
       <div className="h-56 md:h-80 flex justify-center items-end space-x-[-2rem] md:space-x-[-3rem] pb-4 md:pb-6 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
          {turnPhase === 'selecting_card' && (
            <>
              <div className="relative mr-8 group transform translate-y-4">
                <CardBack />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-900 border border-cyan-500/40 text-cyan-200 text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg">残り: {playerDeckSize}枚</div>
              </div>
              {playerHand.map(card => {
                // 同レベルカードが手札にある場合のみ、不一致カードを禁止
                const isForbidden = playerMustMatchLevel && hasMatchInHand && card.difficulty !== pcPlayedCard!.difficulty;
                return (
                  <Card
                    key={card.id}
                    card={card}
                    onClick={() => onCardSelect(card)}
                    isPlayable={turnPhase === 'selecting_card'}
                    inHand={true}
                    isSelected={selectedCardId === card.id}
                    isDisabled={isForbidden}
                  />
                );
              })}
            </>
          )}
        </div>
        <HpBar hp={playerHP} maxHp={initialHP} label={`あなた HP  |  正解: ${playerScore}`} isPlayer={true} />
      </div>

      <DrawingCanvas isVisible={isDrawing} />
      
      <button 
        onClick={() => setIsDrawing(prev => !prev)}
        className={`fixed top-8 right-8 p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 z-30 backdrop-blur-md ${isDrawing ? 'bg-cyan-500 text-slate-950 border-white border-4' : 'bg-slate-900/80 text-cyan-400 border border-cyan-500/40'}`}
        aria-label="Toggle Drawing Memo"
      >
        <PencilIcon className="w-8 h-8" />
      </button>

      <div className="fixed bottom-8 right-8">
        <GameLog messages={gameLog} />
      </div>
    </div>
  );
};

export default GameBoard;
