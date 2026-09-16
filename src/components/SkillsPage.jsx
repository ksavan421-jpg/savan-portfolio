import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import NavColumn from './NavColumn';
import ArchitecturalBracket from './ArchitecturalBracket';

function FigmaIcon() {
  return (
    <svg viewBox="0 0 38 57" className="skill-icon" aria-hidden="true">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
    </svg>
  );
}

function HtmlIcon() {
  return (
    <svg viewBox="0 0 128 128" className="skill-icon" aria-hidden="true">
      <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/>
      <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/>
      <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/>
      <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/>
    </svg>
  );
}

function JsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="skill-icon" aria-hidden="true">
      <rect width="24" height="24" rx="3.5" fill="#f7df1e"/>
      <path fill="#000" d="M6.5 17.8c.8.5 1.8.8 2.8.8 1.4 0 2.2-.6 2.2-1.9v-6.9h-2.1v6.8c0 .6-.3.9-.9.9-.4 0-.8-.1-1.1-.3l-.9.6zm7.2-.1c.9.6 2.1 1 3.4 1 2.2 0 3.4-1.1 3.4-2.8 0-1.6-1-2.4-2.5-3-1.1-.5-1.7-.8-1.7-1.4 0-.5.4-.9 1.2-.9.8 0 1.5.3 2 .7l.8-1.5c-.7-.5-1.6-.8-2.7-.8-2.1 0-3.3 1.2-3.3 2.7 0 1.6 1 2.4 2.4 3 1.1.5 1.7.9 1.7 1.5 0 .6-.5 1-1.4 1-.9 0-1.8-.4-2.4-.9l-.8 1.6z"/>
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="skill-icon" aria-hidden="true">
      <path fill="#06b6d4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C8.336 13.382 6.975 12 4.001 12z"/>
    </svg>
  );
}

function GsapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="skill-icon" aria-hidden="true">
      <rect width="24" height="24" rx="3.5" fill="#0ae448"/>
      <path fill="#08060d" d="M13 3L6 13.5h5.5L10.5 21 18 10.5h-5.5L13 3z"/>
    </svg>
  );
}

function ChatGptIcon() {
  return (
    <svg viewBox="0 0 24 24" className="skill-icon" aria-hidden="true">
      <path fill="#10a37f" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm-1.22-8.72A4.475 4.475 0 0 1 4.72 7.15v5.7l5.834 3.37a.789.789 0 0 0 .393.104l-2.02 1.168a.08.08 0 0 1-.07.005L3.99 14.65a4.505 4.505 0 0 1-1.61-5.066zm16.896 3.02l-5.833-3.37 2.02-1.168a.08.08 0 0 1 .07-.005l4.867 2.81a4.505 4.505 0 0 1-1.124 1.733zm2.344-4.85l-.142-.085-4.779-2.759a.776.776 0 0 0-.785 0L10.1 8.279V5.947a.08.08 0 0 1 .033-.062l4.84-2.796a4.5 4.5 0 0 1 6.69 4.659zM9.499 12.002L12 10.559l2.501 1.443v2.886L12 16.331l-2.501-1.443v-2.886z"/>
    </svg>
  );
}

function PhotoshopIcon() {
  return (
    <svg viewBox="0 0 24 24" className="skill-icon" aria-hidden="true">
      <rect width="24" height="24" rx="3.5" fill="#001e36"/>
      <text x="3.2" y="16.5" fill="#31a8ff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11.5" fontWeight="bold">Ps</text>
    </svg>
  );
}

function CssIcon() {
  return (
    <svg viewBox="0 0 128 128" className="skill-icon" aria-hidden="true">
      <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/>
      <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/>
      <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/>
      <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/>
      <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/>
      <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"/>
    </svg>
  );
}

function BootstrapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="skill-icon" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#7952b3"/>
      <path fill="#fff" d="M8.5 6.5h3.6c1.6 0 2.7.9 2.7 2.2 0 1-.6 1.7-1.5 2 1.2.3 1.9 1.1 1.9 2.3 0 1.5-1.2 2.5-3 2.5H8.5V6.5zm2.1 3.5h1.3c.6 0 1-.3 1-.8 0-.6-.4-.8-1-.8h-1.3v1.6zm0 3.5h1.5c.7 0 1.2-.3 1.2-.9 0-.6-.5-.9-1.2-.9h-1.5v1.8z"/>
    </svg>
  );
}

function JqueryIcon() {
  return (
    <svg viewBox="0 0 128 128" className="skill-icon" aria-hidden="true">
      <path fill="#0868AC" d="M9.625 32.181C-1.404 48.032-.031 68.657 8.394 85.501c.2.404.41.801.617 1.198l.394.759.246.437.439.786c.262.461.53.92.804 1.379l.459.756c.304.491.615.976.933 1.46l.398.614c.439.655.888 1.309 1.352 1.951l.039.05.228.308c.401.553.814 1.099 1.232 1.639l.464.59c.373.469.752.935 1.138 1.399l.435.52a75.27 75.27 0 001.586 1.812l.033.033.061.068a80.44 80.44 0 001.612 1.699l.517.521c.423.426.853.845 1.287 1.262l.527.5c.58.547 1.166 1.083 1.764 1.607l.028.022.307.262c.527.456 1.063.909 1.603 1.353l.664.529c.441.354.887.702 1.336 1.044l.714.543c.496.365.995.724 1.499 1.075l.546.387.15.107c.478.329.967.646 1.456.963l.63.42c.75.474 1.51.943 2.279 1.396l.63.355c.565.326 1.134.646 1.71.959.312.168.632.327.946.488.407.213.811.429 1.225.636l.283.137.501.242c.641.306 1.287.607 1.94.897l.41.184a66.92 66.92 0 002.263.941l.551.217c.704.271 1.418.539 2.135.791l.268.093c.787.275 1.581.53 2.381.779l.575.172c.814.245 1.619.538 2.458.693 53.339 9.727 68.833-32.053 68.833-32.053-13.013 16.953-36.111 21.425-57.996 16.446-.829-.187-1.633-.446-2.442-.685l-.609-.185a72.498 72.498 0 01-2.352-.765l-.323-.117a72.245 72.245 0 01-2.074-.769l-.582-.229c-.752-.297-1.5-.607-2.239-.931l-.447-.198a92.857 92.857 0 01-1.889-.879l-.546-.262c-.491-.239-.977-.493-1.461-.743-.324-.171-.654-.332-.975-.51a58.591 58.591 0 01-1.751-.982l-.591-.33a81.221 81.221 0 01-2.28-1.397l-.615-.41a59.283 59.283 0 01-1.623-1.079l-.522-.367a89.287 89.287 0 01-1.534-1.109l-.679-.514a64.473 64.473 0 01-1.384-1.082l-.617-.495a82.693 82.693 0 01-1.724-1.453l-.189-.159a83.466 83.466 0 01-1.812-1.647l-.511-.491c-.441-.42-.875-.843-1.302-1.277l-.51-.509a70.541 70.541 0 01-1.598-1.69l-.079-.084a67.39 67.39 0 01-1.621-1.844l-.424-.504a70.602 70.602 0 01-1.167-1.442l-.427-.532a78.406 78.406 0 01-1.347-1.794c-12.15-16.574-16.516-39.432-6.805-58.204m25.629-2.434c-7.977 11.478-7.543 26.844-1.321 38.983a50.581 50.581 0 003.528 5.889c1.195 1.713 2.52 3.751 4.106 5.127a48.111 48.111 0 001.79 1.858l.472.465a51.69 51.69 0 001.828 1.698l.074.064.018.018a55.268 55.268 0 002.135 1.767l.485.378a54.08 54.08 0 002.233 1.631l.065.049c.336.232.678.448 1.019.672l.483.319c.544.349 1.095.689 1.655 1.015l.235.136c.483.278.972.552 1.463.818l.521.271c.339.177.678.358 1.023.53l.155.07c.703.346 1.412.68 2.136.995l.472.194c.579.246 1.164.486 1.75.71l.75.275c.533.198 1.068.378 1.607.559l.727.233c.767.238 1.525.539 2.324.672 41.183 6.823 50.691-24.886 50.691-24.886-8.57 12.343-25.168 18.233-42.879 13.635a50.376 50.376 0 01-2.333-.674l-.701-.227a45.423 45.423 0 01-1.631-.562l-.736-.274a56.418 56.418 0 01-1.756-.708l-.473-.2a47.728 47.728 0 01-2.148-.999c-.363-.177-.72-.364-1.078-.548l-.622-.32a44.502 44.502 0 01-1.363-.77l-.326-.185a47.844 47.844 0 01-1.651-1.008l-.498-.332a61.759 61.759 0 01-1.069-.707 57.456 57.456 0 01-2.226-1.628l-.501-.395c-7.752-6.12-13.898-14.486-16.819-23.971-3.062-9.836-2.402-20.878 2.903-29.84m22.278-.775c-4.702 6.92-5.164 15.514-1.901 23.156 3.441 8.113 10.491 14.476 18.72 17.495.339.125.679.237 1.022.354l.451.143c.485.152.966.329 1.467.424 22.74 4.394 28.908-11.669 30.549-14.034-5.402 7.779-14.482 9.646-25.623 6.942-.88-.213-1.847-.531-2.695-.832a33.242 33.242 0 01-3.201-1.329 33.215 33.215 0 01-5.612-3.424c-9.969-7.565-16.162-21.994-9.657-33.745"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="skill-icon" aria-hidden="true">
      <path fill="#24292e" fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="skill-icon" aria-hidden="true">
      <path fill="#d97706" d="M12 2.5l2.2 6.2L20.5 11l-6.3 2.3L12 19.5l-2.2-6.2L3.5 11l6.3-2.3L12 2.5z"/>
    </svg>
  );
}

const SKILLS_COL_1 = [
  { name: 'FIGMA', icon: <FigmaIcon /> },
  { name: 'HTML', icon: <HtmlIcon /> },
  { name: 'JAVASCRIPT', icon: <JsIcon /> },
  { name: 'TAILWIND', icon: <TailwindIcon /> },
  { name: 'GSAP', icon: <GsapIcon /> },
  { name: 'CHATGPT', icon: <ChatGptIcon /> }
];

const SKILLS_COL_2 = [
  { name: 'PHOTOSHOP', icon: <PhotoshopIcon /> },
  { name: 'CSS', icon: <CssIcon /> },
  { name: 'BOOTSTRAP', icon: <BootstrapIcon /> },
  { name: 'JQUERY', icon: <JqueryIcon /> },
  { name: 'GITHUB', icon: <GithubIcon /> },
  { name: 'CLAUDE AI', icon: <ClaudeIcon /> }
];

export default function SkillsPage({
  activeNav = 'skills',
  onSelectNav,
  onDownloadResume
}) {
  const containerRef = useRef(null);
  const avatarImgRef = useRef(null);
  const contentRef = useRef(null);

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

  return (
    <main className="hero-container skills-page-container" id="skills-content" ref={containerRef}>
      {/* 1. Left Character Avatar Column */}
      <section className="hero-avatar-column" aria-label="Savan Working at Desk">
        <div className="avatar-wrapper skills-avatar-wrapper">
          <img
            ref={avatarImgRef}
            src="/skill.png"
            alt="Savan at computer desk flexing muscle"
            className="avatar-image skills-avatar-image"
            draggable="false"
          />
        </div>
      </section>

      {/* 2. Center Column with Bracket and Skills Grid */}
      <section className="hero-center-column skills-center-column" aria-label="Professional Skills">
        <div className="center-content-wrapper skills-content-frame">
          <div className="bracket-wrapper skills-bracket-wrapper">
            <ArchitecturalBracket className="editorial-bracket" />
          </div>

          <div className="skills-main-body" ref={contentRef}>
            <h1 className="skills-heading">Professional Skills</h1>

            <div className="skills-two-columns">
              <div className="skills-column">
                {SKILLS_COL_1.map((skill) => (
                  <div key={skill.name} className="skill-cell">
                    {skill.icon}
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>

              <div className="skills-column">
                {SKILLS_COL_2.map((skill) => (
                  <div key={skill.name} className="skill-cell">
                    {skill.icon}
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
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
          id="skills-resume-btn"
          aria-label="Download Resume"
        >
          <span>DOWNLOAD RESUME</span>
        </button>
      </div>

      {/* Next Section CTA Button (Mobile Fixed Bottom) */}
      <div className="page-nav-cta-wrapper">
        <button
          type="button"
          onClick={() => {
            onSelectNav('work');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="page-nav-cta-btn"
          id="skills-work-btn"
          aria-label="Go to Work page"
        >
          <span>MY WORK</span>
          <ArrowRight size={16} className="page-nav-cta-icon" />
        </button>
      </div>
    </main>
  );
}
