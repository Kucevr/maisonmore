import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { RevealText } from '../components/ui/RevealText';

export function JobPage() {
  const { slug } = useParams();

  const jobs = {
    'graduate-architect': {
      title: "Graduate Architect",
      type: "Full-time",
      location: "Anywhere",
      description: "We are seeking a talented Graduate Architect to join our design studio. You will work closely with our senior team on a variety of residential and commercial projects.",
      requirements: [
        "Master's Degree in Architecture",
        "Strong design and representation skills",
        "Proficiency in ArchiCAD, Rhino or Revit",
        "Excellent communication and teamwork abilities",
        "A strong portfolio demonstrating a clear design process"
      ],
      responsibilities: [
        "Assist in the preparation of design presentations",
        "Develop architectural models and 3D visualizations",
        "Produce detailed drawings for construction documentation",
        "Collaborate with the design team across various project phases"
      ]
    },
    'interior-designer': {
      title: "Interior Designer",
      type: "Full-time",
      location: "Anywhere",
      description: "We are looking for a creative Interior Designer with a passion for minimalist, high-end residential spaces. You will lead the interior design phases from concept to completion.",
      requirements: [
        "Bachelor's Degree in Interior Design or Architecture",
        "Minimum 2-3 years of post-graduate experience",
        "Exceptional eye for detail, materials, and finishes",
        "Proficiency in 3D modeling and rendering software",
        "Strong understanding of bespoke joinery and custom detailing"
      ],
      responsibilities: [
        "Develop interior design concepts and highly detailed packages",
        "Select and schedule finishes, fixtures, and equipment (FF&E)",
        "Coordinate directly with suppliers, makers, and artisans",
        "Communicate effectively with clients to understand their vision"
      ]
    }
  };

  const job = jobs[slug as keyof typeof jobs];

  if (!job) {
    return (
      <div className="min-h-screen pt-32 px-4 md:px-8 lg:px-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-8">Job not found</h1>
        <Link to="/studio" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-5 h-5" /> Back to Studio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white relative z-10 isolate">
      <div className="px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <Link to="/studio" className="inline-flex items-center gap-2 mb-16 hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-5 h-5" /> Back to Studio
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">
          <RevealText>{job.title}</RevealText>
        </h1>
        
        <div className="flex gap-4 text-gray-500 mb-16 border-b border-gray-100 pb-8">
          <RevealText>{job.type}</RevealText>
          <span>•</span>
          <RevealText>{job.location}</RevealText>
        </div>

        <div className="space-y-16 text-lg md:text-xl leading-relaxed">
          <section>
            <p><RevealText>{job.description}</RevealText></p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-6"><RevealText>Responsibilities</RevealText></h2>
            <ul className="list-disc pl-6 space-y-3">
              {job.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-6"><RevealText>Requirements</RevealText></h2>
            <ul className="list-disc pl-6 space-y-3">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </section>

          <div className="pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-medium mb-6"><RevealText>How to apply</RevealText></h2>
            <p className="mb-8">
              Please send your CV and portfolio (max 10MB) to{' '}
              <a href="mailto:careers@maisonmore.com" className="underline hover:opacity-70 transition-opacity">
                careers@maisonmore.com
              </a>
              . Include "{job.title}" in the subject line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}