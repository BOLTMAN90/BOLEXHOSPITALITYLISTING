import { FOOTER_HOME_LINKS } from "@/lib/locales";

export const SITE_NAME = "BOLEXMAN";
export const SITE_DESCRIPTION =
  "Discover hotels, resorts, villas, apartments, and curated luxury experiences.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Stays", href: "/stays" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Concierge", href: "/concierge" },
  { label: "Stories", href: "/stories" },
] as const;

export const FOOTER_LINKS = {
  home: FOOTER_HOME_LINKS,
  discover: [
    { label: "Destinations", href: "/destinations" },
    { label: "Luxury Stays", href: "/stays" },
    { label: "Map Discovery", href: "/stays#map" },
    { label: "Experiences", href: "/experiences" },
  ],
  host: [
    { label: "List property", href: "/host#list-your-property" },
    { label: "Learn about hosting", href: "/host#learn-about-hosting" },
    { label: "Host resources", href: "/host#learn-about-hosting" },
  ],
  company: [
    { label: "About", href: "/#why-bolexman" },
    { label: "Why BOLEXMAN", href: "/#why-bolexman" },
    { label: "Become a Host", href: "/host" },
  ],
  support: [
    { label: "Concierge", href: "/concierge" },
    { label: "Guest Stories", href: "/stories" },
    { label: "Contact", href: "/concierge" },
  ],
} as const;

export const CONTAINER_CLASS = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
export const SECTION_CLASS = "py-16 md:py-24 lg:py-32";

export const BRAND = {
  primary: "#0B1220",
  secondary: "#F8F6F2",
  accent: "#C8A45D",
} as const;

export const MOOD_OPTIONS = [
  { id: "romantic", label: "Romantic" },
  { id: "adventure", label: "Adventure" },
  { id: "wellness", label: "Wellness" },
  { id: "family", label: "Family" },
  { id: "celebration", label: "Celebration" },
  { id: "solo-retreat", label: "Solo Retreat" },
] as const;

export const PROPERTY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "hotel", label: "Hotels" },
  { id: "resort", label: "Resorts" },
  { id: "villa", label: "Villas" },
  { id: "apartment", label: "Apartments" },
] as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
