import React, { useEffect, useRef } from 'react';

/**
 * SpeedBackground — 疾走感のある動的スポーツ背景
 *
 * デザイン:
 *   - ディープネイビーグラデーション（スポーツアリーナ）
 *   - 斜め方向に流れるスピードライン（スカイブルー＋オレンジ）
 *   - 奥行き感を出す短い残光パーティクル
 *   - 省電力: タブ非表示で停止、prefers-reduced-motion 対応
 */

interface SpeedLine {
  x: number;      // 現在X位置
  y: number;      // 固定Y位置
  len: number;    // 線の長さ
  speed: number;  // 移動速度
  alpha: number;  // 透明度
  width: number;  // 線幅
  color: 'blue' | 'orange' | 'white';
  angle: number;  // ラジアン（斜め角度）
}

const GravityBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // ── Spawn a speed line ───────────────────────────────────────
    const ANGLE = -Math.PI / 9; // 約 −20°（右斜め上方向）
    const cosA = Math.cos(ANGLE);
    const sinA = Math.sin(ANGLE);

    const spawnLine = (): SpeedLine => {
      const roll = Math.random();
      const color: SpeedLine['color'] =
        roll < 0.65 ? 'blue' : roll < 0.88 ? 'white' : 'orange';
      return {
        x: -200 - Math.random() * width * 0.5,       // 画面左外からスタート
        y: Math.random() * (height * 1.6) - height * 0.3,
        len: 60 + Math.random() * 220,
        speed: 3.5 + Math.random() * 6,
        alpha: 0.08 + Math.random() * 0.22,
        width: 0.5 + Math.random() * 1.5,
        color,
        angle: ANGLE + (Math.random() - 0.5) * 0.08, // わずかなばらつき
      };
    };

    const LINE_COUNT = Math.min(80, Math.floor((width * height) / 12000));
    const lines: SpeedLine[] = Array.from({ length: LINE_COUNT }, () => {
      const l = spawnLine();
      l.x = Math.random() * width * 1.8 - width * 0.4; // 最初は画面内にも配置
      return l;
    });

    let animFrameId: number | null = null;
    let isPaused = false;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    const handleVisibility = () => {
      if (document.hidden) {
        isPaused = true;
        if (animFrameId !== null) { cancelAnimationFrame(animFrameId); animFrameId = null; }
      } else {
        isPaused = false;
        if (animFrameId === null) animFrameId = requestAnimationFrame(animate);
      }
    };
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    // ── Color lookup ──────────────────────────────────────────────
    const lineColor = (l: SpeedLine, alpha: number) => {
      if (l.color === 'blue')   return `rgba(56,189,248,${alpha})`;
      if (l.color === 'orange') return `rgba(249,115,22,${alpha})`;
      return `rgba(255,255,255,${alpha})`;
    };

    // ── Static frame (reduced-motion) ────────────────────────────
    const drawStatic = () => {
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, '#0B1D35');
      bg.addColorStop(1, '#0F2444');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      lines.forEach(l => {
        const cos = Math.cos(l.angle); const sin = Math.sin(l.angle);
        const x2 = l.x + cos * l.len;
        const y2 = l.y + sin * l.len;
        const grad = ctx.createLinearGradient(l.x, l.y, x2, y2);
        grad.addColorStop(0, lineColor(l, 0));
        grad.addColorStop(0.5, lineColor(l, l.alpha * 0.6));
        grad.addColorStop(1, lineColor(l, 0));
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = l.width;
        ctx.stroke();
      });
    };

    if (prefersReducedMotion) {
      drawStatic();
      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibility);
      };
    }

    // ── Animated frame ───────────────────────────────────────────
    let time = 0;
    const animate = () => {
      if (isPaused) return;
      time += 0.012;

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, width * 0.6, height);
      bg.addColorStop(0, '#0B1D35');
      bg.addColorStop(0.5, '#0E2040');
      bg.addColorStop(1, '#0B1D35');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Subtle orange vignette from center-left
      const vign = ctx.createRadialGradient(
        width * 0.35, height * 0.5, 0,
        width * 0.35, height * 0.5, width * 0.65
      );
      vign.addColorStop(0, 'rgba(249,115,22,0.04)');
      vign.addColorStop(1, 'transparent');
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, width, height);

      // Draw + update speed lines
      lines.forEach(l => {
        const cos = Math.cos(l.angle);
        const sin = Math.sin(l.angle);

        // Tail → Head gradient
        const x2 = l.x + cos * l.len;
        const y2 = l.y + sin * l.len;
        const grad = ctx.createLinearGradient(l.x, l.y, x2, y2);
        grad.addColorStop(0, lineColor(l, 0));
        grad.addColorStop(0.3, lineColor(l, l.alpha * 0.4));
        grad.addColorStop(0.8, lineColor(l, l.alpha));
        grad.addColorStop(1, lineColor(l, l.alpha * 0.6));
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = l.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Head spark (small bright dot)
        if (l.alpha > 0.15) {
          ctx.beginPath();
          ctx.arc(x2, y2, l.width * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = lineColor(l, l.alpha * 0.8);
          ctx.fill();
        }

        // Move
        l.x += cos * l.speed;
        l.y += sin * l.speed;

        // Recycle when off-screen
        const offRight  = l.x > width  + 300;
        const offBottom = l.y > height + 300;
        if (offRight || offBottom) {
          Object.assign(l, spawnLine());
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
      style={{ background: '#0B1D35' }}
    />
  );
};

export default GravityBackground;
