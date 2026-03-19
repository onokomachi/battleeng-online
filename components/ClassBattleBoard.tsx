/**
 * ClassBattleBoard.tsx — 月間クラス対抗ランキング「MATH WARS」
 *
 * エビデンスベース設計:
 *   - エビデンスA: グループ内協力＋グループ間競争（Johnson et al. 1981, 122研究メタ分析, d=0.49）
 *   - エビデンスA: STAD型 — 1人あたり改善度でチーム貢献（Slavin 1995）
 *   - エビデンスB: 月単位リセット + 週次サブ集計（Landers & Landers 2015）
 *   - エビデンスB: 敗者動機維持 — 学習フレーミング + 参加賞（Hanus & Fox 2015）
 *
 * スコア計算式:
 *   総合スコア = (1人あたり平均MP × 0.4) + (平均正答率 × 0.3) + (参加率 × 0.3)
 *
 * Firestore最適化 (Phase 1):
 *   - classStats/{monthKey} コレクションにキャッシュ済み集計を保存
 *   - 表示時: キャッシュがあれば1 read、なければ全ユーザーscan + キャッシュ書き込み
 *   - キャッシュTTL: 1時間（同日内の再表示は0 read）
 */
import React, { useEffect, useState, useMemo } from 'react';
import {
  collection, getDocs, doc, getDoc, setDoc, query, where, type Firestore,
} from 'firebase/firestore';

interface ClassStats {
  grade: number;
  classNum: number;
  label: string;
  memberCount: number;
  activeCount: number;
  totalMpEarned: number;
  avgMp: number;
  totalCorrect: number;
  totalAnswered: number;
  avgAccuracy: number;
  participationRate: number;
  compositeScore: number;
}

interface ClassBattleBoardProps {
  db: Firestore;
  onClose: () => void;
  currentGrade?: number;
  currentClass?: number;
}

const getMonthLabel = (): string => {
  const now = new Date();
  return `${now.getFullYear()}年${now.getMonth() + 1}月`;
};

const getMonthKey = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const calcCompositeScore = (avgMp: number, avgAccuracy: number, participationRate: number): number => {
  const mpComponent = avgMp * 0.4;
  const accComponent = avgAccuracy * 0.3;
  const partComponent = participationRate * 0.3;
  return mpComponent + accComponent + partComponent;
};

// キャッシュTTL: 1時間（ミリ秒）
const CACHE_TTL_MS = 60 * 60 * 1000;

const ClassBattleBoard: React.FC<ClassBattleBoardProps> = ({
  db, onClose, currentGrade, currentClass,
}) => {
  const [classStats, setClassStats] = useState<ClassStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState<number>(currentGrade || 0);
  const [dataSource, setDataSource] = useState<'cache' | 'live' | ''>('');

  useEffect(() => {
    const fetchClassData = async () => {
      setLoading(true);
      const monthKey = getMonthKey();

      try {
        // Step 1: キャッシュ確認（1 read）
        const cacheRef = doc(db, 'classStatsCache', monthKey);
        const cacheSnap = await getDoc(cacheRef);

        if (cacheSnap.exists()) {
          const cached = cacheSnap.data();
          const cachedAt = cached.updatedAt || 0;
          const age = Date.now() - cachedAt;

          if (age < CACHE_TTL_MS && cached.stats) {
            // キャッシュが新鮮 → そのまま使用（0 additional reads）
            setClassStats(cached.stats as ClassStats[]);
            setDataSource('cache');
            setLoading(false);
            return;
          }
        }

        // Step 2: キャッシュなし or 期限切れ → 全ユーザーscan
        const usersSnap = await getDocs(
          query(collection(db, 'users'), where('studentProfile', '!=', null))
        );

        const classMap = new Map<string, {
          grade: number;
          classNum: number;
          members: number;
          active: number;
          totalMp: number;
          totalCorrect: number;
          totalAnswered: number;
        }>();

        usersSnap.forEach(docSnap => {
          const d = docSnap.data();
          const sp = d.studentProfile;
          if (!sp || !sp.grade || !sp.classNum) return;

          const key = `${sp.grade}-${sp.classNum}`;
          if (!classMap.has(key)) {
            classMap.set(key, {
              grade: sp.grade,
              classNum: sp.classNum,
              members: 0,
              active: 0,
              totalMp: 0,
              totalCorrect: 0,
              totalAnswered: 0,
            });
          }

          const entry = classMap.get(key)!;
          entry.members++;

          const lastLogin: string = d.lastLoginDate || '';
          if (lastLogin.startsWith(monthKey)) {
            entry.active++;
          }

          entry.totalMp += (d.mathPoints || 0);
          entry.totalCorrect += (d.totalCorrectAnswers || 0);
          const answered = (d.totalCorrectAnswers || 0) + Math.floor((d.totalMatches || 0) * 3);
          entry.totalAnswered += Math.max(answered, d.totalCorrectAnswers || 0);
        });

        const stats: ClassStats[] = [];
        classMap.forEach((data) => {
          const avgMp = data.members > 0 ? Math.round(data.totalMp / data.members) : 0;
          const avgAccuracy = data.totalAnswered > 0
            ? Math.round((data.totalCorrect / data.totalAnswered) * 100)
            : 0;
          const participationRate = data.members > 0
            ? Math.round((data.active / data.members) * 100)
            : 0;

          stats.push({
            grade: data.grade,
            classNum: data.classNum,
            label: `${data.grade}年${data.classNum}組`,
            memberCount: data.members,
            activeCount: data.active,
            totalMpEarned: data.totalMp,
            avgMp,
            totalCorrect: data.totalCorrect,
            totalAnswered: data.totalAnswered,
            avgAccuracy,
            participationRate,
            compositeScore: calcCompositeScore(avgMp, avgAccuracy, participationRate),
          });
        });

        stats.sort((a, b) => b.compositeScore - a.compositeScore);
        setClassStats(stats);
        setDataSource('live');

        // Step 3: キャッシュに書き込み（次回は1 readで済む）
        setDoc(cacheRef, {
          stats,
          updatedAt: Date.now(),
          month: monthKey,
        }).catch(() => {}); // fire-and-forget
      } catch (e) {
        console.error('ClassBattle fetch error:', e);
      }
      setLoading(false);
    };

    fetchClassData();
  }, [db]);

  const filteredStats = useMemo(() => {
    if (selectedGrade === 0) return classStats;
    return classStats.filter(s => s.grade === selectedGrade);
  }, [classStats, selectedGrade]);

  const grades = useMemo(() => {
    const set = new Set(classStats.map(s => s.grade));
    return Array.from(set).sort();
  }, [classStats]);

  const getRankIcon = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  const getRankReward = (rank: number): string => {
    if (rank === 1) return '3000 MP + 限定バッジ + 称号';
    if (rank === 2) return '2000 MP + レアバッジ';
    if (rank === 3) return '1200 MP + バッジ';
    return '500 MP (参加賞)';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-math-fade-in">
      <div className="w-full max-w-3xl mx-4 max-h-[90vh] bg-slate-950/95 border border-amber-500/30 rounded-2xl shadow-[0_0_80px_rgba(245,158,11,0.1)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-amber-900/30 p-5 border-b border-amber-500/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white tracking-wider flex items-center gap-2">
                <span className="text-amber-400">⚔</span> MATH WARS
              </h2>
              <p className="text-xs text-amber-400 mt-1 font-bold">
                {getMonthLabel()} クラス対抗ランキング
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Score formula explanation */}
          <div className="mt-3 p-2 bg-slate-900/60 rounded-lg border border-amber-900/30">
            <p className="text-[10px] text-gray-400 font-mono">
              総合スコア = 1人あたりMP(40%) + 正答率(30%) + 参加率(30%)
              {dataSource === 'cache' && <span className="ml-2 text-gray-600">(cached)</span>}
            </p>
          </div>
        </div>

        {/* Grade filter */}
        <div className="p-3 border-b border-amber-900/20 flex gap-2 flex-shrink-0">
          <button
            onClick={() => setSelectedGrade(0)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedGrade === 0
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-gray-500 border border-transparent hover:text-gray-300'
            }`}
          >
            全学年
          </button>
          {grades.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedGrade === g
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'text-gray-500 border border-transparent hover:text-gray-300'
              }`}
            >
              {g}年生
            </button>
          ))}
        </div>

        {/* Rankings */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="text-center text-gray-500 py-12 font-mono text-sm">
              データ集計中...
            </div>
          ) : filteredStats.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg mb-2">まだデータがありません</p>
              <p className="text-xs">学年・組を設定して問題を解くとクラスに貢献できます</p>
            </div>
          ) : (
            filteredStats.map((cls, idx) => {
              const rank = idx + 1;
              const isMyClass = cls.grade === currentGrade && cls.classNum === currentClass;
              const isTop3 = rank <= 3;

              return (
                <div
                  key={`${cls.grade}-${cls.classNum}`}
                  className={`
                    rounded-xl p-4 border-2 transition-all
                    ${isMyClass
                      ? 'border-cyan-400/50 bg-cyan-900/10 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                      : isTop3
                        ? 'border-amber-500/30 bg-amber-900/5'
                        : 'border-slate-700/30 bg-slate-900/30'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-10 text-center flex-shrink-0 ${isTop3 ? 'text-2xl' : 'text-lg text-gray-500 font-mono'}`}>
                      {getRankIcon(rank)}
                    </div>

                    {/* Class info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-black text-lg ${isMyClass ? 'text-cyan-300' : 'text-white'}`}>
                          {cls.label}
                        </span>
                        {isMyClass && (
                          <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-bold border border-cyan-500/30">
                            MY CLASS
                          </span>
                        )}
                        <span className="text-[10px] text-gray-600 ml-auto">
                          {cls.activeCount}/{cls.memberCount}人参加
                        </span>
                      </div>

                      {/* Stats bars */}
                      <div className="grid grid-cols-3 gap-3">
                        {/* Avg MP */}
                        <div>
                          <div className="flex justify-between text-[9px] mb-0.5">
                            <span className="text-amber-400 font-bold">1人あたりMP</span>
                            <span className="text-gray-400">{cls.avgMp.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div
                              className="bg-amber-500/70 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${Math.min(100, (cls.avgMp / Math.max(...filteredStats.map(s => s.avgMp), 1)) * 100)}%` }}
                            />
                          </div>
                        </div>

                        {/* Accuracy */}
                        <div>
                          <div className="flex justify-between text-[9px] mb-0.5">
                            <span className="text-green-400 font-bold">正答率</span>
                            <span className="text-gray-400">{cls.avgAccuracy}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div
                              className="bg-green-500/70 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${cls.avgAccuracy}%` }}
                            />
                          </div>
                        </div>

                        {/* Participation */}
                        <div>
                          <div className="flex justify-between text-[9px] mb-0.5">
                            <span className="text-blue-400 font-bold">参加率</span>
                            <span className="text-gray-400">{cls.participationRate}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div
                              className="bg-blue-500/70 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${cls.participationRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className={`text-2xl font-black font-mono ${isTop3 ? 'text-amber-400' : 'text-gray-300'}`}>
                        {Math.round(cls.compositeScore)}
                      </div>
                      <div className="text-[9px] text-gray-600 font-bold">SCORE</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer: Rewards info */}
        <div className="p-4 border-t border-amber-900/20 bg-slate-900/40 flex-shrink-0">
          <p className="text-[10px] text-gray-500 font-bold mb-2">月末報酬（クラス全員に配布）</p>
          <div className="flex gap-3 text-[10px]">
            <span className="text-amber-400">🥇 {getRankReward(1)}</span>
            <span className="text-gray-400">🥈 {getRankReward(2)}</span>
            <span className="text-gray-400">🥉 {getRankReward(3)}</span>
            <span className="text-gray-600">参加: {getRankReward(4)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassBattleBoard;
