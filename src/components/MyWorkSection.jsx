import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ExternalLink, Eye, Layers } from 'lucide-react';
import { FigmaIcon } from './Icons';

// High-resolution image collections for projects with full multi-screen artboards
const AARYA_REALTY_IMAGES = [
  '/work-aarya-realty.webp',
  '/work/Aarya-Realty/Frame%201.webp',
  '/work/Aarya-Realty/Frame%202.webp',
  '/work/Aarya-Realty/Frame%203.webp',
  '/work/Aarya-Realty/Frame%204.webp',
  '/work/Aarya-Realty/Frame%205.webp',
  '/work/Aarya-Realty/Frame%206.webp',
  '/work/Aarya-Realty/Frame%207.webp',
  '/work/Aarya-Realty/Frame%208.webp',
  '/work/Aarya-Realty/Frame%209.webp',
  '/work/Aarya-Realty/Frame%2010.webp',
  '/work/Aarya-Realty/Frame%2011.webp',
  '/work/Aarya-Realty/Frame%2012.webp',
  '/work/Aarya-Realty/Frame%2013.webp',
  '/work/Aarya-Realty/Frame%2014.webp',
  '/work/Aarya-Realty/Frame%2016.webp',
  '/work/Aarya-Realty/Frame%2017.webp',
  '/work/Aarya-Realty/Frame%2018.webp',
  '/work/Aarya-Realty/Frame%2019.webp',
  '/work/Aarya-Realty/Frame%2020.webp',
  '/work/Aarya-Realty/Frame%2021.webp',
  '/work/Aarya-Realty/Frame%2022.webp',
  '/work/Aarya-Realty/Frame%2023.webp',
  '/work/Aarya-Realty/Frame%2024.webp',
  '/work/Aarya-Realty/Frame%2026.webp',
  '/work/Aarya-Realty/Frame%2027.webp'
];

const ASHWIN_SHETH_IMAGES = [
  '/work-ashwin-seth.webp',
  '/work/ashwin-seth/layout-1.webp',
  '/work/ashwin-seth/layout-2.webp',
  '/work/ashwin-seth/layout-3.webp',
  '/work/ashwin-seth/layout-4.webp',
  '/work/ashwin-seth/layout-5.webp',
  '/work/ashwin-seth/layout-6.webp',
  '/work/ashwin-seth/layout-7.webp',
  '/work/ashwin-seth/layout-8.webp',
  '/work/ashwin-seth/layout-9.webp',
  '/work/ashwin-seth/layout-10.webp',
  '/work/ashwin-seth/layout-10-1.webp',
  '/work/ashwin-seth/layout-10-2.webp',
  '/work/ashwin-seth/layout-14.webp',
  '/work/ashwin-seth/layout-15.webp',
  '/work/ashwin-seth/layout-16.webp',
  '/work/ashwin-seth/layout-17.webp',
  '/work/ashwin-seth/layout-18.webp'
];

const RUBBERWALA_IMAGES = [
  '/work-rubberwala.webp',
  '/work/rubberwala/layout-1.webp',
  '/work/rubberwala/layout-2.webp'
];

const NORTHWIND_IMAGES = [
  '/work-northwind.webp',
  '/work/north-wind-estate/Frame-1.webp',
  '/work/north-wind-estate/Frame-2.webp',
  '/work/north-wind-estate/Frame-3.webp',
  '/work/north-wind-estate/Frame-3-1.webp',
  '/work/north-wind-estate/Frame-4.webp',
  '/work/north-wind-estate/Frame-5.webp',
  '/work/north-wind-estate/Frame-6.webp',
  '/work/north-wind-estate/Frame-7.webp',
  '/work/north-wind-estate/Frame-8.webp',
  '/work/north-wind-estate/Frame-9.webp',
  '/work/north-wind-estate/Frame-10.webp',
  '/work/north-wind-estate/Frame-11.webp',
  '/work/north-wind-estate/Frame-12.webp',
  '/work/north-wind-estate/Frame-13.webp',
  '/work/north-wind-estate/Frame-14.webp',
  '/work/north-wind-estate/Frame-15.webp',
  '/work/north-wind-estate/Frame-16.webp',
  '/work/north-wind-estate/Frame-17.webp',
  '/work/north-wind-estate/Frame-18.webp',
  '/work/north-wind-estate/Frame-19.webp',
  '/work/north-wind-estate/Frame-20.webp',
  '/work/north-wind-estate/Frame-21.webp',
  '/work/north-wind-estate/Frame-22.webp',
  '/work/north-wind-estate/Frame-23.webp',
  '/work/north-wind-estate/Frame-24.webp',
  '/work/north-wind-estate/Frame-25.webp'
];

const SAAS_IMAGES = [
  '/work/saas/project-1-home-page-mockup.png',
  '/work/saas/project-1-home-page.jpg'
];

const ELDECO_GROUP_IMAGES = [
  '/work/eldeco-group/home%20page.png',
  '/work/eldeco-group/microsite.png',
  '/work/eldeco-group/microsite-0003.png',
  '/work/eldeco-group/our-story.png',
  '/work/eldeco-group/our-team.png',
  '/work/eldeco-group/career.png',
  '/work/eldeco-group/csr.png'
];

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
        description: 'Ultra-modern luxury fashion shopping application with silky smooth transitions, micro-interactions, and frictionless checkout experience.',
        images: ['/slider-img-01.png', '/work/shopping-figma-layout-1.jpg']
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
        description: 'Immersive property discovery platform featuring 3D architectural tours, interactive floor plans, and elite residential portfolio.',
        images: ['/slider-img-laptop.png', '/work/realestate-figma-layout-1.jpg']
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
        description: 'Global tech conference portal with real-time countdown timer, multi-stage interactive schedule, keynote speaker showcase, and ticketing.',
        images: ['/slider-img-1.png', '/work/event-figma-layout-1.jpg']
      },
      {
        id: 'aarya-realty',
        title: 'Aarya Realty',
        tagline: 'Commercial Hub & Architectural Towers',
        category: 'Website',
        image: '/work-aarya-realty.webp',
        cardBg: '#88a9ee',
        tech: ['Figma', 'React', 'Tailwind', 'GSAP'],
        description: 'High-converting corporate real estate portal designed for premium commercial hubs, featuring interactive virtual floor tours and buyer inquiries.',
        images: AARYA_REALTY_IMAGES
      },
      {
        id: 'ashwin-sheth',
        title: 'Ashwin Sheth Group',
        tagline: 'Luxury Residential Real Estate Portal',
        category: 'Website',
        image: '/work-ashwin-seth.webp',
        cardBg: '#9abaf5',
        tech: ['UI/UX Design', 'React.js', 'Tailwind', 'Figma'],
        description: 'Bespoke web experience showcasing ultra-luxury residential towers with interactive neighborhood maps, amenities gallery, and unit plans.',
        images: ASHWIN_SHETH_IMAGES
      },
      {
        id: 'rubberwala',
        title: 'Rubberwala Spaces',
        tagline: 'Urban Living Spaces & High-Rise Landing',
        category: 'Website',
        image: '/work-rubberwala.webp',
        figmaLayout: '/work/rubberwala/layout-1.webp',
        layoutName: 'rubberwala-spaces-layout',
        layoutDimensions: '1400 × 5932px',
        cardBg: '#94b3f3',
        tech: ['Figma Tokens', 'React', 'GSAP ScrollTrigger'],
        description: 'Metropolitan property showcase highlighting sustainable architecture, construction milestones, and direct sales team scheduling.',
        images: RUBBERWALA_IMAGES
      },
      {
        id: 'northwind',
        title: 'Northwind Estate',
        tagline: 'Architectural Living & Masterplan Portal',
        category: 'Website',
        image: '/work-northwind.webp',
        cardBg: '#8eaef0',
        tech: ['React', 'Next.js', 'Tailwind', 'Figma'],
        description: 'Masterplan property exploration suite with dynamic filter systems for villas, penthouses, and gated community plots.',
        images: NORTHWIND_IMAGES
      },
      {
        id: 'eldeco',
        title: 'Eldeco Group',
        tagline: 'Corporate Builder & Real Estate Web Platform',
        category: 'Website',
        image: '/work/eldeco-group/eldeco-cover.png',
        figmaLayout: '/work/eldeco-group/home%20page.png',
        layoutName: 'eldeco-group-home-page',
        layoutDimensions: '4823 × 32768px',
        cardBg: '#94b3f3',
        tech: ['Figma', 'UI/UX Design', 'Corporate Web', 'HTML5/CSS3', 'React'],
        description: 'Comprehensive institutional real estate platform for Eldeco Group featuring multi-brand commercial & residential portals, interactive project discovery, CSR initiatives, and career portals.',
        images: ELDECO_GROUP_IMAGES
      },
      {
        id: 'apex-commerce',
        title: 'Apex Global Trade',
        tagline: 'International Product & Trade Portal',
        category: 'Website',
        image: '/work-2.webp',
        cardBg: '#9abaf5',
        tech: ['React', 'Tailwind', 'Figma'],
        description: 'Global B2B import-export corporate website with multi-currency catalog, freight calculators, and inquiry workflows.',
        images: ['/work-2.webp']
      }
    ],
    SaaS: [
      {
        id: 'saas-screenshot-generator',
        title: 'API-Driven Responsive Screenshot & Social Card Generator',
        tagline: 'Automated Web Capture, OpenGraph Banners & Social Asset API',
        category: 'SaaS',
        image: '/work/saas/project-1-home-page-mockup.png',
        figmaLayout: '/work/saas/project-1-home-page.jpg',
        layoutName: 'screenshot-social-card-generator',
        layoutDimensions: '1369 × 8369px',
        cardBg: '#94b3f3',
        tech: ['Figma', 'React.js', 'Next.js', 'Tailwind CSS', 'Cloud APIs'],
        description: 'Developer-first SaaS platform designed to capture pixel-perfect responsive website screenshots, render programmatic OpenGraph preview cards, and deliver automated visual marketing assets at scale.',
        images: SAAS_IMAGES
      }
    ],
    Dashboard: [
      {
        id: 'gym-dashboard-design-1',
        title: 'Gym Dashboard Design',
        tagline: 'Fitness Club Analytics & Member Management Dashboard',
        category: 'Dashboard',
        image: '/work/dashboard/gym-dashbord-design-1.png',
        figmaLayout: '/work/dashboard/gym-dashbord-design-1.png',
        layoutName: 'gym-dashbord-design-1',
        layoutDimensions: '1366 × 1344px',
        cardBg: '#94b3f3',
        tech: ['Figma', 'UI/UX Design', 'React.js', 'Tailwind CSS', 'Analytics'],
        description: 'Comprehensive fitness club management dashboard featuring member retention metrics, real-time check-in telemetry, revenue forecasting, trainer scheduling, and workout class analytics.',
        images: ['/work/dashboard/gym-dashbord-design-1.png']
      }
    ],
    'Mobile App': [
      {
        id: 'learnly-app-design-1',
        title: 'Learnly — Mobile App Design',
        tagline: 'Video Course App • Home, Course & Plans',
        category: 'Mobile App',
        image: '/work/mobile-apps/Learnly-app-design-1.png',
        figmaLayout: '/work/mobile-apps/Learnly-app-design-1.png',
        layoutName: 'Learnly-app-design-1',
        layoutDimensions: '1366 × 814px',
        cardBg: '#94b3f3',
        tech: ['Figma', 'UI/UX Design', 'iOS Design System', 'React Native', 'Mobile App'],
        description: 'Ultra-modern video course learning application crafted in Figma. Features a student learning dashboard with active masterclass progress tracking, structured video lessons, and conversion-optimized multi-tier subscription plans (Free, Pro, Team).',
        images: ['/work/mobile-apps/Learnly-app-design-1.png']
      }
    ],
    'Landing Page': [
      {
        id: 'lp-layout-1',
        title: 'Modern Luxury Estates (Layout 1)',
        shortTitle: 'Layout 01 — Modern Living',
        tagline: 'High-Converting Real Estate Portal • HTML5 & CSS3',
        category: 'Landing Page',
        image: '/landing-pages/layout-1/images/1.jpg',
        figmaLayout: '/landing-pages/layout-1/images/1.jpg',
        layoutName: 'layout-1-modern-living',
        liveUrl: '/landing-pages/layout-1/index.html',
        cardBg: '#94b3f3',
        tech: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
        description: 'High-converting modern real estate landing page featuring responsive property showcase grids, interactive enquiry forms, amenity galleries, and mobile-optimized layouts.',
        images: ['/landing-pages/layout-1/images/1.jpg']
      },
      {
        id: 'lp-layout-2',
        title: 'Horizon Residences (Layout 2)',
        shortTitle: 'Layout 02 — Horizon Living',
        tagline: 'Architectural Enclave & Floorplan Showcase • Bootstrap UI',
        category: 'Landing Page',
        image: '/landing-pages/layout-2/images/s/7.jpg',
        figmaLayout: '/landing-pages/layout-2/images/s/7.jpg',
        layoutName: 'layout-2-horizon-living',
        liveUrl: '/landing-pages/layout-2/index.html',
        cardBg: '#9abaf5',
        tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'Responsive'],
        description: 'Elegant architectural landing page with instant WhatsApp connect, detailed 2D/3D floorplans, neighborhood connectivity maps, and fast-loading image carousels.',
        images: ['/landing-pages/layout-2/images/s/7.jpg']
      },
      {
        id: 'lp-layout-3',
        title: 'Urban Oasis Residences (Layout 3)',
        shortTitle: 'Layout 03 — Urban Oasis',
        tagline: 'Multi-Page Real Estate Portal • Blogs & Location Maps',
        category: 'Landing Page',
        image: '/landing-pages/layout-3/images/slider/3.jpg',
        figmaLayout: '/landing-pages/layout-3/images/slider/3.jpg',
        layoutName: 'layout-3-urban-oasis',
        liveUrl: '/landing-pages/layout-3/index.html',
        cardBg: '#8eaef0',
        tech: ['HTML5', 'CSS3', 'Bootstrap', 'Responsive'],
        description: 'Comprehensive multi-page residential portal featuring dedicated about, blog, amenities, floor plans, and lead capture inquiry forms with modern typography.',
        images: ['/landing-pages/layout-3/images/slider/3.jpg']
      },
      {
        id: 'lp-layout-4',
        title: 'Skyline Towers (Layout 4)',
        shortTitle: 'Layout 04 — Skyline Towers',
        tagline: 'Lead Capture Campaign • Interactive Amenities & Plans',
        category: 'Landing Page',
        image: '/landing-pages/layout-4/images/s/s5.jpg',
        figmaLayout: '/landing-pages/layout-4/images/s/s5.jpg',
        layoutName: 'layout-4-skyline-towers',
        liveUrl: '/landing-pages/layout-4/index.html',
        cardBg: '#94b3f3',
        tech: ['HTML5', 'CSS3', 'Bootstrap', 'Lead Gen'],
        description: 'Strategic lead-generation landing page built with Bootstrap, featuring dynamic hero sliders, instant price quote requests, interactive amenity cards, and downloadable brochures.',
        images: ['/landing-pages/layout-4/images/s/s5.jpg']
      },
      {
        id: 'lp-layout-5',
        title: 'Supertech Brilliant (Layout 5)',
        shortTitle: 'Layout 05 — Supertech Brilliant',
        tagline: 'Commercial & Premium Residential Hub • Sector 140',
        category: 'Landing Page',
        image: '/landing-pages/layout-5/images/slider-1.jpg',
        figmaLayout: '/landing-pages/layout-5/images/slider-1.jpg',
        layoutName: 'layout-5-supertech-brilliant',
        liveUrl: '/landing-pages/layout-5/index.html',
        cardBg: '#9abaf5',
        tech: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
        description: 'Corporate commercial hub landing page showcasing office towers, retail boulevards, connectivity highlights, construction milestones, and lead capture forms.',
        images: ['/landing-pages/layout-5/images/slider-1.jpg']
      },
      {
        id: 'lp-layout-6',
        title: 'Elite Heights Real Estate (Layout 6)',
        shortTitle: 'Layout 06 — Elite Heights',
        tagline: 'Luxury Apartments & Masterplan Showcase • Bootstrap',
        category: 'Landing Page',
        image: '/landing-pages/layout-6/images/slider-banner/slider-img-1.jpg',
        figmaLayout: '/landing-pages/layout-6/images/slider-banner/slider-img-1.jpg',
        layoutName: 'layout-6-elite-heights',
        liveUrl: '/landing-pages/layout-6/index.html',
        cardBg: '#88a9ee',
        tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'Responsive'],
        description: 'Sleek luxury apartment showcase page featuring interactive master layout plans, unit configurations, price list modal triggers, and developer credentials.',
        images: ['/landing-pages/layout-6/images/slider-banner/slider-img-1.jpg']
      },
      {
        id: 'lp-layout-7',
        title: 'Aura Premier Residences (Layout 7)',
        shortTitle: 'Layout 07 — Aura Premier',
        tagline: 'Neighborhood & Lifestyle Showcase • HTML5 & CSS3',
        category: 'Landing Page',
        image: '/landing-pages/layout-7/images/slider-image/slider-img-4.jpg',
        figmaLayout: '/landing-pages/layout-7/images/slider-image/slider-img-4.jpg',
        layoutName: 'layout-7-aura-premier',
        liveUrl: '/landing-pages/layout-7/index.html',
        cardBg: '#94b3f3',
        tech: ['HTML5', 'CSS3', 'Bootstrap', 'CSS Grid'],
        description: 'Vibrant residential lifestyle landing page featuring animated hero slider, smart amenity icons, floorplan tabs, location advantages, and callback request triggers.',
        images: ['/landing-pages/layout-7/images/slider-image/slider-img-4.jpg']
      },
      {
        id: 'lp-layout-8',
        title: 'Skytech Colours Avenue (Layout 8)',
        shortTitle: 'Layout 08 — Skytech Colours',
        tagline: '2 & 3 BHK Apartments • Greater Noida West',
        category: 'Landing Page',
        image: '/landing-pages/layout-8/images/slider-banner/slider-img-1.PNG',
        figmaLayout: '/landing-pages/layout-8/images/slider-banner/slider-img-1.PNG',
        layoutName: 'layout-8-skytech-colours',
        liveUrl: '/landing-pages/layout-8/index.html',
        cardBg: '#8eaef0',
        tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'Lead Gen'],
        description: 'Prime residential enclave page for 2 & 3 BHK apartments in Greater Noida West with 360-degree virtual tour access, master plans, pricing slabs, and instant chat.',
        images: ['/landing-pages/layout-8/images/slider-banner/slider-img-1.PNG']
      },
      {
        id: 'lp-layout-9',
        title: 'FairFox Eon Commercial Hub (Layout 9)',
        shortTitle: 'Layout 09 — FairFox Eon',
        tagline: 'Premium Retail & Office Spaces • Sector 140A Noida',
        category: 'Landing Page',
        image: '/landing-pages/layout-9/images/about-us-01.jpg',
        figmaLayout: '/landing-pages/layout-9/images/about-us-01.jpg',
        layoutName: 'layout-9-fairfox-eon',
        liveUrl: '/landing-pages/layout-9/index.html',
        cardBg: '#94b3f3',
        tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'Commercial'],
        description: 'State-of-the-art commercial and IT/ITeS hub landing page in Sector 140A Noida, showcasing lockable office spaces, high-street retail, green building specs, and investment ROI.',
        images: ['/landing-pages/layout-9/images/about-us-01.jpg']
      }
    ]
  };

  const currentCategoryProjects = allProjects[activeCategory] || allProjects.Website;
  const currentProjects = currentCategoryProjects.slice(0, visibleCount);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(cat === 'Landing Page' ? 9 : 3);
    gsap.fromTo(
      '.work-card',
      { opacity: 0, y: 25, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
    );
  };

  const handleExploreMore = () => {
    const nextCount = visibleCount + 3;
    setVisibleCount(nextCount);
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
      {/* Radial glow background aura */}
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
        
        {/* Section Heading */}
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

        {/* Landing Page: Pure Text Link Section (No Boxes) */}
        {activeCategory === 'Landing Page' ? (
          <div className="py-4 sm:py-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase block mb-1.5">
                9 Live HTML5 &amp; Bootstrap Templates
              </span>
              <p className="text-xs sm:text-sm text-zinc-400">
                Click any link below to open the live template in a new tab
              </p>
            </div>

            {/* 9 Text Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {allProjects['Landing Page'].map((lp, idx) => (
                <a
                  key={lp.liveUrl}
                  href={lp.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 py-2 text-zinc-300 hover:text-white transition-colors duration-200"
                >
                  <span className="font-mono text-xs font-bold text-blue-400 group-hover:text-blue-300 flex-shrink-0">
                    0{idx + 1}.
                  </span>
                  <span className="text-sm font-semibold underline decoration-zinc-600 hover:decoration-blue-400 underline-offset-4 truncate">
                    {lp.shortTitle}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Project Showcase Cards Grid: centered if only 1 project, 2/3 cols if multiple */}
            <div className={`grid gap-6 sm:gap-8 ${
              currentProjects.length === 1 
                ? 'grid-cols-1 max-w-xl mx-auto' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {currentProjects.map((project, idx) => {
                const isNewlyRevealed = idx >= visibleCount - 3 && visibleCount > 3;
                const hasMultipleScreens = project.images && project.images.length > 1;

                return (
                  <div
                    key={project.id}
                    className={`work-card ${isNewlyRevealed ? 'work-card-new' : ''} group relative flex flex-col rounded-3xl overflow-hidden bg-black border border-white/10 hover:border-[#0033FF]/60 transition-all duration-500 shadow-none hover:shadow-[0_15px_40px_rgba(0,51,255,0.25)] hover:-translate-y-1.5`}
                  >
                    {/* Top Colored Showcase Canvas */}
                    <div 
                      className="relative w-full aspect-[4/3] flex items-center justify-center p-6 overflow-hidden rounded-t-3xl transition-transform duration-500 group-hover:brightness-105"
                      style={{ backgroundColor: project.cardBg }}
                    >
                      {/* Floating Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                        {project.figmaLayout ? (
                          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold text-purple-300 shadow-lg flex items-center gap-1">
                            <FigmaIcon className="w-3 h-3" />
                            Full Layout
                          </span>
                        ) : <span />}

                        {hasMultipleScreens && (
                          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-blue-300 shadow-lg flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            {project.images.length} Screens
                          </span>
                        )}
                      </div>

                      {/* Device Mockup with 3D Float Hover */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] transform group-hover:scale-105 transition-transform duration-500"
                      />

                      <button 
                        onClick={() => onSelectProject(project)}
                        className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                        aria-label={`View ${project.title}`}
                      >
                        <span className="px-4 py-2 rounded-full bg-black/85 border border-white/20 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Eye className="w-3.5 h-3.5" />
                          Quick Preview
                        </span>
                      </button>
                    </div>

                    {/* Bottom Project Info Bar */}
                    <div className="p-5 sm:p-6 bg-black flex items-center justify-between gap-4 transition-colors">
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-blue-200 transition-colors truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                          {project.tagline}
                        </p>
                      </div>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-black hover:bg-[#001D8F] border border-white/20 hover:border-[#0033FF] transition-all duration-300 shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer flex-shrink-0"
                      >
                        <span>View Work</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Explore More Button: Only show if there are more than 3 projects */}
            {currentCategoryProjects.length > 3 && (
              visibleCount < currentCategoryProjects.length ? (
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
              )
            )}
          </>
        )}

      </div>
    </section>
  );
}
