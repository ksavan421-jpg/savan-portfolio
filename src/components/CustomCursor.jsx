import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

/**
 * CustomCursor
 * - Crisp center pointer dot following the mouse cursor.
 * - Animated trailing circle behind the mouse containing rotating "SCROLL DOWN • SCROLL DOWN •" text.
 * - Automatically disappears/removes when hovering any link, button, or interactive clickable element.
 * - Only active on fine pointer devices (desktop/trackpad), disabled on touchscreens.
 */
export default function CustomCursor() {
  const badgeRef = useRef(null);
  const dotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isHovered = useRef(false);

  useEffect(() => {
    // Only activate on devices with mouse/trackpad
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const badge = badgeRef.current;
    const dot = dotRef.current;
    if (!badge || !dot) return;

    // Center offsets
    gsap.set(badge, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });

    const badgeXTo = gsap.quickTo(badge, 'x', { duration: 0.32, ease: 'power2.out' });
    const badgeYTo = gsap.quickTo(badge, 'y', { duration: 0.32, ease: 'power2.out' });

    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });

    let firstMove = true;

    const onMouseMove = (e) => {
      if (firstMove) {
        firstMove = false;
        setIsVisible(true);
        gsap.set([badge, dot], { x: e.clientX, y: e.clientY });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
        if (!isHovered.current) {
          gsap.to(badge, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' });
        }
      } else {
        dotXTo(e.clientX);
        dotYTo(e.clientY);
        badgeXTo(e.clientX);
        badgeYTo(e.clientY);
      }
    };

    const isInteractive = (el) => {
      if (!el || !(el instanceof Element)) return false;
      return Boolean(
        el.closest(
          'a, button, [role="button"], input, textarea, select, label, ' +
          '[tabindex]:not([tabindex="-1"]), [onclick], .cursor-pointer'
        ) ||
        window.getComputedStyle(el).cursor === 'pointer'
      );
    };

    const onMouseOver = (e) => {
      if (isInteractive(e.target)) {
        isHovered.current = true;
        // Remove / hide the circle and "scroll down" text when hovering links or buttons
        gsap.to(badge, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.inOut' });
        gsap.to(dot, { scale: 1.8, backgroundColor: '#0033FF', duration: 0.2 });
      }
    };

    const onMouseOut = (e) => {
      if (isInteractive(e.target)) {
        isHovered.current = false;
        // Bring back the trailing circle and "scroll down" text
        gsap.to(badge, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, backgroundColor: '#ffffff', duration: 0.2 });
      }
    };

    const onMouseLeaveWindow = () => {
      gsap.to([badge, dot], { opacity: 0, duration: 0.2 });
    };

    const onMouseEnterWindow = () => {
      gsap.to(dot, { opacity: 1, duration: 0.2 });
      if (!isHovered.current) {
        gsap.to(badge, { opacity: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
    };
  }, []);

  return (
    <>
      {/* Precision cursor center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9999] mix-blend-difference hidden md:block"
      />

      {/* Trailing circle with rotating "SCROLL DOWN" text */}
      <div
        ref={badgeRef}
        className="pointer-events-none fixed top-0 left-0 w-20 h-20 rounded-full border border-white/40 bg-black/60 backdrop-blur-md z-[9998] shadow-[0_0_25px_rgba(0,51,255,0.4)] flex items-center justify-center select-none hidden md:flex"
      >
        {/* Rotating Circular Text: SCROLL DOWN • SCROLL DOWN • */}
        <svg
          className="w-full h-full absolute inset-0 animate-[spin_10s_linear_infinite]"
          viewBox="0 0 100 100"
        >
          <path
            id="cursorCirclePath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
          <text className="text-[10px] font-bold fill-white tracking-[2.2px] uppercase">
            <textPath href="#cursorCirclePath" startOffset="0%">
              SCROLL DOWN • SCROLL DOWN • 
            </textPath>
          </text>
        </svg>

        {/* Center downward arrow */}
        <ArrowDown className="w-3.5 h-3.5 text-[#0033FF] animate-bounce" />
      </div>
    </>
  );
}
