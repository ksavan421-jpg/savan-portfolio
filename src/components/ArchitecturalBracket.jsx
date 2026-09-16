import React from 'react';

export default function ArchitecturalBracket({ className = '' }) {
  return (
    <div className={`architectural-bracket-container ${className}`} aria-hidden="true">
      <svg
        className="architectural-bracket-svg"
        viewBox="0 0 160 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Top horizontal tick pointing right */}
        <line x1="140" y1="2" x2="158" y2="2" stroke="var(--frame-line)" strokeWidth="1.2" />
        
        {/* Main vertical spine */}
        <line x1="140" y1="2" x2="140" y2="418" stroke="var(--frame-line)" strokeWidth="1.2" />
        
        {/* Horizontal pointer branch extending left towards character */}
        <line x1="0" y1="172" x2="140" y2="172" stroke="var(--frame-line)" strokeWidth="1.2" />
        
        {/* Bottom horizontal tick pointing right */}
        <line x1="140" y1="418" x2="158" y2="418" stroke="var(--frame-line)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
