import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
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
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // 1. Prepare Netlify URL-encoded body
    const netlifyData = new URLSearchParams();
    netlifyData.append('form-name', 'contact');
    netlifyData.append('name', formData.name);
    netlifyData.append('email', formData.email);
    netlifyData.append('phone', formData.phone);
    netlifyData.append('message', formData.message);

    // 2. Prepare FormSubmit JSON payload (delivers directly to ksavan421@gmail.com)
    const formSubmitPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      _subject: `New Portfolio Inquiry from ${formData.name}`,
      _captcha: 'false',
      _template: 'table'
    };

    try {
      // Concurrently submit to both FormSubmit and Netlify Forms
      const promises = [
        // Netlify Forms endpoint
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: netlifyData.toString()
        }).catch((err) => {
          console.warn('Netlify form notice:', err);
          return null;
        }),

        // FormSubmit AJAX endpoint (sends directly to Savan's inbox)
        fetch('https://formsubmit.co/ajax/ksavan421@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formSubmitPayload)
        }).then((res) => res.json()).catch((err) => {
          console.warn('FormSubmit notice:', err);
          return null;
        })
      ];

      await Promise.allSettled(promises);
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('Unable to submit right now. Please message directly via Email or Phone below.');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <main className="hero-container contact-page-container" id="contact-content" ref={containerRef}>
      {/* 1. Left Character Avatar Column */}
      <section className="hero-avatar-column" aria-label="Savan on the Phone">
        <div className="avatar-wrapper contact-avatar-wrapper">
          <img
            ref={avatarImgRef}
            src="/contact.webp"
            alt="Savan on phone call"
            className="avatar-image contact-avatar-image"
            draggable="false"
            loading="eager"
            decoding="async"
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

            {status === 'success' ? (
              <div className="contact-success-card" role="status" aria-live="polite">
                <div className="contact-success-icon-box">
                  <CheckCircle2 size={36} />
                </div>
                <h2 className="contact-success-title">Message Sent Successfully!</h2>
                <p className="contact-success-desc">
                  Thank you, <strong>{formData.name || 'friend'}</strong>. Your message has been sent to Savan (<strong>ksavan421@gmail.com</strong>). I will get back to you shortly!
                </p>
                <div className="contact-success-actions">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="contact-submit-btn contact-reset-btn"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="contact-editorial-form"
                onSubmit={handleSubmit}
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                {/* Netlify Form Bot-Field Honeypot */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="visually-hidden">
                  <label>
                    Don’t fill this out if you're human: <input name="bot-field" tabIndex="-1" />
                  </label>
                </p>

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
                    disabled={status === 'submitting'}
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
                    disabled={status === 'submitting'}
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
                    disabled={status === 'submitting'}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-message" className="visually-hidden">Write Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write Your Message"
                    className="editorial-input editorial-textarea"
                    disabled={status === 'submitting'}
                  />
                </div>

                {status === 'error' && (
                  <div className="contact-error-banner" role="alert">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="form-action-row">
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    id="contact-submit-btn"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <span className="contact-submitting-label">
                        <Loader2 size={16} className="contact-spinner" />
                        <span>SENDING...</span>
                      </span>
                    ) : (
                      <span>SUBMIT NOW</span>
                    )}
                  </button>
                </div>
              </form>
            )}

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
