import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { SelectedWorks } from './components/sections/SelectedWorks';
import { AllWork } from './components/sections/AllWork';
import { Vision } from './components/sections/Vision';
import { Method } from './components/sections/Method';
import { Footer } from './components/layout/Footer';
import { FloatingButton } from './components/ui/FloatingButton';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { PageTransition } from './components/layout/PageTransition';

// Lazy load pages
const WorkPage = lazy(() => import('./pages/WorkPage').then(m => ({ default: m.WorkPage })));
const ProjectPage = lazy(() => import('./pages/ProjectPage').then(m => ({ default: m.ProjectPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then(m => ({ default: m.ProcessPage })));
const StudioPage = lazy(() => import('./pages/StudioPage').then(m => ({ default: m.StudioPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  return (
    <>
      <Hero />
      <div id="content-wrapper" className="relative">
        <About />
        <SelectedWorks />
        <AllWork />
        <Vision />
        <Method />
        <FloatingButton />
      </div>
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Suspense fallback={<div />}><WorkPage /></Suspense></PageTransition>} />
        <Route path="/work/:slug" element={<PageTransition><Suspense fallback={<div />}><ProjectPage /></Suspense></PageTransition>} />
        <Route path="/process" element={<PageTransition><Suspense fallback={<div />}><ProcessPage /></Suspense></PageTransition>} />
        <Route path="/studio" element={<PageTransition><Suspense fallback={<div />}><StudioPage /></Suspense></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Suspense fallback={<div />}><ContactPage /></Suspense></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when page load completes
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white relative">
      <Header />
      <main>
        <AnimatedRoutes />
      </main>
      {!isContactPage && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}
