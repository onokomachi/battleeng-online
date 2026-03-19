import React, { useEffect, useRef } from 'react';

/**
 * SportsBackground — 省電力版
 * スポーツアリーナ風の動的背景
 * - ネイビー系ベース + スカイブルーグリッド
 * - 重力波エフェクト（タブ非表示時停止）
 * - prefers-reduced-motion 対応
 */
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

    const gridSize = 72;
    const points: { x: number; y: number; ox: number; oy: number }[] = [];
    let cols = Math.ceil((width + gridSize * 2) / gridSize) + 1;
    let rows = Math.ceil((height + gridSize * 2) / gridSize) + 1;

    // Sports field base gradient colors
    const BG_TOP    = '#0B1D35';
    const BG_BOTTOM = '#0F2444';
    const GRID_COLOR = 'rgba(56, 189, 248, 0.10)';   // sky-blue subtle
    const DOT_COLOR  = 'rgba(56, 189, 248, 0.35)';
    const ACCENT_COLOR = 'rgba(249, 115, 22, 0.06)';  // orange subtle glow

    const initPoints = () => {
      points.length = 0;
      cols = Math.ceil((width + gridSize * 2) / gridSize) + 1;
      rows = Math.ceil((height + gridSize * 2) / gridSize) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gridSize - gridSize;
          const y = r * gridSize - gridSize;
          points.push({ x, y, ox: x, oy: y });
        }
      }
    };
    initPoints();

    let time = 0;
    let animFrameId: number | null = null;
    let isPaused = false;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initPoints();
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

    const drawBackground = () => {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, BG_TOP);
      grad.addColorStop(1, BG_BOTTOM);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle orange glow at center (like stadium spotlight)
      const radGrad = ctx.createRadialGradient(width / 2, height * 0.4, 0, width / 2, height * 0.4, width * 0.6);
      radGrad.addColorStop(0, ACCENT_COLOR);
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStaticGrid = () => {
      drawBackground();
      ctx.beginPath();
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = points[idx];
          if (!p) continue;
          if (c < cols - 1) {
            const np = points[idx + 1];
            if (np) { ctx.moveTo(p.ox, p.oy); ctx.lineTo(np.ox, np.oy); }
          }
          if (r < rows - 1) {
            const np = points[idx + cols];
            if (np) { ctx.moveTo(p.ox, p.oy); ctx.lineTo(np.ox, np.oy); }
          }
        }
      }
      ctx.stroke();
    };

    if (prefersReducedMotion) {
      drawStaticGrid();
      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibility);
      };
    }

    const animate = () => {
      if (isPaused) return;
      time += 0.008;

      drawBackground();

      // Slow gentle wave — 1 gravity well
      const offsetX = Math.cos(time * 0.35) * (width * 0.22);
      const offsetY = Math.sin(time * 0.5) * (height * 0.22);
      const w1 = { x: width / 2 + offsetX, y: height / 2 + offsetY };
      const w2 = { x: width / 2 - offsetX, y: height / 2 - offsetY };

      points.forEach(p => {
        const dx1 = p.ox - w1.x; const dy1 = p.oy - w1.y;
        const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const force1 = Math.max(0, (480 - dist1) / 480);
        const str1 = 90 * force1;
        const ang1 = Math.atan2(dy1, dx1);

        const dx2 = p.ox - w2.x; const dy2 = p.oy - w2.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const force2 = Math.max(0, (480 - dist2) / 480);
        const str2 = 90 * force2;
        const ang2 = Math.atan2(dy2, dx2);

        p.x = p.ox + Math.cos(ang1) * str1 + Math.cos(ang2) * str2
               + Math.cos(time + p.oy * 0.005) * 6;
        p.y = p.oy + Math.sin(ang1) * str1 + Math.sin(ang2) * str2
               + Math.sin(time + p.ox * 0.005) * 6;
      });

      // Grid lines
      ctx.beginPath();
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = points[idx];
          if (!p) continue;
          if (c < cols - 1) {
            const np = points[idx + 1];
            if (np) { ctx.moveTo(p.x, p.y); ctx.lineTo(np.x, np.y); }
          }
          if (r < rows - 1) {
            const np = points[idx + cols];
            if (np) { ctx.moveTo(p.x, p.y); ctx.lineTo(np.x, np.y); }
          }
        }
      }
      ctx.stroke();

      // Intersection dots
      ctx.fillStyle = DOT_COLOR;
      points.forEach((p, i) => {
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
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
