export type PropertyCategory = "hotel" | "resort" | "villa" | "apartment";

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  location: { city: string; country: string; lat: number; lng: number };
  images: string[];
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  featured?: boolean;
  moods?: string[];
  description: string;
}
