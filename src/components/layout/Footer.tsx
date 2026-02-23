import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealText } from '../ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { y: '50%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-white text-black pt-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between min-h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-light text-gray-300 mb-4">
            <RevealText>Talk to us about your project</RevealText>
          </h2>
          <Link to="/contact" className="relative text-4xl md:text-6xl font-bold pb-2 inline-block group">
            <RevealText>Contact us</RevealText>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>
        </div>
        <div className="w-full md:w-1/4 flex flex-col gap-2 text-lg font-medium">
          <Link to="/" className="hover:opacity-50 transition-opacity w-fit"><RevealText>Home</RevealText></Link>
          <Link to="/work" className="hover:opacity-50 transition-opacity w-fit"><RevealText>Work</RevealText></Link>
          <Link to="/studio" className="hover:opacity-50 transition-opacity w-fit"><RevealText>Studio</RevealText></Link>
          <Link to="/process" className="hover:opacity-50 transition-opacity w-fit"><RevealText>Process</RevealText></Link>
          <Link to="/contact" className="hover:opacity-50 transition-opacity w-fit"><RevealText>Contact</RevealText></Link>
        </div>
        <div className="w-full md:w-1/4 flex flex-col gap-6 text-sm">
          <div className="flex gap-4">
            <span className="font-bold"><RevealText>L</RevealText></span>
            <span><RevealText>Praspyekt Nyezalyezhnastsi 116</RevealText><br/><RevealText>Minsk</RevealText><br/><RevealText>Belarus 220114</RevealText></span>
          </div>
          <div className="flex gap-4">
            <span className="font-bold"><RevealText>P</RevealText></span>
            <span><RevealText>+375 29 123 45 67</RevealText></span>
          </div>
          <div className="flex gap-4">
            <span className="font-bold"><RevealText>C</RevealText></span>
            <span><RevealText>contact@maisonmore.com</RevealText></span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-24 pb-10 gap-8 md:gap-0">
        <div className="w-full md:w-auto flex flex-col gap-4">
          <div className="text-sm font-bold"><RevealText>Subscribe to our newsletter</RevealText></div>
          <div className="w-full md:w-64 border-b border-black flex justify-between items-center pb-2">
            <input type="email" placeholder="Enter your email" className="outline-none w-full text-sm" />
            <span>→</span>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-gray-400 hover:text-black transition-colors cursor-pointer"><RevealText>Back to top</RevealText></button>
          <div className="text-sm font-bold flex gap-2">
            <RevealText>
              <a href="#" className="hover:opacity-50 transition-opacity">Instagram</a>, <a href="#" className="hover:opacity-50 transition-opacity">LinkedIn</a>
            </RevealText>
          </div>
        </div>
      </div>

      <div ref={textRef} className="w-[100vw] overflow-hidden flex flex-col justify-end bg-black text-white mt-10 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 pb-6">
        <h1 className="font-brand text-[11vw] font-bold tracking-tighter leading-none uppercase text-center w-full whitespace-nowrap m-0 p-0 pt-8">
          MAISON MORE
        </h1>
        <div className="flex justify-between items-center text-xs text-gray-400 mt-8">
          <div>All rights reserved © Maison More 2025</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of services</a>
          </div>
          <div>Website by <a href="https://kutsev-studio.by" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">kutsev-studio</a></div>
        </div>
      </div>
    </footer>
  );
};
