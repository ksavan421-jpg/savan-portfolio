import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import ArchitecturalBracket from './ArchitecturalBracket';
import NavColumn from './NavColumn';
import './NotFoundPage.css';

export default function NotFoundPage({
  invalidPath = '',
  onSelectNav,
  onDownloadResume
}) {
  const containerRef = useRef(null);
  const avatarImgRef = useRef(null);
  const bracketRef = useRef(null);
  const textGroupRef = useRef(null);
  const diagnosticRef = useRef(null);

  // Smooth entrance animation matching editorial experience
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (avatarImgRef.current) {
      tl.from(avatarImgRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.94,
        duration: 1.0,
        ease: 'power3.out'
      }, 0.05);
    }

    if (bracketRef.current) {
      tl.from(bracketRef.current, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: 'top center',
        duration: 0.85,
        ease: 'power2.out'
      }, 0.2);
    }

    if (textGroupRef.current) {
      tl.from(textGroupRef.current.children, {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: 'power3.out'
      }, 0.25);
    }

    if (diagnosticRef.current) {
      tl.from(diagnosticRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.45);
    }

  }, { scope: containerRef });

  const displayTarget = invalidPath || (typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/unknown');

  const handleReturnHome = () => {
    onSelectNav('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="not-found-container" id="not-found-content" ref={containerRef}>
      {/* 1. Left Character Avatar Column */}
      <section className="not-found-avatar-col" aria-label="Explorer Avatar">
        <div className="not-found-avatar-wrapper">
          <img
            ref={avatarImgRef}
            src="/404-person-img.webp"
            alt="Designer 3D Character showing 404 on phone"
            className="not-found-avatar-img"
            draggable="false"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* 2. Center Editorial Typography Column */}
      <section className="not-found-center-col" aria-label="Page Not Found 404">
        <div className="not-found-content-wrapper">
          {/* Decorative Giant 404 Numeral in Background */}
          <div className="not-found-bg-watermark" aria-hidden="true">
            404
          </div>

          {/* Architectural Bracket */}
          <div ref={bracketRef} className="bracket-wrapper shrink-0">
            <ArchitecturalBracket className="editorial-bracket" />
          </div>

          {/* Editorial Content */}
          <div className="not-found-typography">
            <div ref={textGroupRef}>
              {/* Huge Editorial Headline */}
              <div className="not-found-headline-group">
                <div className="not-found-title-row">
                  <h1 className="not-found-huge-title">
                    PAGE <span className="not-found-accent-text">NOT</span>
                  </h1>
                </div>
                <div className="not-found-title-row">
                  <h1 className="not-found-huge-title">FOUND.</h1>
                </div>
                <h2 className="not-found-subhead">Coordinates Out of Bounds</h2>
              </div>
            </div>

            {/* Diagnostic Terminal Box */}
            <div className="not-found-diagnostic-box" ref={diagnosticRef} aria-label="Route Diagnostic Log">
              <div className="diagnostic-item">
                <span className="diagnostic-key">REQUEST:</span>
                <span className="diagnostic-value highlight-error">{displayTarget}</span>
              </div>
              <div className="diagnostic-item">
                <span className="diagnostic-key">STATUS:</span>
                <span className="diagnostic-value">404 - Not Found in Architecture</span>
              </div>
              <div className="diagnostic-item">
                <span className="diagnostic-key">SYSTEM:</span>
                <span className="diagnostic-value">Ready to navigate back</span>
              </div>
            </div>

            {/* Editorial Bio / Explanation */}
            <p className="not-found-bio">
              The page you are trying to access does not exist or may have moved. 
              Return to the home page or select a section from the navigation menu.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Right Navigation Column */}
      <NavColumn
        activeNav="404"
        onSelectNav={onSelectNav}
        onDownloadResume={onDownloadResume}
      />

      {/* Mobile Fixed Return CTA Button */}
      <div className="page-nav-cta-wrapper">
        <button
          type="button"
          onClick={handleReturnHome}
          className="page-nav-cta-btn"
          id="mobile-not-found-home-btn"
          aria-label="Return to Home"
        >
          <span>BACK TO HOME</span>
          <ArrowRight size={16} className="page-nav-cta-icon" />
        </button>
      </div>
    </main>
  );
}
