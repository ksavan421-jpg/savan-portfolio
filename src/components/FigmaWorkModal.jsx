import React, { useEffect, useState } from 'react';

const FIGMA_ARTBOARDS = [
  { id: 'home', title: 'Home Page', src: '/portfolio/home page 1.webp' },
  { id: 'about', title: 'About Us', src: '/portfolio/about us 1.webp' },
  { id: 'team', title: 'Our Team', src: '/portfolio/our-team 1.webp' },
  { id: 'story', title: 'Our Story', src: '/portfolio/our-story 1.webp' },
  { id: 'microsite', title: 'Microsite', src: '/portfolio/microsite 1.webp' },
  { id: 'career', title: 'Career', src: '/portfolio/career 1.webp' },
];

export default function FigmaWorkModal({ isOpen, onClose, projectTitle = 'Eldeco Group' }) {
  const [selectedArtboard, setSelectedArtboard] = useState(null);

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
              Disclaimer: This project was designed and developed by me at GTF Technologies for Eldeco Group. The final version may differ due to client-requested changes and later revisions. All content and brand assets belong to their respective owners.
            </p>
          </div>
        </div>

        {/* Right Artboards Showcase Row */}
        <div className="figma-modal-right" aria-label="Figma Screen Designs">
          <div className="figma-artboards-track">
            {FIGMA_ARTBOARDS.map((artboard) => (
              <div
                key={artboard.id}
                className="figma-artboard-card"
                onClick={() => setSelectedArtboard(artboard)}
                title={`Click to preview ${artboard.title}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedArtboard(artboard); }}
              >
                <img
                  src={artboard.src}
                  alt={`${projectTitle} - ${artboard.title}`}
                  className="figma-artboard-img"
                  loading="lazy"
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
