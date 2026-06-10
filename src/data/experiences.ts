import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "private-dining-amalfi",
    title: "Private Cliffside Dining",
    category: "Private dining",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    duration: "4 hours",
    groupSize: "Up to 8 guests",
    price: 1200,
    currency: "USD",
    featured: true,
    description:
      "An intimate multi-course dinner perched above the Amalfi Coast, prepared by a private chef and paired with regional wines. Candlelit tables, live acoustic music, and unobstructed sea views make this an unforgettable evening.",
    highlights: [
      "Private chef & sommelier",
      "Cliffside terrace with sea views",
      "Custom menu & dietary preferences",
      "Live acoustic entertainment",
    ],
  },
  {
    id: "yacht-charter-dubai",
    title: "Sunset Yacht Charter",
    category: "Yacht charters",
    image:
      "https://images.unsplash.com/photo-1567894340315-9a5867e1e786?q=80&w=1200&auto=format&fit=crop",
    duration: "3 hours",
    groupSize: "Up to 12 guests",
    price: 2800,
    currency: "USD",
    featured: false,
    description:
      "Cruise Dubai Marina and the Palm at golden hour aboard a luxury yacht with crew, champagne, and gourmet canapés. Swim stops, skyline photo moments, and a front-row seat to the city's illuminated skyline.",
    highlights: [
      "Luxury yacht with professional crew",
      "Champagne & gourmet canapés",
      "Swim stop & skyline views",
      "Sunset timing coordinated for you",
    ],
  },
  {
    id: "wellness-retreat-bali",
    title: "Balinese Wellness Immersion",
    category: "Wellness retreats",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
    duration: "Full day",
    groupSize: "Up to 4 guests",
    price: 650,
    currency: "USD",
    featured: false,
    description:
      "A full-day journey through Bali's healing traditions: morning yoga in the jungle, a Balinese massage ritual, organic lunch, and a guided meditation at a sacred water temple.",
    highlights: [
      "Jungle yoga & guided meditation",
      "Traditional Balinese spa ritual",
      "Organic farm-to-table lunch",
      "Sacred water temple visit",
    ],
  },
  {
    id: "cultural-kyoto",
    title: "Kyoto Cultural Journey",
    category: "Cultural immersions",
    image:
      "https://images.unsplash.com/photo-1478434203231-5e6fc0177f88?q=80&w=1200&auto=format&fit=crop",
    duration: "6 hours",
    groupSize: "Up to 6 guests",
    price: 480,
    currency: "USD",
    featured: false,
    description:
      "Walk Kyoto's hidden lanes with a local historian, participate in a private tea ceremony, and dine on kaiseki cuisine in a centuries-old machiya townhouse.",
    highlights: [
      "Private guide & tea ceremony",
      "Temple gardens & bamboo grove",
      "Kaiseki lunch in a machiya",
      "Artisan workshop visit",
    ],
  },
  {
    id: "desert-safari-marrakech",
    title: "Luxury Desert Safari",
    category: "Cultural immersions",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b8f?q=80&w=1200&auto=format&fit=crop",
    duration: "8 hours",
    groupSize: "Up to 10 guests",
    price: 890,
    currency: "USD",
    featured: false,
    description:
      "Leave Marrakech behind for the Agafay Desert: camel trek at sunset, glamping dinner under the stars, and live Berber music around the fire.",
    highlights: [
      "Private 4x4 transfer from Marrakech",
      "Camel trek at golden hour",
      "Glamping dinner under the stars",
      "Berber music & stargazing",
    ],
  },
  {
    id: "helicopter-alps",
    title: "Alpine Helicopter Experience",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    duration: "2 hours",
    groupSize: "Up to 4 guests",
    price: 3200,
    currency: "USD",
    featured: false,
    description:
      "Soar above the Swiss Alps on a private helicopter tour with glacier landings, champagne toast on a mountain peak, and panoramic views of Mont Blanc and the Matterhorn.",
    highlights: [
      "Private helicopter & pilot",
      "Glacier landing & photo stops",
      "Champagne toast on a peak",
      "Flexible route based on weather",
    ],
  },
];
