
import React from 'react';
import { Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onInquireClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onInquireClick }) => {
  return (
    <footer className="px-6 md:px-12 py-20 bg-neutral-950 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Contact */}
        <div className="lg:col-span-2">
          <h2 className="font-heading text-5xl md:text-7xl mb-8 tracking-tighter">LET'S CREATE THE<br /><span className="text-red-600">IMPOSSIBLE</span></h2>
          <button 
            onClick={onInquireClick}
            className="group flex items-center gap-4 text-2xl md:text-3xl font-light hover:text-red-600 transition-colors text-left"
          >
            Open Dispatch Console
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-white/40 mb-8">Navigation</h4>
          <ul className="flex flex-col gap-4 font-heading text-xl">
            <li><a href="#" className="hover:text-red-600 transition-colors">Portfolio</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Process</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">About Me</a></li>
            <li><button onClick={onInquireClick} className="hover:text-red-600 transition-colors">Contact</button></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-white/40 mb-8">Follow</h4>
          <div className="flex gap-6">
            <a href="#" className="p-4 rounded-full border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all">
                <Twitter size={20} />
            </a>
            <a href="#" className="p-4 rounded-full border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all">
                <Instagram size={20} />
            </a>
            <a href="#" className="p-4 rounded-full border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all">
                <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-10">
        <p className="text-xs text-white/20 uppercase font-black tracking-widest">© 2025 Cinematic Portfolio — All Rights Reserved</p>
        <div className="flex gap-8 text-[10px] text-white/40 uppercase font-black tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
