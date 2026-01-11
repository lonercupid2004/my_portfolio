
import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Video, Gamepad2, Layers, Terminal, Zap, Target } from 'lucide-react';

interface ProcessPageProps {
  data: {
    languages: string[];
    videoUrl: string;
    gameSpeed: number;
    gameCharacter: string;
  };
}

const ProcessPage: React.FC<ProcessPageProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  // Game Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    const charImg = new Image();
    charImg.src = data.gameCharacter;

    const player = {
      x: 80,
      y: canvas.height / 2,
      width: 40,
      height: 30,
      speed: 6,
      targetY: canvas.height / 2
    };

    interface Bullet {
      x: number;
      y: number;
      speed: number;
      active: boolean;
    }

    interface Enemy {
      x: number;
      y: number;
      w: number;
      h: number;
      speed: number;
      hp: number;
      type: 'interceptor' | 'heavy' | 'scout';
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    }

    let bullets: Bullet[] = [];
    let enemies: Enemy[] = [];
    let particles: Particle[] = [];
    let bgX = 0;
    let keys: { [key: string]: boolean } = {};

    const resetGame = () => {
      setScore(0);
      bullets = [];
      enemies = [];
      particles = [];
      player.y = canvas.height / 2;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.code] = true;
      if (e.code === 'Space') fireBullet();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.code] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleY = canvas.height / rect.height;
      player.targetY = (e.clientY - rect.top) * scaleY;
    };

    const handleClick = () => fireBullet();

    const fireBullet = () => {
      bullets.push({
        x: player.x + player.width,
        y: player.y + player.height / 2,
        speed: 12,
        active: true
      });
    };

    const spawnEnemy = () => {
      const rand = Math.random();
      const y = Math.random() * (canvas.height - 150) + 50;
      if (rand < 0.7) {
        enemies.push({ x: canvas.width, y, w: 30, h: 30, speed: data.gameSpeed + 1, hp: 1, type: 'interceptor' });
      } else {
        enemies.push({ x: canvas.width, y, w: 50, h: 50, speed: data.gameSpeed - 1, hp: 3, type: 'heavy' });
      }
    };

    const createExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 1.0,
          color
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleClick);

    const update = () => {
      // Player Movement
      if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
      if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;
      
      // Smooth follow mouse if no keys
      if (!keys['ArrowUp'] && !keys['KeyW'] && !keys['ArrowDown'] && !keys['KeyS']) {
        player.y += (player.targetY - player.y - player.height / 2) * 0.15;
      }

      // Constrain player
      player.y = Math.max(20, Math.min(canvas.height - player.height - 20, player.y));

      // Spawn Enemies
      if (frameCount % 60 === 0) spawnEnemy();

      // Update Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.speed;
        if (b.x > canvas.width) bullets.splice(i, 1);
      }

      // Update Enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.x -= e.speed;

        // Collision with bullets
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (
            b.x < e.x + e.w &&
            b.x + 10 > e.x &&
            b.y < e.y + e.h &&
            b.y > e.y
          ) {
            e.hp--;
            bullets.splice(j, 1);
            createExplosion(e.x + e.w / 2, e.y + e.h / 2, '#ff0000');
            if (e.hp <= 0) {
              setScore(s => s + (e.type === 'heavy' ? 50 : 10));
              enemies.splice(i, 1);
              createExplosion(e.x + e.w / 2, e.y + e.h / 2, '#ffffff');
              break;
            }
          }
        }

        // Collision with player
        if (
          player.x < e.x + e.w &&
          player.x + player.width > e.x &&
          player.y < e.y + e.h &&
          player.y + player.height > e.y
        ) {
          resetGame();
          return;
        }

        if (e.x + e.w < -50) enemies.splice(i, 1);
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        if (p.life <= 0) particles.splice(i, 1);
      }

      bgX -= data.gameSpeed * 0.3;
      frameCount++;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Grid
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = (bgX % gridSize); x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Particles
      particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2, 2);
      });
      ctx.globalAlpha = 1.0;

      // Draw Enemies
      enemies.forEach(e => {
        ctx.fillStyle = '#0a0a0a';
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (e.type === 'heavy') {
          // Hexagon shape
          ctx.moveTo(e.x + 10, e.y);
          ctx.lineTo(e.x + e.w - 10, e.y);
          ctx.lineTo(e.x + e.w, e.y + e.h / 2);
          ctx.lineTo(e.x + e.w - 10, e.y + e.h);
          ctx.lineTo(e.x + 10, e.y + e.h);
          ctx.lineTo(e.x, e.y + e.h / 2);
        } else {
          // Diamond/Scout shape
          ctx.moveTo(e.x + e.w / 2, e.y);
          ctx.lineTo(e.x + e.w, e.y + e.h / 2);
          ctx.lineTo(e.x + e.w / 2, e.y + e.h);
          ctx.lineTo(e.x, e.y + e.h / 2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Internal glow
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fill();
      });

      // Draw Bullets
      ctx.fillStyle = '#ff0000';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff0000';
      bullets.forEach(b => {
        ctx.fillRect(b.x, b.y - 1, 15, 2);
      });
      ctx.shadowBlur = 0;

      // Draw Player
      ctx.save();
      ctx.translate(player.x, player.y);
      if (charImg.complete && charImg.naturalHeight !== 0) {
        ctx.drawImage(charImg, 0, 0, player.width, player.height);
      } else {
        // Interceptor Ship Silhouette
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(player.width, player.height / 2);
        ctx.lineTo(0, player.height);
        ctx.lineTo(10, player.height / 2);
        ctx.closePath();
        ctx.fill();
        // Thruster glow
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(-5, player.height / 2 - 2, 8, 4);
      }
      ctx.restore();

      // HUD
      ctx.fillStyle = '#fff';
      ctx.font = '16px Anton';
      ctx.textAlign = 'left';
      ctx.fillText(`TARGET_SCORE: ${score.toString().padStart(6, '0')}`, 20, 40);
      
      ctx.fillStyle = '#ff0000';
      ctx.font = '10px Inter';
      ctx.fillText(`SYSTEM_OVERRIDE_ACTIVE`, 20, 60);
      ctx.fillText(`SECTOR: CINEMATIC_A1`, 20, 75);
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    resetGame();
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleClick);
    };
  }, [data]);

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-20">
        <h1 className="font-heading text-7xl md:text-9xl tracking-tighter mb-4 animate-in slide-in-from-left duration-700">TECHNICAL PROCESS</h1>
        <div className="flex items-center gap-4">
          <div className="w-12 h-1 bg-red-600"></div>
          <p className="text-white/40 uppercase tracking-[0.5em] text-[10px] font-black">Backend Systems & Creative Engine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Code Languages */}
        <div className="lg:col-span-4 space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="text-red-600" size={20} />
              <h3 className="font-bold uppercase tracking-widest text-xs">Module Dependencies</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="bg-neutral-950 border border-white/5 p-6 hover:border-red-600/50 transition-all group relative overflow-hidden">
                  <span className="font-mono text-white/20 text-[10px] block mb-2 tracking-tighter">NODE_0{idx + 1}</span>
                  <span className="font-heading text-xl md:text-2xl block group-hover:text-red-600 transition-colors uppercase">{lang}</span>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-red-600/5 border border-red-600/20 p-8 space-y-4">
            <Cpu className="text-red-600 mb-2" size={32} />
            <h4 className="font-heading text-2xl">CORE_PROCESSOR_V2</h4>
            <p className="text-xs text-white/40 leading-relaxed font-mono">
              The workflow leverages modular architecture with heavy emphasis on visual fidelity and real-time projectile physics.
            </p>
          </section>
        </div>

        {/* Right: Video & Game */}
        <div className="lg:col-span-8 space-y-12">
          {/* Video Player */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Video className="text-red-600" size={20} />
              <h3 className="font-bold uppercase tracking-widest text-xs">Production Sample / Showreel</h3>
            </div>
            <div className="relative aspect-video bg-neutral-900 border-4 border-white/5 overflow-hidden group">
              <video 
                key={data.videoUrl}
                src={data.videoUrl} 
                autoPlay loop muted 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-2 py-1 bg-red-600 text-[8px] font-black uppercase">LIVE_FEED</span>
                <span className="px-2 py-1 bg-black text-[8px] font-black uppercase border border-white/10 tracking-widest">4K_RES</span>
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/40">TIMESTAMP: {new Date().toLocaleTimeString()}</div>
            </div>
          </section>

          {/* Game Canvas */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Gamepad2 className="text-red-600" size={20} />
              <h3 className="font-bold uppercase tracking-widest text-xs">Cinematic Interceptor (Shooter)</h3>
            </div>
            <div className="relative border border-white/10 bg-neutral-950 overflow-hidden cursor-crosshair group shadow-[0_0_50px_rgba(255,0,0,0.05)]">
              <canvas 
                ref={canvasRef} 
                width={800} 
                height={400} 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 pointer-events-none border-t border-red-600/20"></div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.5em] text-white/20 group-hover:text-red-600 transition-colors animate-pulse">
                WASD to Move | Click/Space to Fire
              </div>
              {/* HUD Decoration */}
              <div className="absolute top-4 right-4 pointer-events-none opacity-20">
                <Target className="text-red-600 animate-spin-slow" size={40} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProcessPage;
