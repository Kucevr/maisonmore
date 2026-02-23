import { useState, useEffect, useRef } from 'react';
import { RevealText } from '../../ui/RevealText';

const teamMembers = [
  { name: 'Andre Maison', role: 'Director', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Daniel More', role: 'Director', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Lisa Kalker', role: 'Associate', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop' },
  { name: 'Katie Reedy', role: 'Senior Architect', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' },
  { name: 'Vinh Lam', role: 'Architect', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Emilia Fabris', role: 'Interior Designer', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
  { name: 'Amy Byrne', role: 'Architectural Graduate', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop' },
  { name: 'Samantha Lei', role: 'Architectural Graduate', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop' },
  { name: 'Daniela Gibbens', role: 'Interior Designer', image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop' },
  { name: 'Chelsea Trainor', role: 'Student of Architecture', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Monica Zhou', role: 'Student of Architecture', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Caleb Bull', role: 'Student of Architecture', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Chelsea Pace', role: 'Student of Architecture', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1978&auto=format&fit=crop' },
  { name: 'Jaime Roth', role: 'Student of Architecture', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1999&auto=format&fit=crop' },
];

export function StudioTeam() {
  const [activeIndex, setActiveIndex] = useState(2); // Default to Lisa Kalker as in screenshot
  const namesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024 || !namesContainerRef.current) return; // Only on mobile/tablet

      const container = namesContainerRef.current;
      const items = container.querySelectorAll('.team-member-name');
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestIndex = activeIndex;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <section className="px-4 md:px-8 lg:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        {/* Left - Title */}
        <div className="lg:col-span-3 mb-8 lg:mb-0">
          <h3 className="text-sm font-medium tracking-wider uppercase sticky top-32">
            <RevealText><span className="text-gray-400 mr-2">01</span> MEET THE TEAM</RevealText>
          </h3>
        </div>

        {/* Mobile Layout: Names Left, Image Right */}
        <div className="lg:hidden flex gap-4 h-[60vh] relative">
          {/* Names Scrollable Area */}
          <div 
            ref={namesContainerRef}
            className="w-1/2 overflow-y-auto snap-y snap-mandatory hide-scrollbar relative"
            style={{ paddingBottom: '50vh', paddingTop: '20vh' }}
          >
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="team-member-name w-full py-4 snap-center flex justify-start"
              >
                <h4 
                  className={`text-2xl md:text-4xl font-medium tracking-tight transition-colors duration-300 text-left ${
                    activeIndex === index ? 'text-black' : 'text-gray-300'
                  }`}
                >
                  {member.name}
                </h4>
              </div>
            ))}
          </div>

          {/* Sticky Image Area */}
          <div className="w-1/2 relative h-full">
            <div className="sticky top-1/2 -translate-y-1/2 w-full aspect-[3/4] overflow-hidden">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-[calc(100%-30px)] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 py-1 flex justify-between text-[10px] bg-white">
                    <span>[</span>
                    <span className="truncate px-1">{member.role}</span>
                    <span>]</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:col-span-9 gap-8">
          {/* Middle - Names List */}
          <div className="w-7/12 flex flex-col items-center">
            <div className="w-full">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="w-full py-2 cursor-pointer group flex justify-center"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <h4 
                    className={`text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight transition-colors duration-300 text-center ${
                      activeIndex === index ? 'text-black' : 'text-gray-300 group-hover:text-gray-500'
                    }`}
                  >
                    {member.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Sticky Image */}
          <div className="w-5/12 relative h-auto">
            <div className="sticky top-32 w-full aspect-[3/4] overflow-hidden">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-[calc(100%-40px)] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 py-2 flex justify-between text-sm bg-white">
                    <span>[</span>
                    <span>{member.role}</span>
                    <span>]</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
