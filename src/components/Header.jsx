import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { NAV_ITEMS } from './NavColumn';

export default function Header({
  onLogoClick,
  activeNav = 'home',
  onSelectNav,
  onDownloadResume
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeInfo, setTimeInfo] = useState({
    timeStr: '12:00 PM',
    greeting: 'Hi, Good Afternoon',
    icon: '☀️',
    location: 'New Delhi, India'
  });

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      
      // Calculate IST time (Asia/Kolkata)
      const istString = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      const istDate = new Date(istString);
      const hour = istDate.getHours();

      // Format time string e.g. "4:30 PM"
      const istFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      const formattedTime = istFormatter.format(now);

      // Greeting based on Indian Standard Time (IST)
      let greeting = 'Hi, Good Morning';
      let icon = '🌅';

      if (hour >= 5 && hour < 12) {
        greeting = 'Hi, Good Morning';
        icon = '🌅';
      } else if (hour >= 12 && hour < 17) {
        greeting = 'Hi, Good Afternoon';
        icon = '☀️';
      } else if (hour >= 17 && hour < 21) {
        greeting = 'Hi, Good Evening';
        icon = '🌇';
      } else {
        greeting = 'Hi, Good Night';
        icon = '🌙';
      }

      setTimeInfo({
        timeStr: formattedTime,
        greeting: greeting,
        icon: icon,
        location: 'New Delhi, India'
      });
    }

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleMobileNavClick = (sectionId) => {
    if (onSelectNav) {
      onSelectNav(sectionId);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMobileResumeClick = () => {
    setIsMobileMenuOpen(false);
    if (onDownloadResume) {
      onDownloadResume();
    }
  };

  const handleMobileLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (onLogoClick) {
      onLogoClick();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="site-header flex justify-between items-center w-full relative z-30" id="site-header">
        <div className="header-left">
          <Logo onClick={onLogoClick} />
        </div>
        
        <div className="header-right flex items-center gap-4 select-none" id="header-status">
          <div className="header-status-details flex flex-col items-end text-right">
            <div className="header-greeting">
              <span className="greeting-text font-normal text-text-primary">{timeInfo.greeting}</span>
            </div>
            <div className="header-time-location flex items-center justify-end font-normal text-text-secondary">
              <span className="time-text">{timeInfo.timeStr}</span>
              <span className="location-divider opacity-70">-</span>
              <span className="location-text">{timeInfo.location}</span>
            </div>
          </div>

          {/* Clickable Mobile Menu Hamburger Button (shown on mobile, hidden on desktop) */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            id="mobile-menu-toggle-btn"
          >
            {isMobileMenuOpen ? (
              <X size={18} className="menu-icon menu-icon-close" />
            ) : (
              <Menu size={18} className="menu-icon menu-icon-open" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Backdrop */}
      <div 
        className={`mobile-nav-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />

      <div 
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-top flex justify-between items-center w-full">
          <Logo onClick={handleMobileLogoClick} />
          <button
            type="button"
            className="mobile-drawer-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mobile-nav-list-wrapper" aria-label="Mobile Navigation Links">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <li key={item.id} className="mobile-nav-item">
                  <button
                    type="button"
                    onClick={() => handleMobileNavClick(item.id)}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    id={`mobile-nav-${item.id}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="mobile-nav-bracket">[</span>
                    <span className="mobile-nav-label">{item.label}</span>
                    <span className="mobile-nav-bracket">]</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-drawer-cta">
          <button
            type="button"
            onClick={handleMobileResumeClick}
            className="mobile-resume-btn"
            id="mobile-resume-download-btn"
          >
            DOWNLOAD RESUME
          </button>
        </div>
      </div>
    </>
  );
}
