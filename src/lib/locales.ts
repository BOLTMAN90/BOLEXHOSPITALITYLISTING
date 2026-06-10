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

/** Header nav for guests — homepage only */
export const GUEST_NAV_LINKS = [{ label: "Home", href: "/" }] as const;

/** Footer homepage sections (not used in header) */
export const FOOTER_HOME_SECTION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/#search" },
  { label: "Why BOLEXMAN", href: "/#why-bolexman" },
  { label: "Become a Host", href: "/#become-host" },
] as const;

export const FOOTER_HOME_LINKS = FOOTER_HOME_SECTION_LINKS;
