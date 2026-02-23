import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealText } from '../../ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

const visionData = [
  {
    title: 'Design Integrity',
    description: 'Our design aesthetic is established through a consistent process and a detailed concept brief, which considers client needs, site context, and the future occupiers. We combine and test these elements to create a singular design vision concealing many influencing layers. This singular vision, like a piece of artwork, is unique and individual. We believe the principles of design quality should always be present no matter the project brief or building scale.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Innovation',
    description: 'Maison More welcomes innovation through research and technology to contribute new ideas and challenging theories. We see technology as a tool, we engage with it and it is integral to our work, however we believe human touch must drive creativity. We heavily invest time in research through leading industry seminars, University tutoring and participation in international study tours.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
  },
  {
    title: 'Enhanced Living',
    description: 'We believe enhanced user experience and well-being should be at the forefront of design. We constantly consider the impact of design on the end user to ensure our designs promote positive human interaction and encourage healthier, enriched experiences.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2070&auto=format&fit=crop'
  }
];

export function StudioVision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const overlaysRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the container when it reaches the top
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
        }
      });

      // 1. Image container shrinks to the right
      tl.to(imageContainerRef.current, {
        width: '45vw',
        height: '80vh',
        x: '50vw', // Move to right
        y: '10vh', // Move down a bit
        duration: 1,
        ease: 'power2.inOut'
      }, 0);

      // "03 OUR VISION" title fades in
      tl.to(textsRef.current[3], { opacity: 1, duration: 0.5 }, 0);

      // Text 1 fades in
      tl.to(textsRef.current[0], { opacity: 1, y: 0, duration: 0.5 }, 0);
      tl.to(textsRef.current[0]?.querySelectorAll('span > span') || [], { y: '0%', opacity: 1, duration: 0.5, stagger: 0.01, ease: 'power2.out' }, 0);

      // 2. Image 2 slides up, Image 1 darkens
      tl.to(imagesRef.current[1], { y: '0%', duration: 1, ease: 'none' }, 1.5);
      tl.to(overlaysRef.current[0], { opacity: 0.5, duration: 1, ease: 'none' }, 1.5);
      
      // Text 1 fades out, Text 2 fades in at 50% of Image 2 sliding up
      tl.to(textsRef.current[0], { opacity: 0, y: -20, duration: 0.2 }, 1.9);
      tl.to(textsRef.current[1], { opacity: 1, y: 0, duration: 0.2 }, 2.1);
      tl.to(textsRef.current[1]?.querySelectorAll('span > span') || [], { y: '0%', opacity: 1, duration: 0.5, stagger: 0.01, ease: 'power2.out' }, 2.1);

      // 3. Image 3 slides up, Image 2 darkens
      tl.to(imagesRef.current[2], { y: '0%', duration: 1, ease: 'none' }, 3);
      tl.to(overlaysRef.current[1], { opacity: 0.5, duration: 1, ease: 'none' }, 3);

      // Text 2 fades out, Text 3 fades in at 50% of Image 3 sliding up
      tl.to(textsRef.current[1], { opacity: 0, y: -20, duration: 0.2 }, 3.4);
      tl.to(textsRef.current[2], { opacity: 1, y: 0, duration: 0.2 }, 3.6);
      tl.to(textsRef.current[2]?.querySelectorAll('span > span') || [], { y: '0%', opacity: 1, duration: 0.5, stagger: 0.01, ease: 'power2.out' }, 3.6);

      // Add a pause at the end before unpinning
      tl.to({}, { duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-white">
      
      {/* Intro Text (02 OUR VALUES) - Sticky */}
      <div className="px-4 md:px-8 lg:px-12 pt-32 pb-64 relative z-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sticky top-32">
          <div className="lg:col-span-4">
            <RevealText>
              <h3 className="text-sm font-medium tracking-wider uppercase">
                <span className="text-gray-400 mr-2">02</span> OUR VALUES
              </h3>
            </RevealText>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
              <RevealText>
                We provide a boutique level of service and a hands-on approach. Underpinning all of our work is an understanding of context, client needs and user experience.
              </RevealText>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (Stacking) */}
      <div className="md:hidden w-full px-4 py-10 flex flex-col gap-16">
        <div className="text-sm font-medium tracking-wider uppercase mb-4">
          <RevealText><span className="text-gray-400 mr-2">03</span> OUR VISION</RevealText>
        </div>
        {visionData.map((item, index) => (
          <div key={index} className="flex flex-col gap-6">
            <div className="w-full aspect-[4/5] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <h2 className="text-4xl font-medium tracking-tight mb-4">
                {item.title}
              </h2>
              <p className="text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout (The Pinned Container) */}
      <div ref={pinContainerRef} className="hidden md:block w-full h-screen relative z-10 overflow-hidden">
        
        {/* The Image Container that shrinks */}
        <div 
          ref={imageContainerRef}
          className="absolute top-0 left-0 w-full h-full overflow-hidden origin-top-left"
        >
          {/* Images */}
          {visionData.map((item, index) => (
            <div 
              key={index}
              ref={el => { imagesRef.current[index] = el; }}
              className="absolute inset-0 w-full h-full"
              style={{ transform: index === 0 ? 'translateY(0%)' : 'translateY(100%)' }}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div 
                ref={el => { overlaysRef.current[index] = el; }}
                className="absolute inset-0 bg-black opacity-0"
              />
            </div>
          ))}
        </div>

        {/* Left Side Texts (03 OUR VISION) - Inside the pinned container so they stay fixed */}
        <div className="absolute left-0 top-0 w-[45vw] h-full z-20 flex flex-col justify-center px-4 md:px-8 lg:px-12 pointer-events-none">
          <div className="relative w-full max-w-xl">
            <h3 className="text-sm font-medium tracking-wider uppercase absolute top-0 -translate-y-16 left-0 opacity-0" ref={el => { textsRef.current[3] = el as any; }}>
              <span className="text-gray-400 mr-2">03</span> OUR VISION
            </h3>
            
            <div className="relative w-full h-[400px]">
              {visionData.map((item, index) => (
                <div 
                  key={index}
                  ref={el => { textsRef.current[index] = el; }}
                  className="absolute top-0 left-0 w-full opacity-0 translate-y-10"
                >
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8">
                    {item.title}
                  </h2>
                  <p className="text-lg md:text-xl leading-relaxed">
                    {item.description.split(' ').map((word, i) => (
                      <span key={i} className="inline-block overflow-hidden align-bottom">
                        <span className="inline-block translate-y-full opacity-0 transition-all duration-500 ease-out" style={{ transitionDelay: `${i * 10}ms` }}>
                          {word}&nbsp;
                        </span>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
