import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { ...projectsData.find(p => p.title === 'Loller') },
  { ...projectsData.find(p => p.title === 'Penthouse Vivace') },
  { ...projectsData.find(p => p.title === 'Southbank Tower') },
].filter(p => p.id) as typeof projectsData;

export const SelectedWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      // Desktop
      isDesktop: "(min-width: 768px)",
      // Mobile
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isMobile } = context.conditions as any;

      projectRefs.current.forEach((el) => {
        if (!el) return;
        const titleContainer = el.querySelector('.project-title-container') as HTMLElement;
        const imgContainer = el.querySelector('.project-img-container');
        const img = el.querySelector('.project-img');
        const bottomInfo = el.querySelector('.project-bottom-info');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            scrub: 1.5,
          }
        });

        const initialWidth = titleContainer.offsetWidth;
        tl.fromTo(titleContainer, 
          { width: initialWidth },
          { width: isMobile ? '90vw' : '95vw', ease: 'power3.inOut' }, 
        0);

        // Responsive image dimensions
        tl.fromTo(imgContainer, 
          { 
            width: isMobile ? '80vw' : '40vw', 
            height: isMobile ? '40vh' : '50vh' 
          }, 
          { 
            width: isMobile ? '95vw' : '70vw', 
            height: isMobile ? '50vh' : '70vh', 
            ease: 'power3.inOut' 
          }, 
        0);

        tl.fromTo(img,
          { scale: 1.2 },
          { scale: 1, ease: 'power3.inOut' },
        0);

        // 3. Bottom info fades in
        tl.fromTo(bottomInfo, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, ease: 'power3.inOut' }, 
        0.2);

        // Reverse the animation as we scroll past the center
        tl.to(titleContainer, { 
          width: initialWidth, 
          ease: 'power3.inOut' 
        }, 0.6);
        
        tl.to(imgContainer, { 
          width: isMobile ? '80vw' : '40vw', 
          height: isMobile ? '40vh' : '50vh', 
          ease: 'power3.inOut' 
        }, 0.6);
        
        tl.to(img, { scale: 1.2, ease: 'power3.inOut' }, 0.6);
        tl.to(bottomInfo, { opacity: 0, y: -20, ease: 'power3.inOut' }, 0.6);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="selected-works-section" ref={containerRef} className="w-full bg-white flex flex-col relative z-10 py-10">
      {projects.map((project, index) => (
        <div 
          key={project.id} 
          id={`project-${project.id}`}
          ref={el => { if (el) projectRefs.current[index] = el; }} 
          className="h-[100vh] md:h-[110vh] w-full flex flex-col items-center justify-center relative py-10 md:py-20"
        >
          
          {/* Title and Brackets Container - Above the image */}
          <div className="project-title-container relative flex items-center justify-between z-20 text-black mb-8 md:mb-12" style={{ width: 'max-content' }}>
            <span className="bracket-left text-[10vw] md:text-[8vw] font-light leading-none">[</span>
            <span className="project-title-text text-[10vw] md:text-[8vw] font-medium leading-none tracking-tighter whitespace-nowrap px-2 md:px-4">{project.title}</span>
            <span className="bracket-right text-[10vw] md:text-[8vw] font-light leading-none">]</span>
          </div>

          {/* Image Container */}
          <div className="project-img-container w-[80vw] md:w-[40vw] h-[40vh] md:h-[50vh] relative z-10 overflow-hidden shadow-lg">
            <img src={project.heroImage} alt={project.title} className="project-img w-full h-full object-cover" />
          </div>

          {/* Bottom Info (Category Left, Year Right) */}
          <div className="project-bottom-info w-[90vw] md:w-[70vw] flex justify-between text-xs md:text-sm font-medium text-black z-20 opacity-0 mt-6 md:mt-8">
            <div className="font-medium">{project.category}</div>
            <div>{project.year}</div>
          </div>

        </div>
      ))}
    </section>
  );
};
