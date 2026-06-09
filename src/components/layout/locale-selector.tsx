"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/contexts/locale-context";
import { LOCALES } from "@/lib/locales";
import { cn } from "@/lib/utils";

interface LocaleSelectorProps {
  className?: string;
  triggerClassName?: string;
}

export function LocaleSelector({
  className,
  triggerClassName,
}: LocaleSelectorProps) {
  const { locale, setLocale } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors hover:bg-white/10",
          triggerClassName
        )}
      >
        <Globe className="size-4" />
        {locale.language} · {locale.currency}
        <ChevronDown className="size-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("w-52", className)}>
        {LOCALES.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => setLocale(option.id)}
            className="flex items-center justify-between"
          >
            <span>
              {option.label} · {option.currency}
            </span>
            {locale.id === option.id ? (
              <Check className="size-4 text-bolex-accent" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Mobile-friendly locale picker for the sheet menu */
export function LocaleSelectorMobile() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2 border-t border-white/10 pt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-bolex-secondary/90 hover:bg-white/5"
      >
        <span className="inline-flex items-center gap-2">
          <Globe className="size-4" />
          {locale.language} · {locale.currency}
        </span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="space-y-1 px-1">
          {LOCALES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setLocale(option.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-bolex-secondary/80 hover:bg-white/5",
                locale.id === option.id && "bg-white/5 text-bolex-accent"
              )}
            >
              {option.label} · {option.currency}
              {locale.id === option.id ? <Check className="size-4" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
