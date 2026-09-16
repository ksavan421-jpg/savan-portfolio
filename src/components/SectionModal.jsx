import React from 'react';
import { X, ExternalLink, Mail, Award, Layers, Sparkles, User, Briefcase, Code, Send } from 'lucide-react';

export default function SectionModal({ activeSection, onClose }) {
  if (!activeSection || activeSection === 'home') return null;

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="modal-body-section">
            <div className="section-badge"><User size={16} /> ABOUT ME</div>
            <h2 className="modal-title">Bridging Vision &amp; Code</h2>
            <p className="modal-paragraph">
              I am a multidisciplinary Product &amp; UI/UX Designer and Frontend Engineer with over 7 years of experience crafting modern, human-centric web applications and brand ecosystems.
            </p>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-num">07+</span>
                <span className="stat-label">Years of Craft</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">45+</span>
                <span className="stat-label">Shipped Products</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">99%</span>
                <span className="stat-label">Client Delight</span>
              </div>
            </div>
            <div className="philosophy-box">
              <h3>Core Philosophy</h3>
              <p>“Design without sound execution is just decoration. Code without thoughtful design is merely machinery. The magic happens where both meet.”</p>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="modal-body-section">
            <div className="section-badge"><Layers size={16} /> CAPABILITIES</div>
            <h2 className="modal-title">Skills &amp; Expertise</h2>
            <p className="modal-paragraph">
              A comprehensive toolkit spanning end-to-end product discovery, interface craft, and modern reactive engineering.
            </p>
            <div className="skills-category-group">
              <div className="skill-cat">
                <h4>Design &amp; Prototyping</h4>
                <div className="tags-cloud">
                  <span>UI/UX Architecture</span>
                  <span>Figma &amp; Tokens</span>
                  <span>Design Systems</span>
                  <span>Interactive Micro-animations</span>
                  <span>Wireframing</span>
                  <span>User Journey Mapping</span>
                </div>
              </div>
              <div className="skill-cat">
                <h4>Frontend &amp; Creative Tech</h4>
                <div className="tags-cloud">
                  <span>React.js</span>
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>Modern CSS / Vanilla</span>
                  <span>TailwindCSS</span>
                  <span>Three.js / Spline 3D</span>
                  <span>Vite</span>
                </div>
              </div>
              <div className="skill-cat">
                <h4>3D &amp; Visual Direction</h4>
                <div className="tags-cloud">
                  <span>Blender 3D</span>
                  <span>Editorial Typography</span>
                  <span>Claymorphism</span>
                  <span>Brand Identity</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'work':
        return (
          <div className="modal-body-section">
            <div className="section-badge"><Briefcase size={16} /> SELECTED WORK</div>
            <h2 className="modal-title">Featured Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-card-header">
                  <span className="project-year">2026</span>
                  <span className="project-tag">Fintech App</span>
                </div>
                <h3>Zenith Wealth OS</h3>
                <p>An ultra-minimalist institutional wealth intelligence platform featuring predictive charts and glassmorphism telemetry.</p>
                <div className="project-footer">
                  <span>UI/UX, React, D3.js</span>
                  <ExternalLink size={16} />
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-header">
                  <span className="project-year">2025</span>
                  <span className="project-tag">AI Studio</span>
                </div>
                <h3>Aether Neural Canvas</h3>
                <p>Generative creative workspace empowering digital artists with seamless prompt-to-3D canvas manipulation.</p>
                <div className="project-footer">
                  <span>Product Design, WebGL</span>
                  <ExternalLink size={16} />
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-header">
                  <span className="project-year">2025</span>
                  <span className="project-tag">E-Commerce</span>
                </div>
                <h3>Atelier Minimalist</h3>
                <p>Curated luxury Scandinavian lifestyle catalog with spatial audio cues and silky tactile transitions.</p>
                <div className="project-footer">
                  <span>Design System, Next.js</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'awards':
        return (
          <div className="modal-body-section">
            <div className="section-badge"><Award size={16} /> RECOGNITION</div>
            <h2 className="modal-title">Honors &amp; Awards</h2>
            <div className="awards-list">
              <div className="award-item">
                <div className="award-year">2025</div>
                <div className="award-details">
                  <h4>Awwwards — Site of the Day</h4>
                  <p>Awarded for Zenith Wealth OS interactive data visualizations.</p>
                </div>
              </div>
              <div className="award-item">
                <div className="award-year">2024</div>
                <div className="award-details">
                  <h4>FWA of the Month</h4>
                  <p>Recognized for Aether Spatial Canvas web experience.</p>
                </div>
              </div>
              <div className="award-item">
                <div className="award-year">2023</div>
                <div className="award-details">
                  <h4>Red Dot Best of the Best</h4>
                  <p>Honored in digital UI systems and typography excellence.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="modal-body-section">
            <div className="section-badge"><Sparkles size={16} /> VISUAL ARCHIVE</div>
            <h2 className="modal-title">Experimental Gallery</h2>
            <p className="modal-paragraph">
              A curated snapshot of interactive explorations, typography posters, and 3D character concepts.
            </p>
            <div className="gallery-showcase">
              <div className="gallery-card">
                <div className="gallery-preview c1"></div>
                <span>3D Clay Character Studies</span>
              </div>
              <div className="gallery-card">
                <div className="gallery-preview c2"></div>
                <span>Editorial Swiss Typography</span>
              </div>
              <div className="gallery-card">
                <div className="gallery-preview c3"></div>
                <span>Dark Mode Telemetry UI</span>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="modal-body-section">
            <div className="section-badge"><Mail size={16} /> GET IN TOUCH</div>
            <h2 className="modal-title">Let’s Create Together</h2>
            <p className="modal-paragraph">
              Have an exciting project, design leadership role, or consulting inquiry? I’d love to connect.
            </p>
            <div className="contact-form-container">
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! I will respond promptly.'); onClose(); }}>
                <div className="form-group">
                  <label htmlFor="name-input">Your Name</label>
                  <input id="name-input" type="text" placeholder="e.g. Alex Morgan" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email-input">Your Email</label>
                  <input id="email-input" type="email" placeholder="alex@company.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="msg-input">Message</label>
                  <textarea id="msg-input" rows="3" placeholder="Tell me about your vision..." required></textarea>
                </div>
                <button type="submit" className="submit-inquiry-btn">
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose} 
          className="modal-close-btn"
          aria-label="Close modal"
          id="modal-close-btn"
        >
          <X size={20} />
        </button>

        {renderContent()}
      </div>
    </div>
  );
}
