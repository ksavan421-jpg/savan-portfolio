import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import NavColumn from './NavColumn';
import ArchitecturalBracket from './ArchitecturalBracket';

const PAGE_METADATA = {
  skills: {
    title: 'SKILLS',
    tagline: 'Capabilities & Core Competencies',
    desc: 'Deep expertise in UI/UX Architecture, Frontend Engineering, Motion Design, and AI-accelerated product workflows. Section details in progress.'
  },
  work: {
    title: 'WORK',
    tagline: 'Featured Design & Web Projects',
    desc: 'Curated collection of high-impact web design systems, lead generation portals, and interactive experiences. Section details in progress.'
  },
  awards: {
    title: 'AWARDS',
    tagline: 'Honors & Recognitions',
    desc: 'Industry recognitions, design achievements, and milestones celebrated throughout 7+ years in digital design. Section details in progress.'
  },
  gallery: {
    title: 'GALLERY',
    tagline: 'Visual Explorations & 3D Concepts',
    desc: 'Creative experiments, custom 3D claymorphism assets, and interface concept explorations. Section details in progress.'
  },
  contact: {
    title: 'CONTACT',
    tagline: 'Let’s Build Something Remarkable',
    desc: 'Available for design leadership, senior UI/UX consultancy, and high-conversion web projects. Section details in progress.'
  }
};

export default function PlaceholderPage({
  pageId,
  activeNav,
  onSelectNav,
  onDownloadResume
}) {
  const containerRef = useRef(null);
  const avatarWrapperRef = useRef(null);
  const avatarImgRef = useRef(null);
  const textRef = useRef(null);

  const info = PAGE_METADATA[pageId] || {
    title: pageId.toUpperCase(),
    tagline: 'Section Under Development',
    desc: 'This section will be added next. You can customize this page anytime.'
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (avatarImgRef.current) {
      tl.from(avatarImgRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.0,
        ease: 'power3.out'
      }, 0.05);
    }

    if (textRef.current) {
      tl.from(textRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power3.out'
      }, 0.2);
    }

  }, { scope: containerRef });

  return (
    <main className="hero-container" id={`${pageId}-content`} ref={containerRef}>
      {/* 1. Left Character Avatar Column */}
      <section className="hero-avatar-column" aria-label="Designer Avatar">
        <div className="avatar-wrapper" ref={avatarWrapperRef}>
          <img
            ref={avatarImgRef}
            src="/hero-img.png"
            alt="Savan 3D Avatar"
            className="avatar-image"
            draggable="false"
          />
        </div>
      </section>

      {/* 2. Center Editorial Typography Column */}
      <section className="hero-center-column" aria-label={info.title}>
        <div className="center-content-wrapper">
          <div className="bracket-wrapper">
            <ArchitecturalBracket className="editorial-bracket" />
          </div>

          <div className="center-typography" ref={textRef}>
            <div className="placeholder-badge">
              <span>[ {info.title} ]</span>
            </div>
            <h1 className="placeholder-title">{info.tagline}</h1>
            <p className="hero-bio placeholder-bio">{info.desc}</p>
            <div className="placeholder-step-hint">
              <span className="hint-pill">Ready for your design step</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Right Navigation Column */}
      <NavColumn
        activeNav={activeNav}
        onSelectNav={onSelectNav}
        onDownloadResume={onDownloadResume}
      />

      {/* Next Section CTA Button (Mobile Fixed Bottom) */}
      <div className="page-nav-cta-wrapper">
        <button
          type="button"
          onClick={() => {
            onSelectNav('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="page-nav-cta-btn"
          id="placeholder-home-btn"
          aria-label="Return to Home page"
        >
          <span>BACK TO HOME</span>
          <ArrowRight size={16} className="page-nav-cta-icon" />
        </button>
      </div>
    </main>
  );
}
