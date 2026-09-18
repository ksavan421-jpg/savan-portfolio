import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
import NavColumn from './NavColumn';
import FigmaWorkModal from './FigmaWorkModal';
import { isGlobalScrollLocked, lockGlobalScroll, notifyWheelGesture } from '../hooks/useScrollJumper';

gsap.registerPlugin(ScrollTrigger);

const WORK_TABS = [
  { id: 'builder', label: 'Builder Website' },
  { id: 'landing', label: 'Landing Page Website' }
];

const PROJECTS = [
  {
    id: 'aarya-realty',
    title: 'Aarya Realty',
    tagline: 'Premium Commercial & Residential Spaces',
    image: '/work-aarya-realty.webp',
    liveUrl: null,
    hasFigma: true
  },
  {
    id: 'eldeco',
    title: 'Eldeco Group',
    tagline: 'Be Sure, Live Better',
    image: '/work-1.webp',
    liveUrl: null,
    hasFigma: true
  },
  {
    id: 'northwind',
    title: 'Northwind',
    tagline: 'Modern Estate & Architectural Living',
    image: '/work-northwind.webp',
    liveUrl: null,
    hasFigma: true
  },
  {
    id: 'rubberwala',
    title: 'Rubberwala',
    tagline: 'Contemporary Real Estate & Urban Architecture',
    image: '/work-rubberwala.webp',
    liveUrl: null,
    hasFigma: true
  },
  {
    id: 'ashwin-seth',
    title: 'Ashwin Sheth',
    tagline: 'Our World Reflects Your World',
    image: '/work-ashwin-seth.webp',
    liveUrl: null,
    hasFigma: true
  }
];

const LANDING_PAGES = [
  {
    id: 'layout-1',
    title: 'Luxury Residences',
    subtitle: 'Modern Living & Architecture',
    category: 'Layout 01',
    image: '/landing-pages/layout-1/images/luxury-thumb.webp',
    url: '/landing-pages/layout-1/index.html'
  },
  {
    id: 'layout-2',
    title: 'Modern Apartments',
    subtitle: '2, 3 & 4 BHK Premium Living',
    category: 'Layout 02',
    image: '/landing-pages/layout-2/images/luxury-thumb.webp',
    url: '/landing-pages/layout-2/index.html'
  },
  {
    id: 'layout-3',
    title: 'Godrej Properties',
    subtitle: 'Hot Residential Projects & Modern Suites',
    category: 'Layout 03',
    image: '/landing-pages/layout-3/images/luxury-thumb.webp',
    url: '/landing-pages/layout-3/index.html'
  },
  {
    id: 'layout-4',
    title: 'Luxury Real Estate',
    subtitle: 'Exceptional Properties & Living',
    category: 'Layout 04',
    image: '/landing-pages/layout-4/images/luxury-thumb.webp',
    url: '/landing-pages/layout-4/index.html'
  },
  {
    id: 'layout-5',
    title: 'Supertech Brilliant',
    subtitle: 'Sector 34, Noida Residential Living',
    category: 'Layout 05',
    image: '/landing-pages/layout-5/images/luxury-thumb.webp',
    url: '/landing-pages/layout-5/index.html'
  },
  {
    id: 'layout-6',
    title: 'Demo Properties',
    subtitle: 'Commercial & Residential Real Estate',
    category: 'Layout 06',
    image: '/landing-pages/layout-6/images/luxury-thumb.webp',
    url: '/landing-pages/layout-6/index.html'
  },
  {
    id: 'layout-7',
    title: 'TARC Tripundra',
    subtitle: 'Luxury Suites & Urban Haven',
    category: 'Layout 07',
    image: '/landing-pages/layout-7/images/luxury-thumb.webp',
    url: '/landing-pages/layout-7/index.html'
  },
  {
    id: 'layout-8',
    title: 'Skytech Colours Avenue',
    subtitle: 'Sector-10, Greater Noida West',
    category: 'Layout 08',
    image: '/landing-pages/layout-8/images/luxury-thumb.webp',
    url: '/landing-pages/layout-8/index.html'
  },
  {
    id: 'layout-9',
    title: 'FairFox Eon',
    subtitle: 'Sector 140-A Noida (Office & Retail Spaces)',
    category: 'Layout 09',
    image: '/landing-pages/layout-9/images/luxury-thumb.webp',
    url: '/landing-pages/layout-9/index.html'
  }
];

export default function WorkPage({
  activeNav = 'work',
  navDirection = 'forward',
  onSelectNav,
  onDownloadResume
}) {
  const containerRef = useRef(null);
  const projectsListRef = useRef(null);
  const targetScrollRef = useRef(0);
  const isTweeningRef = useRef(false);
  const isPageLocked = useRef(false);
  const [activeTab, setActiveTab] = useState('builder');
  const [activeFigmaProject, setActiveFigmaProject] = useState(null);

  // References for top forward scroll delay
  const topScrollDelayTimerRef = useRef(null);
  const isTopDelayedRef = useRef(false);
  const isLeavingTopRef = useRef(false);
  const accumulatedTopDeltaRef = useRef(0);

  // GSAP Entrance & Scroll-driven Parallax
  useGSAP(() => {
    const scroller = projectsListRef.current;
    if (!scroller) return;

    if (activeTab === 'builder') {
      const items = scroller.querySelectorAll('.work-project-item');
      if (items.length > 0) {
        // Initial entrance animation
        gsap.from(items, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.85,
          ease: 'power3.out'
        });

        // ScrollTrigger subtle parallax on each preview card
        items.forEach((item) => {
          const previewCard = item.querySelector('.work-preview-card');
          if (previewCard) {
            gsap.fromTo(
              previewCard,
              { y: 15 },
              {
                y: -15,
                ease: 'none',
                scrollTrigger: {
                  trigger: item,
                  scroller: scroller,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2
                }
              }
            );
          }
        });
      }
    } else if (activeTab === 'landing') {
      const cards = scroller.querySelectorAll('.landing-page-card');
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.65,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        });
      }
    }
  }, { scope: containerRef, dependencies: [activeTab] });

  // Initialize scroll position according to entry direction
  useEffect(() => {
    const scroller = projectsListRef.current;
    if (!scroller) return;

    if (topScrollDelayTimerRef.current) {
      clearTimeout(topScrollDelayTimerRef.current);
    }
    isTopDelayedRef.current = false;
    isLeavingTopRef.current = false;
    accumulatedTopDeltaRef.current = 0;

    if (navDirection === 'backward') {
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      scroller.scrollTop = maxScroll;
      targetScrollRef.current = maxScroll;
    } else {
      scroller.scrollTop = 0;
      targetScrollRef.current = 0;
    }
  }, [navDirection, activeTab]);

  // GSAP Smooth Scroll Controller with Boundary Page Jumping
  useEffect(() => {
    const scroller = projectsListRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      if (!isTweeningRef.current) {
        targetScrollRef.current = scroller.scrollTop;
      }
    };

    const handleWheel = (e) => {
      if (activeFigmaProject) return;
      if (window.innerWidth <= 960) return;
      if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      if (maxScroll <= 0) return;

      e.preventDefault();
      notifyWheelGesture();

      if (isGlobalScrollLocked()) {
        return;
      }

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 35;
      else if (e.deltaMode === 2) delta *= 400;

      if (Math.abs(delta) < 30) return;

      // Check boundary to jump to next/previous page
      if (delta > 0 && scroller.scrollTop >= maxScroll - 8) {
        lockGlobalScroll(1200);
        onSelectNav('awards', 'forward');
        return;
      }

      if (delta < 0 && scroller.scrollTop <= 8) {
        if (topScrollDelayTimerRef.current) {
          clearTimeout(topScrollDelayTimerRef.current);
        }
        isTopDelayedRef.current = false;
        isLeavingTopRef.current = false;
        accumulatedTopDeltaRef.current = 0;

        lockGlobalScroll(1200);
        onSelectNav('skills', 'backward');
        return;
      }

      // Delay forward scrolling when currently at top of Work page
      const isAtTop = scroller.scrollTop <= 10;
      if (!isAtTop) {
        isLeavingTopRef.current = false;
      }

      if (delta > 0 && isAtTop && !isLeavingTopRef.current) {
        e.preventDefault();

        if (!isTopDelayedRef.current) {
          isTopDelayedRef.current = true;
          accumulatedTopDeltaRef.current = delta;

          if (topScrollDelayTimerRef.current) {
            clearTimeout(topScrollDelayTimerRef.current);
          }

          topScrollDelayTimerRef.current = setTimeout(() => {
            isLeavingTopRef.current = true;
            isTopDelayedRef.current = false;

            const baseDelta = Math.max(90, Math.min(420, accumulatedTopDeltaRef.current));
            accumulatedTopDeltaRef.current = 0;

            const target = Math.max(0, Math.min(maxScroll, baseDelta * 1.18));
            targetScrollRef.current = target;

            isTweeningRef.current = true;
            gsap.to(scroller, {
              scrollTop: target,
              duration: 1.15,
              ease: 'power3.out',
              overwrite: 'auto',
              onComplete: () => {
                isTweeningRef.current = false;
                if (scroller && scroller.scrollTop <= 10) {
                  isLeavingTopRef.current = false;
                }
              }
            });
          }, 650);

          return;
        } else {
          // Accumulate intent while delay timer is pending
          accumulatedTopDeltaRef.current += delta;
          return;
        }
      }

      e.preventDefault();

      const current = isTweeningRef.current ? targetScrollRef.current : scroller.scrollTop;
      const newTarget = Math.max(0, Math.min(maxScroll, current + delta * 1.18));
      targetScrollRef.current = newTarget;

      isTweeningRef.current = true;
      gsap.to(scroller, {
        scrollTop: newTarget,
        duration: 1.1,
        ease: 'power3.out',
        overwrite: 'auto',
        onComplete: () => {
          isTweeningRef.current = false;
        }
      });
    };

    const handleKeyDown = (e) => {
      if (activeFigmaProject) return;
      if (window.innerWidth <= 960) return;
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      if (maxScroll <= 0) return;

      let delta = 0;
      if (e.key === 'ArrowDown') delta = 90;
      else if (e.key === 'ArrowUp') delta = -90;
      else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) delta = 380;
      else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) delta = -380;

      if (delta !== 0) {
        if (delta > 0 && scroller.scrollTop >= maxScroll - 8) {
          lockGlobalScroll(1200);
          onSelectNav('awards', 'forward');
          return;
        }

        if (delta < 0 && scroller.scrollTop <= 8) {
          lockGlobalScroll(1200);
          onSelectNav('skills', 'backward');
          return;
        }

        e.preventDefault();
        const current = isTweeningRef.current ? targetScrollRef.current : scroller.scrollTop;
        const newTarget = Math.max(0, Math.min(maxScroll, current + delta * 1.18));
        targetScrollRef.current = newTarget;

        isTweeningRef.current = true;
        gsap.to(scroller, {
          scrollTop: newTarget,
          duration: 0.95,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            isTweeningRef.current = false;
          }
        });
      }
    };

    const container = containerRef.current || scroller;
    container.addEventListener('wheel', handleWheel, { passive: false });
    scroller.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (topScrollDelayTimerRef.current) {
        clearTimeout(topScrollDelayTimerRef.current);
      }
      container.removeEventListener('wheel', handleWheel);
      scroller.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      gsap.killTweensOf(scroller);
    };
  }, [activeFigmaProject, onSelectNav, activeTab]);

  // Smooth scroll to next project on cue click
  const handleScrollToNext = (currentIndex) => {
    const scroller = projectsListRef.current;
    if (!scroller) return;

    const items = scroller.querySelectorAll('.work-project-item');
    const nextIndex = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
    const targetItem = items[nextIndex];

    if (targetItem) {
      const targetPos = targetItem.offsetTop - 16;
      targetScrollRef.current = targetPos;
      isTweeningRef.current = true;

      gsap.to(scroller, {
        scrollTop: targetPos,
        duration: 1.2,
        ease: 'power3.out',
        overwrite: 'auto',
        onComplete: () => {
          isTweeningRef.current = false;
        }
      });
    }
  };

  return (
    <main className={`work-page-layout ${activeFigmaProject ? 'figma-modal-active' : ''}`} id="work-content" ref={containerRef}>
      {/* Main Work Content Area */}
      <section className="work-main-section" aria-label="Work and Projects">
        {/* Category Tabs: Builder Website & Landing Page Website */}
        <nav className="work-tabs-nav" aria-label="Work Categories">
          {WORK_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (activeTab !== tab.id) {
                    setActiveTab(tab.id);
                    if (projectsListRef.current) {
                      projectsListRef.current.scrollTop = 0;
                      targetScrollRef.current = 0;
                    }
                    if (typeof window !== 'undefined' && window.innerWidth <= 960) {
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }
                  }
                }}
                className={`about-tab-pill work-tab-pill ${isActive ? 'active' : ''}`}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Tab 1: Builder Website */}
        {activeTab === 'builder' && (
          <div className="work-projects-scroller" ref={projectsListRef}>
            {PROJECTS.map((project, index) => (
              <article key={project.id} className="work-project-item">
                {/* Project Website Preview Card */}
                <div className="work-preview-card">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.tagline}`}
                    className="work-preview-img"
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Project Action Buttons Column */}
                <div className="work-project-actions">
                  <button
                    type="button"
                    onClick={() => setActiveFigmaProject(project.title)}
                    className="work-action-btn work-btn-figma"
                    id={`btn-figma-${project.id}`}
                    aria-label={`View Figma designs for ${project.title}`}
                  >
                    FIGMA WORK
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-action-btn work-btn-live"
                      id={`btn-live-${project.id}`}
                      aria-label={`Visit live website for ${project.title}`}
                    >
                      LIVE LINK
                    </a>
                  )}

                  <div
                    className="work-scroll-cue"
                    onClick={() => handleScrollToNext(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleScrollToNext(index); }}
                    aria-label="Scroll to next project"
                    title="Click to smoothly scroll to next project"
                  >
                    <span className="scroll-cue-bar"></span>
                    <span className="scroll-cue-text">Keep Scrolling</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Tab 2: Landing Page Website (9 HTML Landing Pages) */}
        {activeTab === 'landing' && (
          <div className="landing-pages-scroller" ref={projectsListRef}>
            <div className="landing-pages-grid">
              {LANDING_PAGES.map((landing) => (
                <article key={landing.id} className="landing-page-card">
                  <a
                    href={landing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="landing-card-anchor"
                    id={`landing-link-${landing.id}`}
                    aria-label={`Open ${landing.title} landing page in a new tab`}
                  >
                    {/* Preview Image */}
                    <div className="landing-card-preview">
                      <img
                        src={landing.image}
                        alt={`${landing.title} preview`}
                        className="landing-card-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="landing-card-hover-overlay">
                        <span className="landing-overlay-badge">
                          <span>VIEW LANDING PAGE</span>
                          <ExternalLink size={13} />
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="landing-card-content">
                      <div className="landing-card-top-row">
                        <span className="landing-category-pill">{landing.category}</span>
                        <span className="landing-new-tab-indicator" title="Opens in new tab">
                          <ExternalLink size={13} />
                        </span>
                      </div>

                      <h2 className="landing-card-title">{landing.title}</h2>
                      <p className="landing-card-subtitle">{landing.subtitle}</p>

                      <div className="landing-card-btn-wrapper">
                        <span className="landing-card-btn">
                          <span>LIVE DEMO</span>
                          <ExternalLink size={13} className="landing-btn-icon" />
                        </span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Right Navigation Column */}
      <NavColumn
        activeNav={activeNav}
        onSelectNav={onSelectNav}
        onDownloadResume={onDownloadResume}
      />

      {/* Next Section CTA Button (Mobile Fixed Bottom) */}
      <div className="page-nav-cta-wrapper">
        <button
          type="button"
          onClick={() => {
            onSelectNav('awards');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="page-nav-cta-btn"
          id="work-awards-btn"
          aria-label="Go to Awards page"
        >
          <span>MY AWARDS</span>
          <ArrowRight size={16} className="page-nav-cta-icon" />
        </button>
      </div>

      {/* Figma Work Modal */}
      <FigmaWorkModal
        isOpen={Boolean(activeFigmaProject)}
        projectTitle={activeFigmaProject || 'Eldeco Group'}
        onClose={() => setActiveFigmaProject(null)}
      />
    </main>
  );
}
