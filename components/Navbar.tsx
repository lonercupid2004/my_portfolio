
import React from 'react';

interface NavbarProps {
  onInquireClick: () => void;
  onNavigate: (page: 'home' | 'process' | 'about') => void;
  currentPage: 'home' | 'process' | 'about';
}

const Navbar: React.FC<NavbarProps> = ({ onInquireClick, onNavigate, currentPage }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center mix-blend-difference">
      <div 
        className="flex flex-col items-start leading-none cursor-pointer group" 
        onClick={() => onNavigate('home')}
      >
        <span className="font-heading text-2xl md:text-3xl tracking-tighter border-b-4 border-red-600 mb-1 group-hover:bg-red-600 transition-colors">
          THE DAILY
        </span>
        <span className="font-heading text-4xl md:text-5xl tracking-tighter">
          PORTFOLIO
        </span>
      </div>

      <div className="hidden md:flex gap-6 items-center">
        <button
          onClick={() => onNavigate('home')}
          className={`text-xs font-black uppercase tracking-[0.3em] transition-all hover:text-red-600 ${currentPage === 'home' ? 'text-red-600' : 'text-white'}`}
        >
          Archive
        </button>
        <button
          onClick={() => onNavigate('process')}
          className={`text-xs font-black uppercase tracking-[0.3em] transition-all hover:text-red-600 ${currentPage === 'process' ? 'text-red-600' : 'text-white'}`}
        >
          Process
        </button>
        <button
          onClick={() => onNavigate('about')}
          className={`text-xs font-black uppercase tracking-[0.3em] transition-all hover:text-red-600 ${currentPage === 'about' ? 'text-red-600' : 'text-white'}`}
        >
          About
        </button>
      </div>

      <button 
        onClick={onInquireClick}
        className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-none hover:bg-red-600 hover:text-white transition-colors shadow-[4px_4px_0px_#dc2626]"
      >
        Inquire
      </button>
    </nav>
  );
};

export default Navbar;
