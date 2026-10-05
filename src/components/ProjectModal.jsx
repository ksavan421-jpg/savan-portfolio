import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  Layers, 
  Maximize2,
  Smartphone
} from 'lucide-react';
import { FigmaIcon } from './Icons';

export default function ProjectModal({ project, onClose, onContactClick }) {
  // Extract all available images for this project
  const allImages = useMemo(() => {
    if (!project) return [];
    if (project.images && Array.isArray(project.images) && project.images.length > 0) {
      return project.images;
    }
    const list = [];
    if (project.image) list.push(project.image);
    if (project.figmaLayout && !list.includes(project.figmaLayout)) {
      list.push(project.figmaLayout);
    }
    return list.length > 0 ? list : ['/slider-img-01.png'];
  }, [project]);

  const hasMultipleImages = allImages.length > 1;
  const hasFigmaLayout = Boolean(project?.figmaLayout);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(() => {
    if (hasFigmaLayout && allImages.length <= 2) return 'figma';
    return 'gallery';
  });

  const scrollContainerRef = useRef(null);
  const modalCardRef = useRef(null);
  const thumbnailStripRef = useRef(null);
  const gridContainerRef = useRef(null);

  // Sync state whenever the selected project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    if (project?.figmaLayout && (!project?.images || project.images.length <= 2)) {
      setActiveTab('figma');
    } else {
      setActiveTab('gallery');
    }
  }, [project]);

  // Reset scroll positions when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    if (gridContainerRef.current) {
      gridContainerRef.current.scrollTop = 0;
    }
    if (modalCardRef.current) {
      modalCardRef.current.scrollTop = 0;
    }
  }, [project, activeTab]);

  // Auto scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailStripRef.current && thumbnailStripRef.current.children[currentImageIndex]) {
      thumbnailStripRef.current.children[currentImageIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentImageIndex]);

  // Freeze background Lenis momentum smooth scroll while modal is active & handle keyboard navigation
  useEffect(() => {
    window.lenis?.stop();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasMultipleImages && activeTab === 'gallery') {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      } else if (e.key === 'ArrowLeft' && hasMultipleImages && activeTab === 'gallery') {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      window.lenis?.start();
    };
  }, [onClose, hasMultipleImages, activeTab, allImages.length]);

  if (!project) return null;

  const currentImageSrc = allImages[currentImageIndex] || project.image;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Helper to extract a friendly label from image path
  const getImageLabel = (path, idx) => {
    if (!path) return `Screen #${idx + 1}`;
    try {
      const decoded = decodeURI(path);
      const name = decoded.split('/').pop().replace(/\.[^/.]+$/, '');
      const lower = name.toLowerCase();
      if (lower === 'home page' || lower.includes('home-page')) return 'Home Page Layout';
      if (lower === 'microsite-0003') return 'Microsite Layout 03';
      if (lower === 'microsite') return 'Microsite Layout';
      if (lower === 'our-story') return 'Our Story';
      if (lower === 'our-team') return 'Our Team';
      if (lower === 'career') return 'Careers Portal';
      if (lower === 'csr') return 'CSR Initiatives';
      if (lower.startsWith('frame')) return name;
      if (lower.startsWith('layout')) return name.replace('layout-', 'Layout ');
      if (lower.includes('mockup')) return '3D Mockup';
      return name;
    } catch {
      return `Screen #${idx + 1}`;
    }
  };

  // Seamless scroll chaining from inner scrollable containers (Figma layout canvas, Grid) to outer modal card
  const handleScrollChaining = (e, innerContainer) => {
    const modalCard = modalCardRef.current;
    if (!modalCard) return;

    const deltaY = e.deltaY;
    if (!deltaY) return;

    // If there is no inner container or it is not scrollable vertically, scroll the modal card directly
    if (!innerContainer || innerContainer.scrollHeight <= innerContainer.clientHeight) {
      modalCard.scrollTop += deltaY;
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = innerContainer;
    const maxInnerScroll = scrollHeight - clientHeight;
    const isScrollingDown = deltaY > 0;
    const isScrollingUp = deltaY < 0;

    if (isScrollingDown) {
      const remainingInner = maxInnerScroll - scrollTop;

      if (remainingInner <= 2) {
        // Inner container has finished scrolling to bottom -> smoothly scroll full modal card down
        modalCard.scrollTop += deltaY;
        e.preventDefault();
        e.stopPropagation();
      } else if (deltaY > remainingInner) {
        // Inner container reaches bottom during this wheel event -> finish inner and forward remainder to modal card
        innerContainer.scrollTop = maxInnerScroll;
        modalCard.scrollTop += (deltaY - remainingInner);
        e.preventDefault();
        e.stopPropagation();
      } else {
        // Normal scroll inside inner container
        innerContainer.scrollTop += deltaY;
        e.preventDefault();
        e.stopPropagation();
      }
    } else if (isScrollingUp) {
      // If the full modal card is currently scrolled down, scroll the modal card UP first
      if (modalCard.scrollTop > 2) {
        if (Math.abs(deltaY) > modalCard.scrollTop) {
          const leftover = deltaY + modalCard.scrollTop; // deltaY is negative, leftover is negative
          modalCard.scrollTop = 0;
          if (innerContainer) {
            innerContainer.scrollTop = Math.max(0, innerContainer.scrollTop + leftover);
          }
        } else {
          modalCard.scrollTop += deltaY;
        }
        e.preventDefault();
        e.stopPropagation();
      } else {
        modalCard.scrollTop = 0;
        if (innerContainer && innerContainer.scrollTop > 2) {
          if (Math.abs(deltaY) > innerContainer.scrollTop) {
            innerContainer.scrollTop = 0;
          } else {
            innerContainer.scrollTop += deltaY;
          }
          e.preventDefault();
          e.stopPropagation();
        } else {
          if (innerContainer) innerContainer.scrollTop = 0;
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  };

  // Allow horizontal scrolling on the thumbnail filmstrip using mouse wheel, forwarding to modal card at boundaries
  const handleThumbnailWheel = (e) => {
    const strip = thumbnailStripRef.current;
    const modalCard = modalCardRef.current;
    if (!strip || !modalCard) return;

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      return;
    }

    const deltaY = e.deltaY;
    const maxScrollLeft = strip.scrollWidth - strip.clientWidth;

    if (deltaY > 0 && strip.scrollLeft < maxScrollLeft - 2) {
      strip.scrollLeft += deltaY;
      e.preventDefault();
      e.stopPropagation();
    } else if (deltaY < 0 && strip.scrollLeft > 2) {
      strip.scrollLeft += deltaY;
      e.preventDefault();
      e.stopPropagation();
    } else {
      modalCard.scrollTop += deltaY;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div 
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
    >
      {/* Click outside backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />

      {/* Modal Dialog Card */}
      <div 
        ref={modalCardRef}
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#070b1a] border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,29,143,0.5)] overflow-y-auto overscroll-contain z-10 flex flex-col"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-30 px-4 sm:px-7 py-3.5 bg-[#090e24]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#001D8F] text-white flex-shrink-0">
              {project.category}
            </span>
            <div className="flex items-center gap-2 truncate">
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                {project.title}
              </h3>
              {hasMultipleImages && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 flex-shrink-0">
                  <Layers className="w-3 h-3" />
                  <span>{allImages.length} Screens</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#001D8F] hover:bg-[#0027bd] border border-[#0033FF]/40 shadow-sm transition-all"
                title="Open live HTML landing page in new tab"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={activeTab === 'figma' && project.figmaLayout ? project.figmaLayout : currentImageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
              title="Open current high-res image in new tab"
            >
              <span>Full Size</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-7 space-y-6">
          
          {/* View Mode Navigation Tabs */}
          {(hasMultipleImages || hasFigmaLayout) && (
            <div className="flex items-center justify-between flex-wrap gap-2.5 p-1.5 bg-white/[0.04] border border-white/10 rounded-2xl">
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Single Image / Gallery Mode Tab */}
                <button
                  type="button"
                  onClick={() => setActiveTab('gallery')}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'gallery'
                      ? 'bg-[#001D8F] text-white shadow-lg shadow-[#001D8F]/50 scale-[1.02]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    Screens &amp; Artboards {hasMultipleImages ? `(${allImages.length})` : ''}
                  </span>
                </button>

                {/* All Screens Grid Tab */}
                {hasMultipleImages && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('grid')}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'grid'
                        ? 'bg-[#001D8F] text-white shadow-lg shadow-[#001D8F]/50 scale-[1.02]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>All Screens Grid</span>
                  </button>
                )}

                {/* Figma Full Layout Tab */}
                {hasFigmaLayout && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('figma')}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'figma'
                        ? 'bg-[#001D8F] text-white shadow-lg shadow-[#001D8F]/50 scale-[1.02]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FigmaIcon className="w-3.5 h-3.5" />
                    <span>Figma Full Layout</span>
                  </button>
                )}
              </div>

              {activeTab === 'gallery' && hasMultipleImages && (
                <span className="text-[11px] font-mono text-zinc-400 px-3 hidden md:inline">
                  Use keyboard keys (← / →) or click arrows to browse
                </span>
              )}
            </div>
          )}

          {/* TAB 1: Gallery / Screens Viewer */}
          {activeTab === 'gallery' && (
            <div className="space-y-3.5">
              {/* Main Showcase Stage */}
              <div 
                onWheel={(e) => handleScrollChaining(e, null)}
                className="relative w-full rounded-2xl flex items-center justify-center p-3 sm:p-6 overflow-hidden border border-white/10 shadow-2xl transition-all"
                style={{
                  minHeight: '380px',
                  maxHeight: '620px',
                  background: 'linear-gradient(135deg, rgba(8, 14, 34, 0.95) 0%, rgba(3, 6, 18, 0.98) 100%)'
                }}
              >
                {/* Background glow matching the card */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none blur-3xl"
                  style={{
                    background: `radial-gradient(circle at center, ${project.cardBg || '#0033FF'} 0%, transparent 70%)`
                  }}
                />

                {/* Top Info Bar on Stage */}
                <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2 pointer-events-auto">
                    {hasMultipleImages && (
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono font-semibold text-white shadow-lg">
                        {currentImageIndex + 1} / {allImages.length}
                      </span>
                    )}
                    <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
                      {getImageLabel(currentImageSrc, currentImageIndex)}
                    </span>
                  </div>

                  <div className="pointer-events-auto flex items-center gap-2">
                    <a
                      href={currentImageSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-black/75 hover:bg-[#001D8F] border border-white/15 text-white transition-all shadow-lg"
                      title="Open full resolution in new tab"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Main Active Image */}
                <div className="relative z-0 max-h-[500px] sm:max-h-[540px] w-full flex items-center justify-center py-6">
                  <img 
                    key={currentImageSrc}
                    src={currentImageSrc} 
                    alt={`${project.title} - ${getImageLabel(currentImageSrc, currentImageIndex)}`} 
                    className="max-h-[480px] sm:max-h-[520px] w-auto max-w-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)] rounded-xl animate-fadeIn transition-all select-none"
                    loading="eager"
                  />
                </div>

                {/* Left Navigation Arrow */}
                {hasMultipleImages && (
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#001D8F] text-white border border-white/20 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label="Previous screen"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}

                {/* Right Navigation Arrow */}
                {hasMultipleImages && (
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#001D8F] text-white border border-white/20 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label="Next screen"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
              </div>

              {/* Filmstrip Thumbnail Bar */}
              {hasMultipleImages && (
                <div className="p-3 bg-[#0a0f24] rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                    <span className="font-mono text-[11px] font-semibold text-zinc-300">
                      ALL PROJECT SCREENS &amp; ARTBOARDS ({allImages.length})
                    </span>
                    <span className="font-mono text-[11px] text-blue-400 font-bold">
                      Viewing: {getImageLabel(currentImageSrc, currentImageIndex)}
                    </span>
                  </div>

                  <div 
                    ref={thumbnailStripRef}
                    data-lenis-prevent
                    onWheel={handleThumbnailWheel}
                    className="flex items-center gap-2.5 overflow-x-auto py-1"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#001D8F rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    {allImages.map((img, idx) => {
                      const isActive = idx === currentImageIndex;
                      const label = getImageLabel(img, idx);
                      return (
                        <button
                          key={img + idx}
                          type="button"
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`group relative flex-shrink-0 w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            isActive
                              ? 'border-[#0033FF] ring-2 ring-[#0033FF]/60 scale-105 shadow-lg shadow-[#0033FF]/40 z-10 brightness-110'
                              : 'border-white/15 opacity-65 hover:opacity-100 hover:border-white/40'
                          }`}
                          title={`Jump to ${label}`}
                        >
                          <img 
                            src={img} 
                            alt={`Screen ${idx + 1}`} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                            loading="lazy" 
                          />
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 text-[9px] font-mono font-bold text-white border border-white/10">
                            #{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: All Screens Grid Mode */}
          {activeTab === 'grid' && hasMultipleImages && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                <span className="font-mono text-[11px] text-zinc-300">
                  Showing all {allImages.length} screens and artboards. Click any card to inspect in full detail.
                </span>
                <span className="font-mono text-[11px] text-blue-400 font-bold">
                  {allImages.length} TOTAL
                </span>
              </div>

              <div 
                ref={gridContainerRef}
                data-lenis-prevent
                onWheel={(e) => handleScrollChaining(e, gridContainerRef.current)}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-h-[580px] overflow-y-auto p-1 pr-2"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#001D8F rgba(255, 255, 255, 0.05)'
                }}
              >
                {allImages.map((img, idx) => {
                  const label = getImageLabel(img, idx);
                  const isSelected = idx === currentImageIndex;
                  return (
                    <div
                      key={img + idx}
                      onClick={() => {
                        setCurrentImageIndex(idx);
                        setActiveTab('gallery');
                      }}
                      className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer shadow-lg ${
                        isSelected 
                          ? 'border-[#0033FF] ring-2 ring-[#0033FF]/50 bg-[#001D8F]/10' 
                          : 'border-white/15 bg-black/60 hover:border-[#0033FF]/60 hover:scale-[1.02]'
                      }`}
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-black/90 relative">
                        <img 
                          src={img} 
                          alt={label} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1 rounded-full bg-[#001D8F] text-white text-[10px] font-bold shadow-lg">
                            Inspect Screen
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-[#0b1024] flex items-center justify-between text-xs border-t border-white/10">
                        <span className="font-mono text-zinc-300 text-[11px] font-bold truncate">
                          {label}
                        </span>
                        <span className="text-[10px] font-mono text-blue-400 font-semibold flex-shrink-0">
                          #{idx + 1}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Figma Full Continuous Layout */}
          {activeTab === 'figma' && project.figmaLayout && (
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#0b0f1a] shadow-2xl">
              {/* Figma Window Titlebar */}
              <div className="px-4 py-3 bg-[#0d1222] border-b border-white/10 flex items-center justify-between text-xs text-zinc-300 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <FigmaIcon className="w-3.5 h-3.5" />
                    <span>{project.layoutName || 'full-desktop-layout'}.fig</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {project.layoutDimensions || 'Full Artboard Layout'}
                  </span>
                  <a
                    href={project.figmaLayout}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-lg bg-[#001D8F] hover:bg-[#0028c4] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Full Screen</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Scrollable Canvas for the 6000px+ Layout */}
              <div 
                ref={scrollContainerRef}
                data-lenis-prevent
                onWheel={(e) => handleScrollChaining(e, scrollContainerRef.current)}
                className="relative w-full max-h-[550px] sm:max-h-[680px] overflow-y-auto bg-black/70"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#001D8F rgba(255, 255, 255, 0.05)'
                }}
              >
                <img 
                  src={project.figmaLayout} 
                  alt={`${project.title} - Figma Layout`} 
                  className="w-full h-auto object-top shadow-2xl block"
                  loading="eager"
                />
              </div>

              {/* Layout Footer Info */}
              <div className="px-4 py-2 bg-[#0d1222] border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span>FILE: {project.layoutName || 'figma-layout'}</span>
                <span>FIGMA DESKTOP ARTBOARD • 100% SCALE</span>
              </div>
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Description & Overview */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                {project.tagline}
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Key Design &amp; Engineering Highlights
                </h5>
                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Figma Auto-Layout architecture with unified design token hierarchy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>60 FPS smooth GSAP transitions and micro-interaction animations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Fully responsive layout optimized for mobile, tablet, and desktop</span>
                  </li>
                  {hasMultipleImages && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Includes {allImages.length} distinct high-resolution artboard screens and pages</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Sidebar: Tech & Action */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech?.map((t) => (
                    <span 
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#001D8F]/30 text-blue-200 border border-[#0033FF]/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#001D8F] hover:bg-[#0027bd] border border-[#0033FF]/40 shadow-lg shadow-[#001D8F]/50 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Open Live HTML Landing Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => {
                    onClose();
                    onContactClick();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#001D8F] hover:bg-[#0027bd] border border-[#0033FF]/40 shadow-lg shadow-[#001D8F]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Build Similar Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
