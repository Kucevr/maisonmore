import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const FloatingButton = () => {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [currentText, setCurrentText] = useState('Studio');
  const [currentId, setCurrentId] = useState<string | number>('about-section');
  const currentTextRef = useRef('Studio');

  useEffect(() => {
    // Initial refresh to ensure all triggers are aligned
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const ctx = gsap.context(() => {
      // 1. Show button after Hero (when About section enters)
      ScrollTrigger.create({
        trigger: '#about-section',
        start: 'top center',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(buttonRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
          updateText('Studio', 'about-section');
        },
        onLeaveBack: () => {
          gsap.to(buttonRef.current, { y: 50, opacity: 0, duration: 0.5, ease: 'power3.in' });
        },
        onEnterBack: () => {
          updateText('Studio', 'about-section');
        }
      });

      // 2. Selected Works
      const selectedProjects = ['Loller', 'Penthouse Vivace', 'Southbank Tower'];
      selectedProjects.forEach((title) => {
        const project = projectsData.find(p => p.title === title);
        if (project) {
          ScrollTrigger.create({
            trigger: `#project-${project.id}`,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => updateText(project.title, project.slug),
            onEnterBack: () => updateText(project.title, project.slug),
          });
        }
      });

      // 3. All Work
      ScrollTrigger.create({
        trigger: '#all-work-section',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => updateText('All Work', 'all-work-section'),
        onEnterBack: () => updateText('All Work', 'all-work-section'),
      });

      // 3.5 Vision
      ScrollTrigger.create({
        trigger: '#vision-section',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => updateText('Vision', 'vision-section'),
        onEnterBack: () => updateText('Vision', 'vision-section'),
      });

      // 4. Method - Button stops being fixed at the end of Method
      ScrollTrigger.create({
        trigger: '#method-section',
        start: 'top center',
        end: 'bottom bottom',
        onEnterBack: () => {
          if (buttonRef.current) {
            buttonRef.current.style.position = 'fixed';
            buttonRef.current.style.bottom = '2rem';
          }
        },
        onLeave: () => {
          // When leaving Method (scrolling down past it), the button should stick to the bottom of the wrapper.
          if (buttonRef.current) {
            buttonRef.current.style.position = 'absolute';
            buttonRef.current.style.bottom = '2rem'; // bottom-8
          }
        }
      });

    });

    return () => {
      ctx.revert();
      clearTimeout(refreshTimeout);
    };
  }, []);

  const updateText = (newText: string, newId: string | number) => {
    if (newText === currentTextRef.current) return;
    
    currentTextRef.current = newText;
    setCurrentId(newId);
    
    // Animate text change (roll up/down)
    const tl = gsap.timeline();
    tl.to(textRef.current, { y: -20, opacity: 0, duration: 0.2, ease: 'power2.in' })
      .call(() => setCurrentText(newText))
      .set(textRef.current, { y: 20 })
      .to(textRef.current, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (currentText === 'Studio') {
      navigate('/studio');
      window.scrollTo(0, 0);
    } else if (currentText === 'Vision') {
      navigate('/process');
      window.scrollTo(0, 0);
    } else if (currentText === 'All Work') {
      navigate('/work');
      window.scrollTo(0, 0);
    } else {
      // Check if it's a project
      const project = projectsData.find(p => p.title === currentText);
      if (project) {
        navigate(`/work/${project.slug}`);
        window.scrollTo(0, 0);
      } else if (typeof currentId === 'string' && currentId.includes('-section')) {
        const element = document.getElementById(currentId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div 
      ref={buttonRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 translate-y-[50px] opacity-0"
      style={{ transition: 'position 0s' }}
    >
      <button 
        onClick={handleClick}
        className="group bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:gap-6 transition-all duration-500 ease-out text-sm font-medium hover:bg-gray-800 overflow-hidden cursor-pointer outline-none border-none"
      >
        <span className="relative inline-block h-[20px] overflow-hidden pointer-events-none">
          <span ref={textRef} className="inline-block">{currentText}</span>
        </span>
        <span className="flex items-center gap-1 pointer-events-none">
          <span className="leading-none mt-[1px]">Discover</span>
          <span className="transition-transform duration-500 ease-out group-hover:rotate-90 group-hover:translate-x-1 leading-none flex items-center justify-center">+</span>
        </span>
      </button>
    </div>
  );
};
