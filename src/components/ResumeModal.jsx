import React, { useEffect } from 'react';
import { X, Download, FileText, CheckCircle2, ExternalLink } from 'lucide-react';

export default function ResumeModal({ onClose }) {
  useEffect(() => {
    window.lenis?.stop();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      window.lenis?.start();
    };
  }, [onClose]);

  return (
    <div 
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#080d1e] border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,29,143,0.5)] overflow-hidden overscroll-contain z-10 flex flex-col"
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a0f24] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#001D8F]/40 border border-[#0033FF]/40 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Savan's Resume / CV</h3>
              <p className="text-xs text-zinc-400">UI/UX &amp; Web Designer</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Full Curriculum Vitae
              </span>
              <h4 className="text-xl font-bold text-white">
                Savan — Senior UI/UX &amp; Frontend Specialist
              </h4>
              <p className="text-xs text-zinc-300 max-w-md">
                Detailed history of 300+ completed projects, Figma design systems, React codebases, client recommendations, and core proficiencies.
              </p>
            </div>

            <a
              href="/savan-resume.pdf"
              download="savan-resume.pdf"
              className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#001D8F] hover:bg-[#0027bd] border border-[#0033FF]/40 shadow-xl shadow-[#001D8F]/60 flex items-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF (1.4 MB)</span>
            </a>
          </div>

          {/* Quick PDF Viewer Frame */}
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/10 bg-black/60 relative">
            <iframe 
              src="/savan-resume.pdf#toolbar=0" 
              title="Resume Preview"
              className="w-full h-full"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
            <span>Formats available: PDF (Standard A4 / Letter)</span>
            <a 
              href="/savan-resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              Open in new tab <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
