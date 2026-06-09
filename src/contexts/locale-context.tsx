"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { LOCALES, type LocaleId } from "@/lib/locales";

const STORAGE_KEY = "bolexman-locale";

type LocaleOption = (typeof LOCALES)[number];

interface LocaleContextValue {
  locale: LocaleOption;
  setLocale: (id: LocaleId) => void;
  formatPrice: (amount: number) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getStoredLocale(): LocaleId {
  if (typeof window === "undefined") return "en-us";
  const stored = localStorage.getItem(STORAGE_KEY) as LocaleId | null;
  return LOCALES.some((item) => item.id === stored) ? stored! : "en-us";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [localeId, setLocaleId] = useState<LocaleId>("en-us");

  useEffect(() => {
    setLocaleId(getStoredLocale());
  }, []);

  const locale = useMemo(
    () => LOCALES.find((item) => item.id === localeId) ?? LOCALES[0],
    [localeId]
  );

  const setLocale = useCallback((id: LocaleId) => {
    const next = LOCALES.find((item) => item.id === id);
    if (!next) return;
    setLocaleId(id);
    localStorage.setItem(STORAGE_KEY, id);
    toast.success(`Language & currency updated to ${next.label} · ${next.currency}`);
  }, []);

  const formatPrice = useCallback(
    (amount: number) =>
      new Intl.NumberFormat(locale.locale, {
        style: "currency",
        currency: locale.currency,
        maximumFractionDigits: 0,
      }).format(amount),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, formatPrice }),
    [locale, setLocale, formatPrice]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
