import React, { useState } from 'react';
import { Eye, X, Maximize2 } from 'lucide-react';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Real-world photos loaded directly from public/gallery-imgs
  const row1 = [
    { 
      title: 'Star Performer Awards & Annual Recognition', 
      src: '/gallery-imgs/gallery-img-5.jpeg', 
      tag: 'GTF Technologies' 
    },
    { 
      title: 'Design & Engineering Team Collaboration', 
      src: '/gallery-imgs/gallery-img-2.jpeg', 
      tag: 'Team Culture' 
    },
    { 
      title: 'Workplace Celebrations & Festivities', 
      src: '/gallery-imgs/gallery-img-3.jpeg', 
      tag: 'Office Moments' 
    },
    { 
      title: 'Holiday Season & Team Celebration', 
      src: '/gallery-imgs/gallery-img-4.jpeg', 
      tag: 'Events' 
    },
    { 
      title: 'Team Bonding & Annual Gatherings', 
      src: '/gallery-imgs/gallery-img-6.jpeg', 
      tag: 'GTF Noida' 
    },
    { 
      title: 'Design System & Creative Workflow', 
      src: '/gallery-imgs/gallery-img-1.webp', 
      tag: 'Workspace' 
    }
  ];

  const row2 = [
    { 
      title: 'Digital Web Design Team Collaboration', 
      src: '/gallery-imgs/Onlinefront/gallery-img-1.jpeg', 
      tag: 'Onlinefront' 
    },
    { 
      title: 'Team Ideation & Creative Discussions', 
      src: '/gallery-imgs/Onlinefront/gallery-img-2.jpeg', 
      tag: 'Team Moments' 
    },
    { 
      title: 'Team Milestones & Celebrations', 
      src: '/gallery-imgs/Onlinefront/gallery-img-3.jpeg', 
      tag: 'Memories' 
    },
    { 
      title: 'Design Brainstorming & Review Session', 
      src: '/gallery-imgs/Onlinefront/gallery-img-4.jpeg', 
      tag: 'Collaboration' 
    },
    { 
      title: 'Project Delivery & Milestones', 
      src: '/gallery-imgs/Onlinefront/gallery-img-5.jpeg', 
      tag: 'Milestone' 
    },
    { 
      title: 'Design Team Workplace Memories', 
      src: '/gallery-imgs/Onlinefront/gallery-img-6.jpeg', 
      tag: 'Onlinefront' 
    },
    { 
      title: 'First UI/UX Workstation Setup (2018)', 
      src: '/gallery-imgs/chahar-workstation.jpeg', 
      tag: 'Chahar Tech' 
    }
  ];

  return (
    <section 
      id="gallery" 
      className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5"
    >
      {/* 0033FF 46% Background Glow Aura */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-3xl opacity-35 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 51, 255, 0.46) 0%, rgba(0, 29, 143, 0.15) 50%, rgba(0, 0, 0, 0) 80%)'
        }}
      />

      <div className="relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-white/90 uppercase block mb-2 sm:mb-3">
            LIFE AT WORK &amp; MILESTONES
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-sans-ui">
            Culture &amp; Team Gallery
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed">
            Moments, team collaborations, star performer award recognitions, and workplace memories across GTF Technologies, Onlinefront, and Chahar Technologies.
          </p>
        </div>

        {/* Row 1: Flowing Left Continuously */}
        <div className="relative w-full overflow-hidden mb-4 sm:mb-6 py-1 sm:py-2 group/row1">
          {/* Subtle edge fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

          <div className="animate-marquee-left group-hover/row1:marquee-pause-hover gap-4 sm:gap-6 flex">
            {[...row1, ...row1].map((item, idx) => (
              <div
                key={`r1-${idx}`}
                onClick={() => setSelectedImage(item)}
                className="relative flex-shrink-0 w-60 sm:w-88 h-40 sm:h-56 rounded-2xl overflow-hidden bg-[#0a0f22] border border-white/10 hover:border-[#0033FF] cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(0,51,255,0.35)] transition-all duration-300 hover:scale-[1.03] group/card"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Dark gradient overlay on hover with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                  <span className="self-start px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#001D8F] text-white">
                    {item.tag}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white truncate max-w-[80%]">
                      {item.title}
                    </span>
                    <span className="p-1.5 rounded-full bg-white/20 text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Flowing Right Continuously */}
        <div className="relative w-full overflow-hidden py-1 sm:py-2 group/row2">
          {/* Subtle edge fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

          <div className="animate-marquee-right group-hover/row2:marquee-pause-hover gap-4 sm:gap-6 flex">
            {[...row2, ...row2].map((item, idx) => (
              <div
                key={`r2-${idx}`}
                onClick={() => setSelectedImage(item)}
                className="relative flex-shrink-0 w-60 sm:w-88 h-40 sm:h-56 rounded-2xl overflow-hidden bg-[#0a0f22] border border-white/10 hover:border-[#0033FF] cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(0,51,255,0.35)] transition-all duration-300 hover:scale-[1.03] group/card"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Dark gradient overlay on hover with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                  <span className="self-start px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#001D8F] text-white">
                    {item.tag}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white truncate max-w-[80%]">
                      {item.title}
                    </span>
                    <span className="p-1.5 rounded-full bg-white/20 text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] bg-[#080d1e] rounded-3xl border border-white/20 overflow-hidden shadow-2xl p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 px-2 text-white">
              <div>
                <span className="text-xs text-blue-400 font-bold uppercase mr-2">{selectedImage.tag}</span>
                <span className="text-sm font-semibold">{selectedImage.title}</span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 max-h-[75vh] overflow-hidden rounded-xl flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
