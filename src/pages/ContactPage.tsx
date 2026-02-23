import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealText } from '../components/ui/RevealText';

const cities = ['Victoria', 'Sydney', 'Brisbane', 'Perth', 'Adelaide', 'Hobart', 'Darwin', 'Canberra'];

export const ContactPage = () => {
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % cities.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-[#d5d6d2] text-black pt-32 px-6 md:px-12 pb-12 flex flex-col justify-between overflow-hidden fixed inset-0 z-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full flex-grow">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.05] max-w-2xl">
            <RevealText>Based in Melbourne but available for your projects in{' '}</RevealText>
            <span className="inline-block relative w-[250px] md:w-[450px] h-[1.2em] align-bottom overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={cityIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute left-0 top-0"
                >
                  {cities[cityIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-center pt-20 lg:pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col">
              <RevealText delay={0.1}>
                <div className="text-xs font-bold mb-2 uppercase">Business</div>
                <a href="mailto:contact@maisonmore.com" className="text-xl hover:opacity-50 transition-opacity">contact@maisonmore.com</a>
              </RevealText>
            </div>
            <div className="flex flex-col">
              <RevealText delay={0.2}>
                <div className="text-xs font-bold mb-2 uppercase">Phone</div>
                <a href="tel:+61386725999" className="text-xl hover:opacity-50 transition-opacity">+61 3 8672 5999</a>
              </RevealText>
            </div>
            <div className="flex flex-col md:col-span-2">
              <RevealText delay={0.3}>
                <div className="text-xs font-bold mb-2 uppercase">Address</div>
                <div className="text-xl">
                  59 Garden Street<br />
                  South Yarra<br />
                  Victoria, Australia 3141
                </div>
              </RevealText>
            </div>
          </div>

          <div className="w-full">
            <RevealText delay={0.4} className="w-full">
              <div className="w-full aspect-[4/3] relative overflow-hidden">
                <img src="/assets/kew-woods/hero.jpg" alt="Office" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            </RevealText>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <RevealText delay={0.5}>
          <div className="text-sm font-bold">
            Instagram, Linkedin
          </div>
        </RevealText>
      </div>
    </div>
  );
};
