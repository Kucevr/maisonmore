import { useState } from 'react';
import { RevealText } from '../ui/RevealText';
import { OptimizedImage } from '../ui/OptimizedImage';

const methods = [
  { title: "Schematic Design", num: "01", img: "/assets/process/schematic.jpeg" },
  { title: "Development & Town Planning Applications", num: "02", img: "/assets/process/development.jpeg" },
  { title: "Design Development", num: "03", img: "/assets/process/design-dev.jpeg" },
  { title: "Marketing", num: "04", img: "/assets/process/marketing.jpeg" },
  { title: "Interior Design", num: "05", img: "/assets/process/interior.jpeg" },
  { title: "Construction Documentation", num: "06", img: "/assets/process/documentation.jpeg" },
  { title: "Contract Administration", num: "07", img: "/assets/process/administration.jpeg" }
];

export const Method = () => {
  const [hovered, setHovered] = useState(5);

  return (
    <section id="method-section" className="py-32 px-6 w-full bg-white flex flex-col min-h-screen justify-center">
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
        <div className="w-full md:w-1/4 text-sm font-medium text-gray-400">
          <RevealText>04 METHOD</RevealText>
        </div>
        <div className="w-full md:w-1/2 text-xl font-medium leading-tight text-black">
          <RevealText>
            The scope of our Studio covers all stages within Architecture and Interior Design. We offer an end to end level of service from early concepts through to practical completion.
          </RevealText>
        </div>
        <div className="w-full md:w-1/4 flex justify-start md:justify-end">
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="w-full md:w-2/3 text-2xl md:text-[3vw] font-bold leading-tight tracking-tighter text-gray-300 flex flex-wrap gap-x-2 md:gap-x-4">
          {methods.map((m, i) => (
            <span
              key={i}
              onMouseEnter={() => setHovered(i)}
              className={`cursor-pointer transition-colors duration-300 ${hovered === i ? 'text-black' : ''}`}
            >
              {m.title} <sup className="text-sm md:text-[1.5vw] font-medium">({m.num})</sup> {i !== methods.length - 1 && <span className="mx-1 md:mx-2 font-light">/</span>}
            </span>
          ))}
        </div>
        <div className="w-full md:w-1/3 md:pl-10">
          <OptimizedImage 
            src={methods[hovered].img} 
            className="w-full aspect-[4/5] object-cover transition-all duration-500" 
            alt="Method" 
            loading="lazy" 
            decoding="async" 
          />
        </div>
      </div>
    </section>
  );
};
