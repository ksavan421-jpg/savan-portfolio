import React, { useRef, useEffect } from 'react';

export default function FigmaWorkspaceSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative z-10 w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black flex flex-col items-center border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0b0f1a] shadow-2xl">
          {/* Window title bar */}
          <div className="px-4 py-2.5 bg-[#0d1222] border-b border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-medium text-zinc-300">Savan_Figma_Workflow.fig</span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Workspace Autoplay
            </span>
          </div>

          {/* Clean Video Player Container:
              Crops outer 8% to completely eliminate any recorder/software watermarks from video edges
              Autoplays on loop, muted, playsInline
          */}
          <div className="relative w-full aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
            <video 
              ref={videoRef}
              src="/work-process-video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover transform scale-[1.08] origin-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
