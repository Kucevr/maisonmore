import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { 
          opacity: 0, 
          y: 30,
          visibility: "hidden" 
        },
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.8,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 98%", 
            once: true,
            // When using ScrollTrigger on a fromTo, it handles the initial state well
          }
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <span 
      ref={elRef} 
      className={`inline-block ${className}`}
      style={{ visibility: "hidden" }} // Prevent flash
    >
      {children}
    </span>
  );
};
