export interface AIResponse {
  keywords: string[];
  response: string;
}

export const aiResponses: AIResponse[] = [
  {
    keywords: ["maldives", "honeymoon", "5-day", "5 day", "romantic"],
    response:
      "For a 5-day Maldives honeymoon, I recommend Velaa Private Island — an overwater villa with butler service and a couples' spa ritual. Days 1–2: arrive and unwind. Day 3: private sandbank dinner. Days 4–5: snorkelling excursion and sunset yacht cruise. Shall I check availability for your dates?",
  },
  {
    keywords: ["villa", "under", "800", "budget", "affordable"],
    response:
      "Three exceptional villas under $800/night: Cliffside Ocean Villa in Uluwatu ($540), Riad Royal Marrakech ($480), and COMO Uma Ubud ($620). All include private pools and concierge access. Would you like to filter by destination or mood?",
  },
  {
    keywords: ["santorini", "weekend", "romantic"],
    response:
      "A romantic Santorini weekend: Canaves Oia Suites for caldera views, a private wine tasting in Pyrgos, and a sunset catamaran cruise. I can bundle the stay with a cliffside dining experience. When are you planning to travel?",
  },
  {
    keywords: ["family", "ski", "alps", "winter"],
    response:
      "For a family ski holiday, Chalet Mont Blanc in Zermatt offers ski-in access, a private chef, and kid-friendly activities. Pair it with our Alpine Helicopter Experience for a memorable day. How many guests and what dates work for you?",
  },
  {
    keywords: ["wellness", "retreat", "spa", "relax"],
    response:
      "Top wellness picks: Aman Kyoto (forest onsen and tea ceremony), COMO Uma Ubud (yoga pavilion), and our Balinese Wellness Immersion experience. Each offers a restorative, unhurried pace. Would you prefer Asia or Europe?",
  },
  {
    keywords: ["dubai", "celebration", "birthday", "luxury"],
    response:
      "Celebrate in Dubai at Atlantis The Royal — sky pool suites, Michelin dining, and I can arrange a private yacht charter at sunset. Add a desert safari for a second-day adventure. What's the occasion and group size?",
  },
];

export const aiSuggestedPrompts = [
  "Plan a 5-day Maldives honeymoon",
  "Best villas under $800/night",
  "Romantic weekend in Santorini",
  "Family ski trip in the Alps",
  "Wellness retreat recommendations",
] as const;
