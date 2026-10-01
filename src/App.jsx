import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FigmaWorkspaceSection from './components/FigmaWorkspaceSection';
import MyWorkSection from './components/MyWorkSection';
import SkillsSection from './components/SkillsSection';
import AboutSection from './components/AboutSection';
import HistorySection from './components/HistorySection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import CustomCursor from './components/CustomCursor';
import { useSmoothScroll } from './hooks/useSmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Activate full page inertia smooth scrolling
  useSmoothScroll();

  // Enforce dark theme & start at top on reload
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      window.lenis?.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const sections = ['home', 'process', 'work', 'skills', 'about', 'gallery', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-15% 0px -40% 0px',
        threshold: [0.25]
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id) => {
    setActiveSection(id);
    if (id === 'home') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.15 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    let targetId = id;
    if (id === 'awards') targetId = 'history';
    
    const element = document.getElementById(targetId);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -70, duration: 1.15 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#001D8F] selection:text-white font-sans-ui overflow-x-hidden">
      
      {/* Animated Custom Cursor with trailing "scroll down" circle badge */}
      <CustomCursor />

      {/* Main Top Navigation */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection 
          onExploreWork={() => handleNavigate('work')}
        />

        {/* Figma Workspace Live Workflow Video */}
        <FigmaWorkspaceSection />

        <MyWorkSection 
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <SkillsSection />

        <AboutSection 
          onExploreWork={() => handleNavigate('work')}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <HistorySection />

        {/* Infinite Automatic Gallery Section */}
        <GallerySection />

        {/* Contact Section placed below Gallery Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Project Case Study Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          onContactClick={() => {
            setSelectedProject(null);
            handleNavigate('contact');
          }}
        />
      )}

      {/* Resume Viewer / Download Modal */}
      {isResumeOpen && (
        <ResumeModal 
          onClose={() => setIsResumeOpen(false)}
        />
      )}

    </div>
  );
}
