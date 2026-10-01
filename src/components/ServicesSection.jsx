import React from 'react';
import { Layout, Palette, Code, Smartphone, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

export default function ServicesSection({ onContactClick }) {
  const services = [
    {
      title: 'UI/UX Design in Figma',
      desc: 'Complete wireframing, high-fidelity prototypes, information architecture, user journeys, and component systems ready for production.',
      icon: <Palette className="w-6 h-6 text-blue-400" />,
      features: ['Interactive Prototypes', 'Auto-Layout Components', 'Design Systems', 'Responsive Breakpoints']
    },
    {
      title: 'Modern Frontend Engineering',
      desc: 'Hand-coding designs into clean, modular, and fast React applications with Tailwind CSS and modern JavaScript ES6+.',
      icon: <Code className="w-6 h-6 text-blue-400" />,
      features: ['React 18 & 19', 'Tailwind CSS Tokens', 'Clean Code Practices', 'SEO Optimization']
    },
    {
      title: 'GSAP Animation & Motion',
      desc: 'Elevating static designs into living digital experiences using GreenSock timelines, physics-based movement, and scroll-triggered storytelling.',
      icon: <Sparkles className="w-6 h-6 text-blue-400" />,
      features: ['ScrollTrigger Choreography', '3D Perspective Tilt', 'Micro-Interactions', 'Silky Smooth 60fps']
    },
    {
      title: 'Mobile App & Tablet UI',
      desc: 'Ergonomic, touch-first mobile interfaces following Apple Human Interface Guidelines and Google Material Design.',
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      features: ['iOS & Android Specs', 'Touch Ergonomics', 'Tablet Split Views', 'Fluid Gesture UX']
    }
  ];

  return (
    <section 
      id="services" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-black overflow-hidden transition-colors duration-300"
    >
      {/* Background Radial Glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-30 z-0 bg-radial-glow-top"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-slate-500 dark:text-white/90 uppercase block mb-3">
            WHAT I DELIVER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white font-sans-ui">
            Services &amp; Specializations
          </h2>
          <p className="mt-4 text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Delivering cohesive solutions from initial wireframe sketch to deployable, interactive frontend code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((srv, idx) => (
            <div 
              key={srv.title}
              className="p-8 rounded-3xl bg-white dark:bg-[#090d1a]/70 border border-slate-200 dark:border-white/10 hover:border-[#0033FF]/50 transition-all duration-300 shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-[0_15px_35px_rgba(0,51,255,0.2)] flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#001D8F]/10 dark:bg-[#001D8F]/30 border border-[#0033FF]/30 dark:border-[#0033FF]/40 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  {srv.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#001D8F] dark:group-hover:text-blue-200 transition-colors">
                  {srv.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {srv.desc}
                </p>

                <ul className="mt-6 grid grid-cols-2 gap-2">
                  {srv.features.map((feat) => (
                    <li key={feat} className="text-xs text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#001D8F] dark:bg-[#0033FF]" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">0{idx + 1} / SERVICE</span>
                <button 
                  onClick={onContactClick}
                  className="text-xs font-semibold text-[#001D8F] dark:text-blue-400 hover:text-blue-600 dark:hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  Discuss Project <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
