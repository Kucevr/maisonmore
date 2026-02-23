import { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { RevealText } from '../components/ui/RevealText';
import { projectsData } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, imageClassName = "aspect-[4/3]" }: { project: typeof projectsData[0], imageClassName?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    setMousePos({ x, y });

    // Divide the width into equal segments based on number of images
    const segmentWidth = width / project.images.length;
    const index = Math.min(
      Math.max(Math.floor(x / segmentWidth), 0),
      project.images.length - 1
    );
    
    setCurrentImageIndex(index);
  };

  return (
    <div 
      ref={cardRef}
      className="flex flex-col gap-4 cursor-pointer group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsImageHovered(false);
        setCurrentImageIndex(0);
      }}
      onMouseMove={handleMouseMove}
    >
      <Link 
        to={`/work/${project.slug}`} 
        className={`w-full overflow-hidden relative bg-gray-100 block ${imageClassName}`}
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <img 
          src={project.images[0]} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </Link>

      {/* Floating image following cursor */}
      {isImageHovered && (
        <div 
          className="absolute pointer-events-none z-50 w-32 h-32 overflow-hidden shadow-2xl transition-transform duration-75 ease-out"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <img 
            src={project.images[(currentImageIndex + 1) % project.images.length]} 
            className="w-full h-full object-cover" 
            alt="" 
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="flex justify-between items-center text-sm font-medium overflow-hidden h-6 relative mt-2">
        <div className="font-bold">{project.title}</div>
        
        <div className="flex flex-col items-end transition-transform duration-300 absolute right-0 top-0" style={{ transform: isHovered ? 'translateY(-50%)' : 'translateY(0)' }}>
          <div className="flex gap-10 h-6 items-center text-gray-400">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <Link to={`/work/${project.slug}`} className="flex items-center gap-2 h-6 text-black hover:opacity-70 transition-opacity">
            <span>Open project</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const WorkPage = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFilterHovered, setIsFilterHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All Work');

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Work': projectsData.length };
    projectsData.forEach(project => {
      counts[project.category] = (counts[project.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Work') return projectsData;
    return projectsData.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    // 1. Initial refresh to catch initial layout
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Button stops being fixed at the end of the page (before footer)
      ScrollTrigger.create({
        trigger: '#work-content',
        start: 'top top',
        end: 'bottom bottom',
        onEnterBack: () => {
          if (buttonRef.current) {
            buttonRef.current.style.position = 'fixed';
            buttonRef.current.style.bottom = window.innerWidth < 768 ? '1rem' : '2rem';
          }
        },
        onLeave: () => {
          if (buttonRef.current) {
            buttonRef.current.style.position = 'absolute';
            buttonRef.current.style.bottom = window.innerWidth < 768 ? '1rem' : '4rem';
          }
        }
      });
    });

    return () => ctx.revert();
  }, [filteredProjects]); // Refresh when list changes

  // Close filters on scroll
  useEffect(() => {
    // Refresh ScrollTrigger after filter animation completes to fix footer position
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 750); // slightly longer than the 700ms transition

    if (!isFiltersOpen) {
      return () => clearTimeout(timeoutId);
    }

    const handleScroll = () => {
      setIsFiltersOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isFiltersOpen]);

  return (
    <div id="work-content" className="min-h-screen bg-white text-black pt-32 px-6 md:px-12 pb-24 relative">
      <div className="flex justify-between items-end mb-16 relative z-50">
        <h1 className="text-[6vw] font-bold tracking-tighter leading-none">
          <RevealText>{activeCategory}</RevealText> <sup className="text-[2vw] font-medium">({categoryCounts[activeCategory].toString().padStart(2, '0')})</sup>
        </h1>
        
        <button 
          className="text-[4vw] font-medium text-gray-300 hover:text-black transition-colors leading-none flex items-center gap-4"
          onMouseEnter={() => setIsFilterHovered(true)}
          onMouseLeave={() => setIsFilterHovered(false)}
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <div className="relative h-[1.2em] overflow-hidden flex items-center px-2">
            <div className={`transition-transform duration-500 ease-out absolute left-1 ${isFiltersOpen ? '-translate-y-full' : 'translate-y-0'}`}>
              Filters
            </div>
            <div className={`transition-transform duration-500 ease-out ${isFiltersOpen ? 'translate-y-0' : 'translate-y-full'}`}>
              Close
            </div>
          </div>
          <div 
            className="flex items-center justify-center transition-all duration-500 ease-out"
            style={{ 
              width: isFilterHovered || isFiltersOpen ? '1em' : '0px',
              opacity: isFilterHovered || isFiltersOpen ? 1 : 0,
              transform: `rotate(${isFiltersOpen ? '45deg' : '0deg'})`
            }}
          >
            +
          </div>
        </button>
      </div>

      {/* Accordion Filters */}
      <div 
        className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ maxHeight: isFiltersOpen ? '500px' : '0px', opacity: isFiltersOpen ? 1 : 0, marginBottom: isFiltersOpen ? '4rem' : '0' }}
      >
        <div className="text-[4vw] md:text-[3vw] font-medium leading-tight tracking-tighter text-gray-300 flex flex-wrap gap-x-4 gap-y-2">
          {Object.entries(categoryCounts).map(([category, count], index) => (
            <span key={category} className="flex items-center">
              <button 
                onClick={() => {
                  setActiveCategory(category);
                  setIsFiltersOpen(false);
                }}
                className={`hover:text-black transition-colors ${activeCategory === category ? 'text-black' : ''}`}
              >
                {category} <sup className="text-[1.5vw] md:text-[1vw]">({count.toString().padStart(2, '0')})</sup>
              </button>
              {index < Object.entries(categoryCounts).length - 1 && <span className="ml-4">/</span>}
            </span>
          ))}
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="flex flex-col gap-y-16">
          {Array.from({ length: Math.ceil(filteredProjects.length / 6) }).map((_, iteration) => {
            const startIndex = iteration * 6;
            const isLeftSmaller = iteration % 2 !== 0; // Iteration 0: right smaller, Iteration 1: left smaller, Iteration 2: right smaller
            
            return (
              <div key={iteration} className="flex flex-col gap-y-16">
                {/* Row 1: 2 projects */}
                {filteredProjects[startIndex] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div className="flex flex-col justify-start">
                      <ProjectCard 
                        project={filteredProjects[startIndex]} 
                        imageClassName={isLeftSmaller ? "aspect-[2/1]" : "aspect-[4/3]"} 
                      />
                    </div>
                    {filteredProjects[startIndex + 1] && (
                      <div className="flex flex-col justify-start">
                        <ProjectCard 
                          project={filteredProjects[startIndex + 1]} 
                          imageClassName={!isLeftSmaller ? "aspect-[2/1]" : "aspect-[4/3]"} 
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Row 2: 3 projects */}
                {filteredProjects[startIndex + 2] && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                    <ProjectCard project={filteredProjects[startIndex + 2]} />
                    {filteredProjects[startIndex + 3] && <ProjectCard project={filteredProjects[startIndex + 3]} />}
                    {filteredProjects[startIndex + 4] && <ProjectCard project={filteredProjects[startIndex + 4]} />}
                  </div>
                )}

                {/* Row 3: 1 project */}
                {filteredProjects[startIndex + 5] && (
                  <div className="grid grid-cols-1">
                    <ProjectCard project={filteredProjects[startIndex + 5]} imageClassName="aspect-[21/9]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-y-8">
          {filteredProjects.map(project => (
            <Link to={`/work/${project.slug}`} key={project.id} className="flex items-center justify-between border-b border-gray-200 pb-8 group cursor-pointer hover:opacity-70 transition-opacity">
              <div className="text-4xl font-medium group-hover:translate-x-4 transition-transform">{project.title}</div>
              <div className="flex gap-12 text-gray-500">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Floating View Toggle */}
      <div ref={buttonRef} className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-40 bg-black text-white px-6 py-3 rounded-full flex items-center gap-6 text-sm font-medium shadow-lg">
        <button onClick={() => setViewMode('grid')} className={`flex items-center gap-2 transition-opacity ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
          <span className="grid grid-cols-2 gap-[2px]">
            <div className="w-1.5 h-1.5 bg-white"></div>
            <div className="w-1.5 h-1.5 bg-white"></div>
            <div className="w-1.5 h-1.5 bg-white"></div>
            <div className="w-1.5 h-1.5 bg-white"></div>
          </span>
          Grid view
        </button>
        <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 transition-opacity ${viewMode === 'list' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
          <span className="flex flex-col gap-[2px]">
            <div className="w-3 h-[2px] bg-white"></div>
            <div className="w-3 h-[2px] bg-white"></div>
          </span>
          List view
        </button>
      </div>
    </div>
  );
};
