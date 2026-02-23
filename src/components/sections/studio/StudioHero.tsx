import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealText } from '../../ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

export function StudioHero() {
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out the title as we scroll down
      gsap.to(titleContainerRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: titleContainerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
        }
      });
    }, titleContainerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[150vh]">
      {/* Fixed Title Container */}
      <div 
        ref={titleContainerRef}
        className="fixed top-0 left-0 h-screen w-full flex flex-col justify-center px-4 md:px-8 lg:px-12 z-20 pointer-events-none"
      >
        <div className="flex justify-between items-end w-full">
          <h1 className="text-5xl md:text-6xl lg:text-[4.8rem] font-medium tracking-tight leading-[1.05] max-w-4xl text-black">
            <RevealText>Maison More is a Melbourne</RevealText><br />
            <RevealText>based architecture & interior</RevealText><br />
            <RevealText>design studio.</RevealText>
          </h1>
          <div className="hidden lg:block text-gray-400 text-sm mb-4">
            <RevealText>[Scroll down]</RevealText>
          </div>
        </div>
      </div>

      {/* Scrolling Content */}
      <div className="absolute top-[80vh] left-0 w-full bg-white z-10 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 px-4 md:px-8 lg:px-12">
          {/* Left side - Sticky Text */}
          <div className="lg:col-span-5 lg:col-start-1">
            <div className="sticky top-32 text-lg md:text-xl leading-relaxed max-w-md">
              <p>
                <RevealText>
                  We provide a boutique level of service and a hands-on approach. Underpinning all of our work is an understanding of context, client needs and user experience, so that buildings and spaces are meaningful and remain relevant over time.
                </RevealText>
              </p>
              <p className="mt-6">
                <RevealText>
                  With experience covering a range of typologies; from single & multi-residential, retirement living, student accommodation, social housing, hotels, hospitality and workplace. We believe human touch must drive creativity.
                </RevealText>
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="lg:col-span-7 h-[120vh] w-full relative">
            <img 
              src="/assets/studio/hero.jpg" 
              alt="Studio Interior" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
