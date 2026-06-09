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

export const HOME_NAV_LINKS = [
  { label: "Search", href: "/#search" },
  { label: "Luxury Stays", href: "/#stays-preview" },
  { label: "Destinations", href: "/#destinations-preview" },
  { label: "Why BOLEXMAN", href: "/#why-bolexman" },
  { label: "Guest Stories", href: "/#testimonials" },
  { label: "Become a Host", href: "/#become-host" },
] as const;

export const FOOTER_HOME_SECTION_LINKS = [
  { label: "Home", href: "/" },
  ...HOME_NAV_LINKS,
] as const;

export const FOOTER_HOME_LINKS = FOOTER_HOME_SECTION_LINKS;
