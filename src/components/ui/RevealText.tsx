import { useEffect, useRef, Children, isValidElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const words = container.querySelectorAll('.reveal-word');
      
      if (words.length > 0) {
        gsap.fromTo(words,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.015,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 90%",
              once: true,
            }
          }
        );
      } else {
        const inner = container.querySelector('.reveal-inner');
        if (inner) {
          gsap.fromTo(inner,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 90%",
                once: true,
              }
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  // Helper to check if children is just text
  const isTextOnly = (kids: React.ReactNode): boolean => {
    let textOnly = true;
    Children.forEach(kids, child => {
      if (isValidElement(child)) textOnly = false;
    });
    return textOnly;
  };

  if (isTextOnly(children)) {
    // Safely join and split text
    const text = Children.toArray(children).join('');
    const words = text.split(' ');
    
    return (
      <span ref={containerRef} className={`inline-block ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-flex overflow-hidden align-bottom pb-1 -mb-1">
            <span className="reveal-word inline-block will-change-transform">
              {word}
            </span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    );
  }

  // Fallback for complex children (like spans mixed with text)
  return (
    <span ref={containerRef} className={`inline-block overflow-hidden pb-2 -mb-2 ${className}`}>
      <span className="reveal-inner inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
};
