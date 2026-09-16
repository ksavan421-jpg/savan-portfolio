import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import NavColumn from './NavColumn';
import FigmaWorkModal from './FigmaWorkModal';

const PROJECTS = [
  {
    id: 'eldeco',
    title: 'Eldeco Group',
    tagline: 'Be Sure, Live Better',
    image: '/work-1.png',
    liveUrl: 'https://www.eldecogroup.com/',
    hasFigma: true
  },
  {
    id: 'ksons',
    title: 'K.Sons Group',
    tagline: 'Residential Township Commercial Hospitality',
    image: '/work-2.png',
    liveUrl: 'https://ksons.in/',
    hasFigma: true
  }
];

export default function WorkPage({
  activeNav = 'work',
  onSelectNav,
  onDownloadResume
}) {
  const containerRef = useRef(null);
  const projectsListRef = useRef(null);
  const [activeFigmaProject, setActiveFigmaProject] = useState(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (projectsListRef.current) {
      tl.from(projectsListRef.current.querySelectorAll('.work-project-item'), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power3.out'
      }, 0.1);
    }
  }, { scope: containerRef });

  return (
    <main className="work-page-layout" id="work-content" ref={containerRef}>
      {/* Main Work Content Area (Scrollable projects) */}
      <section className="work-main-section" aria-label="My Work and Projects">
        <h1 className="work-main-heading">My Work &amp; Projects</h1>

        <div className="work-projects-scroller" ref={projectsListRef}>
          {PROJECTS.map((project) => (
            <article key={project.id} className="work-project-item">
              {/* Project Website Preview Card */}
              <div className="work-preview-card">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.tagline}`}
                  className="work-preview-img"
                  draggable="false"
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

                <div className="work-scroll-cue" aria-hidden="true">
                  <span className="scroll-cue-bar"></span>
                  <span className="scroll-cue-text">Keep Scrolling</span>
                </div>
              </div>
            </article>
          ))}
        </div>
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
