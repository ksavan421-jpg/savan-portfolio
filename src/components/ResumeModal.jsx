import React from 'react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate text/markdown formatted resume file for instant download
    const resumeText = `=====================================================
SK — UI UX & WEB DESIGNER
New Delhi, India | Portfolio: https://sk-portfolio.design
=====================================================

PROFESSIONAL SUMMARY
Multidisciplinary UI/UX & Web Designer specializing in crafting bold,
minimalist digital experiences by bridging the gap between creative visual
design and clean technical execution.

CORE EXPERTISE
- UI/UX Design & Architecture (Figma, Tokens, Systems)
- Frontend Development (React.js, Next.js, Modern CSS)
- 3D & Creative Direction (Blender, Claymorphism)
- Interaction Design & Micro-animations

WORK EXPERIENCE
Lead Product Designer | Studio Minimal (2023 - Present)
- Spearheaded visual design systems for enterprise SaaS and Web3 clients.
- Boosted user engagement by 42% through streamlined information architecture.

Senior UI/UX & Web Designer | Nexus Interactive (2020 - 2023)
- Delivered high-converting responsive web apps with sub-second page loads.
- Designed 30+ production design systems adhering to WCAG AAA standards.

EDUCATION
Bachelor of Design (Interaction & Digital Media)
National Institute of Design (NID)
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SK_UI_UX_Web_Designer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-card resume-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose} 
          className="modal-close-btn"
          aria-label="Close resume preview"
          id="resume-modal-close"
        >
          <X size={20} />
        </button>

        <div className="modal-body-section">
          <div className="section-badge"><FileText size={16} /> CURRICULUM VITAE</div>
          <h2 className="modal-title">Resume Overview</h2>
          <p className="modal-paragraph">
            Download the official CV detailing technical competencies, project leadership, and design philosophy.
          </p>

          <div className="resume-preview-box">
            <div className="resume-header-row">
              <div>
                <h3>SK</h3>
                <p className="resume-subtitle">UI UX &amp; WEB Designer</p>
              </div>
              <span className="availability-tag">
                <CheckCircle2 size={14} /> Available for Q1/Q2 Projects
              </span>
            </div>

            <div className="resume-highlights">
              <div className="highlight-item">
                <strong>Experience:</strong> 7+ Years in Digital Product Design &amp; Web Engineering
              </div>
              <div className="highlight-item">
                <strong>Key Clients:</strong> Fintech, Generative AI, Luxury E-Commerce, SaaS
              </div>
              <div className="highlight-item">
                <strong>Location:</strong> New Delhi, India (Open to Worldwide Remote)
              </div>
            </div>
          </div>

          <div className="resume-modal-actions">
            <button 
              onClick={handleDownload} 
              className="cta-resume-btn full-width"
              id="confirm-download-btn"
            >
              <Download size={18} />
              <span>Download Resume Document</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
