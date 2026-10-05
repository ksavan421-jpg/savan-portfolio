import React from 'react';
import { Calendar, Briefcase, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function HistorySection() {
  const experiences = [
    {
      company: 'GTF TECHNOLOGIES',
      location: 'NOIDA, SECTOR 3',
      period: '2021 — 2026',
      totalTime: '5.7 YEARS',
      designation: 'Sr. UI UX & Web Designer',
      work: 'Real Estate Builder Website & Landing Page For Lead Generation',
      tags: ['Figma', 'UI/UX Design', 'Lead Generation Landing Pages', 'Real Estate Portals', 'React.js', 'Design Systems']
    },
    {
      company: 'ONLINEFRONT',
      location: 'NEW DELHI, PEERAGARHI',
      period: '2020',
      totalTime: '6 MONTHS',
      designation: 'Web Designer',
      work: 'Import Export, Events, Education, Product Websites',
      tags: ['Web Design', 'UI Layouts', 'Import/Export Websites', 'Education Portals', 'Responsive UI']
    },
    {
      company: 'CHAHAR TECHNOLOGIES',
      location: 'NEW DELHI, JANAKPURI',
      period: '2018 — 2019',
      totalTime: '1.5 YEARS',
      designation: 'Web Designer',
      work: 'Education, NGO, Hotel, Product Websites',
      tags: ['Web Design', 'Wireframing', 'Hotel Websites', 'NGO Platforms', 'HTML5/CSS3']
    }
  ];

  return (
    <section 
      id="history" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* 0033FF 46% Glow */}
      <div 
        className="pointer-events-none absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 51, 255, 0.46) 0%, rgba(0, 29, 143, 0.15) 50%, rgba(0, 0, 0, 0) 80%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-white/90 uppercase block mb-2 sm:mb-3">
            CAREER JOURNEY
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-sans-ui">
            Work Experience
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-2xl mx-auto text-xs sm:text-base">
            Over 7+ years of hands-on experience designing high-converting real estate portals, SaaS web platforms, and enterprise digital solutions.
          </p>
        </div>

        {/* Experience Cards List */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#090d1a]/80 border border-white/10 hover:border-[#0033FF]/50 transition-all duration-300 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 group hover:-translate-y-1"
            >
              <div className="space-y-3.5 max-w-2xl">
                
                {/* Company & Timeline Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#001D8F] text-white border border-[#0033FF]/40 shadow-sm">
                    {exp.company}
                  </span>
                  
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-blue-300 border border-white/10 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#0033FF]" />
                    {exp.period} ({exp.totalTime})
                  </span>

                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/5 text-zinc-400 border border-white/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    {exp.location}
                  </span>
                </div>

                {/* Designation */}
                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Designation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-200 transition-colors mt-0.5">
                    {exp.designation}
                  </h3>
                </div>

                {/* Work / Scope */}
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Work Scope &amp; Deliverables
                  </span>
                  <p className="text-sm sm:text-base text-zinc-200 font-medium leading-relaxed mt-0.5">
                    {exp.work}
                  </p>
                </div>

                {/* Key Skill Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-0.5 rounded-md text-[11px] bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Decorative Briefcase Icon */}
              <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#001D8F]/30 group-hover:border-[#0033FF]/50 transition-all shrink-0 shadow-lg">
                <Briefcase className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
