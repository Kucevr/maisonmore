import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isHeroDone, setIsHeroDone] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Australia/Melbourne'
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const isHomePage = location.pathname === '/';
  const isWorkPage = location.pathname.startsWith('/work');
  const isProcessPage = location.pathname === '/process';
  const isStudioPage = location.pathname === '/studio';
  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    const onHeroDone = () => setIsHeroDone(true);
    window.addEventListener('heroDone', onHeroDone);
    return () => window.removeEventListener('heroDone', onHeroDone);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      setIsHeroDone(false);
    }
  }, [isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) return;
      // On Work, Process, Studio, Contact page, or Home page after hero animation, header is always visible
      if (isWorkPage || isProcessPage || isStudioPage || isContactPage || (isHomePage && isHeroDone)) {
        setIsVisible(true);
        setIsLogoVisible(true);
        return;
      }

      if (window.scrollY > window.innerHeight * 0.95) {
        setIsVisible(true);
        setIsLogoVisible(true);
      } else {
        setIsVisible(false);
        setIsLogoVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isWorkPage, isProcessPage, isStudioPage, isContactPage, isHomePage, isHeroDone, isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 md:py-6 flex justify-between items-center transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${isContactPage && !isMobileMenuOpen ? 'text-black' : (isMobileMenuOpen ? 'text-white' : 'mix-blend-difference text-white')}`}
      >
        <div className="flex items-center gap-10 w-1/2">
          <Link to="/" className={`font-brand text-xl md:text-2xl font-bold tracking-tighter uppercase transition-opacity duration-300 ${isLogoVisible ? 'opacity-100' : 'opacity-0'}`}>
            Maison More
          </Link>
          <div className="text-16px font-medium hidden md:flex gap-1">
            <Link to="/work" className={`transition-opacity duration-75 ${isWorkPage ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'}`}>Work</Link>
            <span className="opacity-50">,</span>
            <Link to="/process" className={`transition-opacity duration-75 ${isProcessPage ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'}`}>Process</Link>
            <span className="opacity-50">,</span>
            <Link to="/studio" className={`transition-opacity duration-75 ${isStudioPage ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'}`}>Studio</Link>
          </div>
        </div>
        <div className="flex items-center justify-end gap-6 md:gap-10 w-1/2">
          <div className={`text-sm hidden md:block opacity-50 uppercase`}>{currentTime} South Yarra, AUS</div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-16px font-medium uppercase md:hidden z-[60]"
          >
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>

          <Link to="/contact" className={`text-16px font-medium transition-opacity duration-75 hidden md:block ${isContactPage ? 'font-bold' : 'hover:opacity-50'}`}>Contact</Link>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[45] bg-black text-white flex flex-col justify-center px-6"
          >
            <nav className="flex flex-col gap-8 text-4xl font-bold uppercase tracking-tighter">
              <Link to="/work" className={isWorkPage ? 'opacity-100' : 'opacity-50'}>Work</Link>
              <Link to="/process" className={isProcessPage ? 'opacity-100' : 'opacity-50'}>Process</Link>
              <Link to="/studio" className={isStudioPage ? 'opacity-100' : 'opacity-50'}>Studio</Link>
              <Link to="/contact" className={isContactPage ? 'opacity-100' : 'opacity-50'}>Contact</Link>
            </nav>
            <div className="absolute bottom-10 left-6 text-sm opacity-50 uppercase">
              {currentTime} South Yarra, AUS
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
