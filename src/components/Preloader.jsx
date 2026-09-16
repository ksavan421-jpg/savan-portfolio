import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const statusRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' }
    });

    const animElements = [titleRef.current, logoRef.current, counterRef.current, statusRef.current].filter(Boolean);

    // 1. Initial fade-in of branding elements
    if (animElements.length) {
      tl.from(animElements, {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out'
      });
    }

    // 2. Smooth numerical counter from 0 to 100
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 1.35,
      ease: 'power2.inOut',
      onUpdate: () => {
        const rounded = Math.round(counterObj.val);
        setPercent(rounded);
        if (barRef.current) {
          barRef.current.style.width = `${rounded}%`;
        }
        if (statusRef.current && rounded >= 95) {
          statusRef.current.textContent = 'READY // ENTERING PORTFOLIO';
        }
      }
    }, 0.2);

    // 3. Brief hold at 100%
    tl.to({}, { duration: 0.15 });

    // 4. Content elements dissolve upward
    if (animElements.length) {
      tl.to(animElements, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in'
      });
    }

    // 5. Cinematic upward slide exit of the entire preloader screen
    if (containerRef.current) {
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut',
        onComplete: () => {
          if (onComplete) onComplete();
        }
      }, '-=0.1');
    }

  }, { scope: containerRef });

  return (
    <div className="website-preloader" ref={containerRef} aria-label="Loading portfolio">
      {/* Big Top Title - Absolute on top */}
      <div className="preloader-title-wrapper" ref={titleRef}>
        <h1 className="preloader-title-big">
          SAVAN <span className="preloader-title-accent">PORTFOLIO</span>
        </h1>
      </div>

      <div className="preloader-content">
        {/* Brand Logo */}
        <div className="preloader-logo-wrapper" ref={logoRef}>
          <img
            src="/project-logo.webp"
            alt="SK Logo"
            className="preloader-logo-img"
            width="54"
            height="60"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Architectural Counter */}
        <div className="preloader-counter-box" ref={counterRef}>
          <span className="preloader-bracket">[</span>
          <span className="preloader-number">{String(percent).padStart(2, '0')}%</span>
          <span className="preloader-bracket">]</span>
        </div>

        {/* Progress Bar Track */}
        <div className="preloader-progress-track">
          <div className="preloader-progress-bar" ref={barRef} />
        </div>

        {/* Status Line */}
        <p className="preloader-status" ref={statusRef}>
          INITIALIZING EXPERIENCE...
        </p>
      </div>
    </div>
  );
}
