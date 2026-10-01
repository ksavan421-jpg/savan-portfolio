import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Layers, 
  Palette, 
  Code2, 
  Globe, 
  Sparkles 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onExploreWork }) {
  const containerRef = useRef(null);
  const leftMockupRef = useRef(null);
  const rightMockupRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const heroBottomRef = useRef(null);

  // Phone inner elements - 4 Workflow Stages with actual user images
  const angledMockupImgRef = useRef(null);
  const wireframeImgRef = useRef(null);
  const uiDesignImgRef = useRef(null);
  const codeImgRef = useRef(null);
  const liveWebImgRef = useRef(null);

  // Workflow UI container (cards & specs)
  const workflowUiRef = useRef(null);

  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'wireframe',
      number: '01',
      title: 'UX Wireframe & Architecture',
      subtitle: 'Low-Fidelity Blueprint',
      shortTitle: 'Wireframe',
      image: '/slider-img-02.png',
      icon: Layers,
      color: '#3b82f6',
      badge: 'Figma Architecture',
      description: 'Mapping user journeys, atomic layout grids, and conversion flow skeletons before touching a single pixel of final styling.'
    },
    {
      id: 'ui-design',
      number: '02',
      title: 'High-Fidelity UI in Figma',
      subtitle: 'Polished Visual Design',
      shortTitle: 'Figma UI',
      image: '/slider-img-04.png',
      icon: Palette,
      color: '#a855f7',
      badge: 'Design System & Tokens',
      description: 'Crafting luxury editorial typography, high-fashion imagery, polished micro-interactions, and responsive design systems.'
    },
    {
      id: 'coding',
      number: '03',
      title: 'Hand-Coded React & GSAP',
      subtitle: 'Frontend Engineering',
      shortTitle: 'React Code',
      image: '/slider-img-03.png',
      icon: Code2,
      color: '#06b6d4',
      badge: 'Clean Component Code',
      description: 'Transforming designs into modular React components with Tailwind CSS utility styling and hardware-accelerated 60fps GSAP timelines.'
    },
    {
      id: 'live-web',
      number: '04',
      title: 'Live Production Website',
      subtitle: 'Deployment & Launch',
      shortTitle: 'Live Web',
      image: '/slider-img-01.png',
      icon: Globe,
      color: '#10b981',
      badge: '100% Lighthouse Live App',
      description: 'Testing across real viewports, zero-latency interactions, and delivering a blazing-fast, production-ready web application.'
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Continuous subtle floating animation for left mockup on desktop
    const leftImg = leftMockupRef.current?.querySelector('img');
    if (leftImg) {
      gsap.to(leftImg, {
        y: -12,
        rotation: 0.8,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    // Function to calculate exact offset to glide the phone directly to the center of screen
    const getCenterOffset = () => {
      if (!rightMockupRef.current) return { x: 0, y: 0 };
      const rect = rightMockupRef.current.getBoundingClientRect();
      const currentX = gsap.getProperty(rightMockupRef.current, 'x') || 0;
      const currentY = gsap.getProperty(rightMockupRef.current, 'y') || 0;
      const elemCenterX = (rect.left - currentX) + rect.width / 2;
      const elemCenterY = (rect.top - currentY) + rect.height / 2;
      return {
        x: (window.innerWidth / 2) - elemCenterX,
        y: (window.innerHeight / 2) - elemCenterY
      };
    };

    // 1. Desktop GSAP ScrollTrigger Sequence (min-width: 1024px)
    mm.add('(min-width: 1024px)', () => {
      // Set initial states: Guarantee 100% full visibility for the Hero at first look
      gsap.set([titleRef.current, subtitleRef.current, leftMockupRef.current, heroBottomRef.current], {
        autoAlpha: 1,
        y: 0,
        clearProps: 'opacity,visibility'
      });
      gsap.set(rightMockupRef.current, { x: 0, y: 0, scale: 1, rotation: 0 });
      gsap.set(angledMockupImgRef.current, { opacity: 1, scale: 1 });
      gsap.set([wireframeImgRef.current, uiDesignImgRef.current, codeImgRef.current, liveWebImgRef.current], { 
        opacity: 0, 
        scale: 0.96 
      });
      gsap.set(workflowUiRef.current, { autoAlpha: 0, pointerEvents: 'none' });

      const mainTl = gsap.timeline({
        scrollTrigger: {
          id: 'heroWorkflowTrigger',
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3800',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.36) {
              setActiveStage(0);
            } else if (p < 0.56) {
              setActiveStage(1);
            } else if (p < 0.76) {
              setActiveStage(2);
            } else {
              setActiveStage(3);
            }
          }
        }
      });

      // STEP 1: Hero texts & tablet fade out smoothly as user scrolls
      mainTl.to([titleRef.current, subtitleRef.current, leftMockupRef.current, heroBottomRef.current], {
        autoAlpha: 0,
        y: -35,
        pointerEvents: 'none',
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0.2);

      // STEP 2: Phone glides to center & straightens
      mainTl.to(rightMockupRef.current, {
        x: () => getCenterOffset().x,
        y: () => getCenterOffset().y,
        scale: 1.15,
        rotation: 0,
        duration: 1.35,
        ease: 'power2.inOut'
      }, 0.45)
      .to(angledMockupImgRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.45,
        ease: 'power1.inOut'
      }, 1.25)
      .to(wireframeImgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'power1.inOut'
      }, 1.25);

      // STEP 3: Workflow UI fades in after phone is centered
      mainTl.to(workflowUiRef.current, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        duration: 0.55,
        ease: 'power2.out'
      }, 1.75);

      // Stage 1 Hold: UX Wireframe & Architecture
      mainTl.to(wireframeImgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.4
      }, 2.2);

      // Stage 2: Wireframe -> High-Fidelity UI in Figma
      mainTl.to(wireframeImgRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.75,
        ease: 'power2.inOut'
      }, 3.6)
      .to(uiDesignImgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: 'power2.inOut'
      }, 3.75)
      .to(uiDesignImgRef.current, {
        duration: 1.4
      }, 4.5);

      // Stage 3: UI Design -> Hand-Coded React & GSAP
      mainTl.to(uiDesignImgRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.75,
        ease: 'power2.inOut'
      }, 5.8)
      .to(codeImgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: 'power2.inOut'
      }, 5.95)
      .to(codeImgRef.current, {
        duration: 1.4
      }, 6.7);

      // Stage 4: Coding -> Live Production Website
      mainTl.to(codeImgRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.75,
        ease: 'power2.inOut'
      }, 8.0)
      .to(liveWebImgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: 'power2.inOut'
      }, 8.15)
      .to(liveWebImgRef.current, {
        duration: 2.1
      }, 8.9);
    });

    // 2. Mobile & Tablet GSAP ScrollTrigger Sequence (< 1024px)
    mm.add('(max-width: 1023px)', () => {
      gsap.set([titleRef.current, subtitleRef.current, heroBottomRef.current], {
        autoAlpha: 1,
        y: 0,
        clearProps: 'opacity,visibility'
      });
      if (leftMockupRef.current) {
        gsap.set(leftMockupRef.current, { autoAlpha: 0 });
      }
      gsap.set(rightMockupRef.current, { x: 0, y: 0, scale: 1, rotation: 0 });
      gsap.set(angledMockupImgRef.current, { opacity: 1, scale: 1 });
      gsap.set([wireframeImgRef.current, uiDesignImgRef.current, codeImgRef.current, liveWebImgRef.current], { 
        opacity: 0, 
        scale: 0.96 
      });
      gsap.set(workflowUiRef.current, { autoAlpha: 0, pointerEvents: 'none' });

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          id: 'heroWorkflowTrigger',
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.36) {
              setActiveStage(0);
            } else if (p < 0.56) {
              setActiveStage(1);
            } else if (p < 0.76) {
              setActiveStage(2);
            } else {
              setActiveStage(3);
            }
          }
        }
      });

      // Mobile-specific function to calculate exact offset to center phone between stepper and bottom card
      const getMobileCenterOffset = () => {
        if (!rightMockupRef.current) return { x: 0, y: 0 };
        const rect = rightMockupRef.current.getBoundingClientRect();
        const currentX = gsap.getProperty(rightMockupRef.current, 'x') || 0;
        const currentY = gsap.getProperty(rightMockupRef.current, 'y') || 0;
        const elemCenterX = (rect.left - currentX) + rect.width / 2;
        const elemCenterY = (rect.top - currentY) + rect.height / 2;
        const targetCenterY = (window.innerHeight / 2) + 6;
        return {
          x: (window.innerWidth / 2) - elemCenterX,
          y: targetCenterY - elemCenterY
        };
      };

      // Calculate dynamic scale on mobile so the phone fills the available workflow area
      const getMobileScale = () => {
        const vh = window.innerHeight;
        // Top stepper ends at ~145px, bottom card starts at ~125px from bottom
        const availableHeight = Math.max(vh - 270, 280);
        const targetPhoneHeight = availableHeight * 0.82;
        const currentHeight = rightMockupRef.current ? rightMockupRef.current.offsetHeight : 240;
        const calculatedScale = targetPhoneHeight / currentHeight;
        return Math.min(Math.max(calculatedScale, 1.2), 2.2);
      };

      // Text and bottom bar hide smoothly
      mobileTl.to([titleRef.current, subtitleRef.current, heroBottomRef.current], {
        autoAlpha: 0,
        y: -25,
        pointerEvents: 'none',
        duration: 0.45,
        ease: 'power2.inOut'
      }, 0.2);

      // Phone glides to center & scales to prominent hero centerpiece
      mobileTl.to(rightMockupRef.current, {
        x: () => getMobileCenterOffset().x,
        y: () => getMobileCenterOffset().y,
        scale: () => getMobileScale(),
        rotation: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0.4)
      .to(angledMockupImgRef.current, { opacity: 0, scale: 0.96, duration: 0.4 }, 1.1)
      .to(wireframeImgRef.current, { opacity: 1, scale: 1, duration: 0.4 }, 1.1);

      // Workflow UI fades in
      mobileTl.to(workflowUiRef.current, { 
        autoAlpha: 1, 
        pointerEvents: 'auto', 
        duration: 0.55 
      }, 1.5);

      // Stages scrub seamlessly on mobile
      mobileTl.to(wireframeImgRef.current, { opacity: 1, duration: 1.4 }, 1.9)
        .to(wireframeImgRef.current, { opacity: 0, scale: 0.96, duration: 0.7 }, 3.3)
        .to(uiDesignImgRef.current, { opacity: 1, scale: 1, duration: 0.7 }, 3.4)
        .to(uiDesignImgRef.current, { duration: 1.4 }, 4.1)
        .to(uiDesignImgRef.current, { opacity: 0, scale: 0.96, duration: 0.7 }, 5.5)
        .to(codeImgRef.current, { opacity: 1, scale: 1, duration: 0.7 }, 5.6)
        .to(codeImgRef.current, { duration: 1.4 }, 6.3)
        .to(codeImgRef.current, { opacity: 0, scale: 0.96, duration: 0.7 }, 7.7)
        .to(liveWebImgRef.current, { opacity: 1, scale: 1, duration: 0.7 }, 7.8)
        .to(liveWebImgRef.current, { duration: 2.1 }, 8.5);
    });

    return () => {
      mm.revert();
    };
  }, { scope: containerRef });

  const handleJumpToStage = (stageIdx) => {
    const st = ScrollTrigger.getById('heroWorkflowTrigger');
    if (!st) return;
    const targetProgress = [0.26, 0.48, 0.68, 0.90][stageIdx];
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-[100dvh] h-[100dvh] pt-16 sm:pt-20 lg:pt-24 pb-3 sm:pb-6 lg:pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-between bg-black text-white select-none"
    >
      {/* Dynamic Background Radial Glow */}
      <div 
        className="pointer-events-none absolute -top-24 -left-32 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[900px] lg:h-[900px] rounded-full blur-3xl opacity-75 z-0 transition-colors duration-1000"
        style={{
          background: activeStage === 0 
            ? 'radial-gradient(circle, rgba(0, 51, 255, 0.56) 0%, rgba(0, 29, 143, 0.25) 45%, rgba(0, 0, 0, 0) 75%)'
            : activeStage === 1
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(88, 28, 135, 0.2) 45%, rgba(0, 0, 0, 0) 75%)'
            : activeStage === 2
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, rgba(14, 116, 144, 0.2) 45%, rgba(0, 0, 0, 0) 75%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(4, 120, 87, 0.2) 45%, rgba(0, 0, 0, 0) 75%)'
        }}
      />

      {/* ======================================================== */}
      {/* 1. MAIN HERO VISUAL AREA: RESPONSIVE & BALANCED          */}
      {/* Left Tablet (Desktop) | Center Typography | Right Mobile */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex-1 flex flex-col justify-center items-center py-2 sm:py-4">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
          
          {/* Left Floating Mockup (Summit Tablet) - Visible on lg screens */}
          <div className="hidden lg:flex lg:col-span-3 items-center justify-start">
            <div 
              ref={leftMockupRef}
              className="relative w-full max-w-[320px] xl:max-w-[360px] cursor-pointer select-none"
              onClick={onExploreWork}
              title="Click to explore work"
            >
              <img 
                src="/slider-img-1.png" 
                alt="Summit 2026 App - Tablet UI"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />
            </div>
          </div>

          {/* Center Main Typography */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center px-2">
            <h1 
              ref={titleRef}
              className="flex flex-col items-center justify-center select-none"
            >
              {/* Lato Light font with responsive font size & tracking */}
              <span 
                className="font-lato font-light leading-none select-none text-[100px] sm:text-[110px] md:text-[125px] lg:text-[145px] xl:text-[175px] text-white drop-shadow-sm transition-all duration-300 tracking-[4px] sm:tracking-[8px] lg:tracking-[10px]"
                style={{ marginLeft: '4px' }}
              >
                UI/UX
              </span>

              {/* & Web Designer */}
              <span className="mt-1.5 sm:mt-3 md:mt-4 text-[24px] sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-[0.16em] sm:tracking-[0.24em] text-white uppercase select-none">
                &amp; Web Designer
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              ref={subtitleRef}
              className="hero-subtitle mt-2.5 sm:mt-4 md:mt-5 pt-[28px] sm:pt-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[23px] md:leading-[24px] text-zinc-300 font-normal max-w-sm sm:max-w-md md:max-w-xl mx-auto"
            >
              I Design Bold, Minimal Digital Experiences That Connect Creative Visual Design With Clean Technical Execution.
            </p>
          </div>

          {/* Right Floating Mockup (Shop Mobile) */}
          <div className="flex lg:col-span-3 items-center justify-center lg:justify-end mt-4 sm:mt-6 lg:mt-0">
            <div 
              ref={rightMockupRef}
              className="relative w-full max-w-[260px] xs:max-w-[285px] sm:max-w-[320px] md:max-w-[330px] lg:max-w-[300px] xl:max-w-[320px] cursor-pointer select-none z-30"
              onClick={onExploreWork}
              title="Click to explore work"
            >
              {/* (A) Base Initial Angled Image */}
              <img 
                ref={angledMockupImgRef}
                src="/slider-img-01.png" 
                alt="Mobile App Showcase" 
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />

              {/* (1) Stage 1: UX Wireframe & Architecture (/slider-img-02.png) */}
              <img 
                ref={wireframeImgRef}
                src="/slider-img-02.png" 
                alt="UX Wireframe & Architecture" 
                className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />

              {/* (2) Stage 2: High-Fidelity UI in Figma (/slider-img-04.png) */}
              <img 
                ref={uiDesignImgRef}
                src="/slider-img-04.png" 
                alt="High-Fidelity UI in Figma" 
                className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />

              {/* (3) Stage 3: Hand-Coded React & GSAP (/slider-img-03.png) */}
              <img 
                ref={codeImgRef}
                src="/slider-img-03.png" 
                alt="Hand-Coded React GSAP" 
                className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />

              {/* (4) Stage 4: Live Production Website (/slider-img-01.png) */}
              <img 
                ref={liveWebImgRef}
                src="/slider-img-01.png" 
                alt="Live Production Website" 
                className="absolute inset-0 w-full h-full object-contain scale-[0.84] sm:scale-100 filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Hero Bottom Bar: Centered End-To-End Quote Banner (Slider Arrows Removed) */}
      <div 
        ref={heroBottomRef}
        className="hero-bottom-bar relative z-10 w-full max-w-3xl mx-auto px-2 flex items-center justify-center text-center mt-2 sm:mt-4"
      >
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0033FF] animate-pulse flex-shrink-0" />
          <p className="text-[14px] sm:text-sm md:text-sm text-zinc-200 font-medium tracking-wide">
            <span className="text-white font-semibold">“End-To-End”</span>
            <span className="mx-1 sm:mx-2 text-zinc-500">—</span>
            <span className="text-zinc-300">“I Design In Figma, Then Hand-Code It — HTML, CSS And React.”</span>
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. INTERACTIVE WORKFLOW UI (Fades in when phone centers) */}
      {/* ======================================================== */}
      <div 
        ref={workflowUiRef}
        className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between pt-[74px] sm:pt-[82px] lg:pt-8 pb-3 sm:pb-6 lg:pb-8 px-3 sm:px-6 lg:px-12 select-none"
      >
        {/* Desktop Top Header Bar */}
        <div className="hidden lg:flex w-full max-w-7xl mx-auto items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0033FF] animate-pulse" />
            <span className="text-xs md:text-sm font-mono tracking-widest text-zinc-400 uppercase truncate">
              Interactive Workflow Architecture
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex-shrink-0">
            <span 
              className="w-2 h-2 rounded-full transition-colors duration-500"
              style={{ backgroundColor: stages[activeStage].color }}
            />
            <span className="text-xs font-mono font-medium tracking-wide text-zinc-300">
              Phase 0{activeStage + 1} / 04
            </span>
          </div>
        </div>

        {/* Mobile & Tablet Top Stepper & Status Bar */}
        <div className="lg:hidden w-full max-w-md mx-auto flex flex-col gap-1.5 pointer-events-auto">
          {/* Status Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0033FF] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-wider text-zinc-400 uppercase font-medium">
                Workflow Pipeline
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span 
                className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: stages[activeStage].color }}
              />
              <span className="text-[10px] sm:text-xs font-mono font-medium text-zinc-300">
                Phase 0{activeStage + 1} / 04
              </span>
            </div>
          </div>

          {/* Stepper Tabs Bar (Grid 4 columns, clean short titles, no truncation) */}
          <div className="grid grid-cols-4 gap-1 sm:gap-1.5 p-1 rounded-xl bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-lg">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handleJumpToStage(idx)}
                  className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-white/15 border-white/30 text-white shadow-md' 
                      : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1 leading-none mb-0.5">
                    <span 
                      className="text-[10px] sm:text-xs font-mono font-bold transition-colors duration-300"
                      style={{ color: isActive ? stage.color : undefined }}
                    >
                      {stage.number}
                    </span>
                    {isActive && (
                      <span 
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: stage.color }}
                      />
                    )}
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium tracking-tight truncate max-w-full leading-tight">
                    {stage.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Columns Container */}
        <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center flex-1">
          
          {/* Left Column: 4 Step Cards (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-3 pointer-events-auto">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;
              return (
                <div 
                  key={stage.id}
                  onClick={() => handleJumpToStage(idx)}
                  className={`p-3.5 sm:p-4 rounded-xl transition-all duration-500 border backdrop-blur-md cursor-pointer ${
                    isActive 
                      ? 'bg-white/10 border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-[1.02]' 
                      : 'bg-white/[0.02] border-white/5 opacity-40 hover:opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                        isActive ? 'text-black' : 'text-zinc-400'
                      }`}
                      style={{ backgroundColor: isActive ? stage.color : 'rgba(255,255,255,0.06)' }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-mono tracking-wider text-zinc-400">
                          {stage.number} • {stage.subtitle}
                        </span>
                        {isActive && (
                          <span 
                            className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 border border-white/15"
                            style={{ color: stage.color }}
                          >
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight leading-snug">
                        {stage.title}
                      </h3>
                      {isActive && (
                        <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed font-normal">
                          {stage.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Column: Spacer for the Centered Phone */}
          <div className="lg:col-span-4 h-0 lg:h-[400px] pointer-events-none" />

          {/* Right Column: Execution Architecture (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 pointer-events-auto">
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                Execution Architecture
              </span>
              <h4 className="text-base font-semibold text-white mt-1">
                From Concept to Production
              </h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Every interface I craft follows this continuous pipeline: structural wireframes, visual Figma design systems, handcrafted React + GSAP code, and high-performance live deployment.
              </p>

              <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Current Phase:</span>
                  <span className="font-semibold text-white transition-colors duration-300" style={{ color: stages[activeStage].color }}>
                    {stages[activeStage].title}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Design Stack:</span>
                  <span className="text-zinc-300 font-mono text-[11px]">Figma, Auto-Layout</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Code Stack:</span>
                  <span className="text-zinc-300 font-mono text-[11px]">React 19, GSAP, Tailwind</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Performance:</span>
                  <span className="text-emerald-400 font-mono text-[11px]">100/100 Lighthouse</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Smooth Scrub Enabled</span>
                Scroll down to watch the mobile device progress seamlessly across the 4 stages.
              </div>
            </div>
          </div>

        </div>

        {/* Mobile/Tablet Bottom Active Step Explanation */}
        <div className="lg:hidden w-full max-w-md mx-auto p-2.5 sm:p-3 rounded-xl bg-zinc-950/85 border border-white/15 backdrop-blur-md pointer-events-auto shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span 
                className="w-2 h-2 rounded-full transition-colors duration-300" 
                style={{ backgroundColor: stages[activeStage].color }} 
              />
              <span className="text-[10px] font-mono text-zinc-400">
                {stages[activeStage].number} • {stages[activeStage].subtitle}
              </span>
            </div>
            <span 
              className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-medium"
              style={{ color: stages[activeStage].color }}
            >
              Phase 0{activeStage + 1}
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-semibold text-white">
            {stages[activeStage].title}
          </h4>
          <p className="text-[10px] sm:text-[11px] text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
            {stages[activeStage].description}
          </p>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pb-1 text-[10px] sm:text-[11px] text-zinc-500 font-mono">
          <span className="hidden sm:inline">[01 WIREFRAME] → [02 UI DESIGN] → [03 CODING] → [04 LIVE WEB]</span>
          <span className="sm:hidden">01 WIREFRAME → 04 LIVE</span>
          <span className="animate-pulse flex items-center gap-1 text-zinc-400">
            SCROLL TO PROGRESS ↓
          </span>
        </div>
      </div>

    </section>
  );
}
