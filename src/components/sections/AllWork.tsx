import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const AllWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

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
      // Parallax for all images
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        const speed = 0.3 + (i % 5) * 0.15; // Adjusted for mobile and desktop
        gsap.to(img, {
          y: -window.innerHeight * speed,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="all-work-section" ref={containerRef} className="relative h-[200vh] md:h-[240vh] w-full bg-white overflow-hidden">
      {/* Pinned "All Work" Button */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-20 pointer-events-none">
        <Link 
          to="/work" 
          className="relative text-[12vw] md:text-[8vw] font-bold tracking-tighter text-black pointer-events-auto transition-opacity flex items-start group"
        >
          <span className="relative pb-1 md:pb-2 leading-none">
            All Work
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </span>
          <sup className="text-[5vw] md:text-[3vw] font-medium ml-1 md:ml-2 mt-2 md:mt-4">({projectsData.length})</sup>
        </Link>
      </div>

      {/* Floating Images Collage */}
      {collageImages.map((src, i) => {
        const imageSettings = [
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
          { pos: "top-[175vh] left-[5%] w-[15vw] h-[25vh]", opacity: 1, scale: 1 },
          { pos: "top-[240vh] right-[40%] w-[28vw] h-[40vh]", opacity: 0.8, scale: 1.1 },
          { pos: "top-[205vh] left-[25%] w-[22vw] h-[32vh]", opacity: 0.8, scale: 0.9 },
        ];
        
        const setting = imageSettings[i % imageSettings.length];
        
        return (
          <img 
            key={i}
            ref={el => { if (el) imagesRef.current[i] = el; }} 
            src={src} 
            className={`absolute ${setting.pos} object-cover grayscale-[20%] will-change-transform`} 
            style={{ 
              opacity: setting.opacity,
              transform: `scale(${setting.scale})`
            }}
            alt={`Work ${i + 1}`} 
          />
        );
      })}
    </section>
  );
};
