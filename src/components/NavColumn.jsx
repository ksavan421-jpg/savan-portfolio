import React, { useRef } from 'react';
import gsap from 'gsap';

export const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT ME' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'work', label: 'WORK' },
  { id: 'awards', label: 'AWARDS' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'contact', label: 'CONTACT' },
];

export default function NavColumn({
  activeNav = 'home',
  onSelectNav,
  onDownloadResume
}) {
  const ctaRef = useRef(null);

  const handleNavMouseEnter = (e) => {
    const leftBracket = e.currentTarget.querySelector('.nav-bracket-left');
    const rightBracket = e.currentTarget.querySelector('.nav-bracket-right');
    if (leftBracket && rightBracket) {
      gsap.to(leftBracket, { x: -6, duration: 0.3, ease: 'back.out(2)' });
      gsap.to(rightBracket, { x: 6, duration: 0.3, ease: 'back.out(2)' });
    }
  };

  const handleNavMouseLeave = (e) => {
    const brackets = e.currentTarget.querySelectorAll('.nav-bracket');
    if (brackets.length) {
      gsap.to(brackets, { x: 0, duration: 0.25, ease: 'power2.out' });
    }
  };

  const handleCtaMouseEnter = () => {
    if (ctaRef.current) {
      gsap.to(ctaRef.current, { scale: 1.04, y: -3, duration: 0.3, ease: 'back.out(2)' });
    }
  };

  const handleCtaMouseLeave = () => {
    if (ctaRef.current) {
      gsap.to(ctaRef.current, { scale: 1, y: 0, duration: 0.25, ease: 'power2.out' });
    }
  };

  return (
    <section className="hero-right-column flex flex-col justify-between items-end h-full text-right relative" aria-label="Site Navigation and Actions">
      <nav className="vertical-nav flex flex-col items-end w-full" aria-label="Portfolio Navigation">
        <ul className="nav-list flex flex-col items-end list-none w-full">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <li key={item.id} className="nav-item">
                <button
                  onClick={() => onSelectNav(item.id)}
                  onMouseEnter={handleNavMouseEnter}
                  onMouseLeave={handleNavMouseLeave}
                  className={`nav-link inline-flex items-center justify-end cursor-pointer uppercase font-medium ${isActive ? 'active text-accent-terracotta-active' : 'text-text-primary'}`}
                  id={`nav-link-${item.id}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="nav-bracket nav-bracket-left inline-block">[</span>
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-bracket nav-bracket-right inline-block">]</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="cta-wrapper mt-auto mb-[30px]">
        <button
          ref={ctaRef}
          onClick={onDownloadResume}
          onMouseEnter={handleCtaMouseEnter}
          onMouseLeave={handleCtaMouseLeave}
          className="cta-resume-btn uppercase rounded-full inline-flex items-center justify-center cursor-pointer select-none bg-accent-terracotta text-btn-text"
          id="download-resume-btn"
          aria-label="Download Resume"
        >
          DOWNLOAD RESUME
        </button>
      </div>
    </section>
  );
}
