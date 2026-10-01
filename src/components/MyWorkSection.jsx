import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ExternalLink, Eye } from 'lucide-react';

export default function MyWorkSection({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('Website');
  const [visibleCount, setVisibleCount] = useState(3);
  const sectionRef = useRef(null);

  const categories = [
    'Website',
    'SaaS',
    'Dashboard',
    'Mobile App',
    'Landing Page'
  ];

  // Comprehensive projects catalog for each category
  const allProjects = {
    Website: [
      {
        id: 'ecommerce',
        title: 'E-Commerce',
        tagline: 'Luxury Fashion & Lifestyle Mobile Store',
        category: 'Website',
        image: '/slider-img-01.png',
        figmaLayout: '/work/shopping-figma-layout-1.jpg',
        layoutName: 'shopping-figma-layout-1',
        layoutDimensions: '1366 × 6027px',
        cardBg: '#94b3f3',
        tech: ['Figma', 'React', 'Tailwind', 'Stripe'],
        description: 'Ultra-modern luxury fashion shopping application with silky smooth transitions, micro-interactions, and frictionless checkout experience.'
      },
      {
        id: 'real-estate',
        title: 'Real Estate',
        tagline: 'Aura Luxury Villa & Architectural Properties',
        category: 'Website',
        image: '/slider-img-laptop.png',
        figmaLayout: '/work/realestate-figma-layout-1.jpg',
        layoutName: 'realestate-figma-layout-1',
        layoutDimensions: '1344 × 6076px',
        cardBg: '#9abaf5',
        tech: ['Figma', 'React.js', 'GSAP', 'Next.js'],
        description: 'Immersive property discovery platform featuring 3D architectural tours, interactive floor plans, and elite residential portfolio.'
      },
      {
        id: 'event',
        title: 'Event',
        tagline: 'Summit 2026 Tech & Innovation Conference',
        category: 'Website',
        image: '/slider-img-1.png',
        figmaLayout: '/work/event-figma-layout-1.jpg',
        layoutName: 'event-figma-layout-1',
        layoutDimensions: '1341 × 4289px',
        cardBg: '#8eaef0',
        tech: ['Figma', 'React', 'Tailwind CSS', 'GSAP'],
        description: 'Global tech conference portal with real-time countdown timer, multi-stage interactive schedule, keynote speaker showcase, and ticketing.'
      },
      {
        id: 'aarya-realty',
        title: 'Aarya Realty',
        tagline: 'Commercial Hub & Architectural Towers',
        category: 'Website',
        image: '/work-aarya-realty.webp',
        cardBg: '#88a9ee',
        tech: ['Figma', 'React', 'Tailwind', 'GSAP'],
        description: 'High-converting corporate real estate portal designed for premium commercial hubs, featuring interactive virtual floor tours and buyer inquiries.'
      },
      {
        id: 'ashwin-sheth',
        title: 'Ashwin Sheth Group',
        tagline: 'Luxury Residential Real Estate Portal',
        category: 'Website',
        image: '/work-ashwin-seth.webp',
        cardBg: '#9abaf5',
        tech: ['UI/UX Design', 'React.js', 'Tailwind', 'Figma'],
        description: 'Bespoke web experience showcasing ultra-luxury residential towers with interactive neighborhood maps, amenities gallery, and unit plans.'
      },
      {
        id: 'rubberwala',
        title: 'Rubberwala Spaces',
        tagline: 'Urban Living Spaces & High-Rise Landing',
        category: 'Website',
        image: '/work-rubberwala.webp',
        cardBg: '#94b3f3',
        tech: ['Figma Tokens', 'React', 'GSAP ScrollTrigger'],
        description: 'Metropolitan property showcase highlighting sustainable architecture, construction milestones, and direct sales team scheduling.'
      },
      {
        id: 'northwind',
        title: 'Northwind Estate',
        tagline: 'Architectural Living & Masterplan Portal',
        category: 'Website',
        image: '/work-northwind.webp',
        cardBg: '#8eaef0',
        tech: ['React', 'Next.js', 'Tailwind', 'Figma'],
        description: 'Masterplan property exploration suite with dynamic filter systems for villas, penthouses, and gated community plots.'
      },
      {
        id: 'eldeco',
        title: 'Eldeco Corporate',
        tagline: 'Corporate Builder & Estate Platform',
        category: 'Website',
        image: '/work-1.webp',
        cardBg: '#88a9ee',
        tech: ['Figma', 'React', 'Tailwind'],
        description: 'Institutional real estate portfolio web platform unifying multiple commercial development brands under a clean aesthetic.'
      },
      {
        id: 'apex-commerce',
        title: 'Apex Global Trade',
        tagline: 'International Product & Trade Portal',
        category: 'Website',
        image: '/work-2.webp',
        cardBg: '#9abaf5',
        tech: ['React', 'Tailwind', 'Figma'],
        description: 'Global B2B import-export corporate website with multi-currency catalog, freight calculators, and inquiry workflows.'
      }
    ],
    SaaS: [
      {
        id: 'saas-cloud',
        title: 'CloudFlow SaaS',
        tagline: 'Developer Infrastructure & Deployment Suite',
        category: 'SaaS',
        image: '/slider-img-laptop.png',
        cardBg: '#94b3f3',
        tech: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
        description: 'Unified cloud management suite allowing teams to orchestrate microservices, monitor latency, and deploy with zero downtime.'
      },
      {
        id: 'saas-analytics',
        title: 'Metrix Pulse',
        tagline: 'Real-time AI Analytics Platform',
        category: 'SaaS',
        image: '/slider-img-1.png',
        cardBg: '#9abaf5',
        tech: ['Figma', 'React', 'D3.js', 'Tailwind'],
        description: 'AI-driven business metrics dashboard that turns telemetry into actionable revenue insights.'
      },
      {
        id: 'saas-crm',
        title: 'OmniConnect CRM',
        tagline: 'Intelligent Client Relationship Suite',
        category: 'SaaS',
        image: '/slider-img-01.png',
        cardBg: '#8eaef0',
        tech: ['React', 'Next.js', 'Tailwind CSS'],
        description: 'End-to-end sales pipeline and customer engagement dashboard with automated lead qualification.'
      },
      {
        id: 'saas-workos',
        title: 'Figma WorkOS',
        tagline: 'Design-to-Code Engineering Platform',
        category: 'SaaS',
        image: '/figma-monitor-showcase.png',
        cardBg: '#88a9ee',
        tech: ['Figma API', 'React', 'TypeScript'],
        description: 'Developer workspace connecting design tokens in Figma directly with React components for continuous UI deployment.'
      },
      {
        id: 'saas-proptech',
        title: 'PropTech Cloud',
        tagline: 'Builder Lead Generation & Analytics',
        category: 'SaaS',
        image: '/work-aarya-realty.webp',
        cardBg: '#94b3f3',
        tech: ['React', 'Tailwind', 'Chart.js'],
        description: 'Comprehensive lead attribution and CRM suite built specifically for real estate developers and sales teams.'
      },
      {
        id: 'saas-auth',
        title: 'SecureGate Auth',
        tagline: 'Multi-Tenant Identity & Access Management',
        category: 'SaaS',
        image: '/work-ashwin-seth.webp',
        cardBg: '#9abaf5',
        tech: ['React.js', 'Tailwind', 'Figma'],
        description: 'High-security user authentication and role-based permissions dashboard for modern SaaS applications.'
      }
    ],
    Dashboard: [
      {
        id: 'dash-summit',
        title: 'Event Ops Hub',
        tagline: 'Real-time Stage & Attendee Operations',
        category: 'Dashboard',
        image: '/slider-img-1.png',
        cardBg: '#8eaef0',
        tech: ['React', 'GSAP', 'Tailwind', 'WebSocket'],
        description: 'Command center for stage managers and event organizers to monitor live session check-ins, attendee metrics, and broadcast feeds.'
      },
      {
        id: 'dash-finance',
        title: 'Apex Treasury',
        tagline: 'Financial Liquidity & Portfolio Control',
        category: 'Dashboard',
        image: '/slider-img-laptop.png',
        cardBg: '#9abaf5',
        tech: ['React.js', 'Tailwind CSS', 'Figma'],
        description: 'High-density institutional trading and portfolio management dashboard built for rapid decision making.'
      },
      {
        id: 'dash-store',
        title: 'Merchant Central',
        tagline: 'Multi-Store Inventory & Revenue Hub',
        category: 'Dashboard',
        image: '/slider-img-01.png',
        cardBg: '#94b3f3',
        tech: ['React', 'Tailwind', 'REST APIs'],
        description: 'Full-spectrum inventory, fulfillment tracking, and customer conversion telemetry for luxury merchants.'
      },
      {
        id: 'dash-telemetry',
        title: 'System Telemetry',
        tagline: 'Real-time Server & Network Health',
        category: 'Dashboard',
        image: '/figma-monitor-showcase.png',
        cardBg: '#88a9ee',
        tech: ['React', 'Tailwind', 'Figma'],
        description: 'Mission-critical devops monitoring dashboard featuring latency graphs, error logs, and cluster node health.'
      },
      {
        id: 'dash-leads',
        title: 'Realty Lead Pulse',
        tagline: 'Lead Generation & Conversion Insights',
        category: 'Dashboard',
        image: '/work-rubberwala.webp',
        cardBg: '#94b3f3',
        tech: ['Figma', 'React', 'Tailwind'],
        description: 'Real estate campaign telemetry dashboard analyzing campaign spend, cost per lead, and closing ratios.'
      },
      {
        id: 'dash-property',
        title: 'Asset Manager',
        tagline: 'Commercial Property Unit Operations',
        category: 'Dashboard',
        image: '/work-northwind.webp',
        cardBg: '#8eaef0',
        tech: ['React', 'Tailwind', 'Figma'],
        description: 'Operational control panel for leasing agents managing tenant occupancies, maintenance tickets, and rent rolls.'
      }
    ],
    'Mobile App': [
      {
        id: 'mob-luxury',
        title: 'E-Commerce iOS',
        tagline: 'Curated Luxury Fashion App',
        category: 'Mobile App',
        image: '/slider-img-01.png',
        figmaLayout: '/work/shopping-figma-layout-1.jpg',
        layoutName: 'shopping-figma-layout-1',
        cardBg: '#94b3f3',
        tech: ['Figma UI', 'React Native', 'Tailwind'],
        description: 'Haptic-responsive mobile e-commerce interface with fluid swipe gestures, smart wishlist, and one-tap checkout.'
      },
      {
        id: 'mob-event',
        title: 'Summit Companion',
        tagline: 'Personalized Conference Schedule App',
        category: 'Mobile App',
        image: '/slider-img-1.png',
        cardBg: '#8eaef0',
        tech: ['Figma', 'React Native', 'Tailwind'],
        description: 'Attendee companion app with Bluetooth networking, live speaker Q&A, and interactive venue maps.'
      },
      {
        id: 'mob-property',
        title: 'Aura Living Mobile',
        tagline: 'Private Property Resident App',
        category: 'Mobile App',
        image: '/slider-img-laptop.png',
        cardBg: '#9abaf5',
        tech: ['React Native', 'Tailwind', 'Figma'],
        description: 'Smart resident portal for concierge booking, digital key access, and luxury estate maintenance.'
      },
      {
        id: 'mob-sheth',
        title: 'Sheth Luxury Living',
        tagline: 'Resident Amenities & Smart Access',
        category: 'Mobile App',
        image: '/work-ashwin-seth.webp',
        cardBg: '#88a9ee',
        tech: ['Figma UI', 'React Native', 'Tailwind'],
        description: 'Premium residential lifestyle mobile app providing homeowners with clubhouse reservations and guest passes.'
      },
      {
        id: 'mob-trade',
        title: 'TradeTrack Logistics',
        tagline: 'Shipment Tracking & Port Updates',
        category: 'Mobile App',
        image: '/work-2.webp',
        cardBg: '#9abaf5',
        tech: ['Figma', 'React Native', 'Tailwind'],
        description: 'Mobile logistics tracking tool allowing clients to view container manifests and customs clearance in real time.'
      },
      {
        id: 'mob-booking',
        title: 'Urban Spaces Booking',
        tagline: 'On-Demand Apartment Visits',
        category: 'Mobile App',
        image: '/work-rubberwala.webp',
        cardBg: '#94b3f3',
        tech: ['Figma UI', 'React Native'],
        description: 'Instant site-visit booking app connecting prospective property buyers with verified builder relationship managers.'
      }
    ],
    'Landing Page': [
      {
        id: 'lp-realty',
        title: 'Real Estate High-Rise',
        tagline: 'Architectural Showroom Landing Page',
        category: 'Landing Page',
        image: '/slider-img-laptop.png',
        figmaLayout: '/work/realestate-figma-layout-1.jpg',
        layoutName: 'realestate-figma-layout-1',
        layoutDimensions: '1344 × 6076px',
        cardBg: '#9abaf5',
        tech: ['Figma', 'React', 'GSAP ScrollTrigger'],
        description: 'High-converting interactive landing page with 3D model reveals, panoramic view selectors, and lead capture.'
      },
      {
        id: 'lp-summit',
        title: 'Summit Early Access',
        tagline: 'Global Launch Landing Experience',
        category: 'Landing Page',
        image: '/slider-img-1.png',
        figmaLayout: '/work/event-figma-layout-1.jpg',
        layoutName: 'event-figma-layout-1',
        layoutDimensions: '1341 × 4289px',
        cardBg: '#8eaef0',
        tech: ['React', 'Tailwind', 'GSAP'],
        description: 'Award-worthy conference teaser landing page featuring custom GSAP canvas effects and dynamic ticket tier calculator.'
      },
      {
        id: 'lp-shop',
        title: 'Autumn Drop Store',
        tagline: 'Limited Edition Product Reveal',
        category: 'Landing Page',
        image: '/slider-img-01.png',
        cardBg: '#94b3f3',
        tech: ['Figma', 'React', 'Tailwind'],
        description: 'Editorial brand lookbook landing page blending high fashion photography with smooth interactive carousels.'
      },
      {
        id: 'lp-aarya-launch',
        title: 'Aarya Commercial Hub',
        tagline: 'Commercial Space Lead Generation',
        category: 'Landing Page',
        image: '/work-aarya-realty.webp',
        cardBg: '#88a9ee',
        tech: ['Figma', 'React', 'Tailwind'],
        description: 'Campaign landing page engineered specifically for lead generation, featuring interactive ROI calculators and instant brochure downloads.'
      },
      {
        id: 'lp-northwind-villas',
        title: 'Northwind Signature Villas',
        tagline: 'Exclusive Waterfront Enclave',
        category: 'Landing Page',
        image: '/work-northwind.webp',
        cardBg: '#9abaf5',
        tech: ['Figma', 'React', 'GSAP'],
        description: 'Immersive luxury real estate landing experience with full-width video background hero and fast lead submission forms.'
      },
      {
        id: 'lp-eldeco-towers',
        title: 'Eldeco Center Towers',
        tagline: 'High-Conversion Builder Showcase',
        category: 'Landing Page',
        image: '/work-1.webp',
        cardBg: '#94b3f3',
        tech: ['Figma', 'React', 'Tailwind'],
        description: 'Strategic lead acquisition page with dynamic floor plan switchers, instant price quote requests, and WhatsApp chat integrations.'
      }
    ]
  };

  const currentCategoryProjects = allProjects[activeCategory] || allProjects.Website;
  const currentProjects = currentCategoryProjects.slice(0, visibleCount);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(3); // Reset to 3 when switching category
    gsap.fromTo(
      '.work-card',
      { opacity: 0, y: 25, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
    );
  };

  const handleExploreMore = () => {
    const nextCount = visibleCount + 3;
    setVisibleCount(nextCount);
    // Smoothly animate the newly added 3 project boxes
    setTimeout(() => {
      gsap.fromTo(
        '.work-card-new',
        { opacity: 0, y: 35, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }, 50);
  };

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-black overflow-hidden transition-colors duration-300"
    >
      {/* User's specified radial gradient: 0033FF opacity 46% near work section */}
      <div 
        className="pointer-events-none absolute top-1/4 -left-48 w-[600px] h-[600px] rounded-full blur-3xl opacity-60 z-0 bg-radial-glow-mid"
      />
      <div 
        className="pointer-events-none absolute bottom-10 -right-48 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 51, 255, 0.35) 0%, rgba(0, 29, 143, 0.12) 50%, rgba(0, 0, 0, 0) 80%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Heading matching the user screenshot */}
        <div className="text-center mb-6 sm:mb-14">
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-white/90 uppercase block mb-2 sm:mb-3">
            MY WORK
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-sans-ui">
            Where Creativity Meets Technology
          </h2>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#001D8F] text-white shadow-lg shadow-[#001D8F]/50 scale-105'
                    : 'bg-black/60 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/15 shadow-sm'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Showcase Cards Grid: initially 3, reveals +3 more upon clicking 'Explore More' */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentProjects.map((project, idx) => {
            const isNewlyRevealed = idx >= visibleCount - 3 && visibleCount > 3;
            return (
              <div
                key={project.id}
                className={`work-card ${isNewlyRevealed ? 'work-card-new' : ''} group relative flex flex-col rounded-3xl overflow-hidden bg-black border border-white/10 hover:border-[#0033FF]/60 transition-all duration-500 shadow-none hover:shadow-[0_15px_40px_rgba(0,51,255,0.25)] hover:-translate-y-1.5`}
              >
                {/* Top Colored Showcase Canvas (No tag badge on box showcase) */}
                <div 
                  className="relative w-full aspect-[4/3] flex items-center justify-center p-6 overflow-hidden rounded-t-3xl transition-transform duration-500 group-hover:brightness-105"
                  style={{ backgroundColor: project.cardBg }}
                >
                  {/* Device Mockup with 3D Float Hover */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] transform group-hover:scale-105 transition-transform duration-500"
                  />

                  <button 
                    onClick={() => onSelectProject(project)}
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                    aria-label={`View ${project.title}`}
                  >
                    <span className="px-4 py-2 rounded-full bg-black/80 border border-white/20 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      Quick Preview
                    </span>
                  </button>
                </div>

                {/* Bottom Project Info Bar */}
                <div className="p-5 sm:p-6 bg-black flex items-center justify-between gap-4 transition-colors">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-blue-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                      {project.tagline}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-black hover:bg-[#001D8F] border border-white/20 hover:border-[#0033FF] transition-all duration-300 shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>View Work</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Explore More Button: reveals 3 more project boxes on each click */}
        {visibleCount < currentCategoryProjects.length ? (
          <div className="mt-14 sm:mt-16 flex justify-center">
            <button
              onClick={handleExploreMore}
              className="px-8 py-3 rounded-full text-sm font-bold tracking-wide text-white bg-[#001D8F] hover:bg-[#0027bd] border border-[#0033FF]/40 shadow-xl shadow-[#001D8F]/50 hover:shadow-[#0033FF]/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore More Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="mt-14 sm:mt-16 flex justify-center">
            <button
              onClick={() => setVisibleCount(3)}
              className="px-7 py-2.5 rounded-full text-xs font-semibold tracking-wide text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all duration-300 cursor-pointer"
            >
              <span>Show Less</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
