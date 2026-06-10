import type { Destination } from "@/types/destination";

export const destinations: Destination[] = [
  {
    id: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 48,
    startingPrice: 890,
    currency: "USD",
    slug: "maldives",
    description:
      "If you go to the Maldives, this is what you will get: turquoise lagoons, powder-white sandbars, and overwater villas where the ocean is your front yard. Days unfold with reef snorkeling, sunset dhoni cruises, and spa rituals inspired by the sea.",
    highlights: [
      "Overwater villas & private sandbanks",
      "World-class diving & marine life",
      "Seaplane arrivals & butler service",
      "Sunset cruises & reef dining",
    ],
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 36,
    startingPrice: 620,
    currency: "USD",
    slug: "santorini",
    description:
      "If you go to Santorini, this is what you will get: whitewashed cliffside suites, caldera sunsets that stop time, and volcanic beaches framed by Aegean blue. Explore Oia's lanes, wine tastings in ancient vineyards, and intimate tavernas by the water.",
    highlights: [
      "Caldera-view suites & infinity pools",
      "Iconic sunsets in Oia & Fira",
      "Volcanic beaches & boat tours",
      "Assyrtiko wine & local cuisine",
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 72,
    startingPrice: 450,
    currency: "USD",
    slug: "dubai",
    description:
      "If you go to Dubai, this is what you will get: skyline-defining hotels, desert adventures minutes from the city, and Michelin-starred dining at every turn. From private beach clubs to rooftop pools, luxury here is both bold and effortless.",
    highlights: [
      "Iconic skyline hotels & sky pools",
      "Private beaches & yacht marinas",
      "Desert safaris & dune dining",
      "World-class shopping & nightlife",
    ],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 54,
    startingPrice: 380,
    currency: "USD",
    slug: "bali",
    description:
      "If you go to Bali, this is what you will get: jungle retreats in Ubud, cliffside villas in Uluwatu, and a culture woven into every sunrise ceremony. Wellness, surf, and farm-to-table dining come together in one island escape.",
    highlights: [
      "Jungle resorts & cliffside villas",
      "Wellness retreats & yoga pavilions",
      "Rice terraces & temple visits",
      "Surf breaks & beach clubs",
    ],
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 29,
    startingPrice: 780,
    currency: "USD",
    slug: "swiss-alps",
    description:
      "If you go to the Swiss Alps, this is what you will get: snow-capped peaks, timber chalets with fireplaces, and après-ski culture refined to perfection. Summer brings alpine hiking, lake cruises, and Michelin dining in mountain villages.",
    highlights: [
      "Luxury ski chalets & alpine lodges",
      "Ski-in access & private guides",
      "Spa rituals & fondue evenings",
      "Scenic rail journeys & hiking",
    ],
  },
  {
    id: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1516483638264-f4d0f3ada2e8?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 41,
    startingPrice: 690,
    currency: "USD",
    slug: "amalfi-coast",
    description:
      "If you go to the Amalfi Coast, this is what you will get: terraced lemon groves, pastel villages clinging to cliffs, and Riva boat days along the Tyrrhenian Sea. Positano, Ravello, and Capri are within reach of your terrace.",
    highlights: [
      "Cliffside hotels & sea-view terraces",
      "Private boat tours & coastal drives",
      "Limoncello tastings & seafood dining",
      "Ravello gardens & Capri day trips",
    ],
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1545569341-773fdb2a84e4?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 33,
    startingPrice: 520,
    currency: "USD",
    slug: "kyoto",
    description:
      "If you go to Kyoto, this is what you will get: bamboo forests at dawn, geisha districts lit by lantern glow, and ryokan hospitality steeped in centuries of tradition. Tea ceremonies, temple gardens, and kaiseki dining define every stay.",
    highlights: [
      "Forest ryokans & boutique hotels",
      "Temple visits & tea ceremonies",
      "Cherry blossoms & autumn foliage",
      "Kaiseki dining & artisan crafts",
    ],
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 27,
    startingPrice: 340,
    currency: "USD",
    slug: "marrakech",
    description:
      "If you go to Marrakech, this is what you will get: riad courtyards scented with orange blossom, the energy of Jemaa el-Fna at dusk, and Atlas Mountain escapes just beyond the medina walls. Hammams, souks, and desert camps await.",
    highlights: [
      "Private riads & palace hotels",
      "Medina souks & rooftop dining",
      "Atlas Mountain day trips",
      "Luxury desert camps & hammams",
    ],
  },
  {
    id: "lagos",
    name: "Lagos",
    country: "Nigeria",
    image:
      "https://images.unsplash.com/photo-1598449836317-0fa3b72d6a1f?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 64,
    startingPrice: 280,
    currency: "USD",
    slug: "lagos",
    description:
      "If you go to Lagos, this is what you will get: Atlantic beach clubs, vibrant nightlife, and a booming luxury hospitality scene along Victoria Island and Lekki. Fine dining, art galleries, and private yacht days on the lagoon.",
    highlights: [
      "Victoria Island luxury hotels",
      "Lekki beach resorts & villas",
      "Private lagoon cruises",
      "World-class dining & nightlife",
    ],
  },
  {
    id: "abuja",
    name: "Abuja",
    country: "Nigeria",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 38,
    startingPrice: 220,
    currency: "USD",
    slug: "abuja",
    description:
      "If you go to Abuja, this is what you will get: Nigeria's polished capital with diplomatic-grade hotels, serene green landscapes, and refined business travel infrastructure. Ideal for executive stays and weekend escapes.",
    highlights: [
      "Five-star business hotels",
      "Diplomatic district stays",
      "Golf & wellness resorts",
      "Curated city & nature tours",
    ],
  },
  {
    id: "ibadan",
    name: "Ibadan",
    country: "Nigeria",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 22,
    startingPrice: 160,
    currency: "USD",
    slug: "ibadan",
    description:
      "If you go to Ibadan, this is what you will get: Nigeria's historic cultural heart with heritage estates, boutique retreats, and access to cocoa-country landscapes. A quieter luxury alternative to the megacities.",
    highlights: [
      "Heritage boutique hotels",
      "Cultural & historical tours",
      "Nature retreats nearby",
      "Authentic Yoruba cuisine",
    ],
  },
  {
    id: "port-harcourt",
    name: "Port Harcourt",
    country: "Nigeria",
    image:
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfb3c?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 19,
    startingPrice: 190,
    currency: "USD",
    slug: "port-harcourt",
    description:
      "If you go to Port Harcourt, this is what you will get: riverfront hospitality, executive-grade hotels, and gateway access to the Niger Delta's unique coastal culture. Premium stays for business and leisure.",
    highlights: [
      "Riverfront luxury hotels",
      "Executive suites & conference stays",
      "Seafood & local cuisine",
      "Coastal day excursions",
    ],
  },
  {
    id: "osogbo",
    name: "Osogbo",
    country: "Nigeria",
    image:
      "https://images.unsplash.com/photo-1523805009346-744fc85aabaa?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 12,
    startingPrice: 140,
    currency: "USD",
    slug: "osogbo",
    description:
      "If you go to Osogbo, this is what you will get: spiritual heritage at the Osun-Osogbo Sacred Grove, artisan culture, and intimate boutique stays. A soulful Nigerian destination for cultural travelers.",
    highlights: [
      "UNESCO sacred grove visits",
      "Artisan & craft workshops",
      "Boutique heritage stays",
      "Cultural immersion experiences",
    ],
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    image:
      "https://images.unsplash.com/photo-1580060839134-c75a4e6d3eeb?q=80&w=1200&auto=format&fit=crop",
    propertyCount: 45,
    startingPrice: 320,
    currency: "USD",
    slug: "cape-town",
    description:
      "If you go to Cape Town, this is what you will get: Table Mountain vistas, Clifton beaches, world-class wine estates, and design-forward boutique hotels. One of Africa's most coveted luxury destinations.",
    highlights: [
      "Clifton & Camps Bay villas",
      "Wine estate day trips",
      "Table Mountain & coastal drives",
      "Michelin-level dining scene",
    ],
  },
];
