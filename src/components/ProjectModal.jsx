import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, ArrowRight, Smartphone } from 'lucide-react';
import { FigmaIcon } from './Icons';

export default function ProjectModal({ project, onClose, onContactClick }) {
  const [activeTab, setActiveTab] = useState(project?.figmaLayout ? 'figma' : 'mockup');
  const scrollContainerRef = useRef(null);
  const modalCardRef = useRef(null);

  useEffect(() => {
    if (project?.figmaLayout) {
      setActiveTab('figma');
    } else {
      setActiveTab('mockup');
    }
  }, [project]);

  useEffect(() => {
    // Reset scroll positions to top when a project or tab opens
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    if (modalCardRef.current) {
      modalCardRef.current.scrollTop = 0;
    }
  }, [project, activeTab]);

  useEffect(() => {
    // Freeze background Lenis momentum smooth scroll while modal is active
    window.lenis?.stop();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      // Resume background Lenis smooth scroll on modal close
      window.lenis?.start();
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
    >
      
      {/* Click outside backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />

      {/* Modal Dialog Card */}
      <div 
        ref={modalCardRef}
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#080d1e] border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,29,143,0.5)] overflow-y-auto overscroll-contain z-10 flex flex-col"
      >
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 px-5 sm:px-7 py-4 bg-[#0a0f24]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#001D8F] text-white">
              {project.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{project.title}</span>
              {project.figmaLayout && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#a855f7]/20 text-purple-300 border border-[#a855f7]/30">
                  <FigmaIcon className="w-3 h-3" />
                  <span>{project.layoutName || 'shopping-figma-layout-1'}</span>
                </span>
              )}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {project.figmaLayout && (
              <a
                href={project.figmaLayout}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
                title="Open full size layout in new tab"
              >
                <span>Full Layout</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-7 space-y-6">
          
          {/* View Mode Toggle when figmaLayout is available */}
          {project.figmaLayout && (
            <div className="flex items-center justify-between flex-wrap gap-2.5 p-1.5 bg-white/[0.04] border border-white/10 rounded-2xl">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('figma')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'figma'
                      ? 'bg-[#001D8F] text-white shadow-lg shadow-[#001D8F]/50'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FigmaIcon className="w-3.5 h-3.5" />
                  <span>Figma Full Layout</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('mockup')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'mockup'
                      ? 'bg-[#001D8F] text-white shadow-lg shadow-[#001D8F]/50'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Device Mockup</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-zinc-400 px-3 hidden sm:inline">
                Scroll inside layout window to inspect entire design ↓
              </span>
            </div>
          )}

          {/* Main Showcase: Figma Artboard OR Device Container */}
          {activeTab === 'figma' && project.figmaLayout ? (
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#0b0f1a] shadow-2xl">
              {/* Figma Window Titlebar */}
              <div className="px-4 py-3 bg-[#0d1222] border-b border-white/10 flex items-center justify-between text-xs text-zinc-300 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <FigmaIcon className="w-3.5 h-3.5" />
                    <span>{project.layoutName || 'shopping-figma-layout-1'}.fig</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {project.layoutDimensions || 'Full Artboard Layout'}
                  </span>
                  <a
                    href={project.figmaLayout}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-lg bg-[#001D8F] hover:bg-[#0028c4] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Full Screen</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Scrollable Canvas for the 6000px Layout */}
              <div 
                ref={scrollContainerRef}
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                className="relative w-full max-h-[550px] sm:max-h-[680px] overflow-y-auto overscroll-contain bg-black/60 scroll-smooth"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#001D8F rgba(255, 255, 255, 0.05)'
                }}
              >
                <img 
                  src={project.figmaLayout} 
                  alt={`${project.title} - Figma Layout`} 
                  className="w-full h-auto object-top shadow-2xl block"
                  loading="eager"
                />
              </div>

              {/* Layout Footer Info */}
              <div className="px-4 py-2 bg-[#0d1222] border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span>FILE: {project.layoutName || 'shopping-figma-layout-1'}.jpg</span>
                <span>FIGMA DESKTOP ARTBOARD • 100% SCALE</span>
              </div>
            </div>
          ) : (
            /* Showcase Device Container */
            <div 
              className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl flex items-center justify-center p-6 relative overflow-hidden shadow-2xl"
              style={{ backgroundColor: project.cardBg || '#94b3f3' }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]"
              />
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Description & Overview */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xl font-bold text-white">
                {project.tagline}
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Key Design &amp; Engineering Highlights
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Figma Auto-Layout architecture with unified design token hierarchy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>60 FPS smooth GSAP transitions and micro-interaction animations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Fully responsive layout optimized for mobile, tablet, and ultra-wide screens</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar: Tech & Action */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech?.map((t) => (
                    <span 
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#001D8F]/30 text-blue-200 border border-[#0033FF]/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <button
                  onClick={() => {
                    onClose();
                    onContactClick();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#001D8F] hover:bg-[#0027bd] border border-[#0033FF]/40 shadow-lg shadow-[#001D8F]/50 transition-all flex items-center justify-center gap-2"
                >
                  <span>Build Similar Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  Close Preview
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
