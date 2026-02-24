import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerLeftRef = useRef<HTMLDivElement>(null);
  const headerRightRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHeroDone, setIsHeroDone] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Dedicated Effect for Scroll Locking
  useEffect(() => {
    if (isHeroDone) return;

    const lockScroll = () => {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
      if ((window as any).lenis) {
        (window as any).lenis.stop();
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    };

    // Lock immediately
    lockScroll();

    // Re-lock periodically during loading to handle any race conditions with Lenis init
    const lockInterval = setInterval(lockScroll, 50);

    return () => {
      clearInterval(lockInterval);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isHeroDone]);

  // Update time every minute (Minsk timezone)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Europe/Minsk'
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if it's the first time visiting in this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setProgress(100);
      setIsLoaded(true);
      if (loadingRef.current) loadingRef.current.style.display = 'none';
      return;
    }

    // Dynamic Loading Animation (0 to 100%)
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animateLoader = (time: number) => {
      const elapsed = time - startTime;
      const progressValue = Math.min((elapsed / duration) * 100, 100);
      
      const easeProgress = progressValue < 50 
        ? 2 * Math.pow(progressValue / 100, 2) * 100 
        : (1 - Math.pow(-2 * (progressValue / 100) + 2, 2) / 2) * 100;

      setProgress(Math.floor(easeProgress));

      if (progressValue < 100) {
        requestAnimationFrame(animateLoader);
      } else {
        sessionStorage.setItem('hasVisited', 'true');
        // When 100% is reached, slide the loading screen up
        gsap.to(loadingRef.current, {
          yPercent: -100,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.inOut",
          onComplete: () => {
            if (loadingRef.current) loadingRef.current.style.display = 'none';
            setIsLoaded(true);
          }
        });
      }
    };

    requestAnimationFrame(animateLoader);
  }, []);

  useEffect(() => {
    if (!isLoaded || isHeroDone) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleScroll = (e: WheelEvent | TouchEvent) => {
      if (isAnimating || isHeroDone) return;
      
      let isScrollDown = false;
      if (e instanceof WheelEvent) {
        if (e.cancelable) e.preventDefault();
        isScrollDown = e.deltaY > 0;
      } else if (e instanceof TouchEvent) {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        if (deltaY > 50) { // Swipe up
          isScrollDown = true;
          if (e.cancelable) e.preventDefault();
        }
      }

      if (isScrollDown) {
        setIsAnimating(true);
        window.scrollTo(0, 0);
        if ((window as any).lenis) (window as any).lenis.scrollTo(0, { immediate: true });
        
        const tl = gsap.timeline({
          onStart: () => {
            window.scrollTo(0, 0);
          },
          onComplete: () => {
            setIsHeroDone(true);
            window.dispatchEvent(new Event('heroDone')); // Notify global Header
            
            // Hide the fake nav elements when animation is done
            gsap.to([headerLeftRef.current, headerRightRef.current], {
              opacity: 0,
              duration: 0.3
            });
          }
        });

        // Image expands from bottom center to full screen
        tl.to(imageRef.current, {
          width: "100vw",
          height: "100vh",
          bottom: 0,
          duration: 1.5,
          ease: "power3.inOut"
        }, 0);

        // Title shrinks and moves to top left
        tl.to(titleRef.current, {
          top: "24px",
          left: window.innerWidth < 768 ? "24px" : "24px", 
          fontSize: window.innerWidth < 768 ? "1.25rem" : "1.5rem", // Match header text-xl / text-2xl
          xPercent: 0,
          color: "white",
          duration: 1.5,
          ease: "power3.inOut"
        }, 0);

        // Header Left moves up - hidden on mobile in real header, so we can hide it here too
        tl.to(headerLeftRef.current, {
          top: "28px",
          left: "250px",
          color: "white",
          opacity: window.innerWidth < 768 ? 0 : 1,
          duration: 1.5,
          ease: "power3.inOut"
        }, 0);

        // Header Right moves up
        tl.to(headerRightRef.current, {
          top: "28px",
          color: "white",
          duration: 1.5,
          ease: "power3.inOut"
        }, 0);

        // Bottom texts turn white
        tl.to([bottomTextRef.current, scrollDownRef.current], {
          color: "white",
          duration: 1.5,
          ease: "power3.inOut"
        }, 0);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [isLoaded, isAnimating, isHeroDone]);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-white overflow-hidden">
      {/* Loading Screen (Photo 1) */}
      <div ref={loadingRef} className="absolute inset-0 bg-black text-white z-50 flex flex-col justify-between p-6">
        <div className="flex justify-between text-sm font-medium">
          <div>Design studio<br/>Architecture & interior</div>
          <div className="hidden md:block text-center">South Yarra<br/>Australia</div>
          <div className="hidden md:block text-right">Loading<br/>{progress}%</div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <h1 className="text-[16vw] font-bold tracking-tighter leading-none uppercase">
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_forwards]">M</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_0.1s_forwards]">A</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_0.2s_forwards]">I</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_0.3s_forwards]">S</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_0.4s_forwards]">O</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_0.5s_forwards]">N</span>
            </span>
            <span className="inline-block w-[4vw]"></span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_0.6s_forwards]">M</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_0.7s_forwards]">O</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_0.8s_forwards]">R</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block translate-y-full animate-[slideUp_1s_ease-out_0.9s_forwards]">E</span>
            </span>
          </h1>
        </div>
        <div className="md:hidden flex justify-between text-sm font-medium">
          <div>South Yarra<br/>Australia</div>
          <div className="text-right">Loading<br/>{progress}%</div>
        </div>
      </div>

      {/* Main Content (Initial state is Photo 2, scrolled state is Photo 3) */}
      <div className="absolute inset-0 w-full h-full">
        <h1 
          ref={titleRef}
          className="absolute top-[10%] md:top-[5%] left-1/2 -translate-x-1/2 text-[16vw] font-bold tracking-tighter leading-none uppercase text-black z-30 whitespace-nowrap origin-top-left"
        >
          Maison More
        </h1>

        <div 
          ref={headerLeftRef}
          className="absolute top-[25%] md:top-[22vw] left-6 text-sm font-medium text-black z-30 flex gap-1"
        >
          <Link to="/work" className="hover:opacity-70 hover:scale-105 transition-all duration-150">Work</Link>, 
          <Link to="/process" className="hover:opacity-70 hover:scale-105 transition-all duration-150">Process</Link>, 
          <Link to="/studio" className="hover:opacity-70 hover:scale-105 transition-all duration-150">Studio</Link>
        </div>

        <div 
          ref={headerRightRef}
          className="absolute top-[25%] md:top-[22vw] right-6 flex gap-10 text-sm font-medium text-black z-30"
        >
          <div className="hidden md:block text-gray-400 opacity-50">{currentTime} Minsk, BLR</div>
          <Link to="/contact" className="hover:opacity-70 hover:scale-105 transition-all duration-150">Contact</Link>
        </div>

        <div 
          ref={imageRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] md:w-[40vw] h-[50vh] md:h-[45vh] z-20"
        >
          <img 
            src="/assets/hero/main.png" 
            alt="Hero" 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="sync"
          />
        </div>

        <div 
          ref={scrollDownRef}
          className="absolute bottom-6 left-6 text-sm md:text-30px text-black z-30"
        >
          [Scroll down]
        </div>

        <div 
          ref={bottomTextRef}
          className="absolute bottom-6 right-6 md:right-20 max-w-[200px] md:max-w-[250px] text-right md:text-left text-sm md:text-30px font-medium text-black z-30 leading-tight"
        >
          Driven by History, Centered on<br/>
          Context, Embracing Culture
        </div>
      </div>
    </section>
  );
};
