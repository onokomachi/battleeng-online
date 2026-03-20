import React, { useEffect, useRef } from 'react';

/**
 * SpeedBackground — 漫画的スピードライン背景（超太ストライプ）
 *
 * 参照画像のような太い平行斜め帯が高速で流れる表現。
 * 色は現在のUIカラー：ディープネイビー地 + スカイブルー + オレンジ帯
 */

interface Stripe {
  y: number;       // 上端Y（画面座標）
  width: number;   // 帯の幅
  speed: number;   // 移動速度
  color: 'blue' | 'blue-light' | 'orange' | 'navy';
  alpha: number;
}

// 斜め角度（左下→右上）
const ANGLE_DEG = -28;
const ANGLE = (ANGLE_DEG * Math.PI) / 180;
const TAN   = Math.tan(-ANGLE);         // ≈ 0.53

const GravityBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // ── Stripe generation ──────────────────────────────────────
    /**
     * ストライプは傾いた帯として描画。
     * 各帯は「画面横幅 + 高さ の対角線」をカバーする長い線として描く。
     * y は帯の上辺の Y 位置（Xオフセット付き）
     */
    const spawnStripe = (startY?: number): Stripe => {
      const roll = Math.random();
      const color: Stripe['color'] =
        roll < 0.40 ? 'blue'
        : roll < 0.65 ? 'blue-light'
        : roll < 0.78 ? 'navy'
        : 'orange';
      return {
        y: startY ?? Math.random() * (H * 2.5) - H * 0.8,
        width: color === 'orange' ? 18 + Math.random() * 28
             : color === 'navy'   ? 30 + Math.random() * 60
             : color === 'blue'   ? 22 + Math.random() * 50
             :                      8  + Math.random() * 20,
        speed: 2.5 + Math.random() * 3.5,
        alpha: color === 'navy' ? 0.3 + Math.random() * 0.25
             : color === 'orange' ? 0.55 + Math.random() * 0.35
             : 0.25 + Math.random() * 0.35,
        color,
      };
    };

    // 画面を埋めるストライプ群を初期化
    const STRIPE_COUNT = 18;
    const stripes: Stripe[] = [];
    for (let i = 0; i < STRIPE_COUNT; i++) {
      stripes.push(spawnStripe(Math.random() * H * 2.2 - H * 0.6));
    }

    // ── Color map ──────────────────────────────────────────────
    const colorOf = (s: Stripe, a: number): string => {
      switch (s.color) {
        case 'blue':       return `rgba(56,189,248,${a})`;
        case 'blue-light': return `rgba(125,211,252,${a})`;
        case 'orange':     return `rgba(249,115,22,${a})`;
        case 'navy':       return `rgba(14,50,90,${a})`;
      }
    };

    // ── Draw a diagonal stripe ─────────────────────────────────
    /**
     * 帯を平行四辺形で描く。
     * 傾き方向: 右に行くほど上に上がる（左下→右上）
     * 左端の帯の上辺Y = s.y - TAN * 0 = s.y
     * 右端の帯の上辺Y = s.y - TAN * W
     */
    const drawStripe = (s: Stripe) => {
      const dx = TAN * W;           // Yシフト量(水平方向W分)
      // 四頂点
      const x0 = -100, y0 = s.y;
      const x1 = W + 100, y1 = s.y - TAN * (W + 200);
      const x2 = x1, y2 = y1 + s.width;
      const x3 = x0, y3 = y0 + s.width;

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();

      // グラデーション（帯の厚み方向）
      const mid = { x: (x0 + x1) / 2, y: (y0 + y1) / 2 + s.width * 0.5 };
      const perp = { x: Math.cos(ANGLE + Math.PI / 2), y: Math.sin(ANGLE + Math.PI / 2) };
      const grad = ctx.createLinearGradient(
        mid.x - perp.x * s.width * 0.5, mid.y - perp.y * s.width * 0.5,
        mid.x + perp.x * s.width * 0.5, mid.y + perp.y * s.width * 0.5,
      );
      grad.addColorStop(0,   colorOf(s, 0));
      grad.addColorStop(0.2, colorOf(s, s.alpha));
      grad.addColorStop(0.5, colorOf(s, s.alpha * 1.15));
      grad.addColorStop(0.8, colorOf(s, s.alpha));
      grad.addColorStop(1,   colorOf(s, 0));
      ctx.fillStyle = grad;
      ctx.fill();
    };

    // ── Background ─────────────────────────────────────────────
    const drawBg = () => {
      const bg = ctx.createLinearGradient(0, 0, W * 0.5, H);
      bg.addColorStop(0,   '#081628');
      bg.addColorStop(0.5, '#0B1E38');
      bg.addColorStop(1,   '#081628');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
    };

    // ── Resize ────────────────────────────────────────────────
    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', handleResize);

    // ── Static render (reduced-motion) ─────────────────────────
    if (prefersReducedMotion) {
      drawBg();
      stripes.forEach(s => drawStripe(s));
      return () => window.removeEventListener('resize', handleResize);
    }

    // ── Animation ─────────────────────────────────────────────
    let animFrameId: number | null = null;
    let isPaused = false;

    const handleVisibility = () => {
      if (document.hidden) {
        isPaused = true;
        if (animFrameId !== null) { cancelAnimationFrame(animFrameId); animFrameId = null; }
      } else {
        isPaused = false;
        if (animFrameId === null) animFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      if (isPaused) return;

      drawBg();

      // Orange subtle center glow
      const vign = ctx.createRadialGradient(W * 0.3, H * 0.5, 0, W * 0.3, H * 0.5, W * 0.7);
      vign.addColorStop(0, 'rgba(249,115,22,0.05)');
      vign.addColorStop(1, 'transparent');
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, W, H);

      // Draw stripes (sorted by alpha for correct layering)
      stripes
        .slice()
        .sort((a, b) => (a.color === 'navy' ? -1 : b.color === 'navy' ? 1 : 0))
        .forEach(s => drawStripe(s));

      // Update positions — stripes move diagonally (down-right)
      stripes.forEach(s => {
        s.y += s.speed;
        // When the top of the stripe exits the bottom of screen, recycle
        if (s.y > H + 200) {
          Object.assign(s, spawnStripe(-s.width - 50));
        }
      });

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#081628' }}
    />
  );
};

export default GravityBackground;
