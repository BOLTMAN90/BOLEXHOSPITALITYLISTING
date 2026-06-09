import { aiResponses } from "@/data/ai-responses";
import type { Property, PropertyCategory } from "@/types/property";
import type { SearchParams } from "@/types/search";

export function filterPropertiesByCategory(
  items: Property[],
  category: PropertyCategory | "all"
): Property[] {
  if (category === "all") return items;
  return items.filter((item) => item.category === category);
}

export function filterPropertiesByMood(
  items: Property[],
  mood: string
): Property[] {
  const normalized = mood.toLowerCase().replace(/\s+/g, "-");
  return items
    .filter((item) => item.moods?.includes(normalized))
    .sort((a, b) => b.rating - a.rating);
}

export function getFeaturedProperties(items: Property[]): Property[] {
  return items.filter((item) => item.featured);
}

export function formatSearchDates(params: SearchParams): string {
  if (!params.checkIn || !params.checkOut) return "Select dates";
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });
  return `${formatter.format(params.checkIn)} – ${formatter.format(params.checkOut)}`;
}

export function matchAIResponse(input: string): string {
  const lower = input.toLowerCase();

  const match = aiResponses.find((entry) =>
    entry.keywords.some((keyword) => lower.includes(keyword))
  );

  return (
    match?.response ??
    "I'd love to help plan your journey. Tell me your destination, dates, and the mood you're going for — romantic, adventure, wellness, or celebration."
  );
}

export function getTopMoodMatches(
  items: Property[],
  mood: string,
  limit = 3
): Property[] {
  return filterPropertiesByMood(items, mood).slice(0, limit);
}
