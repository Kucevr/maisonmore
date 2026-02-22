import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealText } from '../ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

const texts = [
  "Our design aesthetic is established through a consistent process and a detailed concept brief, which considers client needs, site context, and the future occupiers. We combine and test these elements to create a singular design vision concealing many influencing layers. This singular vision, like a piece of artwork, is unique and individual. We believe the principles of design quality should always be present no matter the project brief or building scale.",
  "Innovation is at the core of our methodology. We constantly explore new materials, technologies, and spatial arrangements to push the boundaries of what is possible. By challenging conventional norms, we deliver projects that are not only functional but also forward-thinking and adaptable to future demands.",
  "Enhancing the built environment means creating spaces that resonate with their surroundings and the people who use them. We focus on sustainable practices and community-centric designs that leave a lasting, positive impact on the urban fabric and the natural landscape."
];

export const Vision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const expandBoxRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  const title1 = useRef<HTMLHeadingElement>(null);
  const title2 = useRef<HTMLHeadingElement>(null);
  const title3 = useRef<HTMLHeadingElement>(null);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isMobile } = context.conditions as any;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: true,
        }
      });

      // 1. Expand from responsive size to full
      tl.fromTo(expandBoxRef.current, 
        { 
          width: isMobile ? '85vw' : '40vw', 
          height: isMobile ? '40vh' : '50vh', 
          borderRadius: isMobile ? '10px' : '20px' 
        },
        { width: '100vw', height: '100vh', borderRadius: '0px', ease: 'power2.inOut', duration: 1 }
      );

      // Animate text scale/size along with the box expansion
      tl.fromTo([title1.current, title2.current, title3.current],
        { scale: isMobile ? 0.6 : 0.4, transformOrigin: 'left center' },
        { scale: 1, ease: 'power2.inOut', duration: 1 },
        0 
      );

      // Animate the description text block expansion (only for the first/active one)
      tl.fromTo(descRefs.current[0],
        { scale: 0.5, transformOrigin: 'top right', opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 1 },
        0 // Start at the same time as box expansion
      );

      // 2. Horizontal scroll of titles
      tl.to(textContainerRef.current, {
        xPercent: -66.66,
        ease: 'none',
        duration: 3
      }, 'scroll');

      // 3. Title opacities (active state)
      tl.to(title1.current, { opacity: 0.3, duration: 0.2 }, 'scroll+=0.8');
      tl.to(title2.current, { opacity: 1, duration: 0.2 }, 'scroll+=0.8');
      
      tl.to(title2.current, { opacity: 0.3, duration: 0.2 }, 'scroll+=2.2');
      tl.to(title3.current, { opacity: 1, duration: 0.2 }, 'scroll+=2.2');

      // 4. Description fades
      tl.to(descRefs.current[0], { opacity: 0, duration: 0.2 }, 'scroll+=0.8');
      tl.to(descRefs.current[1], { opacity: 1, duration: 0.2 }, 'scroll+=1.0');
      
      tl.to(descRefs.current[1], { opacity: 0, duration: 0.2 }, 'scroll+=2.2');
      tl.to(descRefs.current[2], { opacity: 1, duration: 0.2 }, 'scroll+=2.4');

    });
    return () => mm.revert();
  }, []);

  return (
    <section id="vision-section" ref={containerRef} className="relative h-screen w-full bg-white overflow-hidden flex items-center justify-center">
      
      <div ref={expandBoxRef} className="relative overflow-hidden bg-black flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-10">
          <img
            src="/assets/fitzroy-north/hero.jpg"
            className="w-full h-full object-cover opacity-50"
            alt="Vision Background"
          />
          <div ref={overlayRef} className="absolute inset-0 bg-black opacity-0"></div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="absolute inset-0 z-20 text-white pointer-events-none">
          <div className="absolute top-[30%] left-0 w-full overflow-hidden">
            <div ref={textContainerRef} className="flex w-[300vw]">
              <div className="w-[100vw] flex items-center justify-start px-6">
                <h2 ref={title1} className="text-[10vw] font-bold tracking-tighter leading-none opacity-100 transition-opacity">Design integrity</h2>
              </div>
              <div className="w-[100vw] flex items-center justify-start px-6">
                <h2 ref={title2} className="text-[10vw] font-bold tracking-tighter leading-none opacity-30 transition-opacity">Innovation</h2>
              </div>
              <div className="w-[100vw] flex items-center justify-start px-6">
                <h2 ref={title3} className="text-[10vw] font-bold tracking-tighter leading-none opacity-30 transition-opacity">Enhancing</h2>
              </div>
            </div>
          </div>

          <div className="absolute top-[60%] left-0 w-full px-6">
            <div className="flex items-center w-full relative">
              <span className="text-sm absolute left-6 bg-black/30 px-2"><RevealText>03</RevealText></span>
              <div className="w-full h-[1px] bg-white/30"></div>
              <span className="text-sm font-bold absolute right-6 bg-black/30 px-2"><RevealText>VISION</RevealText></span>
            </div>
            
            <div className="flex justify-end mt-8 pr-6">
              <div className="relative w-full md:w-1/3 h-[200px]">
                {texts.map((text, i) => (
                  <div 
                    key={i}
                    ref={el => { if (el) descRefs.current[i] = el; }}
                    className={`absolute top-0 left-0 text-sm leading-relaxed ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
