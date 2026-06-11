import { FOOTER_HOME_LINKS } from "@/lib/locales";

export const SITE_NAME = "BOLEXMAN";
export const SITE_TAGLINE = "Stay Beyond Expectations";
export const SITE_DESCRIPTION =
  "Luxury villas, hotels, apartments, and curated experiences for modern travelers.";

export const TRUST_METRICS = [
  { label: "Properties", value: 15000, suffix: "+" },
  { label: "Destinations", value: 50, suffix: "+" },
  { label: "Happy Guests", value: 25000, suffix: "+" },
  { label: "Average Rating", value: 4.9, suffix: "", decimals: 1 },
] as const;

export const TRUST_BUILDERS = [
  { id: "verified", label: "Verified Properties" },
  { id: "secure", label: "Secure Payments" },
  { id: "price", label: "Best Price Guarantee" },
  { id: "concierge", label: "24/7 Concierge" },
  { id: "experiences", label: "Luxury Experiences" },
  { id: "instant", label: "Instant Booking" },
] as const;

export const QUICK_SEARCH_PILLS = [
  { id: "hotel", label: "Hotels" },
  { id: "villa", label: "Villas" },
  { id: "apartment", label: "Apartments" },
  { id: "resort", label: "Resorts" },
  { id: "experiences", label: "Experiences", href: "/experiences" },
] as const;

export const FEATURED_COLLECTIONS = [
  {
    id: "beachfront",
    title: "Beachfront Villas",
    subtitle: "Oceanfront sanctuaries",
    image:
      "https://images.unsplash.com/photo-1499799480376-afde1c144993?q=80&w=1200&auto=format&fit=crop",
    href: "/stays?collection=beachfront",
  },
  {
    id: "romantic",
    title: "Romantic Escapes",
    subtitle: "For two, perfectly curated",
    image:
      "https://images.unsplash.com/photo-1520250497590-86b2e8e2e627?q=80&w=1200&auto=format&fit=crop",
    href: "/stays?collection=romantic",
  },
  {
    id: "family",
    title: "Family Retreats",
    subtitle: "Space, comfort & adventure",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    href: "/stays?collection=family",
  },
  {
    id: "resorts",
    title: "Luxury Resorts",
    subtitle: "World-class hospitality",
    image:
      "https://images.unsplash.com/photo-1571008883437-250e7250d189?q=80&w=1200&auto=format&fit=crop",
    href: "/stays?collection=resorts",
  },
  {
    id: "business",
    title: "Business Travel",
    subtitle: "Effortless city stays",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2c3073678?q=80&w=1200&auto=format&fit=crop",
    href: "/stays?collection=business",
  },
  {
    id: "weekend",
    title: "Weekend Getaways",
    subtitle: "Short escapes, lasting memories",
    image:
      "https://images.unsplash.com/photo-1501117716984-bcf3f0430689?q=80&w=1200&auto=format&fit=crop",
    href: "/stays?collection=weekend",
  },
] as const;

export const SIGNATURE_COLLECTIONS = [
  {
    id: "presidential",
    title: "Presidential Suites",
    subtitle: "The pinnacle of hospitality",
    image:
      "https://images.unsplash.com/photo-1560185007-5f0bb1868b9e?q=80&w=1600&auto=format&fit=crop",
    href: "/stays?collection=presidential",
    featured: true,
  },
  {
    id: "beachfront-villas",
    title: "Beachfront Villas",
    subtitle: "Oceanfront sanctuaries",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1600&auto=format&fit=crop",
    href: "/stays?collection=beachfront-villas",
    featured: false,
  },
  {
    id: "private-islands",
    title: "Private Islands",
    subtitle: "Ultimate seclusion",
    image:
      "https://images.unsplash.com/photo-1540541337866-417a1742b781?q=80&w=1600&auto=format&fit=crop",
    href: "/stays?collection=private-islands",
    featured: false,
  },
  {
    id: "luxury-resorts",
    title: "Luxury Resorts",
    subtitle: "World-class service",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop",
    href: "/stays?collection=luxury-resorts",
    featured: false,
  },
  {
    id: "penthouses",
    title: "Penthouse Apartments",
    subtitle: "Skyline living elevated",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop",
    href: "/stays?collection=penthouses",
    featured: false,
  },
] as const;

export const LUXURY_CONCIERGE_SERVICES = [
  { id: "airport", title: "Airport Pickup", icon: "plane" },
  { id: "chauffeur", title: "Chauffeur Services", icon: "car" },
  { id: "rental", title: "Car Rental", icon: "key" },
  { id: "guide", title: "Tour Guide", icon: "map" },
  { id: "security", title: "Private Security", icon: "shield" },
  { id: "vip", title: "VIP Experiences", icon: "sparkles" },
] as const;

export const NAV_LINKS_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "Stays", href: "/stays" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
] as const;

export const NAV_LINKS_MORE = [
  { label: "Collections", href: "/collections" },
  { label: "Concierge", href: "/concierge" },
  { label: "Testimonials", href: "/testimonials" },
] as const;

export const NAV_LINKS = [
  ...NAV_LINKS_PRIMARY,
  ...NAV_LINKS_MORE,
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
    { label: "Testimonials", href: "/testimonials" },
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
