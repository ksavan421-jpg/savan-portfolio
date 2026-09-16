import React from 'react';

export default function Logo({ onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="brand-logo-btn inline-flex items-center justify-center p-0 border-none bg-transparent cursor-pointer" 
      aria-label="SK Logo - Return to Home"
      id="brand-logo"
    >
      <img 
        src="/project-logo.svg" 
        alt="SK Logo" 
        className="brand-logo-img block"
        width="46"
        height="51"
      />
    </button>
  );
}
