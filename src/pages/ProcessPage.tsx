import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealText } from '../components/ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    title: "Sustainability Action Plan",
    texts: [
      "We view environmental design as integral to the longevity and success of all architectural and design projects. As architects and designers, we are responsible for shaping the landscapes of the future.",
      "We recognise that buildings are long-term contributions to the environment and have generational impacts on the landscapes that they occupy. We envisage a future where all built form contributes positively to the surrounding ecology, utilising minimum energy, water and waste, and improving all forms of life.",
      "At Maison More, it's important that we approach our Sustainability Action Plan meaningfully, establishing commitments which are realistic within set timeframes.",
      "Through actionable steps, we acknowledge that we can achieve our long-term aspirations through incremental change both within our practice and through our projects to make a positive contribution to our environment.",
      "SAP Document available on request."
    ],
    bgColor: "bg-[#9b3218]",
    logo: "/assets/armadale-office/hero.jpg"
  },
  {
    title: "Reconciliation Action Plan",
    texts: [
      "For us, reconciliation is a process of building respectful relationships and implementing actions that lead to the...",
      "Our Reconciliation Action Plan is intended to be a meaningful resource which involves all staff and..."
    ],
    bgColor: "bg-[#d1d3d4]",
    logo: "/assets/caulfield-north/hero.jpg"
  },
  {
    title: "Quality Management System",
    texts: [
      "As part of our ISO 9001:2015 certification, Maison More operates in a manner that consistently meets or exceeds the quality standards set by our stakeholders. We pride ourselves on the importance we place on personalised client management and communication, and strive to consistently provide clients with the highest quality work, backed by our extensive local knowledge and experience.",
      "Our key drivers are enhanced living, design integrity and innovation. To achieve our quality goals, we are committed to continual improvement of our...",
      "Our Senior Management team are committed to maintaining and improving our QMS to satisfy clients by providing them with service that meets their requirements. Our QMS applies a process approach to quality management, integrating QMS requirements into our business processes."
    ],
    bgColor: "bg-[#9b3218]",
    logo: "/assets/penthouse-vivace/hero.jpg"
  },
  {
    title: "100% Green Power",
    texts: [
      "We are committed to reducing our carbon footprint and have transitioned to 100% Green Power for our studio operations."
    ],
    bgColor: "bg-[#d1d3d4]",
    logo: "/assets/southbank-tower/hero.jpg"
  }
];

export const ProcessPage = () => {
  const parallaxImgRef = useRef<HTMLImageElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger after a short delay once component is mounted to ensure footer is in correct position
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      if (parallaxImgRef.current && parallaxContainerRef.current) {
        gsap.to(parallaxImgRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });
    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-24">
      
      {/* Intro Text */}
      <div className="px-6 md:px-12 mb-20">
        <h2 className="text-[5vw] font-medium leading-[0.9] tracking-tighter text-gray-300">
          <RevealText>
            Our projects respond to a collection of influences; <span className="text-black">contextual response</span>, the <span className="text-black">client's brief</span>, our own <span className="text-black">design aspirations</span>, & <span className="text-black">user experience</span>.
          </RevealText>
        </h2>
      </div>

      {/* Parallax Image */}
      <div ref={parallaxContainerRef} className="w-full h-[70vh] overflow-hidden relative mb-20">
        <img 
          ref={parallaxImgRef}
          src="/assets/parlington/hero.jpg" 
          alt="Process Parallax" 
          className="absolute top-[-20%] left-0 w-full h-[140%] object-cover"
        />
      </div>

      {/* Quote */}
      <div className="px-6 md:px-12 mb-40">
        <h2 className="text-[6vw] font-medium leading-[0.9] tracking-tighter">
          <RevealText>
            "Each project is unique, responding to multiple factors, the outcome is never a single vision."
          </RevealText>
        </h2>
      </div>

      {/* 01 OUR PHILOSOPHY */}
      <div className="px-6 md:px-12 mb-40">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
          <div className="w-full md:w-1/4 text-sm font-bold">
            <RevealText>01 OUR PHILOSOPHY</RevealText>
          </div>
          <div className="w-full md:w-1/2 text-xl font-medium leading-tight">
            <RevealText>
              We are driven by a belief that Architecture & Design can deepen people's connection to place, enrich daily life, and preserve the cultural narratives that shape our communities. Our lasting impact will be thoughtful, context-led buildings that honour their histories, strengthen their neighbourhoods, and stand as enduring contributions to a more connected and meaningful built world.
            </RevealText>
          </div>
          <div className="w-full md:w-1/4"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full h-[60vh]">
          <img src="/assets/loller/hero.jpg" className="w-full md:w-1/2 h-full object-cover" alt="Philosophy 1" />
          <img src="/assets/armadale-office/hero.jpg" className="w-full md:w-1/2 h-full object-cover" alt="Philosophy 2" />
        </div>
      </div>

      {/* 02 OUR INITIATIVES */}
      <div className="px-6 md:px-12 mb-40">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
          <div className="w-full md:w-1/4 text-sm font-bold">
            <RevealText>02 OUR INITIATIVES</RevealText>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-[4vw] font-medium leading-[0.9] tracking-tighter mb-10">
              <RevealText>Building trust, inspiring confidence, delivering excellence.</RevealText>
            </h3>
          </div>
          <div className="w-full md:w-1/4 text-lg font-medium leading-tight">
            <RevealText>
              Driven by purpose and guided by values, we turn our commitments into meaningful actions that inspire confidence and create lasting trust.
            </RevealText>
          </div>
        </div>

        {/* Stacking Cards */}
        <div className="relative w-full">
          {initiatives.map((item, index) => (
            <div 
              key={index} 
              className="sticky w-full bg-white border-t border-black pt-10 pb-20 flex flex-col md:flex-row gap-6"
              style={{ top: `${10 + index * 5}vh` }}
            >
              <div className="w-full md:w-1/4">
                <h4 className="text-3xl font-medium tracking-tighter">
                  <RevealText>{item.title}</RevealText>
                </h4>
              </div>
              <div className="w-full md:w-1/4 flex flex-col gap-6 text-sm font-medium">
                {item.texts.slice(0, Math.ceil(item.texts.length / 2)).map((text, i) => (
                  <p key={i}><RevealText>{text}</RevealText></p>
                ))}
              </div>
              <div className="w-full md:w-1/4 flex flex-col gap-6 text-sm font-medium">
                {item.texts.slice(Math.ceil(item.texts.length / 2)).map((text, i) => (
                  <p key={i}><RevealText>{text}</RevealText></p>
                ))}
              </div>
              <div className="w-full md:w-1/4 flex justify-end">
                <div className={`w-full aspect-[4/3] ${item.bgColor} flex items-center justify-center p-10`}>
                  <img src={item.logo} alt={item.title} className="w-1/2 h-1/2 object-contain mix-blend-multiply" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 03 ACCREDITATIONS */}
      <div className="px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="w-full md:w-1/4 text-sm font-bold">
            <RevealText>03 ACCREDITATIONS</RevealText>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-20">
            <div>
              <h4 className="text-4xl font-medium tracking-tighter mb-4">
                <RevealText>ISO 9001 Certified</RevealText>
              </h4>
              <p className="text-lg font-medium">
                <RevealText>Quality Management System ISO 9001:2015</RevealText>
              </p>
            </div>
            <div>
              <h4 className="text-4xl font-medium tracking-tighter mb-4">
                <RevealText>Architects Registration Board</RevealText>
              </h4>
              <p className="text-lg font-medium">
                <RevealText>Member of Architect Registration Board of Victoria, Architectural Practice Board of South Australia, Board of Architects of Tasmania, Board of Architects of Queensland</RevealText>
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/4"></div>
        </div>
      </div>

    </div>
  );
};
