import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export const ParticleBackground: React.FC<{ isLight?: boolean }> = ({ isLight = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    const colors = isLight
      ? ['rgba(14, 165, 233, ', 'rgba(139, 92, 246, ', 'rgba(99, 102, 241, ']
      : ['rgba(6, 182, 212, ', 'rgba(168, 85, 247, ', 'rgba(59, 130, 246, '];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles with subtle lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        else if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        else if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * (isLight ? 0.08 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLight]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Ambient gradient glows */}
      <div 
        className="absolute -top-[15%] left-[20%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[140px] opacity-25 dark:opacity-20 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(59,130,246,0.3) 50%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-[35%] -right-[10%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[150px] opacity-20 dark:opacity-15 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(236,72,153,0.2) 50%, transparent 70%)',
        }}
      />
      <div 
        className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[130px] opacity-15 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(6,182,212,0.2) 50%, transparent 70%)',
        }}
      />

      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-60" />

      {/* HTML5 Canvas for interactive floating particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
