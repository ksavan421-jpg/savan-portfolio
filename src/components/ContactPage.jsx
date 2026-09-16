import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import NavColumn from './NavColumn';
import ArchitecturalBracket from './ArchitecturalBracket';

export default function ContactPage({
  activeNav = 'contact',
  onSelectNav,
  onDownloadResume
}) {
  const containerRef = useRef(null);
  const avatarImgRef = useRef(null);
  const contentRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (avatarImgRef.current) {
      tl.from(avatarImgRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: 'power3.out'
      }, 0.05);
    }

    if (contentRef.current) {
      tl.from(contentRef.current, {
        opacity: 0,
        x: 25,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform'
      }, 0.15);
    }
  }, { scope: containerRef });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <main className="hero-container contact-page-container" id="contact-content" ref={containerRef}>
      {/* 1. Left Character Avatar Column */}
      <section className="hero-avatar-column" aria-label="Savan on the Phone">
        <div className="avatar-wrapper contact-avatar-wrapper">
          <img
            ref={avatarImgRef}
            src="/contact.png"
            alt="Savan on phone call"
            className="avatar-image contact-avatar-image"
            draggable="false"
          />
        </div>
      </section>

      {/* 2. Center Column with Bracket and Contact Form */}
      <section className="hero-center-column contact-center-column" aria-label="Let's Connect">
        <div className="center-content-wrapper contact-content-frame">
          <div className="bracket-wrapper contact-bracket-wrapper">
            <ArchitecturalBracket className="editorial-bracket" />
          </div>

          <div className="contact-main-body" ref={contentRef}>
            <h1 className="contact-heading">Let’s Connect</h1>

            <form className="contact-editorial-form" onSubmit={handleSubmit}>
              <div className="form-field-group">
                <label htmlFor="contact-name" className="visually-hidden">Name*</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  required
                  className="editorial-input"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-email" className="visually-hidden">Email ID*</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email ID*"
                  required
                  className="editorial-input"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-phone" className="visually-hidden">Contact Number*</label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact Number*"
                  required
                  className="editorial-input"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-message" className="visually-hidden">Write Your Message</label>
                <input
                  type="text"
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write Your Message"
                  className="editorial-input"
                />
              </div>

              <div className="form-action-row">
                <button
                  type="submit"
                  className="contact-submit-btn"
                  id="contact-submit-btn"
                >
                  {isSubmitted ? 'MESSAGE SENT ✓' : 'SUBMIT NOW'}
                </button>
              </div>
            </form>

            {/* Direct Contact Links */}
            <div className="contact-direct-info">
              <a
                href="mailto:ksavan421@gmail.com"
                className="contact-direct-link"
                id="contact-email-link"
              >
                ksavan421@gmail.com
              </a>

              <a
                href="tel:+918178618336"
                className="contact-direct-link"
                id="contact-phone-link"
              >
                +918178618336
              </a>
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
          id="contact-resume-btn"
          aria-label="Download Resume"
        >
          <span>DOWNLOAD RESUME</span>
        </button>
      </div>

      {/* Next Section CTA Button (Mobile Fixed Bottom - Back to Home) */}
      <div className="page-nav-cta-wrapper">
        <button
          type="button"
          onClick={() => {
            onSelectNav('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="page-nav-cta-btn"
          id="contact-home-btn"
          aria-label="Return to Home page"
        >
          <span>BACK TO HOME</span>
          <ArrowRight size={16} className="page-nav-cta-icon" />
        </button>
      </div>
    </main>
  );
}
