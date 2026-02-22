const projectDescriptions = [
  "Located in the heart of the city, this project has been designed to reflect our client’s character while being sensitive to the evolving local context.",
  "A thoughtful exploration of space and light, creating a sanctuary that balances privacy with connection to the surrounding landscape.",
  "This ambitious development redefines urban living, offering panoramic views and meticulously crafted interiors for modern lifestyles.",
  "A harmonious blend of heritage preservation and contemporary design, breathing new life into a historic structure.",
  "Designed with sustainability at its core, this residence utilizes passive cooling and locally sourced materials to minimize its footprint.",
  "An innovative commercial space that fosters collaboration and creativity, featuring flexible layouts and abundant natural light.",
  "A striking architectural statement that challenges conventional forms, creating a dynamic interplay between solid and void.",
  "This multi-residential project prioritizes community and shared spaces, encouraging interaction while maintaining individual privacy.",
  "A civic landmark designed to serve and inspire the community, featuring accessible facilities and an inviting public plaza.",
  "An elegant residential design that maximizes a compact site, delivering spacious and light-filled living areas.",
  "A sophisticated loft conversion that celebrates its industrial past while introducing refined, modern finishes.",
  "A sculptural pavilion that acts as a focal point for the park, providing shelter and a venue for public events.",
  "Nestled within a wooded landscape, this home is designed to frame nature, blurring the boundaries between indoors and out.",
  "A state-of-the-art office environment tailored for a forward-thinking company, emphasizing employee well-being and productivity.",
  "A boutique apartment building that offers a refined coastal lifestyle, with expansive terraces and ocean views.",
  "A premium retail and wellness space designed to elevate the customer experience through tactile materials and atmospheric lighting.",
  "A modern library facility that serves as a hub for learning and connection, featuring adaptable spaces for diverse community needs.",
  "A comprehensive commercial redevelopment that revitalizes the streetscape and provides premium amenities for tenants."
];

const projectQuotes = [
  "”The location required a complementary response to the heritage and grandeur of the street.”",
  "”A residence that acts as a quiet observer of its natural surroundings.”",
  "”Elevating the standard of luxury living through cinematic views and refined materiality.”",
  "”Architecture that bridges the gap between historical narrative and modern ambition.”",
  "”Sustainability is not an addition; it is the foundation of the design.”",
  "”Creating an environment where work feels inspired by openness and light.”",
  "”A bold geometric expression that provides a unique identity to the neighbourhood.”",
  "”Focusing on the human experience within a high-density urban context.”",
  "”Public spaces should be destinations that invite pause and reflection.”",
  "”Maximising every millimetre to create a sense of boundless space.”",
  "”Respecting the industrial bones while layering a new, sophisticated domesticity.”",
  "”A delicate intervention in the landscape that celebrates light and shadow.”",
  "”The house is not on the land, but of the land.”",
  "”Designing for productivity means designing for the people who inhabit the space.”",
  "”Coastal living refined through a palette of sand, stone, and sea.”",
  "”Retail as an immersive journey of texture and atmosphere.”",
  "”A repository of knowledge that feels as open as the community it serves.”",
  "”Revitalising the commercial heart with a renewed sense of urban vibrance.”"
];

const projectAbouts = [
  {
    p1: "Ground floor activation is a crucial element to the project, where the frontage has greater hierarchy with the entry designed to sit more discreetly within the street interface.",
    p2: "Exploring design opportunities lead to a refined architectural expression that combines strong vertical emphasis, masonry framing and an exploration of tactile materials."
  },
  {
    p1: "The design response was driven by a desire to create a sequence of experiences that gradually reveal the landscape as one moves through the house.",
    p2: "A restrained palette of off-form concrete and natural timber provides a neutral backdrop to the shifting patterns of light and shadow throughout the day."
  },
  {
    p1: "Vivace represents a pinnacle of luxury, where every detail from the custom joinery to the stone selection has been curated for the discerning eye.",
    p2: "The layout prioritises ease of movement and visual connection to the city skyline, creating an interior that feels both grand and intimate."
  },
  {
    p1: "Situated within a significant heritage precinct, the project balances the preservation of the original facade with a contemporary glass addition.",
    p2: "The dialogue between the old and the new is celebrated through a central atrium that brings light deep into the floor plates."
  },
  {
    p1: "By utilizing passive solar principles, the house maintains a comfortable temperature all year round without heavy reliance on mechanical systems.",
    p2: "The material choice was local and low-impact, resulting in a building that is as gentle on the environment as it is beautiful to live in."
  },
  {
    p1: "The office is designed around a central hub that encourages spontaneous meetings and collaborative work, breaking down traditional silos.",
    p2: "Double-height spaces and internal greenery create a 'lung' for the building, improving air quality and employee well-being."
  },
  {
    p1: "Challenging the standard residential block, the design uses shifted volumes to create private courtyards and unique vistas from every room.",
    p2: "The exterior is wrapped in a custom-perforated screen that provides privacy while allowing the building to 'breathe' and glow at night."
  },
  {
    p1: "Community engagement was key to the design, resulting in shared rooftop gardens and a ground-floor cafe that serves both residents and the public.",
    p2: "A modular construction approach allowed for high-quality finishes while reducing the impact on the existing neighborhood during build."
  },
  {
    p1: "The centre is defined by its sweeping roofline, which draws inspiration from the local topography and provides a sense of enclosure and shelter.",
    p2: "Natural light is used as a wayfinding tool, guiding visitors through the various community facilities and multi-purpose halls."
  },
  {
    p1: "Designed for a family that loves to entertain, the ground floor is a seamless indoor-outdoor space that doubles the living area.",
    p2: "Smart storage solutions are integrated into the architecture, ensuring that the minimalist aesthetic can be maintained in daily life."
  },
  {
    p1: "The loft celebrates the raw beauty of its brickwork and steel trusses, which have been painstakingly restored and left exposed.",
    p2: "New insertions are clearly defined as modern elements, creating a clear distinction between the historic shell and the contemporary life within."
  },
  {
    p1: "Lightweight and ethereal, the pavilion is designed to have a minimal physical impact on the site, floating above the grass on steel pins.",
    p2: "The timber cladding will weather over time, allowing the structure to further blend into the natural colours of the parkland."
  },
  {
    p1: "The house is organized into three pavilions, separated by landscaped courtyards that bring the 'woods' into the very heart of the home.",
    p2: "Large sliding panels allow the house to be completely opened up during summer, effectively turning the living room into an outdoor deck."
  },
  {
    p1: "Technology and architecture are perfectly integrated, with hidden acoustic treatments and flexible power solutions that adapt to any team size.",
    p2: "A focus on natural materials—stone, wood, and linen—creates an office environment that feels calm, focused, and professional."
  },
  {
    p1: "The project captures the essence of the Elwood coastline, with a facade that mimics the movement of sand dunes through soft curves.",
    p2: "Interior spaces are bleached by the sun, featuring light-coloured oaks and sandy limestones that reflect the coastal light."
  },
  {
    p1: "The gym is designed to be an atmospheric escape, utilizing dark tones and focused lighting to create a space of concentration and energy.",
    p2: "A central sculptural staircase connects the different zones, acting as both a physical link and a piece of functional art."
  },
  {
    p1: "The library is more than a place for books; it is a digital lab, a quiet study zone, and a community meeting place wrapped in a welcoming glass skin.",
    p2: "Vibrant internal colors contrast with the cool external facade, creating a sense of energy and discovery as you enter."
  },
  {
    p1: "The redevelopment introduces a new luxury hotel and retail precinct to Malvern, unified by a consistent architectural language.",
    p2: "Heritage elements are preserved while new, bold forms provide the density needed for a modern, thriving commercial destination."
  }
];

export const projectsData = [
  { title: 'Armadale Office', category: 'Commercial', year: '2025' },
  { title: 'Caulfield North', category: 'Residential', year: '2024' },
  { title: 'Penthouse Vivace', category: 'Residential', year: '2025' },
  { title: 'Southbank Tower', category: 'Multi-residential', year: '2023' },
  { title: 'Parlington', category: 'Residential', year: '2024' },
  { title: 'Loller', category: 'Commercial', year: '2025' },
  { title: 'Half Courtyard House', category: 'Residential', year: '2023', slug: 'half-courtyard' },
  { title: 'Italian Club Apartments', category: 'Multi-residential', year: '2024', slug: 'italian-club' },
  { title: 'Cobram Community Centre', category: 'Public', year: '2022', slug: 'cobram-community' },
  { title: 'Fitzroy North Residence', category: 'Residential', year: '2025', slug: 'fitzroy-north' },
  { title: 'Richmond Loft', category: 'Residential', year: '2024' },
  { title: 'St Kilda Pavilion', category: 'Public', year: '2023' },
  { title: 'Kew Woods House', category: 'Residential', year: '2025', slug: 'kew-woods' },
  { title: 'Hawthorn Office', category: 'Commercial', year: '2024' },
  { title: 'Elwood Apartment', category: 'Residential', year: '2023' },
  { title: 'South Yarra Gym', category: 'Retail', year: '2025' },
  { title: 'Carlton Library', category: 'Public', year: '2024' },
  { title: 'Malvern Central', category: 'Commercial', year: '2023' }
].map((p, i) => {
  const slug = p.slug || p.title.toLowerCase().replace(/\s+/g, '-');
  return {
    id: i + 1,
    slug,
    title: p.title,
    category: p.category,
    year: p.year,
    images: [
      `/assets/${slug}/hero.jpg`,
      `/assets/${slug}/1.jpg`,
      `/assets/${slug}/2.jpg`
    ],
    client: `${p.title} Client`,
    typology: p.category,
    status: parseInt(p.year) >= 2024 ? 'Under Construction' : 'Completed',
    heroImage: `/assets/${slug}/hero.jpg`,
    details: {
      description: projectDescriptions[i],
      country: 'Victoria, Australia',
      location: 'Melbourne',
      construction: 'LBA Construction Group',
      discipline: 'Architecture'
    },
    quote: projectQuotes[i],
    about1: projectAbouts[i].p1,
    image2: `/assets/${slug}/detail.jpg`,
    about2: projectAbouts[i].p2,
  };
});