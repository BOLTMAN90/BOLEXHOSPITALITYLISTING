import type { Property } from "@/types/property";

export const COLLECTION_LABELS: Record<string, { title: string; subtitle: string }> = {
  beachfront: {
    title: "Beachfront Villas",
    subtitle: "Oceanfront sanctuaries and coastal retreats.",
  },
  romantic: {
    title: "Romantic Escapes",
    subtitle: "Intimate stays curated for two.",
  },
  family: {
    title: "Family Retreats",
    subtitle: "Spacious properties with room for everyone.",
  },
  resorts: {
    title: "Luxury Resorts",
    subtitle: "World-class hospitality and amenities.",
  },
  business: {
    title: "Business Travel",
    subtitle: "Polished city stays for executive travel.",
  },
  weekend: {
    title: "Weekend Getaways",
    subtitle: "Short escapes with lasting memories.",
  },
  presidential: {
    title: "Presidential Suites",
    subtitle: "The pinnacle of hospitality.",
  },
  "beachfront-villas": {
    title: "Beachfront Villas",
    subtitle: "Oceanfront sanctuaries.",
  },
  "private-islands": {
    title: "Private Islands",
    subtitle: "Ultimate seclusion.",
  },
  "luxury-resorts": {
    title: "Luxury Resorts",
    subtitle: "World-class service.",
  },
  penthouses: {
    title: "Penthouse Apartments",
    subtitle: "Skyline living elevated.",
  },
};

const isBeachfront = (p: Property) =>
  p.category === "villa" ||
  p.category === "resort" ||
  p.amenities.some((a) => /ocean|beach|overwater|private pool/i.test(a)) ||
  /ocean|beach|overwater|island|uluwatu|maldives|noonu/i.test(
    `${p.title} ${p.location.city} ${p.description}`
  );

const COLLECTION_MATCHERS: Record<string, (property: Property) => boolean> = {
  beachfront: isBeachfront,
  romantic: (p) => Boolean(p.moods?.includes("romantic")),
  family: (p) => Boolean(p.moods?.includes("family")),
  resorts: (p) => p.category === "resort",
  business: (p) =>
    p.category === "hotel" ||
    p.category === "apartment" ||
    /dubai|milan|abuja|lagos|business|skyline|city/i.test(
      `${p.location.city} ${p.title} ${p.description}`
    ),
  weekend: (p) => p.pricePerNight <= 750,
  presidential: (p) => p.pricePerNight >= 1000 && p.category === "hotel",
  "beachfront-villas": isBeachfront,
  "private-islands": (p) =>
    /island|maldives|private/i.test(`${p.title} ${p.description} ${p.location.city}`),
  "luxury-resorts": (p) => p.category === "resort" && p.pricePerNight >= 600,
  penthouses: (p) =>
    p.category === "apartment" ||
    /penthouse|sky|terrace|skyline/i.test(`${p.title} ${p.amenities.join(" ")}`),
};

export function filterPropertiesByCollection(
  items: Property[],
  collectionId?: string | null
): Property[] {
  if (!collectionId) return items;
  const matcher = COLLECTION_MATCHERS[collectionId];
  if (!matcher) return items;
  const filtered = items.filter(matcher);
  return filtered.length > 0 ? filtered : items;
}

export function getCollectionLabel(collectionId?: string | null) {
  if (!collectionId) return null;
  return COLLECTION_LABELS[collectionId] ?? null;
}
