import { RevealText } from '../../ui/RevealText';

export function StudioAwards() {
  const awards = [
    {
      year: "2025",
      items: [
        {
          project: "PNG Waterfront Residences",
          contest: "Architizer Vision Awards",
          distinction: "Vision for Localism: Finalist"
        },
        {
          project: "Ormond House",
          contest: "Houses Awards",
          distinction: "House Alteration and Addition over 200sqm: Shortlisted"
        }
      ]
    },
    {
      year: "2024",
      items: [
        {
          project: "The Saint Hotel",
          contest: "Australian Interior Design Awards",
          distinction: "Hospitality Design: Shortlisted"
        },
        {
          project: "The Saint Hotel",
          contest: "Eat Drink Design Awards",
          distinction: "Best Restaurant design"
        }
      ]
    }
  ];

  return (
    <section className="px-4 md:px-8 lg:px-12 py-32 bg-white">
      <div className="mb-16">
        <RevealText>
          <h3 className="text-sm font-medium tracking-wider uppercase">
            <span className="text-gray-400 mr-2">04</span> AWARDS
          </h3>
        </RevealText>
      </div>

      <div className="w-full">
        {/* Table Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-6 border-b border-gray-200 text-sm font-medium">
          <div className="col-span-2"><RevealText>Year</RevealText></div>
          <div className="col-span-4"><RevealText>Project</RevealText></div>
          <div className="col-span-3"><RevealText>Contest</RevealText></div>
          <div className="col-span-3"><RevealText>Distinction</RevealText></div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {awards.map((awardGroup, index) => (
            <div key={index} className="flex flex-col md:grid md:grid-cols-12 gap-4 py-8 border-b border-gray-200 text-sm">
              <div className="md:col-span-2 font-medium mb-4 md:mb-0"><RevealText>{awardGroup.year}</RevealText></div>
              <div className="md:col-span-10 flex flex-col gap-8 md:gap-4">
                {awardGroup.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col md:grid md:grid-cols-10 gap-2 md:gap-4">
                    <div className="md:col-span-4 font-medium md:font-normal"><RevealText>{item.project}</RevealText></div>
                    <div className="md:col-span-3 text-gray-500 md:text-black"><RevealText>{item.contest}</RevealText></div>
                    <div className="md:col-span-3 text-gray-500 md:text-black"><RevealText>{item.distinction}</RevealText></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
