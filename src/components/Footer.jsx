import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-black border-t border-slate-200 dark:border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      
      {/* Subtle radial ambient glow at the bottom */}
      <div 
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-3xl opacity-25 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 51, 255, 0.46) 0%, rgba(0, 29, 143, 0.15) 50%, rgba(0, 0, 0, 0) 80%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3.5">
          <img 
            src="/profile-pic.png" 
            alt="Savan" 
            className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-white/20"
          />
          <div>
            <span className="text-sm font-bold text-slate-900 dark:text-white block">Savan</span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 block">UI/UX &amp; Web Designer</span>
          </div>
        </div>

        {/* Center note */}
        <div className="text-center text-xs text-slate-600 dark:text-zinc-400">
          <p>
            Designed with precision in <span className="text-slate-900 dark:text-white font-medium">Figma</span>. Hand-coded with <span className="text-slate-900 dark:text-white font-medium">React, GSAP &amp; Tailwind</span>.
          </p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-zinc-600">
            &copy; {new Date().getFullYear()} Savan. All rights reserved.
          </p>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="px-4 py-2 rounded-full bg-white dark:bg-white/5 hover:bg-[#001D8F] dark:hover:bg-[#001D8F] border border-slate-200 dark:border-white/15 hover:border-[#0033FF] text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-sm"
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
