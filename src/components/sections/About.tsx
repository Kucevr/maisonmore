import { RevealText } from '../ui/RevealText';

export const About = () => {
  return (
    <section id="about-section" className="w-full bg-white text-black pt-20 pb-32 px-6 md:px-12 relative z-10">
      <div className="flex flex-col md:flex-row w-full gap-10 relative">
        
        {/* Left Column - Image */}
        <div className="w-full md:w-[25%] relative mt-10 z-20">
          {/* The container needs to be tall enough for the image to be sticky while the right side scrolls. */}
          <div className="sticky top-32 w-full">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
              className="w-full aspect-[4/5] object-cover" 
              alt="Studio" 
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[70%] flex flex-col justify-between">
          
          {/* 01 STUDIO and text */}
          <div className="flex flex-col md:flex-row justify-between w-full mb-64 md:pl-10 pt-10">
            <div className="text-sm font-bold mb-4 md:mb-0">
              <RevealText>01 STUDIO</RevealText>
            </div>
            <div className="w-full md:w-[60%] text-16px font-medium leading-tight">
              <RevealText>
                We connect, create and work on the lands of Aboriginal and Torres Strait Islander peoples throughout Australia. We acknowledge First Nations' ancient histories, cultures, and ongoing connections to Country, and we pay our respect to Elders past and present.
              </RevealText>
            </div>
          </div>

          {/* First line of huge text */}
          <h2 className="text-[10vw] md:text-[5vw] font-[500] leading-[0.9] tracking-tighter md:pl-10">
            <RevealText>Maison More is a Melbourne</RevealText>
          </h2>
        </div>
      </div>

      {/* Bottom part of huge text (full width) */}
      <div className="w-full mt-2">
        <h2 className="text-[10vw] md:text-[5vw] font-[500] leading-[0.9] tracking-tighter">
          <RevealText>based Architecture & Interior Design studio,</RevealText>
          <RevealText>designing various project typologies across</RevealText>
          <RevealText>Australia and Internationally.</RevealText>
        </h2>
      </div>

      {/* Bottom Info */}
      <div className="flex flex-col md:flex-row gap-10 w-full mt-32 md:pl-[30%]">
        <div className="w-full md:w-1/3 text-sm font-bold leading-tight">
          <RevealText>Architecture</RevealText>
          <RevealText>& Interior Design</RevealText>
        </div>
        <div className="w-full md:w-1/2 text-16px font-medium leading-tight">
          <RevealText>
            With experience covering a range of typologies; from single & multi-residential, seniors living, student accommodation, social housing, hotels, hospitality and workplace. We believe human touch must drive creativity.
          </RevealText>
        </div>
      </div>
    </section>
  );
};
