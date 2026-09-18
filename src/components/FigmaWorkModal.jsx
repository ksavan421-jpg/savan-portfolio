import React, { useEffect, useState, useRef } from 'react';

const ELDECO_ARTBOARDS = [
  { id: 'home', title: 'Home Page', src: '/portfolio/home page 1.webp' },
  { id: 'about', title: 'About Us', src: '/portfolio/about us 1.webp' },
  { id: 'team', title: 'Our Team', src: '/portfolio/our-team 1.webp' },
  { id: 'story', title: 'Our Story', src: '/portfolio/our-story 1.webp' },
  { id: 'microsite', title: 'Microsite', src: '/portfolio/microsite 1.webp' },
  { id: 'career', title: 'Career', src: '/portfolio/career 1.webp' },
];

const NORTHWIND_ARTBOARDS = [
  { id: 'nw-1', title: 'Frame 01', src: '/work/north-wind-estate/Frame-1.webp' },
  { id: 'nw-2', title: 'Frame 02', src: '/work/north-wind-estate/Frame-2.webp' },
  { id: 'nw-3', title: 'Frame 03', src: '/work/north-wind-estate/Frame-3.webp' },
  { id: 'nw-3-1', title: 'Frame 03-B', src: '/work/north-wind-estate/Frame-3-1.webp' },
  { id: 'nw-4', title: 'Frame 04', src: '/work/north-wind-estate/Frame-4.webp' },
  { id: 'nw-5', title: 'Frame 05', src: '/work/north-wind-estate/Frame-5.webp' },
  { id: 'nw-6', title: 'Frame 06', src: '/work/north-wind-estate/Frame-6.webp' },
  { id: 'nw-7', title: 'Frame 07', src: '/work/north-wind-estate/Frame-7.webp' },
  { id: 'nw-8', title: 'Frame 08', src: '/work/north-wind-estate/Frame-8.webp' },
  { id: 'nw-9', title: 'Frame 09', src: '/work/north-wind-estate/Frame-9.webp' },
  { id: 'nw-10', title: 'Frame 10', src: '/work/north-wind-estate/Frame-10.webp' },
  { id: 'nw-11', title: 'Frame 11', src: '/work/north-wind-estate/Frame-11.webp' },
  { id: 'nw-12', title: 'Frame 12', src: '/work/north-wind-estate/Frame-12.webp' },
  { id: 'nw-13', title: 'Frame 13', src: '/work/north-wind-estate/Frame-13.webp' },
  { id: 'nw-14', title: 'Frame 14', src: '/work/north-wind-estate/Frame-14.webp' },
  { id: 'nw-15', title: 'Frame 15', src: '/work/north-wind-estate/Frame-15.webp' },
  { id: 'nw-16', title: 'Frame 16', src: '/work/north-wind-estate/Frame-16.webp' },
  { id: 'nw-17', title: 'Frame 17', src: '/work/north-wind-estate/Frame-17.webp' },
  { id: 'nw-18', title: 'Frame 18', src: '/work/north-wind-estate/Frame-18.webp' },
  { id: 'nw-19', title: 'Frame 19', src: '/work/north-wind-estate/Frame-19.webp' },
  { id: 'nw-20', title: 'Frame 20', src: '/work/north-wind-estate/Frame-20.webp' },
  { id: 'nw-21', title: 'Frame 21', src: '/work/north-wind-estate/Frame-21.webp' },
  { id: 'nw-22', title: 'Frame 22', src: '/work/north-wind-estate/Frame-22.webp' },
  { id: 'nw-23', title: 'Frame 23', src: '/work/north-wind-estate/Frame-23.webp' },
  { id: 'nw-24', title: 'Frame 24', src: '/work/north-wind-estate/Frame-24.webp' },
  { id: 'nw-25', title: 'Frame 25', src: '/work/north-wind-estate/Frame-25.webp' },
];

const AARYA_ARTBOARDS = [
  { id: 'aarya-1', title: 'Frame 01', src: '/work/Aarya-Realty/Frame 1.webp' },
  { id: 'aarya-2', title: 'Frame 02', src: '/work/Aarya-Realty/Frame 2.webp' },
  { id: 'aarya-3', title: 'Frame 03', src: '/work/Aarya-Realty/Frame 3.webp' },
  { id: 'aarya-4', title: 'Frame 04', src: '/work/Aarya-Realty/Frame 4.webp' },
  { id: 'aarya-5', title: 'Frame 05', src: '/work/Aarya-Realty/Frame 5.webp' },
  { id: 'aarya-6', title: 'Frame 06', src: '/work/Aarya-Realty/Frame 6.webp' },
  { id: 'aarya-7', title: 'Frame 07', src: '/work/Aarya-Realty/Frame 7.webp' },
  { id: 'aarya-8', title: 'Frame 08', src: '/work/Aarya-Realty/Frame 8.webp' },
  { id: 'aarya-9', title: 'Frame 09', src: '/work/Aarya-Realty/Frame 9.webp' },
  { id: 'aarya-10', title: 'Frame 10', src: '/work/Aarya-Realty/Frame 10.webp' },
  { id: 'aarya-11', title: 'Frame 11', src: '/work/Aarya-Realty/Frame 11.webp' },
  { id: 'aarya-12', title: 'Frame 12', src: '/work/Aarya-Realty/Frame 12.webp' },
  { id: 'aarya-13', title: 'Frame 13', src: '/work/Aarya-Realty/Frame 13.webp' },
  { id: 'aarya-14', title: 'Frame 14', src: '/work/Aarya-Realty/Frame 14.webp' },
  { id: 'aarya-16', title: 'Frame 16', src: '/work/Aarya-Realty/Frame 16.webp' },
  { id: 'aarya-17', title: 'Frame 17', src: '/work/Aarya-Realty/Frame 17.webp' },
  { id: 'aarya-18', title: 'Frame 18', src: '/work/Aarya-Realty/Frame 18.webp' },
  { id: 'aarya-19', title: 'Frame 19', src: '/work/Aarya-Realty/Frame 19.webp' },
  { id: 'aarya-20', title: 'Frame 20', src: '/work/Aarya-Realty/Frame 20.webp' },
  { id: 'aarya-21', title: 'Frame 21', src: '/work/Aarya-Realty/Frame 21.webp' },
  { id: 'aarya-22', title: 'Frame 22', src: '/work/Aarya-Realty/Frame 22.webp' },
  { id: 'aarya-23', title: 'Frame 23', src: '/work/Aarya-Realty/Frame 23.webp' },
  { id: 'aarya-24', title: 'Frame 24', src: '/work/Aarya-Realty/Frame 24.webp' },
  { id: 'aarya-26', title: 'Frame 26', src: '/work/Aarya-Realty/Frame 26.webp' },
  { id: 'aarya-27', title: 'Frame 27', src: '/work/Aarya-Realty/Frame 27.webp' },
];

const RUBBERWALA_ARTBOARDS = [
  { id: 'rw-1', title: 'Layout 01 - Full Website', src: '/work/rubberwala/layout-1.webp' },
  { id: 'rw-2', title: 'Layout 02 - Architectural Concept', src: '/work/rubberwala/layout-2.webp' },
];

const ASHWIN_SETH_ARTBOARDS = [
  { id: 'as-1', title: 'Layout 01 - Preloader', src: '/work/ashwin-seth/layout-1.webp' },
  { id: 'as-2', title: 'Layout 02 - Preloader Phase 2', src: '/work/ashwin-seth/layout-2.webp' },
  { id: 'as-3', title: 'Layout 03 - Preloader Expansion', src: '/work/ashwin-seth/layout-3.webp' },
  { id: 'as-4', title: 'Layout 04 - Iris Reveal', src: '/work/ashwin-seth/layout-4.webp' },
  { id: 'as-5', title: 'Layout 05 - Brand Hero Intro', src: '/work/ashwin-seth/layout-5.webp' },
  { id: 'as-6', title: 'Layout 06 - Home Waterfall Experience', src: '/work/ashwin-seth/layout-6.webp' },
  { id: 'as-7', title: 'Layout 07 - Sunset Skyline Living', src: '/work/ashwin-seth/layout-7.webp' },
  { id: 'as-8', title: 'Layout 08 - Serene Ocean Waterfront', src: '/work/ashwin-seth/layout-8.webp' },
  { id: 'as-9', title: 'Layout 09 - Section Transition', src: '/work/ashwin-seth/layout-9.webp' },
  { id: 'as-10', title: 'Layout 10 - Vision & Impact Stats', src: '/work/ashwin-seth/layout-10.webp' },
  { id: 'as-10-1', title: 'Layout 10-A - Interactive Globe View', src: '/work/ashwin-seth/layout-10-1.webp' },
  { id: 'as-10-2', title: 'Layout 10-B - Global Presence', src: '/work/ashwin-seth/layout-10-2.webp' },
  { id: 'as-14', title: 'Layout 14 - One Marina, Marine Drive', src: '/work/ashwin-seth/layout-14.webp' },
  { id: 'as-15', title: 'Layout 15 - Avalon, Thane', src: '/work/ashwin-seth/layout-15.webp' },
  { id: 'as-16', title: 'Layout 16 - Commercial Developments', src: '/work/ashwin-seth/layout-16.webp' },
  { id: 'as-17', title: 'Layout 17 - Amenities & Masterplan', src: '/work/ashwin-seth/layout-17.webp' },
  { id: 'as-18', title: 'Layout 18 - Footer & Quick Links', src: '/work/ashwin-seth/layout-18.webp' },
];

export default function FigmaWorkModal({ isOpen, onClose, projectTitle = 'Eldeco Group' }) {
  const [selectedArtboard, setSelectedArtboard] = useState(null);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const trackRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumRafRef = useRef(null);
  const dragDistanceRef = useRef(0);

  const titleLower = (projectTitle || '').toLowerCase();
  let artboards = ELDECO_ARTBOARDS;
  let projectClass = 'is-eldeco';

  if (titleLower.includes('northwind')) {
    artboards = NORTHWIND_ARTBOARDS;
    projectClass = 'is-northwind';
  } else if (titleLower.includes('aarya') || titleLower.includes('arya')) {
    artboards = AARYA_ARTBOARDS;
    projectClass = 'is-aarya';
  } else if (titleLower.includes('rubberwala')) {
    artboards = RUBBERWALA_ARTBOARDS;
    projectClass = 'is-rubberwala';
  } else if (titleLower.includes('ashwin') || titleLower.includes('sheth') || titleLower.includes('seth')) {
    artboards = ASHWIN_SETH_ARTBOARDS;
    projectClass = 'is-ashwin-seth';
  }

  // Handle ESC key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedArtboard) {
          setSelectedArtboard(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedArtboard, onClose]);

  // Reset scroll on modal open or project switch
  useEffect(() => {
    if (isOpen && trackRef.current) {
      trackRef.current.scrollLeft = 0;
    }
  }, [isOpen, projectTitle]);

  // Desktop Mouse Drag-to-Slide & Horizontal Wheel Controller
  useEffect(() => {
    if (!isOpen) return;

    const track = trackRef.current;
    if (!track) return;

    const handleMouseDown = (e) => {
      if (e.button !== 0) return; // Left click only

      if (momentumRafRef.current) {
        cancelAnimationFrame(momentumRafRef.current);
        momentumRafRef.current = null;
      }

      isMouseDownRef.current = true;
      isDraggingRef.current = false;
      dragDistanceRef.current = 0;
      startXRef.current = e.pageX - track.offsetLeft;
      scrollLeftRef.current = track.scrollLeft;
      lastXRef.current = e.pageX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
    };

    const handleMouseMove = (e) => {
      if (!isMouseDownRef.current) return;

      const x = e.pageX - track.offsetLeft;
      const walk = x - startXRef.current;
      dragDistanceRef.current = Math.abs(walk);

      if (Math.abs(walk) > 4) {
        if (!isDraggingRef.current) {
          isDraggingRef.current = true;
          setIsDraggingState(true);
        }
        e.preventDefault();
        track.scrollLeft = scrollLeftRef.current - walk;

        const now = performance.now();
        const dt = Math.max(1, now - lastTimeRef.current);
        const dx = e.pageX - lastXRef.current;
        velocityRef.current = dx / dt;
        lastXRef.current = e.pageX;
        lastTimeRef.current = now;
      }
    };

    const handleMouseUp = () => {
      if (!isMouseDownRef.current) return;
      isMouseDownRef.current = false;
      setIsDraggingState(false);

      if (isDraggingRef.current) {
        // Momentum coasting physics
        let vel = velocityRef.current * 16;
        const friction = 0.94;

        const step = () => {
          if (Math.abs(vel) < 0.4) {
            momentumRafRef.current = null;
            return;
          }
          track.scrollLeft -= vel;
          vel *= friction;
          momentumRafRef.current = requestAnimationFrame(step);
        };

        if (Math.abs(vel) > 1) {
          momentumRafRef.current = requestAnimationFrame(step);
        }
      }

      // Suppress lightbox trigger if the user performed a drag gesture
      setTimeout(() => {
        isDraggingRef.current = false;
        dragDistanceRef.current = 0;
      }, 60);
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 30;
        else if (e.deltaMode === 2) delta *= 300;
        track.scrollLeft += delta * 0.95;
      }
    };

    track.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    track.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (momentumRafRef.current) {
        cancelAnimationFrame(momentumRafRef.current);
      }
      track.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      track.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  const handleCardClick = (artboard) => {
    if (isDraggingRef.current || dragDistanceRef.current > 5) {
      return;
    }
    setSelectedArtboard(artboard);
  };

  if (!isOpen) return null;

  return (
    <div className="figma-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="figma-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Left Information Column */}
        <div className="figma-modal-left">
          <h2 className="figma-modal-title">Figma Work</h2>

          <div className="figma-close-wrapper">
            <button
              onClick={onClose}
              className="figma-close-btn"
              id="figma-modal-close-btn"
              aria-label="Close Figma Work modal"
            >
              CLOSE
            </button>
          </div>

          <div className="figma-project-info">
            <h3 className="figma-project-name">{projectTitle}</h3>

            <p className="figma-project-note">
              Note: A Selection Of The Main Pages Is Showcased Here.
            </p>

            <p className="figma-project-disclaimer">
              {`Disclaimer: This project was designed and developed by me at GTF Technologies for ${projectTitle || 'Eldeco Group'}. The final version may differ due to client-requested changes and later revisions. All content and brand assets belong to their respective owners.`}
            </p>

            <div className="figma-drag-badge">
              <span className="figma-drag-badge-icon">↔</span>
              <span>DRAG TO SLIDE ({artboards.length} SCREENS)</span>
            </div>
          </div>
        </div>

        {/* Right Artboards Showcase Row */}
        <div 
          ref={trackRef}
          className={`figma-modal-right ${projectClass} ${isDraggingState ? 'is-dragging' : ''}`} 
          aria-label="Figma Screen Designs"
        >
          <div className="figma-artboards-track">
            {artboards.map((artboard) => (
              <div
                key={artboard.id}
                className="figma-artboard-card"
                onClick={() => handleCardClick(artboard)}
                title={`Click to preview ${artboard.title}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(artboard); }}
              >
                <img
                  src={artboard.src}
                  alt={`${projectTitle} - ${artboard.title}`}
                  className="figma-artboard-img"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Artboard Zoom Preview */}
      {selectedArtboard && (
        <div 
          className="artboard-lightbox-overlay" 
          onClick={() => setSelectedArtboard(null)}
          aria-modal="true"
          role="dialog"
        >
          <div className="artboard-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedArtboard.src}
              alt={selectedArtboard.title}
              className="artboard-lightbox-img"
            />
            <button
              className="artboard-lightbox-close"
              onClick={() => setSelectedArtboard(null)}
              aria-label="Close image preview"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
