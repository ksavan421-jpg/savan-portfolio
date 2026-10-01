import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';

function CounterItem({ target, suffix = '', duration = 1800, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Smooth ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);
      setCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isVisible, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection({ onExploreWork, onOpenResume }) {
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { target: 5, suffix: '+', label: 'Years Experience', sub: 'In UI/UX & Web Design' },
    { target: 300, suffix: '+', label: 'Projects Completed', sub: 'Web, SaaS & Mobile Apps' },
    { target: 100, suffix: '%', label: 'Commitment', sub: 'Hand-coded precision' },
    { target: 15, suffix: '+', label: 'Design Systems', sub: 'Figma to React tokens' }
  ];

  return (
    <section 
      id="about" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* 0033FF 56% Radial Glow */}
      <div 
        className="pointer-events-none absolute -bottom-24 -left-36 w-[600px] h-[600px] rounded-full blur-3xl opacity-50 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 51, 255, 0.56) 0%, rgba(0, 29, 143, 0.20) 40%, rgba(0, 0, 0, 0) 75%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Centered Top Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-white/90 uppercase block mb-2 sm:mb-3">
            ABOUT ME
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-sans-ui leading-tight">
            Designing In Figma, Hand-Coding In React
          </h2>
        </div>

        {/* Flex Row: Photo on Left | Content on Right (as marked by user) */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 sm:gap-10 lg:gap-14 max-w-4xl lg:max-w-5xl mx-auto">
          
          {/* Left Column: Clean Frameless Photo */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative w-44 sm:w-52 md:w-56 h-40 sm:h-48 md:h-52 rounded-2xl overflow-hidden shadow-2xl bg-[#0d142b]">
              <img 
                src="/full-image.jpeg" 
                alt="Savan - UI/UX & Web Designer" 
                className="w-full h-full object-cover object-top rounded-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Bio Paragraphs & Action Buttons */}
          <div className="flex-1 flex flex-col text-center md:text-left justify-start">
            <p className="text-sm sm:text-lg text-zinc-200 font-normal leading-relaxed">
              Hello, I’m <strong className="text-white font-semibold">Savan</strong> — a multidisciplinary UI/UX &amp; Web Designer who eliminates the friction between design vision and technical implementation.
            </p>

            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-zinc-400 leading-relaxed">
              Too often, exceptional designs in Figma lose their magic when handed off to development. I solve this by managing both sides of the coin: architecting design systems, user journeys, and high-fidelity mockups in Figma, then building them into high-performance web applications using React, GSAP animations, and Tailwind CSS.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
              <button
                onClick={onExploreWork}
                className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide text-white bg-[#001D8F] hover:bg-[#0027bd] border border-[#0033FF]/40 shadow-xl shadow-[#001D8F]/50 hover:shadow-[#0033FF]/60 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenResume}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

        </div>

        {/* Centered Key Stats / Counters Section with Count-Up Animation */}
        <div 
          ref={counterRef} 
          className="mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((h, i) => (
              <div 
                key={i} 
                className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#0033FF]/50 hover:bg-white/[0.05] transition-all duration-300 text-center flex flex-col items-center justify-center shadow-lg group"
              >
                <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display block">
                  <CounterItem target={h.target} suffix={h.suffix} isVisible={isVisible} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-200 block mt-1.5 sm:mt-2">
                  {h.label}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-500 block mt-0.5 sm:mt-1">
                  {h.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
