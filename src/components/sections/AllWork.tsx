import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OptimizedImage } from '../ui/OptimizedImage';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const AllWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Select a mix of project photos for the collage
  const collageImages = [
    projectsData.find(p => p.title === 'Armadale Office')?.heroImage,
    projectsData.find(p => p.title === 'Caulfield North')?.heroImage,
    projectsData.find(p => p.title === 'Penthouse Vivace')?.heroImage,
    projectsData.find(p => p.title === 'Southbank Tower')?.heroImage,
    projectsData.find(p => p.title === 'Parlington')?.heroImage,
    projectsData.find(p => p.title === 'Loller')?.heroImage,
    projectsData.find(p => p.title === 'Half Courtyard House')?.heroImage,
    projectsData.find(p => p.title === 'Italian Club Apartments')?.heroImage,
    projectsData.find(p => p.title === 'Cobram Community Centre')?.heroImage,
    projectsData.find(p => p.title === 'Fitzroy North Residence')?.heroImage,
    projectsData.find(p => p.title === 'Richmond Loft')?.heroImage,
    projectsData.find(p => p.title === 'St Kilda Pavilion')?.heroImage,
    projectsData.find(p => p.title === 'Kew Woods House')?.heroImage,
    projectsData.find(p => p.title === 'Hawthorn Office')?.heroImage,
    projectsData.find(p => p.title === 'Elwood Apartment')?.heroImage,
  ].filter(Boolean) as string[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const imgElements = containerRef.current?.querySelectorAll('.collage-item');
      
      if (imgElements) {
        imgElements.forEach((el, i) => {
          // Adjust speed for mobile to be more subtle but still visible
          const speed = isMobile 
            ? 0.15 + (i % 3) * 0.1 
            : 0.3 + (i % 5) * 0.15;
            
          gsap.to(el, {
            y: -window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: isMobile ? 0.8 : 1.5,
            }
          });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="all-work-section" ref={containerRef} className="relative h-[220vh] md:h-[240vh] w-full bg-white overflow-hidden">
      {/* Pinned "All Work" Button */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-20 pointer-events-none">
        <Link 
          to="/work" 
          className="relative text-[16vw] md:text-[8vw] font-bold tracking-tighter text-black pointer-events-auto transition-opacity flex items-start group bg-white/50 backdrop-blur-sm md:bg-transparent p-4 rounded-full"
        >
          <span className="relative pb-1 md:pb-2 leading-none">
            All Work
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </span>
          <sup className="text-[6vw] md:text-[3vw] font-medium ml-1 md:ml-2 mt-2 md:mt-4">({projectsData.length})</sup>
        </Link>
      </div>

      {/* Floating Images Collage - Mobile optimized "flying" layout, Desktop complex */}
      {collageImages.map((src, i) => {
        const desktopSettings = [
          { pos: "top-[10vh] left-[5%] w-[20vw] h-[30vh]", opacity: 0.9, scale: 0.8 },
          { pos: "top-[25vh] right-[5%] w-[25vw] h-[40vh]", opacity: 0.9, scale: 1.1 },
          { pos: "top-[40vh] left-[25%] w-[15vw] h-[25vh]", opacity: 0.7, scale: 0.9 },
          { pos: "top-[80vh] right-[20%] w-[18vw] h-[28vh]", opacity: 0.9, scale: 1.2 },
          { pos: "top-[85vh] left-[8%] w-[22vw] h-[35vh]", opacity: 0.9, scale: 1.5 },
          { pos: "top-[105vh] right-[20%] w-[20vw] h-[30vh]", opacity: 0.9, scale: 1.15 },
          { pos: "top-[100vh] left-[25%] w-[26vw] h-[38vh]", opacity: 1, scale: 0.75 },
          { pos: "top-[135vh] right-[5%] w-[18vw] h-[26vh]", opacity: 0.8, scale: 1.05 },
          { pos: "top-[150vh] left-[10%] w-[24vw] h-[36vh]", opacity: 0.6, scale: 0.95 },
          { pos: "top-[185vh] right-[25%] w-[22vw] h-[32vh]", opacity: 1, scale: 1.1 },
          { pos: "top-[175vh] left-[5%] w-[20vw] h-[28vh]", opacity: 0.9, scale: 0.9 },
          { pos: "top-[180vh] right-[10%] w-[24vw] h-[34vh]", opacity: 0.9, scale: 1.2 },
          { pos: "top-[200vh] left-[5%] w-[15vw] h-[25vh]", opacity: 1, scale: 1 },
          { pos: "top-[220vh] right-[30%] w-[28vw] h-[40vh]", opacity: 0.8, scale: 1.1 },
          { pos: "top-[210vh] left-[25%] w-[22vw] h-[32vh]", opacity: 0.8, scale: 0.9 },
        ];

        // Flying effect for mobile (staggered and varied)
        const mobileSettings = [
          { pos: "top-[15vh] left-[8%] w-[40vw] h-[25vh]", opacity: 1, scale: 0.9 },
          { pos: "top-[30vh] right-[5%] w-[40vw] h-[28vh]", opacity: 0.9, scale: 1.05 },
          { pos: "top-[55vh] left-[5%] w-[42vw] h-[22vh]", opacity: 0.8, scale: 0.85 },
          { pos: "top-[80vh] right-[5%] w-[50vw] h-[28vh]", opacity: 1, scale: 1.1 },
          { pos: "top-[105vh] left-[10%] w-[45vw] h-[24vh]", opacity: 0.9, scale: 0.95 },
          { pos: "top-[130vh] right-[8%] w-[46vw] h-[26vh]", opacity: 0.95, scale: 1 },
          { pos: "top-[150vh] left-[10%] w-[44vw] h-[25vh]", opacity: 1, scale: 0.9 },
          { pos: "top-[175vh] right-[10%] w-[45vw] h-[24vh]", opacity: 0.85, scale: 1 },
        ];
        
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        
        // Show up to 8 images on mobile for a rich "flying" effect
        if (isMobile && i >= 8) return null;
        
        const settings = isMobile ? mobileSettings : desktopSettings;
        const setting = settings[i % settings.length];
        
        if (!setting) return null;

        return (
          <div
            key={i}
            className={`absolute collage-item ${setting.pos}`}
            style={{ 
              opacity: setting.opacity,
              transform: `scale(${setting.scale})`
            }}
          >
            <OptimizedImage
              src={src} 
              className="w-full h-full object-cover grayscale-[20%] will-change-transform rounded-sm shadow-lg"
              alt={`Work ${i + 1}`} 
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}
    </section>
  );
};
