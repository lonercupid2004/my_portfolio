
import React from 'react';

interface HeroProps {
  scrollY: number;
  characterImage: string;
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ scrollY, characterImage, title, subtitle }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* LAYER 1: Large Solid Red Circle Background */}
      <div 
        className="absolute w-[75vh] h-[75vh] md:w-[95vh] md:h-[95vh] bg-red-600 rounded-full z-0 transition-transform duration-500 ease-out"
        style={{ 
          transform: `scale(${1 + scrollY * 0.0002}) translate(0, ${scrollY * 0.08}px)`,
          boxShadow: '0 0 200px rgba(220, 38, 38, 0.5)'
        }}
      ></div>

      {/* LAYER 2: Background Typography (Solid White) */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <h1 className="font-heading text-[25vw] leading-none text-white tracking-tighter">
          {title}
        </h1>
      </div>

      {/* LAYER 3: The Character Cutout */}
      <div 
        className="absolute inset-0 flex items-end justify-center pointer-events-none z-20"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      >
        <img 
          src={characterImage} 
          alt="Character Portrait" 
          className="h-[90%] md:h-[110%] w-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,1)]"
          style={{ 
            filter: 'contrast(1.05) brightness(1.0)',
            maskImage: 'linear-gradient(to top, transparent 0%, black 5%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 5%)'
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://ibb.co/5xKMrBKT";
          }}
        />
      </div>

      {/* LAYER 4: Foreground Overlay Typography (STROKE ONLY) */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-30"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <h1 
          className="font-heading text-[25vw] leading-none tracking-tighter"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px white',
          }}
        >
          {title}
        </h1>
        {/* Sub-label for context */}
        <p className="font-bold text-red-600 text-sm md:text-2xl tracking-[1.2em] uppercase mt-[-3.5vw] ml-[1.2em]">
          {subtitle}
        </p>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute left-12 bottom-24 hidden lg:block z-40">
        <div className="flex flex-col">
            <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] mb-2">Lead Developer</span>
            <span className="font-heading text-3xl tracking-tight">Pathan Faim</span>
        </div>
      </div>

      <div className="absolute right-12 bottom-24 hidden lg:block z-40 text-right">
        <div className="flex flex-col items-end">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mb-2">Portfolio Version</span>
            <span className="font-heading text-3xl tracking-tight">Version-3.0</span>
        </div>
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 group">
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
        <span className="text-[9px] font-black tracking-[1em] uppercase text-white/20 group-hover:text-red-600 transition-colors">Explore More..</span>
      </div>
    </section>
  );
};

export default Hero;
