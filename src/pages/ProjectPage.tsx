import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealText } from '../components/ui/RevealText';
import { projectsData } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const ProjectPage = () => {
  const { slug } = useParams();
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const projectIndex = projectsData.findIndex(p => p.slug === slug);
  const projectData = projectsData[projectIndex];

  if (!projectData) {
    return <Navigate to="/work" replace />;
  }

  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Button stops being fixed at the end of the page (before footer)
      ScrollTrigger.create({
        trigger: '#project-content',
        start: 'top top',
        end: 'bottom bottom',
        onEnterBack: () => {
          if (buttonRef.current) {
            buttonRef.current.style.position = 'fixed';
            buttonRef.current.style.bottom = '2rem';
          }
        },
        onLeave: () => {
          if (buttonRef.current) {
            buttonRef.current.style.position = 'absolute';
            buttonRef.current.style.bottom = '2rem';
          }
        }
      });
    });

    return () => ctx.revert();
  }, [slug]);

  return (
    <div id="project-content" className="min-h-screen bg-white text-black pt-32 pb-24 relative">
      {/* Hero Section */}
      <div className="px-6 md:px-12 mb-12">
        <h1 className="text-[8vw] font-bold tracking-tighter leading-none mb-16">
          <RevealText>{projectData.title}</RevealText>
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-medium mb-8">
          <div>
            <span className="text-gray-400">Client</span> <span className="text-black ml-2">{projectData.client}</span>
          </div>
          <div>
            <span className="text-gray-400">Typology</span> <span className="text-black ml-2">{projectData.typology}</span>
          </div>
          <div>
            <span className="text-gray-400">Year</span> <span className="text-black ml-2">{projectData.year}</span>
          </div>
          <div>
            <span className="text-gray-400">Status</span> <span className="text-black ml-2">{projectData.status}</span>
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 mb-32">
        <div className="w-full aspect-[16/9] overflow-hidden bg-gray-100">
          <img src={projectData.heroImage} alt={projectData.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Project Details */}
      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
        <div className="md:col-span-4 text-sm font-medium text-gray-400">
          01 <span className="text-black ml-4">PROJECT DETAILS</span>
        </div>
        <div className="md:col-span-8 md:col-start-6">
          <p className="text-2xl md:text-3xl font-medium leading-tight mb-16 tracking-tight">
            {projectData.details.description}
          </p>
          
          <div className="flex flex-col gap-6 border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-200 pb-6">
              <div className="font-medium">Country</div>
              <div>{projectData.details.country}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-200 pb-6">
              <div className="font-medium">Construction</div>
              <div>{projectData.details.construction}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-200 pb-6">
              <div className="font-medium">Discipline</div>
              <div>{projectData.details.discipline}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="px-6 md:px-12 mb-32">
        <h2 className="text-[5vw] font-medium leading-tight tracking-tight max-w-5xl">
          {projectData.quote}
        </h2>
      </div>

      {/* About 1 */}
      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
        <div className="md:col-span-4 text-sm font-medium text-gray-400">
          02 <span className="text-black ml-4">ABOUT THE PROJECT</span>
        </div>
        <div className="md:col-span-8 md:col-start-6">
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            {projectData.about1}
          </p>
        </div>
      </div>

      {/* Image 2 */}
      <div className="w-full px-6 md:px-12 mb-32">
        <div className="w-full aspect-[21/9] overflow-hidden bg-gray-100">
          <img src={projectData.image2} alt="Project view" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* About 2 */}
      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
        <div className="md:col-span-4 text-sm font-medium text-gray-400">
          03 <span className="text-black ml-4">ABOUT THE PROJECT</span>
        </div>
        <div className="md:col-span-8 md:col-start-6">
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            {projectData.about2}
          </p>
        </div>
      </div>

      {/* Next Project */}
      <div className="flex justify-center items-center px-6 md:px-12 mt-32">
        <Link to={`/work/${nextProject.slug}`} className="group flex items-center bg-black text-white rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-20 overflow-hidden">
            <img src={nextProject.images[0]} alt={nextProject.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="px-6 py-3">
            <div className="font-bold text-lg">{nextProject.title}</div>
            <div className="text-sm text-gray-400">Go to next project</div>
          </div>
        </Link>
      </div>

      {/* Floating Back Button */}
      <Link 
        ref={buttonRef}
        to="/work" 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 text-sm font-medium shadow-lg hover:scale-105 transition-transform"
      >
        <span>&lt;</span> Back to all works
      </Link>
    </div>
  );
};
