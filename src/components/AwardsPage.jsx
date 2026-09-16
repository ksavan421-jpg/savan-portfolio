import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronLeft, ChevronRight, ZoomIn, Award } from 'lucide-react';
import NavColumn from './NavColumn';
import ArchitecturalBracket from './ArchitecturalBracket';

// 4 Award Categories requested by user
const AWARDS_TABS = [
  {
    id: 'month',
    label: 'Employee of the Month'
  },
  {
    id: 'year',
    label: 'Employee of the Year'
  },
  {
    id: 'anniversary',
    label: 'Work Anniversary'
  },
  {
    id: 'appreciation',
    label: 'Appreciation'
  }
];

// Award media organized by category
const AWARDS_DATA = {
  month: [
    {
      id: 1,
      src: '/employee-of-the-month/employee-of-the-monrth-01.webp',
      alt: 'Certificate of Recognition - Employee of the Month 1',
      title: 'Employee of the Month'
    },
    {
      id: 2,
      src: '/employee-of-the-month/employee-of-the-monrth-02.webp',
      alt: 'Certificate of Recognition - Employee of the Month 2',
      title: 'Employee of the Month'
    },
    {
      id: 3,
      src: '/employee-of-the-month/employee-of-the-monrth-03.webp',
      alt: 'Certificate of Recognition - Employee of the Month 3',
      title: 'Employee of the Month'
    },
    {
      id: 4,
      src: '/employee-of-the-month/employee-of-the-monrth-04.webp',
      alt: 'Certificate of Recognition - Employee of the Month 4',
      title: 'Employee of the Month'
    },
    {
      id: 5,
      src: '/employee-of-the-month/employee-of-the-monrth-05.webp',
      alt: 'Certificate of Recognition - Employee of the Month 5',
      title: 'Employee of the Month'
    },
    {
      id: 6,
      src: '/employee-of-the-month/employee-of-the-monrth-06.webp',
      alt: 'Certificate of Recognition - Employee of the Month 6',
      title: 'Employee of the Month'
    }
  ],
  year: [
    {
      id: 1,
      src: '/gallery/gallery-img-2.webp',
      alt: 'Award Certificate - Employee of the Year',
      title: 'Employee of the Year'
    }
  ],
  anniversary: [
    {
      id: 1,
      src: '/anniversary/anniversary-second.webp',
      alt: '2nd Work Anniversary Recognition',
      title: '2nd Work Anniversary'
    },
    {
      id: 2,
      src: '/anniversary/anniversary-3rd.webp',
      alt: '3rd Work Anniversary Recognition',
      title: '3rd Work Anniversary'
    },
    {
      id: 3,
      src: '/anniversary/anniversary=4th.webp',
      alt: '4th Work Anniversary Recognition',
      title: '4th Work Anniversary'
    },
    {
      id: 4,
      src: '/anniversary/anniversary-5th.webp',
      alt: '5th Work Anniversary Recognition',
      title: '5th Work Anniversary'
    }
  ],
  appreciation: [
    {
      id: 1,
      src: '/Appreciation.webp',
      alt: 'Certificate of Appreciation',
      title: 'Certificate of Appreciation'
    }
  ]
};

export default function AwardsPage({
  activeNav = 'awards',
  onSelectNav,
  onDownloadResume
}) {
  const containerRef = useRef(null);
  const avatarImgRef = useRef(null);
  const contentRef = useRef(null);
  const slideRef = useRef(null);
  const touchStartX = useRef(null);

  const [activeTab, setActiveTab] = useState('month');
  const [currentAwardIndex, setCurrentAwardIndex] = useState(0);
  const [activeAward, setActiveAward] = useState(null);

  const currentAwards = AWARDS_DATA[activeTab] || [];
  const currentItem = currentAwards[currentAwardIndex] || null;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setCurrentAwardIndex(0);
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0.35, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
  };

  const changeSlide = (newIndex) => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0.4, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
    setCurrentAwardIndex(newIndex);
  };

  const handlePrevAward = () => {
    if (currentAwards.length <= 1) return;
    const nextIdx = currentAwardIndex === 0 ? currentAwards.length - 1 : currentAwardIndex - 1;
    changeSlide(nextIdx);
  };

  const handleNextAward = () => {
    if (currentAwards.length <= 1) return;
    const nextIdx = currentAwardIndex === currentAwards.length - 1 ? 0 : currentAwardIndex + 1;
    changeSlide(nextIdx);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      handleNextAward();
    } else if (diff < -45) {
      handlePrevAward();
    }
    touchStartX.current = null;
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (avatarImgRef.current) {
      tl.from(avatarImgRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: 'power3.out'
      }, 0.05);
    }

    if (contentRef.current) {
      tl.from(contentRef.current, {
        opacity: 0,
        x: 25,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform'
      }, 0.15);
    }
  }, { scope: containerRef });

  return (
    <main className="hero-container awards-page-container" id="awards-content" ref={containerRef}>
      {/* 1. Left Character Avatar Column */}
      <section className="hero-avatar-column" aria-label="Savan Holding Design Excellence Award">
        <div className="avatar-wrapper awards-avatar-wrapper">
          <img
            ref={avatarImgRef}
            src="/award.webp"
            alt="Savan holding gold star design excellence award"
            className="avatar-image awards-avatar-image"
            draggable="false"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* 2. Center Column with Bracket and Certificate Slider */}
      <section className="hero-center-column awards-center-column" aria-label="Recognition & Awards">
        <div className="center-content-wrapper awards-content-frame">
          <div className="bracket-wrapper awards-bracket-wrapper">
            <ArchitecturalBracket className="editorial-bracket" />
          </div>

          <div className="awards-main-body" ref={contentRef}>
            <h1 className="awards-heading">Recognition</h1>

            {/* Top 4 Award Tabs Navigation */}
            <nav className="about-tabs-nav awards-tabs-nav" aria-label="Award Categories Tabs">
              {AWARDS_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={`about-tab-pill ${isActive ? 'active' : ''}`}
                    id={`awards-tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Slider or Empty State depending on available media */}
            {currentAwards.length > 0 && currentItem ? (
              <div
                className="gallery-slider-wrapper"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  ref={slideRef}
                  className="memory-photo-card gallery-slider-card"
                  onClick={() => setActiveAward(currentItem)}
                  title="Click to view full size"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActiveAward(currentItem); }}
                >
                  <img
                    src={currentItem.src}
                    alt={currentItem.alt}
                    className="memory-photo-img"
                    draggable="false"
                  />

                  <div className="gallery-zoom-badge" aria-label="Zoom certificate">
                    <ZoomIn size={16} />
                  </div>
                </div>

                {/* Slider Footer with Dots and Two Control Buttons */}
                <div className="gallery-slider-footer">
                  <div className="gallery-slider-dots">
                    {currentAwards.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => changeSlide(idx)}
                        className={`gallery-slider-dot ${idx === currentAwardIndex ? 'active' : ''}`}
                        aria-label={`Go to certificate ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Two control buttons */}
                  <div className="gallery-slider-controls">
                    <button
                      type="button"
                      onClick={handlePrevAward}
                      className="gallery-slider-btn"
                      id="awards-slider-prev-btn"
                      aria-label="Previous certificate"
                      title="Previous certificate"
                      disabled={currentAwards.length <= 1}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextAward}
                      className="gallery-slider-btn"
                      id="awards-slider-next-btn"
                      aria-label="Next certificate"
                      title="Next certificate"
                      disabled={currentAwards.length <= 1}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gallery-empty-state">
                <div className="gallery-empty-icon-box">
                  <Award size={28} />
                </div>
                <p className="gallery-empty-title">Certificates Coming Soon</p>
                <p className="gallery-empty-desc">
                  Awards and recognition for {AWARDS_TABS.find(t => t.id === activeTab)?.label} will be added here soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Right Navigation Column */}
      <NavColumn
        activeNav={activeNav}
        onSelectNav={onSelectNav}
        onDownloadResume={onDownloadResume}
      />

      {/* Download Resume Button (Bottom of Image on Mobile) */}
      <div className="hero-resume-cta-wrapper">
        <button
          type="button"
          onClick={onDownloadResume}
          className="page-nav-cta-btn hero-resume-btn"
          id="awards-resume-btn"
          aria-label="Download Resume"
        >
          <span>DOWNLOAD RESUME</span>
        </button>
      </div>

      {/* Next Section CTA Button (Mobile Fixed Bottom) */}
      <div className="page-nav-cta-wrapper">
        <button
          type="button"
          onClick={() => {
            onSelectNav('gallery');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="page-nav-cta-btn"
          id="awards-gallery-btn"
          aria-label="Go to Gallery page"
        >
          <span>VIEW GALLERY</span>
          <ArrowRight size={16} className="page-nav-cta-icon" />
        </button>
      </div>

      {/* Lightbox for high-res viewing */}
      {activeAward && (
        <div className="lightbox-overlay" onClick={() => setActiveAward(null)} aria-modal="true" role="dialog">
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeAward.src} alt={activeAward.alt} className="lightbox-img" />
            <button className="lightbox-close" onClick={() => setActiveAward(null)} aria-label="Close certificate preview">✕</button>
          </div>
        </div>
      )}
    </main>
  );
}
