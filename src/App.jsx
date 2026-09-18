import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutPage from './components/AboutPage';
import SkillsPage from './components/SkillsPage';
import ContactPage from './components/ContactPage';
import WorkPage from './components/WorkPage';
import AwardsPage from './components/AwardsPage';
import GalleryPage from './components/GalleryPage';
import NotFoundPage from './components/NotFoundPage';
import Preloader from './components/Preloader';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './App.css';

const VALID_PAGES = ['home', 'about', 'skills', 'work', 'awards', 'gallery', 'contact'];

function resolveRouteFromUrl() {
  if (typeof window === 'undefined') {
    return { nav: 'home', invalidUrl: '' };
  }

  // 1. Check hash first: e.g. #/about, #/skills, #/invalid, #unknown
  const rawHash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (rawHash) {
    if (VALID_PAGES.includes(rawHash)) {
      return { nav: rawHash, invalidUrl: '' };
    }
    return { nav: '404', invalidUrl: window.location.hash };
  }

  // 2. Check pathname: e.g. /about, /skills, /unknown-page
  const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
  if (rawPath && rawPath !== 'index.html') {
    if (VALID_PAGES.includes(rawPath)) {
      return { nav: rawPath, invalidUrl: '' };
    }
    return { nav: '404', invalidUrl: window.location.pathname };
  }

  return { nav: 'home', invalidUrl: '' };
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [navDirection, setNavDirection] = useState('forward');
  const [activeNav, setActiveNav] = useState(() => resolveRouteFromUrl().nav);
  const [invalidRoute, setInvalidRoute] = useState(() => resolveRouteFromUrl().invalidUrl);

  const handleSelectNav = (sectionId, direction = 'forward') => {
    if (sectionId === activeNav) return;
    setNavDirection(direction);
    setActiveNav(sectionId);
    setInvalidRoute('');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (sectionId === 'home') {
      window.history.pushState(null, '', '/');
    } else if (sectionId === '404') {
      // keep current route
    } else {
      if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        window.history.pushState(null, '', `/#/${sectionId}`);
      } else {
        window.location.hash = `#/${sectionId}`;
      }
    }
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const { nav, invalidUrl } = resolveRouteFromUrl();
      setActiveNav(nav);
      if (nav === '404') {
        setInvalidRoute(invalidUrl || window.location.pathname + window.location.hash);
      } else {
        setInvalidRoute('');
      }
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Preload all section avatars in background so tab transitions are 100% instant
  useEffect(() => {
    const imagesToPreload = [
      '/about-me.webp',
      '/work-experience.webp',
      '/Education.webp',
      '/Hobbies.webp',
      '/skill.webp',
      '/work-1.webp',
      '/work-northwind.webp',
      '/award.webp',
      '/gallery.webp',
      '/contact.webp',
      '/404-person-img.webp'
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleLogoClick = () => {
    handleSelectNav('home');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/savan-resume.pdf';
    link.setAttribute('download', 'savan-resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="portfolio-app">
      {/* Editorial Custom Desktop Follower Cursor */}
      <CustomCursor />

      {/* Editorial Website Preloader */}
      {showLoader && (
        <Preloader onComplete={() => setShowLoader(false)} />
      )}

      {/* Background ambient lighting/texture */}
      <div className="ambient-background" aria-hidden="true" />

      {/* Top Header */}
      <Header
        onLogoClick={handleLogoClick}
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onDownloadResume={handleDownloadResume}
      />

      {/* Dedicated Page Views (Direct children of portfolio-app preserving fixed positioning) */}
      {activeNav === 'home' && (
        <HeroSection
          activeNav={activeNav}
          navDirection={navDirection}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'about' && (
        <AboutPage
          activeNav={activeNav}
          navDirection={navDirection}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'skills' && (
        <SkillsPage
          activeNav={activeNav}
          navDirection={navDirection}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'work' && (
        <WorkPage
          activeNav={activeNav}
          navDirection={navDirection}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'awards' && (
        <AwardsPage
          activeNav={activeNav}
          navDirection={navDirection}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'gallery' && (
        <GalleryPage
          activeNav={activeNav}
          navDirection={navDirection}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'contact' && (
        <ContactPage
          activeNav={activeNav}
          navDirection={navDirection}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {(!VALID_PAGES.includes(activeNav) || activeNav === '404') && (
        <NotFoundPage
          invalidPath={invalidRoute}
          activeNav={activeNav}
          navDirection={navDirection}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {/* Footer Section */}
      <Footer />
    </div>
  );
}


