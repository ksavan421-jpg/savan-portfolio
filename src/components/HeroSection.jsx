import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import ArchitecturalBracket from './ArchitecturalBracket';
import NavColumn from './NavColumn';

export default function HeroSection({
  activeNav = 'home',
  onSelectNav,
  onDownloadResume
}) {
  const containerRef = useRef(null);
  const avatarWrapperRef = useRef(null);
  const avatarImgRef = useRef(null);
  const bracketRef = useRef(null);
  const introRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const bioRef = useRef(null);

  // GSAP Animations & Interactions
  useGSAP(() => {
    // 1. Initial Page Reveal Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Avatar entrance from bottom with gentle scale
    if (avatarImgRef.current) {
      tl.from(avatarImgRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.94,
        duration: 1.2,
        ease: 'power3.out',
        clearProps: 'transform'
      }, 0.1);
    }

    // Architectural Bracket vector reveal
    if (bracketRef.current) {
      tl.from(bracketRef.current, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: 'top center',
        duration: 1.0,
        ease: 'power2.out'
      }, 0.3);
    }

    // Editorial Typography stagger
    const textElements = [introRef.current, row1Ref.current, row2Ref.current, bioRef.current].filter(Boolean);
    if (textElements.length) {
      tl.from(textElements, {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out'
      }, 0.35);
    }

  }, { scope: containerRef });

  return (
    <main className="hero-container hero-home-page relative z-10 w-full overflow-hidden" id="main-content" ref={containerRef}>
      {/* 1. Left Character Avatar Column */}
      <section className="hero-avatar-column hero-home-avatar-col flex items-end justify-start h-full relative" aria-label="Portrait of Designer">
        <div
          className="avatar-wrapper hero-home-avatar-wrapper flex items-end justify-start relative w-full h-full"
          ref={avatarWrapperRef}
        >
          <img
            ref={avatarImgRef}
            src="/hero-img.png"
            alt="3D Character Avatar of SK"
            className="avatar-image hero-avatar-img block select-none pointer-events-none"
            draggable="false"
          />
        </div>
      </section>

      {/* 2. Center Editorial Typography Column */}
      <section className="hero-center-column flex items-center h-full" aria-label="Introduction and Expertise">
        <div className="center-content-wrapper flex items-stretch relative w-full">
          <div ref={bracketRef} className="bracket-wrapper flex items-stretch shrink-0 relative">
            <ArchitecturalBracket className="editorial-bracket" />
          </div>

          <div className="center-typography flex flex-col justify-center">
            <h2 className="greeting-intro font-normal text-text-primary whitespace-nowrap" ref={introRef}>I'm</h2>

            <div className="title-row flex items-baseline whitespace-nowrap" ref={row1Ref}>
              <h1 className="title-huge uppercase font-light text-text-primary whitespace-nowrap">UI UX</h1>
              {/* <span className="title-descriptor whitespace-nowrap font-normal text-text-primary">Designer</span> */}
            </div>

            <div className="title-row flex items-baseline whitespace-nowrap" ref={row2Ref}>
              <span className="ampersand-accent font-normal text-text-primary whitespace-nowrap">&amp;</span>
              <h1 className="title-huge uppercase font-light text-text-primary whitespace-nowrap">WEB</h1>
              <span className="title-descriptor whitespace-nowrap font-normal text-text-primary">Designer</span>
            </div>

            <p className="hero-bio font-normal text-text-secondary" ref={bioRef}>
              Crafting bold, minimalist digital experiences by bridging the gap between creative visual design and clean technical execution.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Right Navigation Column with Centered Menu & Bottom Button */}
      <NavColumn
        activeNav={activeNav}
        onSelectNav={onSelectNav}
        onDownloadResume={onDownloadResume}
      />

      {/* Download Resume Button (Bottom of Hero Image on Mobile) */}
      <div className="hero-resume-cta-wrapper">
        <button
          type="button"
          onClick={onDownloadResume}
          className="page-nav-cta-btn hero-resume-btn"
          id="hero-resume-btn"
          aria-label="Download Resume"
        >
          <span>DOWNLOAD RESUME</span>
        </button>
      </div>

      {/* Next Section CTA Button (Mobile Fixed Bottom of Page) */}
      <div className="page-nav-cta-wrapper">
        <button
          type="button"
          onClick={() => {
            onSelectNav('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="page-nav-cta-btn hero-about-btn"
          id="hero-about-btn"
          aria-label="Go to About Me page"
        >
          <span>ABOUT ME</span>
          <ArrowRight size={16} className="page-nav-cta-icon" />
        </button>
      </div>
    </main>
  );
}
