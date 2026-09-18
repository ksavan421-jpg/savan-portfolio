import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import NavColumn from './NavColumn';
import { useScrollJumper } from '../hooks/useScrollJumper';

const TABS = [
  {
    id: 'about-me',
    label: 'About Me',
    image: '/about-me.webp',
    alt: 'Savan - UI/UX & Web Designer'
  },
  {
    id: 'experience',
    label: 'Work Experience',
    image: '/work-experience.webp',
    alt: 'Savan - Work Experience'
  },
  {
    id: 'education',
    label: 'Education',
    image: '/Education.webp',
    alt: 'Savan - Education'
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    image: '/Hobbies.webp',
    alt: 'Savan - Hobbies'
  }
];

const TAB_IDS = TABS.map((t) => t.id);

const EXPERIENCES = [
  {
    id: 'gtf',
    company: 'GTF TECHNOLOGIES',
    period: 'NOIDA, SECTOR 3 - 2021 2026 TOTAL 5.7 YEARS',
    designation: 'Sr. UI UX & Web Designer',
    work: 'Real Estate Builder Website & Landing Page For Lead Generation'
  },
  {
    id: 'onlinefront',
    company: 'ONLINEFRONT',
    period: 'NEW DELHI, PEERAGARHI - 2020 TOTAL 6 MONTHS',
    designation: 'Web Designer',
    work: 'Import Export, Events, Education, Product Websites'
  },
  {
    id: 'chahar',
    company: 'CHAHAR TECHNOLOGIES',
    period: 'NEW DELHI, JANAKPURI - 2018 2019 TOTAL 1.5 YEARS',
    designation: 'UI UX & Web Designer',
    work: 'Education, NGO, Hotel, Product Websites'
  }
];

export default function AboutPage({
  activeNav = 'about',
  navDirection = 'forward',
  onSelectNav,
  onDownloadResume
}) {
  const [activeTab, setActiveTab] = useState(() => (
    navDirection === 'backward' ? 'hobbies' : 'about-me'
  ));
  const [currentExpIndex, setCurrentExpIndex] = useState(0);
  const containerRef = useRef(null);
  const avatarWrapperRef = useRef(null);
  const avatarImgRef = useRef(null);
  const contentPanelRef = useRef(null);

  const currentTabIndex = TAB_IDS.indexOf(activeTab);

  // Desktop Scroll-Jumping: Step through tabs one by one, then jump to next/prev page
  useScrollJumper({
    containerRef,
    items: TAB_IDS,
    currentIndex: currentTabIndex >= 0 ? currentTabIndex : 0,
    onStepChange: (idx) => handleTabClick(TAB_IDS[idx]),
    onNextPage: () => onSelectNav('skills', 'forward'),
    onPrevPage: () => onSelectNav('home', 'backward')
  });

  const currentExp = EXPERIENCES[currentExpIndex];

  const handlePrevExp = () => {
    setCurrentExpIndex((prev) => (prev === 0 ? EXPERIENCES.length - 1 : prev - 1));
  };

  const handleNextExp = () => {
    setCurrentExpIndex((prev) => (prev === EXPERIENCES.length - 1 ? 0 : prev + 1));
  };

  const currentTabData = TABS.find((t) => t.id === activeTab) || TABS[0];

  // Initial Entrance Animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (avatarImgRef.current) {
      tl.from(avatarImgRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.0,
        ease: 'power3.out'
      }, 0.05);
    }

    if (contentPanelRef.current) {
      tl.from(contentPanelRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: 'power3.out'
      }, 0.2);
    }

  }, { scope: containerRef });

  // Tab change animation: smooth fade/pop for content and subtle pop for avatar
  const handleTabClick = (tabId) => {
    if (tabId === activeTab) return;

    if (contentPanelRef.current) {
      gsap.fromTo(
        contentPanelRef.current,
        { opacity: 0.4, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }

    if (avatarImgRef.current) {
      gsap.fromTo(
        avatarImgRef.current,
        { opacity: 0.6, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }
      );
    }

    setActiveTab(tabId);
  };

  return (
    <main className="hero-container about-page-container" id="about-content" ref={containerRef}>
      {/* 1. Left Character Avatar Column */}
      <section className="hero-avatar-column" aria-label="Portrait of Savan">
        <div className="avatar-wrapper" ref={avatarWrapperRef}>
          <img
            key={currentTabData.image}
            ref={avatarImgRef}
            src={currentTabData.image}
            alt={currentTabData.alt}
            className="avatar-image"
            draggable="false"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* 2. Center Column with Architectural Bracket, Tabs, and Content */}
      <section className="about-center-column" aria-label="About Information">
        <div className="about-content-frame">
          {/* Architectural Bracket Line Framing the Content */}
          <div className="about-bracket-svg-container" aria-hidden="true">
            {/* Desktop View: Left pointer extended towards avatar x2="-100" */}
            <svg
              className="about-bracket-svg about-bracket-desktop"
              viewBox="0 0 100 480"
              fill="none"
              preserveAspectRatio="none"
            >
              <line x1="60" y1="2" x2="300" y2="2" stroke="var(--frame-line)" strokeWidth="1.2" />
              <line x1="60" y1="2" x2="60" y2="478" stroke="var(--frame-line)" strokeWidth="1.2" />
              <line x1="65" y1="210" x2="-100" y2="210" stroke="var(--frame-line)" strokeWidth="1.2" />
              <line x1="60" y1="478" x2="300" y2="478" stroke="var(--frame-line)" strokeWidth="1.2" />
            </svg>

            {/* Mobile View: Original bracket untouched */}
            <svg
              className="about-bracket-svg about-bracket-mobile"
              viewBox="0 0 100 480"
              fill="none"
              preserveAspectRatio="none"
            >
              <line x1="60" y1="2" x2="160" y2="2" stroke="var(--frame-line)" strokeWidth="1.2" />
              <line x1="60" y1="2" x2="60" y2="478" stroke="var(--frame-line)" strokeWidth="1.2" />
              <line x1="10" y1="210" x2="60" y2="210" stroke="var(--frame-line)" strokeWidth="1.2" />
              <line x1="60" y1="478" x2="140" y2="478" stroke="var(--frame-line)" strokeWidth="1.2" />
            </svg>
          </div>

          <div className="about-main-body">
            {/* Top 4 Tabs Navigation */}
            <nav className="about-tabs-nav" aria-label="About Me Subsections">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`about-tab-pill ${isActive ? 'active' : ''}`}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Dynamic Tab Content Area */}
            <div className="about-tab-content-panel" ref={contentPanelRef}>
              {/* TAB 1: ABOUT ME */}
              {activeTab === 'about-me' && (
                <div className="tab-pane tab-pane-about" id="panel-about-me" role="tabpanel">
                  <h1 className="about-headline">
                    Hi, I’m Savan —<br />
                    <span className="about-headline-sub">UI/UX &amp; Web Designer</span>
                  </h1>
                  <p className="about-description">
                    Passionate UI/UX and Web Designer with 7+ years of experience creating intuitive, responsive, and visually engaging digital experiences. Proficient in HTML, CSS, Bootstrap, JavaScript, and Figma, with a strong focus on user-centered design and modern web development. Experienced in leveraging AI tools such as ChatGPT, Gemini, and Claude AI to streamline workflows, enhance creativity, and improve design and development efficiency.
                  </p>
                </div>
              )}

              {/* TAB 2: WORK EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="tab-pane tab-pane-experience" id="panel-experience" role="tabpanel">
                  <div className="exp-slider-card">
                    <div className="exp-header">
                      <h2 className="exp-company">{currentExp.company}</h2>
                      <p className="exp-period">{currentExp.period}</p>
                    </div>

                    <div className="exp-item-group">
                      <div className="exp-item">
                        <h3 className="exp-label">Designation</h3>
                        <p className="exp-val">{currentExp.designation}</p>
                      </div>

                      <div className="exp-item">
                        <h3 className="exp-label">Work</h3>
                        <p className="exp-val">{currentExp.work}</p>
                      </div>
                    </div>

                    <div className="exp-slider-footer">
                      <div className="exp-slider-dots flex items-center gap-1.5">
                        {EXPERIENCES.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentExpIndex(idx)}
                            className={`exp-slider-dot ${idx === currentExpIndex ? 'active' : ''}`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      {/* Two small buttons for controls */}
                      <div className="exp-slider-controls">
                        <button
                          type="button"
                          onClick={handlePrevExp}
                          className="exp-slider-btn"
                          id="exp-slider-prev-btn"
                          aria-label="Previous experience"
                          title="Previous experience"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextExp}
                          className="exp-slider-btn"
                          id="exp-slider-next-btn"
                          aria-label="Next experience"
                          title="Next experience"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: EDUCATION */}
              {activeTab === 'education' && (
                <div className="tab-pane tab-pane-education" id="panel-education" role="tabpanel">
                  <div className="edu-block">
                    <h2 className="edu-title">Graduation -</h2>
                    <p className="edu-detail">B.A Programme</p>
                    <p className="edu-sub">Delhi University (SOL)</p>
                  </div>

                  <div className="edu-block">
                    <h2 className="edu-title">Diploma in</h2>
                    <p className="edu-detail">Web Design From DICS</p>
                  </div>
                </div>
              )}

              {/* TAB 4: HOBBIES */}
              {activeTab === 'hobbies' && (
                <div className="tab-pane tab-pane-hobbies" id="panel-hobbies" role="tabpanel">
                  <ul className="hobbies-list">
                    <li className="hobby-item">Cricket</li>
                    <li className="hobby-item">Watching Sci Fi Movies</li>
                    <li className="hobby-item">Video Games</li>
                    <li className="hobby-item">Share Market</li>
                  </ul>
                </div>
              )}
            </div>
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
          id="about-resume-btn"
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
            onSelectNav('skills');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="page-nav-cta-btn"
          id="about-skills-btn"
          aria-label="Go to Skills page"
        >
          <span>MY SKILLS</span>
          <ArrowRight size={16} className="page-nav-cta-icon" />
        </button>
      </div>
    </main>
  );
}
