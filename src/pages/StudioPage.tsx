import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StudioHero } from '../components/sections/studio/StudioHero';
import { StudioQuote } from '../components/sections/studio/StudioQuote';
import { StudioTeam } from '../components/sections/studio/StudioTeam';
import { StudioVision } from '../components/sections/studio/StudioVision';
import { StudioAwards } from '../components/sections/studio/StudioAwards';
import { StudioJobs } from '../components/sections/studio/StudioJobs';
import { StudioFloatingButton } from '../components/ui/StudioFloatingButton';

gsap.registerPlugin(ScrollTrigger);

export function StudioPage() {
  useEffect(() => {
    // Force ScrollTrigger to recalculate positions after page transition
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="pt-32 pb-20 relative">
      <StudioHero />
      <div id="studio-quote-section">
        <StudioQuote />
      </div>
      <StudioTeam />
      <StudioVision />
      <StudioAwards />
      <div id="studio-jobs-section">
        <StudioJobs />
      </div>
      <StudioFloatingButton />
    </main>
  );
}
