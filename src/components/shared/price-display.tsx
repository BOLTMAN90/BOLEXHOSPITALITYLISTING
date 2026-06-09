"use client";

import { useLocale } from "@/contexts/locale-context";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  suffix?: string;
  className?: string;
}

export function PriceDisplay({
  amount,
  currency,
  suffix = "/ night",
  className,
}: PriceDisplayProps) {
  const { formatPrice, locale } = useLocale();
  const formatted = currency
    ? new Intl.NumberFormat(locale.locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount)
    : formatPrice(amount);

  return (
    <span className={cn("text-price font-price text-bolex-primary", className)}>
      {formatted}
      {suffix ? (
        <span className="text-caption font-sans font-normal text-bolex-primary/60">
          {" "}
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
