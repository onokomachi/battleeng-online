/**
 * ClassBattleBoard.tsx — 月間学校対抗ランキング「ENG WARS」
 *
 * スコア計算式:
 *   総合スコア = (1人あたり平均MP × 0.4) + (平均正答率 × 0.3) + (参加率 × 0.3)
 *
 * Firestore最適化:
 *   - schoolStatsCache/{monthKey} コレクションにキャッシュ済み集計を保存
 *   - キャッシュTTL: 1時間
 */
import React, { useEffect, useState } from 'react';
import {
  collection, getDocs, doc, getDoc, setDoc, query, where, type Firestore,
} from 'firebase/firestore';
import { ISESAKI_SCHOOLS } from '../constants';

interface SchoolStats {
  school: string;
  shortName: string;
  memberCount: number;
  activeCount: number;
  totalMp: number;
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
  currentSchool?: string;
}

const getMonthLabel = (): string => {
  const now = new Date();
  return `${now.getFullYear()}年${now.getMonth() + 1}月`;
};

const getMonthKey = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const calcCompositeScore = (avgMp: number, avgAccuracy: number, participationRate: number): number =>
  avgMp * 0.4 + avgAccuracy * 0.3 + participationRate * 0.3;

const CACHE_TTL_MS = 60 * 60 * 1000; // 1時間

const ClassBattleBoard: React.FC<ClassBattleBoardProps> = ({ db, onClose, currentSchool }) => {
  const [schoolStats, setSchoolStats] = useState<SchoolStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'cache' | 'live' | ''>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const monthKey = getMonthKey();
      try {
        // Step 1: キャッシュ確認
        const cacheRef = doc(db, 'schoolStatsCache', monthKey);
        const cacheSnap = await getDoc(cacheRef);
        if (cacheSnap.exists()) {
          const cached = cacheSnap.data();
          if (Date.now() - (cached.updatedAt || 0) < CACHE_TTL_MS && cached.stats) {
            setSchoolStats(cached.stats as SchoolStats[]);
            setDataSource('cache');
            setLoading(false);
            return;
          }
        }

        // Step 2: 全ユーザースキャン
        const usersSnap = await getDocs(
          query(collection(db, 'users'), where('studentProfile', '!=', null))
        );

        // 学校マップ初期化（全12校を含める）
        const schoolMap = new Map<string, {
          members: number; active: number;
          totalMp: number; totalCorrect: number; totalAnswered: number;
        }>();
        ISESAKI_SCHOOLS.forEach(s => {
          schoolMap.set(s.name, { members: 0, active: 0, totalMp: 0, totalCorrect: 0, totalAnswered: 0 });
        });

        usersSnap.forEach(docSnap => {
          const d = docSnap.data();
          const sp = d.studentProfile;
          if (!sp?.school) return;
          // 既知の学校のみ集計（未設定・旧データは除外）
          if (!schoolMap.has(sp.school)) return;

          const entry = schoolMap.get(sp.school)!;
          entry.members++;
          if ((d.lastLoginDate || '').startsWith(monthKey)) entry.active++;
          entry.totalMp += d.mathPoints || 0;
          entry.totalCorrect += d.totalCorrectAnswers || 0;
          const answered = (d.totalCorrectAnswers || 0) + Math.floor((d.totalMatches || 0) * 3);
          entry.totalAnswered += Math.max(answered, d.totalCorrectAnswers || 0);
        });

        const stats: SchoolStats[] = [];
        schoolMap.forEach((data, schoolName) => {
          if (data.members === 0) return; // 登録者ゼロは表示しない
          const avgMp = Math.round(data.totalMp / data.members);
          const avgAccuracy = data.totalAnswered > 0
            ? Math.round((data.totalCorrect / data.totalAnswered) * 100) : 0;
          const participationRate = Math.round((data.active / data.members) * 100);
          const shortName = ISESAKI_SCHOOLS.find(s => s.name === schoolName)?.short ?? schoolName;
          stats.push({
            school: schoolName,
            shortName,
            memberCount: data.members,
            activeCount: data.active,
            totalMp: data.totalMp,
            avgMp,
            totalCorrect: data.totalCorrect,
            totalAnswered: data.totalAnswered,
            avgAccuracy,
            participationRate,
            compositeScore: calcCompositeScore(avgMp, avgAccuracy, participationRate),
          });
        });

        stats.sort((a, b) => b.compositeScore - a.compositeScore);
        setSchoolStats(stats);
        setDataSource('live');

        // Step 3: キャッシュ更新
        setDoc(cacheRef, { stats, updatedAt: Date.now(), month: monthKey }).catch(() => {});
      } catch (e) {
        console.error('SchoolBattle fetch error:', e);
      }
      setLoading(false);
    };
    fetchData();
  }, [db]);

  const getRankIcon = (rank: number) => rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}`;
  const getRankReward = (rank: number) => {
    if (rank === 1) return '3000 MP + 限定バッジ + 称号';
    if (rank === 2) return '2000 MP + レアバッジ';
    if (rank === 3) return '1200 MP + バッジ';
    return '500 MP (参加賞)';
  };

  const maxAvgMp = Math.max(...schoolStats.map(s => s.avgMp), 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-math-fade-in">
      <div className="w-full max-w-3xl mx-4 max-h-[90vh] bg-slate-950/95 border border-amber-500/30 rounded-2xl shadow-[0_0_80px_rgba(245,158,11,0.1)] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-amber-900/30 p-5 border-b border-amber-500/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white tracking-wider flex items-center gap-2">
                <span className="text-amber-400">⚔</span> ENG WARS
              </h2>
              <p className="text-xs text-amber-400 mt-1 font-bold">
                {getMonthLabel()} 学校対抗ランキング
              </p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl transition-colors">✕</button>
          </div>
          <div className="mt-3 p-2 bg-slate-900/60 rounded-lg border border-amber-900/30">
            <p className="text-[10px] text-gray-400 font-mono">
              総合スコア = 1人あたりMP(40%) + 正答率(30%) + 参加率(30%)
              {dataSource === 'cache' && <span className="ml-2 text-gray-600">(cached)</span>}
            </p>
          </div>
        </div>

        {/* Rankings */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="text-center text-gray-500 py-12 font-mono text-sm">データ集計中...</div>
          ) : schoolStats.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg mb-2">まだデータがありません</p>
              <p className="text-xs">学校を設定して問題を解くと学校に貢献できます</p>
            </div>
          ) : (
            schoolStats.map((s, idx) => {
              const rank = idx + 1;
              const isMySchool = s.school === currentSchool;
              const isTop3 = rank <= 3;
              return (
                <div
                  key={s.school}
                  className={`rounded-xl p-4 border-2 transition-all ${
                    isMySchool
                      ? 'border-cyan-400/50 bg-cyan-900/10 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                      : isTop3
                        ? 'border-amber-500/30 bg-amber-900/5'
                        : 'border-slate-700/30 bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-10 text-center flex-shrink-0 ${isTop3 ? 'text-2xl' : 'text-lg text-gray-500 font-mono'}`}>
                      {getRankIcon(rank)}
                    </div>

                    {/* School info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`font-black text-lg ${isMySchool ? 'text-cyan-300' : 'text-white'}`}>
                          {s.shortName}
                        </span>
                        {isMySchool && (
                          <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-bold border border-cyan-500/30">
                            MY SCHOOL
                          </span>
                        )}
                        <span className="text-[10px] text-gray-600 ml-auto">
                          {s.activeCount}/{s.memberCount}人参加
                        </span>
                      </div>

                      {/* Stats bars */}
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <div className="flex justify-between text-[9px] mb-0.5">
                            <span className="text-amber-400 font-bold">1人あたりMP</span>
                            <span className="text-gray-400">{s.avgMp.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div className="bg-amber-500/70 h-full rounded-full transition-all duration-1000"
                                 style={{ width: `${Math.min(100, (s.avgMp / maxAvgMp) * 100)}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[9px] mb-0.5">
                            <span className="text-green-400 font-bold">正答率</span>
                            <span className="text-gray-400">{s.avgAccuracy}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div className="bg-green-500/70 h-full rounded-full transition-all duration-1000"
                                 style={{ width: `${s.avgAccuracy}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[9px] mb-0.5">
                            <span className="text-blue-400 font-bold">参加率</span>
                            <span className="text-gray-400">{s.participationRate}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div className="bg-blue-500/70 h-full rounded-full transition-all duration-1000"
                                 style={{ width: `${s.participationRate}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className={`text-2xl font-black font-mono ${isTop3 ? 'text-amber-400' : 'text-gray-300'}`}>
                        {Math.round(s.compositeScore)}
                      </div>
                      <div className="text-[9px] text-gray-600 font-bold">SCORE</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-900/20 bg-slate-900/40 flex-shrink-0">
          <p className="text-[10px] text-gray-500 font-bold mb-2">月末報酬（学校の登録者全員に配布）</p>
          <div className="flex gap-3 text-[10px] flex-wrap">
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
