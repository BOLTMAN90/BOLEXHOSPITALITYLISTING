export const LOCALES = [
  {
    id: "en-us",
    label: "English (US)",
    language: "EN",
    locale: "en-US",
    currency: "USD",
  },
  {
    id: "en-gb",
    label: "English (UK)",
    language: "EN",
    locale: "en-GB",
    currency: "GBP",
  },
  {
    id: "fr-fr",
    label: "Français",
    language: "FR",
    locale: "fr-FR",
    currency: "EUR",
  },
] as const;

export type LocaleId = (typeof LOCALES)[number]["id"];

export const FOOTER_HOME_LINKS = [
  { label: "Home", href: "/" },
  { label: "Luxury Stays", href: "/stays" },
  { label: "Map Discovery", href: "/stays#map" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Concierge", href: "/concierge" },
  { label: "Guest Stories", href: "/stories" },
  { label: "Become a Host", href: "/host" },
] as const;
