import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronLeft, ChevronRight, Play, ZoomIn, Image as ImageIcon } from 'lucide-react';
import NavColumn from './NavColumn';
import ArchitecturalBracket from './ArchitecturalBracket';

// 3 Company Tabs matching user's work experience
const COMPANY_TABS = [
  {
    id: 'gtf',
    label: 'GTF Technologies'
  },
  {
    id: 'onlinefront',
    label: 'Onlinefront'
  },
  {
    id: 'chahar',
    label: 'Chahar Technologies'
  }
];

// Gallery media organized by company
const GALLERY_DATA = {
  gtf: [
    {
      id: 1,
      src: '/gallery/gallery-img-1.png',
      alt: 'Savan at Office - GTF Technologies',
      type: 'image'
    },
    {
      id: 2,
      src: '/gallery/gallery-img-2.png',
      alt: 'Savan holding Award Certificate - GTF Technologies',
      type: 'image'
    },
    {
      id: 3,
      src: '/gallery/gallery-img-3.jpeg',
      alt: 'GTF Technologies Office Memory 3',
      type: 'image'
    },
    {
      id: 4,
      src: '/gallery/gallery-img-4.jpeg',
      alt: 'GTF Technologies Office Memory 4',
      type: 'image'
    },
    {
      id: 5,
      src: '/gallery/gallery-img-5.jpeg',
      alt: 'GTF Technologies Office Memory 5',
      type: 'image'
    },
    {
      id: 6,
      src: '/gallery/gallery-img-6.jpeg',
      alt: 'GTF Technologies Office Memory 6',
      type: 'image'
    },
    {
      id: 7,
      src: '/gallery/gallery-img-7.jpeg',
      alt: 'GTF Technologies Office Memory 7',
      type: 'image'
    },
    {
      id: 8,
      src: '/gallery/gallery-img-8.jpeg',
      alt: 'GTF Technologies Office Memory 8',
      type: 'image'
    },
    {
      id: 9,
      src: '/gallery/gallery-img-9.jpeg',
      alt: 'GTF Technologies Office Memory 9',
      type: 'image'
    },
    {
      id: 10,
      src: '/gallery/gallery-img-10.jpeg',
      alt: 'GTF Technologies Office Memory 10',
      type: 'image'
    },
    {
      id: 11,
      src: '/gallery/gallery-img-11.jpeg',
      alt: 'GTF Technologies Office Memory 11',
      type: 'image'
    },
    {
      id: 12,
      src: '/gallery/video-1.mp4',
      alt: 'GTF Technologies Celebration Video',
      type: 'video'
    }
  ],
  onlinefront: [
    {
      id: 1,
      src: '/gallery/onlinefront/gallery-img-1.jpeg',
      alt: 'Onlinefront Office Memory 1',
      type: 'image'
    },
    {
      id: 2,
      src: '/gallery/onlinefront/gallery-img-2.jpeg',
      alt: 'Onlinefront Office Memory 2',
      type: 'image'
    },
    {
      id: 3,
      src: '/gallery/onlinefront/gallery-img-3.jpeg',
      alt: 'Onlinefront Office Memory 3',
      type: 'image'
    },
    {
      id: 4,
      src: '/gallery/onlinefront/gallery-img-4.jpeg',
      alt: 'Onlinefront Office Memory 4',
      type: 'image'
    },
    {
      id: 5,
      src: '/gallery/onlinefront/gallery-img-5.jpeg',
      alt: 'Onlinefront Office Memory 5',
      type: 'image'
    },
    {
      id: 6,
      src: '/gallery/onlinefront/gallery-img-6.jpeg',
      alt: 'Onlinefront Office Memory 6',
      type: 'image'
    }
  ],
  chahar: [
    {
      id: 1,
      src: '/gallery/chahartechnologies/gallery-img-1.jpeg',
      alt: 'Chahar Technologies Office Memory 1',
      type: 'image'
    }
  ]
};

export default function GalleryPage({
  activeNav = 'gallery',
  onSelectNav,
  onDownloadResume
}) {
  const containerRef = useRef(null);
  const avatarImgRef = useRef(null);
  const contentRef = useRef(null);
  const slideRef = useRef(null);
  const touchStartX = useRef(null);

  const [activeTab, setActiveTab] = useState('gtf');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [activePhoto, setActivePhoto] = useState(null);

  const currentPhotos = GALLERY_DATA[activeTab] || [];
  const currentItem = currentPhotos[currentPhotoIndex] || null;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setCurrentPhotoIndex(0);
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
    setCurrentPhotoIndex(newIndex);
  };

  const handlePrevPhoto = () => {
    if (currentPhotos.length <= 1) return;
    const nextIdx = currentPhotoIndex === 0 ? currentPhotos.length - 1 : currentPhotoIndex - 1;
    changeSlide(nextIdx);
  };

  const handleNextPhoto = () => {
    if (currentPhotos.length <= 1) return;
    const nextIdx = currentPhotoIndex === currentPhotos.length - 1 ? 0 : currentPhotoIndex + 1;
    changeSlide(nextIdx);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNextPhoto();
    } else if (diff < -40) {
      handlePrevPhoto();
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
    <main className="hero-container gallery-page-container" id="gallery-content" ref={containerRef}>
      {/* 1. Left Character Avatar Column */}
      <section className="hero-avatar-column" aria-label="Savan Reviewing Work on Tablet">
        <div className="avatar-wrapper gallery-avatar-wrapper">
          <img
            ref={avatarImgRef}
            src="/gallery.png"
            alt="Savan holding and interacting with iPad tablet"
            className="avatar-image gallery-avatar-image"
            draggable="false"
          />
        </div>
      </section>

      {/* 2. Center Column with Bracket and Photo Memories Slider */}
      <section className="hero-center-column gallery-center-column" aria-label="Some Memories">


        <h1 className="gallery-heading">Some Memories</h1>

        <div className="center-content-wrapper gallery-content-frame">
          <div className="bracket-wrapper gallery-bracket-wrapper">
            <ArchitecturalBracket className="editorial-bracket" />
          </div>



          <div className="gallery-main-body" ref={contentRef}>
            {/* Top 3 Company Tabs Navigation */}
            <nav className="about-tabs-nav gallery-tabs-nav" aria-label="Company Gallery Tabs">
              {COMPANY_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={`about-tab-pill ${isActive ? 'active' : ''}`}
                    id={`gallery-tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>


            {/* Slider or Empty State depending on available media */}
            {currentPhotos.length > 0 && currentItem ? (
              <div
                className="gallery-slider-wrapper"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  ref={slideRef}
                  className="memory-photo-card gallery-slider-card"
                  onClick={() => setActivePhoto(currentItem)}
                  title="Click to view full size"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActivePhoto(currentItem); }}
                >
                  {currentItem.type === 'video' ? (
                    <video
                      src={currentItem.src}
                      className="memory-photo-img"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={currentItem.src}
                      alt={currentItem.alt}
                      className="memory-photo-img"
                      draggable="false"
                    />
                  )}

                  {currentItem.type === 'video' ? (
                    <div className="gallery-video-badge" aria-label="Video item">
                      <Play size={13} fill="currentColor" />
                    </div>
                  ) : (
                    <div className="gallery-zoom-badge" aria-label="Zoom photo">
                      <ZoomIn size={16} />
                    </div>
                  )}
                </div>

                {/* Slider Footer with Dots and Two Control Buttons */}
                <div className="gallery-slider-footer">
                  <div className="gallery-slider-dots">
                    {currentPhotos.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => changeSlide(idx)}
                        className={`gallery-slider-dot ${idx === currentPhotoIndex ? 'active' : ''}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Two control buttons */}
                  <div className="gallery-slider-controls">
                    <button
                      type="button"
                      onClick={handlePrevPhoto}
                      className="gallery-slider-btn"
                      id="gallery-slider-prev-btn"
                      aria-label="Previous item"
                      title="Previous item"
                      disabled={currentPhotos.length <= 1}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextPhoto}
                      className="gallery-slider-btn"
                      id="gallery-slider-next-btn"
                      aria-label="Next item"
                      title="Next item"
                      disabled={currentPhotos.length <= 1}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gallery-empty-state">
                <div className="gallery-empty-icon-box">
                  <ImageIcon size={28} />
                </div>
                <p className="gallery-empty-title">Photos Coming Soon</p>
                <p className="gallery-empty-desc">
                  Photos and videos from {COMPANY_TABS.find(t => t.id === activeTab)?.label} will be added here soon.
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
          id="gallery-resume-btn"
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
            onSelectNav('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="page-nav-cta-btn"
          id="gallery-contact-btn"
          aria-label="Go to Contact page"
        >
          <span>LET'S CONNECT</span>
          <ArrowRight size={16} className="page-nav-cta-icon" />
        </button>
      </div>

      {/* Optional Lightbox for high-res photo/video viewing */}
      {activePhoto && (
        <div className="lightbox-overlay" onClick={() => setActivePhoto(null)} aria-modal="true" role="dialog">
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {activePhoto.type === 'video' ? (
              <video
                src={activePhoto.src}
                className="lightbox-img"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img src={activePhoto.src} alt={activePhoto.alt} className="lightbox-img" />
            )}
            <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Close photo preview">✕</button>
          </div>
        </div>
      )}
    </main>
  );
}
