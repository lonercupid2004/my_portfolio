
import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Cpu, Zap, ArrowRight, Skull } from 'lucide-react';

interface AboutPageProps {
  data: {
    bio: string;
    capabilities: { title: string; desc: string }[];
  };
}

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden">
        {/* Cinematic Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        
        <div className="relative z-20">
          {/* SUPER VILLAIN MASK VECTOR ART */}
          <svg 
            width="240" 
            height="240" 
            viewBox="0 0 100 100" 
            fill="none" 
            className="text-red-600 animate-villain-reveal"
          >
            {/* Hood / Background Silhouette */}
            <path 
              d="M50 5 L15 35 L15 80 L35 95 L65 95 L85 80 L85 35 Z" 
              fill="black" 
              stroke="currentColor" 
              strokeWidth="1" 
              className="opacity-50"
            />
            {/* Jagged Mask Outline */}
            <path 
              d="M30 40 L50 20 L70 40 L75 65 L50 85 L25 65 Z" 
              fill="#080808" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            {/* Sinister Eyes */}
            <path 
              d="M38 50 Q45 45 50 52" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              className="animate-eye-flicker"
            />
            <path 
              d="M62 50 Q55 45 50 52" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              className="animate-eye-flicker"
            />
            {/* Eye Glows */}
            <circle cx="42" cy="50" r="1.5" fill="white" className="animate-pulse" />
            <circle cx="58" cy="50" r="1.5" fill="white" className="animate-pulse delay-75" />
            
            {/* Ventilation/Details */}
            <path d="M45 70 L55 70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <path d="M42 75 L58 75" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          </svg>
          
          {/* Atmospheric Red Pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-600 blur-[100px] opacity-20 scale-150 animate-pulse"></div>
        </div>

        <div className="mt-16 text-center z-20 relative">
            <h2 className="font-heading text-xl tracking-[0.8em] text-white opacity-40 animate-glitch-text">
              SYNCING_VILLAIN_MODULE
            </h2>
            <p className="mt-2 text-[8px] font-mono text-red-600/40 tracking-[0.4em] uppercase">
              Accessing Core Consciousness...
            </p>
            <div className="mt-8 flex gap-2 justify-center">
                {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-0.5 w-8 bg-red-600 animate-loading-bar`} 
                      style={{ animationDelay: `${i * 0.15}s` }}
                    ></div>
                ))}
            </div>
        </div>

        <style>{`
          @keyframes villain-reveal {
            0% { transform: scale(0.8) translateY(20px); opacity: 0; filter: contrast(2) brightness(0); }
            100% { transform: scale(1) translateY(0); opacity: 1; filter: contrast(1) brightness(1); }
          }
          @keyframes eye-flicker {
            0%, 100% { opacity: 1; transform: scaleY(1); }
            95% { opacity: 0.2; transform: scaleY(0.1); }
          }
          @keyframes glitch-text {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 1px); color: #fff; }
            40% { transform: translate(2px, -1px); }
            60% { transform: translate(-1px, -2px); color: #ff0000; }
            80% { transform: translate(1px, 2px); }
          }
          @keyframes loading-bar {
            0%, 100% { opacity: 0.1; width: 4px; }
            50% { opacity: 1; width: 32px; background: #fff; }
          }
          .animate-villain-reveal {
            animation: villain-reveal 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
          .animate-eye-flicker {
            animation: eye-flicker 4s infinite;
          }
          .animate-glitch-text {
            animation: glitch-text 3s infinite;
          }
          .animate-loading-bar {
            animation: loading-bar 1s infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Cinematic Portrait/Asset Placeholder */}
          <div className="relative aspect-[4/5] bg-neutral-950 border border-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                <Brain size={300} strokeWidth={0.5} className="text-red-600" />
            </div>
            {/* Visual Flair */}
            <div className="absolute top-8 left-8 z-20">
                <span className="font-heading text-xs bg-red-600 px-3 py-1 tracking-widest">ARCHIVE_ID: 0X99</span>
            </div>
            <div className="absolute bottom-12 left-12 z-20 space-y-4 max-w-sm">
                <h2 className="font-heading text-5xl tracking-tighter leading-none">THE CREATIVE<br />TECH HUNK</h2>
                <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">Specialized in Visual & code Synthesis</p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
                <h1 className="font-heading text-7xl md:text-9xl tracking-tighter mb-8 leading-none">ABOUT<br /><span className="text-red-600">ME</span></h1>
                <p className="text-white/60 text-xl font-light leading-relaxed italic border-l-2 border-red-600 pl-8">
                  "{data.bio}"
                </p>
            </div>

            <div className="flex gap-12 pt-8 border-t border-white/5">
                <div className="flex flex-col">
                    <span className="text-red-600 font-heading text-4xl">02+</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Years XP</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-heading text-4xl">5+</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Productions</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-heading text-4xl">98%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Precision</span>
                </div>
            </div>
          </div>
        </div>

        {/* Capabilities Section */}
        <section>
          <div className="flex items-center gap-6 mb-16">
            <h3 className="font-heading text-5xl md:text-7xl tracking-tighter">WHAT I CAN DO</h3>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.capabilities.map((cap, idx) => (
              <div key={idx} className="bg-neutral-950 border border-white/5 p-10 space-y-6 hover:border-red-600/30 transition-all group">
                <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                  {idx === 0 ? <Zap size={24} /> : idx === 1 ? <Sparkles size={24} /> : <Cpu size={24} />}
                </div>
                <div className="space-y-4">
                  <h4 className="font-heading text-2xl tracking-tight">{cap.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed font-light">
                    {cap.desc}
                  </p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-600 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Detailed Scope <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Quote */}
        <div className="mt-40 text-center py-20 border-y border-white/5">
            <p className="font-heading text-3xl md:text-5xl text-white/10 tracking-widest uppercase italic">
                FORM_MEETS_FUNCTION_MEETS_FEELING
            </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
