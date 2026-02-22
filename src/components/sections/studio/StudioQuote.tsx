import { RevealText } from '../../ui/RevealText';

export function StudioQuote() {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-32 md:py-48 flex items-center justify-center">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
          <RevealText>
            "Each project reflects the vision and expertise of our Designers, turning ideas into spaces with meaning and beauty."
          </RevealText>
        </h2>
      </div>
    </section>
  );
}
