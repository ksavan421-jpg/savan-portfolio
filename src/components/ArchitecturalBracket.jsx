import React from 'react';

export default function ArchitecturalBracket({ className = '' }) {
  return (
    <div className={`architectural-bracket-container ${className}`} aria-hidden="true">
      {/* Desktop View: Extended lines according to specifications */}
      <svg
        className="architectural-bracket-svg architectural-bracket-desktop"
        viewBox="0 0 160 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <line x1="140" y1="2" x2="300" y2="2" stroke="var(--frame-line)" strokeWidth="1.2" />
        <line x1="140" y1="2" x2="140" y2="418" stroke="var(--frame-line)" strokeWidth="1.2" />
        <line x1="50" y1="172" x2="140" y2="172" stroke="var(--frame-line)" strokeWidth="1.2" />
        <line x1="140" y1="418" x2="300" y2="418" stroke="var(--frame-line)" strokeWidth="1.2" />
      </svg>

      {/* Mobile View: Original bracket */}
      <svg
        className="architectural-bracket-svg architectural-bracket-mobile"
        viewBox="0 0 160 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <line x1="140" y1="2" x2="158" y2="2" stroke="var(--frame-line)" strokeWidth="1.2" />
        <line x1="140" y1="2" x2="140" y2="418" stroke="var(--frame-line)" strokeWidth="1.2" />
        <line x1="0" y1="172" x2="140" y2="172" stroke="var(--frame-line)" strokeWidth="1.2" />
        <line x1="140" y1="418" x2="158" y2="418" stroke="var(--frame-line)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
