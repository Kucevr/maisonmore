import { ArrowUpRight } from 'lucide-react';
import { RevealText } from '../../ui/RevealText';

export function StudioJobs() {
  const jobs = [
    {
      title: "Graduate Architect",
      type: "Full-time",
      location: "Melbourne"
    },
    {
      title: "Interior Designer",
      type: "Full-time",
      location: "Melbourne"
    }
  ];

  return (
    <section className="px-4 md:px-8 lg:px-12 py-32 bg-white">
      <div className="mb-16">
        <RevealText>
          <span className="text-gray-400 text-sm">05</span>
          <span className="ml-4 text-sm font-medium tracking-wide">JOB OFFERS</span>
        </RevealText>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left side */}
        <div className="flex flex-col justify-end h-full">
          <div className="max-w-md text-lg md:text-xl leading-relaxed">
            <RevealText>
              We are looking for motivated, curious and dedicated talent who want to contribute to our growth while sharing our values.
            </RevealText>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
            <RevealText>Be part of a team creating</RevealText>
            <RevealText>meaningful places.</RevealText>
          </h2>

          <div className="flex flex-col gap-4">
            {jobs.map((job, index) => (
              <a 
                key={index} 
                href="#" 
                className="group flex items-center justify-between p-6 bg-gray-100 hover:bg-gray-200 transition-colors rounded-sm"
              >
                <div>
                  <h3 className="text-xl font-medium mb-1"><RevealText>{job.title}</RevealText></h3>
                  <p className="text-gray-500 text-sm"><RevealText>{job.type} {job.location}</RevealText></p>
                </div>
                <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm group-hover:scale-105 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
