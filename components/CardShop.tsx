
import React, { useState } from 'react';
import type { ProblemCard } from '../types';
import Card, { CardBack } from './Card';
import { BackIcon } from './Icons';

interface CardShopProps {
  mathPoints: number;
  onBuyPack: (categories: string[], cost: number, packType: string) => ProblemCard[] | null;
  onExit: () => void;
}

const PACKS = [
  {
    type: '中1文法パック',
    cost: 800,
    desc: 'be動詞・一般動詞・過去形・疑問詞など中1文法を網羅',
    categories: ['be動詞','一般動詞','代名詞','名詞の複数形','現在進行形','過去形','過去進行形','疑問詞','命令文','感嘆文','there is'],
    color: '#38BDF8',
    grade: 1,
  },
  {
    type: '中2文法パック',
    cost: 800,
    desc: '不定詞・助動詞・比較・現在完了など中2文法を網羅',
    categories: ['未来','動名詞','不定詞','助動詞【その他】','助動詞【must】','助動詞【have to】','比較','接続詞','受け身','現在完了'],
    color: '#F97316',
    grade: 2,
  },
  {
    type: '中3文法パック',
    cost: 800,
    desc: '関係代名詞・分詞・仮定法など中3文法を網羅',
    categories: ['現在完了進行形','不定詞2','その他','関係代名詞','分詞の後置修飾','間接疑問文','仮定法'],
    color: '#A78BFA',
    grade: 3,
  },
  {
    type: '英単語パック 中1',
    cost: 600,
    desc: '中1レベルの動詞・名詞・形容詞・副詞',
    categories: ['英単語【動詞】中1','英単語【名詞】中1','英単語【形容詞・副詞】中1'],
    color: '#34D399',
    grade: 1,
  },
  {
    type: '英単語パック 中2',
    cost: 600,
    desc: '中2レベルの動詞・名詞・形容詞・副詞',
    categories: ['英単語【動詞】中2','英単語【名詞】中2','英単語【形容詞・副詞】中2'],
    color: '#FBBF24',
    grade: 2,
  },
  {
    type: '英単語パック 中3',
    cost: 600,
    desc: '中3レベルの動詞・名詞・形容詞・副詞',
    categories: ['英単語【動詞】中3','英単語【名詞】中3','英単語【形容詞・副詞】中3'],
    color: '#F472B6',
    grade: 3,
  },
];

const PackOpeningView: React.FC<{
  pack: ProblemCard[];
  onFinish: () => void;
}> = ({ pack, onFinish }) => {
  const [stage, setStage] = useState<'presenting' | 'revealing'>('presenting');
  const [revealed, setRevealed] = useState<boolean[]>(new Array(pack.length).fill(false));

  const handleRevealCard = (index: number) => {
    if (revealed[index] || stage !== 'revealing') return;
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
  };

  const allRevealed = revealed.every(r => r);

  if (stage === 'presenting') {
    return (
      <div className="w-full h-full overflow-y-auto bg-black/90 backdrop-blur-xl animate-math-fade-in z-[100]">
        <div className="min-h-full flex flex-col items-center justify-center p-4 text-white">
          <h2 className="text-4xl font-bold text-cyan-300 mb-12 tracking-wide">パック開封中...</h2>
          <div
            className="w-56 h-80 bg-gradient-to-br from-cyan-900 to-blue-950 border-2 border-cyan-400/60 rounded-xl shadow-[0_0_50px_rgba(34,211,238,0.3)] flex items-center justify-center p-4 cursor-pointer transform hover:scale-110 transition-all duration-500 animate-pulse-slow group relative"
            onClick={() => setStage('revealing')}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2)_0%,transparent_70%)] animate-pulse rounded-xl"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-cyan-400 group-hover:rotate-90 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
          <p className="mt-12 text-cyan-600 text-sm font-bold">タップして開封</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-black/90 backdrop-blur-2xl z-[100]">
      <div className="min-h-full flex flex-col items-center justify-center p-4 text-white">
        <h2 className="text-4xl font-bold text-cyan-300 mb-8 tracking-wide">新しいカードを入手！</h2>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 py-4">
          {pack.map((card, index) => (
            <div
              key={index}
              className="card-container animate-math-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => handleRevealCard(index)}
            >
              <div className={`card-inner ${revealed[index] ? 'is-flipped' : ''}`}>
                <div className="card-back">
                  <CardBack />
                </div>
                <div className="card-front">
                  <Card card={card} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {allRevealed && (
          <button
            onClick={onFinish}
            className="mt-10 btn-tactical px-12 py-4 rounded-xl text-xl font-bold text-cyan-400 animate-level-up-reveal"
          >
            ショップに戻る
          </button>
        )}
      </div>
    </div>
  );
};

const CardShop: React.FC<CardShopProps> = ({ mathPoints, onBuyPack, onExit }) => {
  const [packToOpen, setPackToOpen] = useState<ProblemCard[] | null>(null);

  const handleBuy = (categories: string[], cost: number, type: string) => {
    const newCards = onBuyPack(categories, cost, type);
    if (newCards) {
      if (newCards.length === 0) {
        alert('この分野のカードはすべて入手済みです。');
        return;
      }
      setPackToOpen(newCards);
    } else {
      alert('EPが不足しています。');
    }
  };

  if (packToOpen) {
    return <PackOpeningView pack={packToOpen} onFinish={() => setPackToOpen(null)} />;
  }

  return (
    <div className="w-full h-full flex flex-col text-white overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0"
           style={{ background: 'rgba(11,29,53,0.9)', borderBottom: '1px solid rgba(249,115,22,0.2)' }}>
        <button onClick={onExit}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
          <BackIcon className="w-4 h-4" /> メニューに戻る
        </button>
        <div className="text-center">
          <h1 className="text-lg sm:text-2xl font-black tracking-widest"
              style={{ fontFamily: "'Bebas Neue',sans-serif", color: '#38BDF8' }}>
            CARD SHOP
          </h1>
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: '#F97316' }}>
            EPでカードパックを購入
          </p>
        </div>
        <div className="hud-panel px-3 py-1.5 rounded-xl text-right"
             style={{ borderColor: 'rgba(249,115,22,0.3)' }}>
          <span className="text-[10px] font-bold block" style={{ color: '#F97316' }}>EP</span>
          <span className="text-base sm:text-xl font-black font-mono" style={{ color: '#FB923C' }}>
            {mathPoints.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full max-w-6xl mx-auto">
          {PACKS.map(pack => (
            <div key={pack.type}
                 className="hud-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center shadow-xl
                            transition-all duration-200 hover:scale-[1.02] group cursor-pointer"
                 style={{ borderColor: `${pack.color}25` }}
                 onClick={() => handleBuy(pack.categories, pack.cost, pack.type)}>
              {/* Pack art */}
              <div className="w-full aspect-square max-h-20 sm:max-h-28 rounded-lg sm:rounded-xl mb-2 sm:mb-3
                              flex items-center justify-center relative overflow-hidden"
                   style={{ background: `linear-gradient(135deg,${pack.color}15,${pack.color}05)`,
                            border: `1px solid ${pack.color}20` }}>
                <div className="absolute inset-0 opacity-5"
                     style={{ background: `repeating-linear-gradient(45deg,transparent,transparent 3px,${pack.color} 3px,${pack.color} 4px)` }} />
                <span className="text-2xl sm:text-4xl font-black z-10 group-hover:scale-110 transition-transform duration-300"
                      style={{ fontFamily: "'Bebas Neue',sans-serif", color: pack.color,
                               textShadow: `0 0 16px ${pack.color}80` }}>
                  {pack.grade}
                </span>
              </div>

              <h2 className="text-xs sm:text-sm font-black text-white text-center leading-tight mb-1 sm:mb-2">
                {pack.type}
              </h2>
              <p className="text-[9px] sm:text-[10px] text-slate-500 text-center leading-tight mb-2 sm:mb-3 flex-1">
                {pack.desc}
              </p>

              <button
                onClick={e => { e.stopPropagation(); handleBuy(pack.categories, pack.cost, pack.type); }}
                disabled={mathPoints < pack.cost}
                className="w-full py-1.5 sm:py-2 rounded-lg font-black text-[10px] sm:text-xs tracking-wider
                           transition-all duration-200"
                style={mathPoints < pack.cost
                  ? { background: 'rgba(255,255,255,0.04)', color: '#475569', border: '1px solid rgba(255,255,255,0.08)', cursor: 'not-allowed' }
                  : { background: `${pack.color}15`, color: pack.color, border: `1px solid ${pack.color}40` }}
              >
                {pack.cost} EP
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardShop;
