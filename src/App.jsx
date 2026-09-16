import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutPage from './components/AboutPage';
import SkillsPage from './components/SkillsPage';
import ContactPage from './components/ContactPage';
import WorkPage from './components/WorkPage';
import AwardsPage from './components/AwardsPage';
import GalleryPage from './components/GalleryPage';
import PlaceholderPage from './components/PlaceholderPage';
import Preloader from './components/Preloader';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [activeNav, setActiveNav] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash || 'home';
  });

  const handleSelectNav = (sectionId) => {
    if (sectionId === activeNav) return;
    setActiveNav(sectionId);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (sectionId === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = `#/${sectionId}`;
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '') || 'home';
      if (hash !== activeNav) {
        handleSelectNav(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeNav]);

  // Preload all section avatars in background so tab transitions are 100% instant
  useEffect(() => {
    const imagesToPreload = [
      '/about-me.webp',
      '/work-experience.webp',
      '/Education.webp',
      '/Hobbies.webp',
      '/skill.webp',
      '/work-1.webp',
      '/work-2.webp',
      '/award.webp',
      '/gallery.webp',
      '/contact.webp'
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
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'about' && (
        <AboutPage
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'skills' && (
        <SkillsPage
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'work' && (
        <WorkPage
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'awards' && (
        <AwardsPage
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'gallery' && (
        <GalleryPage
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav === 'contact' && (
        <ContactPage
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {activeNav !== 'home' && activeNav !== 'about' && activeNav !== 'skills' && activeNav !== 'work' && activeNav !== 'awards' && activeNav !== 'gallery' && activeNav !== 'contact' && (
        <PlaceholderPage
          pageId={activeNav}
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          onDownloadResume={handleDownloadResume}
        />
      )}

      {/* Footer Section */}
      <Footer />
    </div>
  );
}


