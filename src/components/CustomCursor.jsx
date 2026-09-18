import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

/**
 * CustomCursor
 * - Smooth dot trailing behind mouse pointer on desktop.
 * - Expands into an inverted difference lens when hovering text (text renders bright white inside the circle).
 * - Completely hides animation when hovering buttons, links, or interactive elements.
 * - Mounted directly into document.body to avoid any parent stacking context or layer isolation.
 * - Strictly active on fine pointer devices (mouse/trackpad), disabled on mobile and touch screens.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'text' | 'hidden'
  const [isVisible, setIsVisible] = useState(false);
  const hasMoved = useRef(false);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    // Only activate on devices with fine pointer (mouse / trackpad)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    if (cursorRef.current) {
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
      xTo.current = gsap.quickTo(cursorRef.current, 'x', {
        duration: 0.16,
        ease: 'power3.out'
      });
      yTo.current = gsap.quickTo(cursorRef.current, 'y', {
        duration: 0.16,
        ease: 'power3.out'
      });
    }

    const checkInteractive = (target) => {
      if (!target || !(target instanceof Element)) return false;

      // Check standard clickable elements and interactive roles
      if (
        target.closest(
          'a, button, [role="button"], input, textarea, select, label[for], ' +
          '.page-nav-cta-btn, .about-tab-pill, .gallery-slider-btn, .gallery-slider-dot, ' +
          '.gallery-slider-card, .footer-social-btn, .work-btn-figma, .figma-artboard-card, ' +
          '.vertical-nav-item, .brand-logo-img, .brand-logo, .lightbox-overlay, .modal-close-btn, ' +
          '[onclick], [tabindex="0"], [data-cursor="interactive"]'
        )
      ) {
        return true;
      }

      // Check computed cursor style for pointer
      try {
        const computed = window.getComputedStyle(target);
        if (computed && computed.cursor === 'pointer') {
          return true;
        }
      } catch {
        // ignore errors on pseudo / SVG elements
      }

      return false;
    };

    const checkText = (target) => {
      if (!target || !(target instanceof Element)) return false;

      // Typography tags
      const textTags = [
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'P', 'LI', 'BLOCKQUOTE', 'STRONG', 'B', 'EM',
        'SMALL', 'CITE', 'SPAN'
      ];
      if (textTags.includes(target.tagName)) {
        const content = target.textContent?.trim();
        if (content && content.length > 0 && !target.closest('svg')) {
          return true;
        }
      }

      // Portfolio specific text selectors across all pages
      if (
        target.closest(
          'h1, h2, h3, h4, h5, h6, p, li, blockquote, ' +
          '.hero-bio, .about-headline, .about-description, .exp-company, .exp-role, .exp-period, .exp-work, ' +
          '.skills-heading, .work-main-heading, .awards-heading, .gallery-heading, .contact-heading, ' +
          '.title-huge, .title-descriptor, .greeting-intro, .ampersand-accent, .site-footer-copyright, ' +
          '.brand-name, .hero-lead-text, .section-heading, .editorial-stat, .stat-value, .stat-label, ' +
          '.tab-label, .award-item-title, .award-item-org, .award-item-year, .award-item-desc, ' +
          '.gallery-memory-title, .gallery-card-caption, .contact-detail-text, .contact-form-label'
        )
      ) {
        return true;
      }

      return false;
    };

    const handleMouseMove = (e) => {
      if (!hasMoved.current) {
        hasMoved.current = true;
        if (cursorRef.current) {
          gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY });
        }
        setIsVisible(true);
      } else if (xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
      }

      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // 1. Hover on links or buttons: remove cursor animation completely until user moves off
      if (checkInteractive(target)) {
        setCursorMode('hidden');
        return;
      }

      // 2. Hover on text: expand into difference lens so text renders white inside circle
      if (checkText(target)) {
        setCursorMode('text');
        return;
      }

      // 3. Default state: black follower dot trailing behind pointer
      setCursorMode('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mounted]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={cursorRef}
      className={`custom-cursor-lens cursor-mode-${cursorMode} ${isVisible ? 'is-visible' : 'is-hidden'}`}
      aria-hidden="true"
    />,
    document.body
  );
}
