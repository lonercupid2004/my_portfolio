
import React from 'react';
import { Film, Clapperboard, Camera, MonitorPlay, Ghost, Zap, Box, Star } from 'lucide-react';

const Ticker: React.FC = () => {
  const items = [
    { icon: Film, text: 'MOTION GRAPHICS' },
    { icon: Clapperboard, text: 'OPERATIONS' },
    { icon: Camera, text: 'CINEMATOGRAPHY' },
    { icon: MonitorPlay, text: 'EDITING' },
    { icon: Ghost, text: 'SOFTWARE DEVELOPER' },
    { icon: Zap, text: 'AI INTEGRATION' },
    { icon: Box, text: 'LEARNING' },
    { icon: Star, text: 'FREELANCE' },
  ];

  return (
    <div className="w-full bg-white text-black py-4 overflow-hidden whitespace-nowrap relative border-y-4 border-red-600">
      <div className="flex animate-marquee">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-10 gap-4">
            <item.icon size={18} strokeWidth={3} />
            <span className="font-heading text-lg md:text-xl tracking-tight">{item.text}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
