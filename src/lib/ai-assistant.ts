import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { properties } from "@/data/properties";
import type { Destination } from "@/types/destination";
import type { Experience } from "@/types/experience";
import type { Property } from "@/types/property";

const MOOD_ALIASES: Record<string, string> = {
  romantic: "romantic",
  romance: "romantic",
  honeymoon: "romantic",
  couple: "romantic",
  adventure: "adventure",
  ski: "adventure",
  hiking: "adventure",
  wellness: "wellness",
  spa: "wellness",
  relax: "wellness",
  yoga: "wellness",
  family: "family",
  kids: "family",
  children: "family",
  celebration: "celebration",
  birthday: "celebration",
  anniversary: "celebration",
  party: "celebration",
  solo: "solo-retreat",
  alone: "solo-retreat",
};

const CATEGORY_ALIASES: Record<string, Property["category"]> = {
  hotel: "hotel",
  hotels: "hotel",
  resort: "resort",
  resorts: "resort",
  villa: "villa",
  villas: "villa",
  apartment: "apartment",
  apartments: "apartment",
};

const GENERAL_KNOWLEDGE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["visa", "passport", "entry requirement"],
    answer:
      "Visa rules depend on your nationality and destination. For BOLEXMAN destinations: Maldives offers visa on arrival for most travelers; UAE (Dubai) offers visa on arrival or e-visa for many countries; Schengen visas apply for Greece, Italy, and Switzerland; Japan, Indonesia, and Morocco have their own requirements. Always check your government's travel advisory before booking — I can help you pick a destination that fits your timeline.",
  },
  {
    keywords: ["weather", "climate", "best time", "when to visit", "season"],
    answer:
      "Best seasons vary by destination: Maldives & Bali are ideal Nov–Apr (dry season). Santorini & Amalfi Coast shine Apr–Oct. Dubai is pleasant Oct–Apr; summers are very hot. Swiss Alps: ski Dec–Mar, hiking Jun–Sep. Kyoto is stunning for cherry blossoms (Mar–Apr) and autumn foliage (Nov). Marrakech is best Mar–May and Sep–Nov. Tell me your destination and travel month and I'll narrow it down.",
  },
  {
    keywords: ["currency", "money", "exchange", "tipping", "tip"],
    answer:
      "BOLEXMAN lists prices in USD. Locally: Maldives uses MVR, Greece/Eurozone uses EUR, Dubai uses AED, Bali uses IDR, Switzerland uses CHF, Japan uses JPY, Morocco uses MAD. Cards are widely accepted at luxury properties; carry some local cash for markets and tips. Tipping 10–15% is appreciated at restaurants in most destinations.",
  },
  {
    keywords: ["flight", "airport", "fly", "getting there"],
    answer:
      "Major gateways: Maldives (Velana MLE), Santorini (JTR) via Athens, Dubai (DXB), Bali (DPS), Zurich (ZRH) for Swiss Alps, Naples (NAP) for Amalfi, Kyoto via Osaka KIX or Tokyo NRT, Marrakech (RAK). I can suggest stays near transfer hubs — which destination are you flying to?",
  },
  {
    keywords: ["pack", "packing", "what to bring", "luggage"],
    answer:
      "Pack for your destination's climate: resort wear and swimwear for Maldives/Bali, layers for Alps/Kyoto, modest clothing for Marrakech medina and temple visits in Kyoto, smart casual for Dubai fine dining. Don't forget sunscreen, comfortable walking shoes, and any prescription medications. Luxury properties provide toiletries and robes.",
  },
  {
    keywords: ["safe", "safety", "security"],
    answer:
      "All BOLEXMAN destinations are popular luxury travel hubs with established tourism infrastructure. Standard precautions apply: use hotel safes, book transfers through verified partners, and stay aware in busy medinas or nightlife districts. Our concierge can arrange trusted drivers and guides at every property.",
  },
  {
    keywords: ["covid", "health", "vaccination", "insurance"],
    answer:
      "Travel health requirements change — check CDC or your national health authority before departure. Comprehensive travel insurance covering medical evacuation is strongly recommended for international luxury travel. BOLEXMAN concierge can advise on property health protocols when you book.",
  },
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\w\s$]/g, " ").replace(/\s+/g, " ").trim();
}

function extractPriceCap(text: string): number | null {
  const match = text.match(/\$?\s*(\d{2,4})\s*(?:\/|per)?\s*(?:night|nt)?/i);
  if (match) return Number(match[1]);
  const under = text.match(/under\s*\$?\s*(\d+)/i);
  if (under) return Number(under[1]);
  const below = text.match(/below\s*\$?\s*(\d+)/i);
  if (below) return Number(below[1]);
  return null;
}

function extractGuestCount(text: string): number | null {
  const match = text.match(/(\d+)\s*(?:guests?|people|persons?|adults?|pax)/i);
  return match ? Number(match[1]) : null;
}

function extractDays(text: string): number | null {
  const match = text.match(/(\d+)\s*(?:day|night)/i);
  return match ? Number(match[1]) : null;
}

function scoreProperty(property: Property, query: string): number {
  const q = normalize(query);
  let score = 0;
  const haystack = normalize(
    `${property.title} ${property.location.city} ${property.location.country} ${property.category} ${property.amenities.join(" ")} ${property.moods?.join(" ") ?? ""} ${property.description}`
  );

  for (const dest of destinations) {
    if (q.includes(normalize(dest.name)) || q.includes(normalize(dest.id.replace("-", " ")))) {
      if (haystack.includes(normalize(dest.name)) || haystack.includes(normalize(dest.country))) {
        score += 8;
      }
    }
  }

  for (const [alias, mood] of Object.entries(MOOD_ALIASES)) {
    if (q.includes(alias) && property.moods?.includes(mood)) score += 6;
  }

  for (const [alias, category] of Object.entries(CATEGORY_ALIASES)) {
    if (q.includes(alias) && property.category === category) score += 5;
  }

  if (q.includes(normalize(property.location.city))) score += 10;
  if (q.includes(normalize(property.location.country))) score += 7;
  if (q.includes(normalize(property.title))) score += 12;

  const priceCap = extractPriceCap(q);
  if (priceCap && property.pricePerNight <= priceCap) score += 4;
  if (priceCap && property.pricePerNight > priceCap) score -= 3;

  if (/\b(cheap|affordable|budget)\b/.test(q) && property.pricePerNight < 700) score += 3;
  if (/\b(luxury|premium|exclusive|best)\b/.test(q) && property.pricePerNight >= 900) score += 3;

  return score;
}

function scoreDestination(dest: Destination, query: string): number {
  const q = normalize(query);
  let score = 0;
  if (q.includes(normalize(dest.name))) score += 15;
  if (q.includes(normalize(dest.id.replace("-", " ")))) score += 12;
  if (q.includes(normalize(dest.country))) score += 6;
  return score;
}

function scoreExperience(exp: Experience, query: string): number {
  const q = normalize(query);
  let score = 0;
  if (q.includes(normalize(exp.title))) score += 15;
  if (q.includes(normalize(exp.category))) score += 6;
  for (const dest of destinations) {
    if (q.includes(normalize(dest.name)) && normalize(exp.title + exp.description).includes(normalize(dest.name))) {
      score += 8;
    }
  }
  if (/\b(experience|tour|activity|charter|dining|safari|helicopter)\b/.test(q)) score += 2;
  return score;
}

function formatProperty(property: Property) {
  return `• **${property.title}** — ${property.location.city}, ${property.location.country} · $${property.pricePerNight}/night · ★${property.rating} (${property.reviewCount} reviews)`;
}

function formatDestination(dest: Destination) {
  return `• **${dest.name}** (${dest.country}) — from $${dest.startingPrice}/night · ${dest.propertyCount} properties`;
}

function formatExperience(exp: Experience) {
  return `• **${exp.title}** — ${exp.category} · $${exp.price} · ${exp.duration}`;
}

function stripMarkdownForPlain(text: string) {
  return text.replace(/\*\*/g, "");
}

function handleGreeting(query: string): string | null {
  const q = normalize(query);
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|greetings)\b/.test(q)) {
    return "Hello! I'm your BOLEXMAN travel assistant. Ask me anything — destinations, stays, experiences, budgets, travel tips, or trip planning. What would you like to know?";
  }
  if (/\b(thank|thanks|appreciate)\b/.test(q)) {
    return "You're welcome! If you'd like more recommendations or help booking a stay or experience, just ask.";
  }
  if (/\b(who are you|what are you|what can you do|help me)\b/.test(q)) {
    return "I'm the BOLEXMAN AI travel assistant. I answer questions about our luxury stays, destinations, and curated experiences — and general travel topics like weather, visas, packing, and planning. Ask me anything related to your trip or travel in general.";
  }
  return null;
}

function handleGeneralKnowledge(query: string): string | null {
  const q = normalize(query);
  for (const entry of GENERAL_KNOWLEDGE) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return entry.answer;
    }
  }
  return null;
}

function handleOffCatalogDestination(query: string): string | null {
  const q = normalize(query);
  const known = destinations.map((d) => normalize(d.name));
  const offCatalog = [
    { names: ["paris", "france", "french riviera", "nice", "cannes"], tip: "Paris and the French Riviera are wonderful for art, cuisine, and coastal glamour. BOLEXMAN doesn't list France yet — but Amalfi Coast, Santorini, or Dubai offer similar luxury coastal experiences." },
    { names: ["london", "uk", "england", "scotland"], tip: "The UK offers heritage and countryside escapes. For a comparable refined European experience on BOLEXMAN, consider Swiss Alps chalets or Kyoto's cultural immersion." },
    { names: ["new york", "nyc", "usa", "america", "los angeles", "miami"], tip: "For US city luxury, we'd recommend checking back as we expand. Meanwhile, Dubai and Milan (Duomo Sky Penthouse) deliver world-class urban luxury on BOLEXMAN." },
    { names: ["thailand", "phuket", "bangkok"], tip: "Thailand is a top wellness and beach destination. On BOLEXMAN, Bali offers a similar tropical wellness escape with COMO Uma Ubud and cliffside villas in Uluwatu." },
    { names: ["africa", "safari", "kenya", "tanzania", "serengeti"], tip: "For safari-style adventure, our Luxury Desert Safari from Marrakech and Alpine experiences offer curated outdoor luxury. African safari listings are coming soon." },
    { names: ["caribbean", "bahamas", "barbados"], tip: "Caribbean turquoise waters are hard to beat — the closest BOLEXMAN match is the Maldives for overwater luxury and private island resorts." },
  ];

  for (const place of offCatalog) {
    if (place.names.some((name) => q.includes(name)) && !known.some((k) => q.includes(k))) {
      return `Great question about ${place.names[0]}! ${place.tip} Would you like specific property or experience recommendations from our current collection?`;
    }
  }
  return null;
}

function buildDataDrivenReply(query: string): string {
  const rankedProperties = properties
    .map((p) => ({ item: p, score: scoreProperty(p, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const rankedDestinations = destinations
    .map((d) => ({ item: d, score: scoreDestination(d, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const rankedExperiences = experiences
    .map((e) => ({ item: e, score: scoreExperience(e, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const q = normalize(query);
  const days = extractDays(q);
  const guests = extractGuestCount(q);
  const priceCap = extractPriceCap(q);

  const parts: string[] = [];

  if (rankedDestinations.length > 0) {
    const top = rankedDestinations[0].item;
    parts.push(
      `Regarding **${top.name}**: ${top.description.split(".")[0]}.`
    );
    if (rankedDestinations.length > 1) {
      parts.push(
        `Other matching destinations:\n${rankedDestinations.slice(0, 3).map((x) => formatDestination(x.item)).join("\n")}`
      );
    }
  }

  if (rankedProperties.length > 0) {
    const topProps = rankedProperties.slice(0, 3);
    const intro = priceCap
      ? `Here are stays under $${priceCap}/night that match your question:`
      : "Here are BOLEXMAN stays that fit what you're looking for:";
    parts.push(`${intro}\n${topProps.map((x) => formatProperty(x.item)).join("\n")}`);

    const top = topProps[0].item;
    if (days) {
      const estimate = top.pricePerNight * days;
      parts.push(
        `For a ${days}-day stay at ${top.title}, estimate roughly **$${estimate.toLocaleString()}** before experiences and transfers (rates vary by season).`
      );
    }
    if (guests) {
      parts.push(
        `${top.title} works well for ${guests} guest${guests > 1 ? "s" : ""} — amenities include ${top.amenities.slice(0, 3).join(", ")}.`
      );
    }
  }

  if (rankedExperiences.length > 0 && /\b(experience|tour|activity|book|do|things)\b/.test(q)) {
    parts.push(
      `Curated experiences for you:\n${rankedExperiences.slice(0, 3).map((x) => formatExperience(x.item)).join("\n")}`
    );
  }

  if (parts.length > 0) {
    parts.push("Browse full details on our Stays, Destinations, or Experiences pages — or tell me your dates and I'll refine this further.");
    return parts.join("\n\n");
  }

  return "";
}

export function generateAssistantReply(query: string): string {
  const trimmed = query.trim();
  if (!trimmed) {
    return "Please type a question and I'll answer based on what you need — destinations, stays, experiences, budgets, or general travel advice.";
  }

  const greeting = handleGreeting(trimmed);
  if (greeting) return greeting;

  const general = handleGeneralKnowledge(trimmed);
  if (general) return general;

  const offCatalog = handleOffCatalogDestination(trimmed);
  if (offCatalog) return offCatalog;

  const dataReply = buildDataDrivenReply(trimmed);
  if (dataReply) return stripMarkdownForPlain(dataReply);

  const q = normalize(trimmed);

  if (/\b(book|reserve|reservation|availability)\b/.test(q)) {
    return "To book: open any stay or experience on BOLEXMAN, use the Book button, or visit your Dashboard to manage trips. Share your destination, dates, and guest count and I'll recommend the best options.";
  }

  if (/\b(compare|versus|vs|or|better)\b/.test(q)) {
    const destHits = destinations.filter(
      (d) => q.includes(normalize(d.name)) || q.includes(normalize(d.id.replace("-", " ")))
    );
    if (destHits.length >= 2) {
      return destHits
        .slice(0, 2)
        .map(
          (d) =>
            `${d.name}: ${d.highlights[0]}. From $${d.startingPrice}/night with ${d.propertyCount} properties.`
        )
        .join(" ") + " Which matters more to you — beaches, culture, or adventure?";
    }
  }

  if (/\b(cheapest|most affordable|lowest price)\b/.test(q)) {
    const cheapest = [...properties].sort((a, b) => a.pricePerNight - b.pricePerNight).slice(0, 3);
    return `Our most accessible luxury stays:\n${cheapest.map(formatProperty).join("\n")}`;
  }

  if (/\b(most expensive|ultra luxury|top tier|best hotel)\b/.test(q)) {
    const top = [...properties].sort((a, b) => b.pricePerNight - a.pricePerNight).slice(0, 3);
    return `Top-tier BOLEXMAN properties:\n${top.map(formatProperty).join("\n")}`;
  }

  if (/\b(experience|experiences|activity|activities)\b/.test(q)) {
    return `We offer ${experiences.length} curated experiences:\n${experiences.map(formatExperience).join("\n")}\n\nAsk about a specific one — e.g. "Tell me about the Maldives yacht charter" — and I'll go deeper.`;
  }

  if (/\b(destination|destinations|where should|where to go)\b/.test(q)) {
    return `BOLEXMAN destinations:\n${destinations.map(formatDestination).join("\n")}\n\nTell me your mood (romantic, wellness, adventure, family) and budget for a tailored pick.`;
  }

  if (/\b(stay|stays|hotel|villa|property|properties|accommodation)\b/.test(q)) {
    return `We have ${properties.length} verified luxury properties across hotels, resorts, villas, and apartments. Name a destination (e.g. Bali, Dubai, Santorini) or budget and I'll list the best matches for your question.`;
  }

  return `You asked: "${trimmed}"\n\nI can help with BOLEXMAN stays, destinations, experiences, pricing, and general travel planning (weather, visas, packing, flights). Try being specific — e.g. "Best romantic villa in Bali under $600" or "What should I pack for Marrakech in October?" — and I'll answer directly.`;
}
