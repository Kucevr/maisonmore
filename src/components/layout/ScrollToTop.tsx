import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Small delay to ensure DOM is updated and page transition is finishing
    // 600ms corresponds to slightly after 0.5s transition
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      // Also notify Lenis if it's available
      if ((window as any).lenis) {
        (window as any).lenis.resize();
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
