import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const cities = ['Belarus', 'Russia', 'France', 'Italy', 'Germany', 'Poland', 'USA', 'Kazakhstan'];

export const StudioFloatingButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = gsap.timeline();
      tl.to(textRef.current, { y: -20, opacity: 0, duration: 0.2, ease: 'power2.in' })
        .call(() => setCurrentCityIndex((prev) => (prev + 1) % cities.length))
        .set(textRef.current, { y: 20 })
        .to(textRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Show button after Hero
      ScrollTrigger.create({
        trigger: '#studio-quote-section',
        start: 'top center',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(buttonRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
        },
        onLeaveBack: () => {
          gsap.to(buttonRef.current, { y: 50, opacity: 0, duration: 0.5, ease: 'power3.in' });
        }
      });

      // Button stops being fixed at the end of Jobs
      ScrollTrigger.create({
        trigger: '#studio-jobs-section',
        start: 'top center',
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
            buttonRef.current.style.bottom = window.innerWidth < 768 ? '2rem' : '4rem';
          }
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={buttonRef}
      className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-40 opacity-0 translate-y-[50px]"
    >
      <Link 
        to="/contact"
        className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 hover:scale-105 transition-transform duration-300 shadow-lg"
      >
        <div className="w-4 h-4 grid grid-cols-2 gap-[2px]">
          <div className="bg-white rounded-sm"></div>
          <div className="bg-white rounded-sm"></div>
          <div className="bg-white rounded-sm"></div>
          <div className="bg-white rounded-sm"></div>
        </div>
        <span className="text-sm font-medium flex items-center gap-1">
          <span className="hidden sm:inline">Let's work together in</span>
          <span className="sm:hidden">Work in</span>
          <span className="overflow-hidden h-5 relative w-[80px] sm:w-[110px] inline-block">
            <span 
              ref={textRef}
              className="absolute left-0 top-0 whitespace-nowrap"
            >
              {cities[currentCityIndex]}
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
};
