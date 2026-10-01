import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items exactly matching the user's design image
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About Me' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,backdrop-filter,box-shadow] duration-300 ${
      scrolled 
        ? 'py-2.5 sm:py-3.5 bg-black/85 backdrop-blur-xl shadow-2xl shadow-black/80'
        : 'py-3 sm:py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Profile Info */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="relative">
            <img 
              src="/profile-pic.png" 
              alt="Savan - UI/UX & Web Designer" 
              className="w-11 h-11 rounded-full object-cover border-2 border-white/20 group-hover:border-[#001D8F] transition-all duration-300 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold tracking-wide text-white group-hover:text-blue-200 transition-colors">
              Hi There, I'm Savan
            </span>
            <span className="text-xs font-medium text-zinc-400">
              UI/UX &amp; Web Designer
            </span>
          </div>
        </div>

        {/* Center: Navigation Pills (Desktop) */}
        {/* Menu link font size 14px and letter spacing 0.5px */}
        <nav className="hidden lg:flex items-center bg-[#070b16]/90 border border-white/10 backdrop-blur-md rounded-full px-2 py-1.5 shadow-xl shadow-black/40">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-1.5 text-[14px] font-medium tracking-[0.5px] rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#001D8F] text-white shadow-md shadow-[#001D8F]/60'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Download Resume Button (Dark mode button removed as requested) */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={onOpenResume}
            className="px-6 py-2.5 rounded-full text-xs font-bold tracking-wide text-white bg-[#001D8F] hover:bg-[#0027bd] border border-[#0033FF]/40 shadow-lg shadow-[#001D8F]/50 hover:shadow-[#0033FF]/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#001D8F] shadow-sm flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>Resume</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4 p-4 rounded-2xl bg-black/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[14px] tracking-[0.5px] font-medium transition-all ${
                activeSection === link.id
                  ? 'bg-[#001D8F] text-white shadow-md'
                  : 'text-zinc-300 hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-end">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-[#001D8F] flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
