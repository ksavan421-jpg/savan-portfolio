import { useEffect } from 'react';
import Lenis from '../lib/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useSmoothScroll
 * Implements silky-smooth Lenis inertia momentum scrolling across the entire page.
 * Seamlessly supports:
 * - Mouse wheel: spring-damping physics with smooth gliding
 * - Scrollbar: instant responsive dragging with zero jitter or lag
 * - Programmatic smooth scroll to anchors & sections
 * - Automatic coordination with GSAP ScrollTrigger
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Enforce manual scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    const handlePageShow = () => {
      window.scrollTo(0, 0);
      window.lenis?.scrollTo(0, { immediate: true });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pageshow', handlePageShow);

    // Only enable on desktop / fine-pointer devices, or non-coarse
    const isTouchOnly = window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    if (isTouchOnly) {
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('pageshow', handlePageShow);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
      autoResize: true,
    });

    window.lenis = lenis;

    // Instantly ensure Lenis internal scroll position starts at 0
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    // Connect Lenis scroll events to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // RAF render loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
      cancelAnimationFrame(rafId);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);
}
