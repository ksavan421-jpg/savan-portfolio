import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Code2, Sparkles, Layout, Palette, Zap, Smartphone, Terminal, Cpu } from 'lucide-react';
import { FigmaIcon } from './Icons';

export default function SkillsSection() {
  const containerRef = useRef(null);

  const skillGroups = [
    {
      category: 'UI/UX Design',
      icon: <FigmaIcon className="w-5 h-5" />,
      skills: [
        { name: 'Figma & FigJam', level: 80, highlight: 'Design Systems & Auto-Layout' },
        { name: 'Wireframing & Prototyping', level: 95, highlight: 'High-Fidelity Interactive Flows' },
        { name: 'Design System Architecture', level: 92, highlight: 'Tokens, Variables & Component Sets' },
        { name: 'Mobile App UI', level: 94, highlight: 'iOS & Material Guidelines' },
        { name: 'User Experience Research', level: 88, highlight: 'Information Architecture & Usability' }
      ]
    },
    {
      category: 'Frontend Development',
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      skills: [
        { name: 'AI-Assisted React.js', level: 85, highlight: 'Modern Hooks & AI-Accelerated Development' },
        { name: 'GSAP (GreenSock Animation)', level: 60, highlight: 'ScrollTrigger, Timelines & Physics' },
        { name: 'Tailwind CSS', level: 96, highlight: 'v3 & v4 Modern Design Tokens' },
        { name: 'JavaScript ES6+ / TypeScript', level: 65, highlight: 'Clean, Maintainable Architectures' },
        { name: 'Semantic HTML5 & Modern CSS3', level: 98, highlight: 'Responsive, Accessible, Pixel-Perfect' }
      ]
    },
    {
      category: 'Workflow & Tools',
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      skills: [
        { name: 'Vite & Modern Tooling', level: 95, highlight: 'Lightning-Fast Dev Workflow' },
        { name: 'Responsive & Adaptive UI', level: 98, highlight: 'Cross-Device & Cross-Browser Precision' },
        { name: 'Git & Version Control', level: 90, highlight: 'Team Collaboration & Branching' },
        { name: 'Performance Optimization', level: 92, highlight: 'Core Web Vitals & Asset Compression' },
        { name: 'Figma-to-Code Translation', level: 100, highlight: 'Zero-Loss Visual Fidelity' }
      ]
    }
  ];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-black overflow-hidden transition-colors duration-300"
    >
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-0 w-[550px] h-[550px] rounded-full blur-3xl opacity-50 z-0 bg-radial-glow-mid"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-slate-500 dark:text-white/90 uppercase block mb-2 sm:mb-3">
            TECHNICAL &amp; CREATIVE STACK
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white font-sans-ui">
            Crafting Digital Precision
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto text-xs sm:text-base">
            From intuitive Figma prototypes to production-grade React code powered by GSAP animations and Tailwind styling.
          </p>
        </div>

        {/* 3 Skill Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#090d1a]/80 border border-slate-200 dark:border-white/10 hover:border-[#0033FF]/50 transition-all duration-300 shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/60 relative group"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
                <div className="w-10 h-10 rounded-2xl bg-[#001D8F]/10 dark:bg-[#001D8F]/30 border border-[#0033FF]/30 dark:border-[#0033FF]/40 flex items-center justify-center shadow-md">
                  {group.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-slate-700 dark:text-zinc-200">{skill.name}</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{skill.level}%</span>
                    </div>
                    {/* Progress Bar with Blue Glow */}
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#001D8F] to-[#0033FF] rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(0,51,255,0.6)]"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-500 block">
                      {skill.highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
}
