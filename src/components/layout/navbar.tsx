"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Globe,
  Menu,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { CONTAINER_CLASS, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { navbarScroll, navbarScrollTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

const LOCALES = [
  { label: "English (US)", currency: "USD" },
  { label: "English (UK)", currency: "GBP" },
  { label: "Français", currency: "EUR" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isScrolled } = useScrollPosition(80);
  const showSolidNav = !isHome || isScrolled;

  return (
    <motion.header
      initial={false}
      animate={showSolidNav ? navbarScroll.scrolled : navbarScroll.top}
      transition={navbarScrollTransition}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b",
        showSolidNav ? "shadow-luxury" : "border-transparent"
      )}
    >
      <div className={cn(CONTAINER_CLASS, "flex h-16 items-center justify-between")}>
        <Link
          href="/"
          className={cn(
            "font-heading text-xl font-medium tracking-[0.08em] transition-colors md:text-2xl",
            showSolidNav ? "text-bolex-secondary" : "text-white"
          )}
        >
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-bolex-accent",
                showSolidNav ? "text-bolex-secondary/90" : "text-white/90"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors hover:bg-white/10",
                showSolidNav ? "text-bolex-secondary" : "text-white"
              )}
            >
              <Globe className="size-4" />
              EN · USD
              <ChevronDown className="size-3.5 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {LOCALES.map((locale) => (
                <DropdownMenuItem key={locale.label}>
                  {locale.label} · {locale.currency}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            className={cn(
              "border border-white/20 bg-transparent hover:bg-white/10",
              showSolidNav
                ? "text-bolex-secondary hover:text-bolex-secondary"
                : "text-white"
            )}
          >
            List Your Property
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-bolex-accent"
            >
              <Avatar size="sm">
                <AvatarFallback className="bg-bolex-accent text-bolex-primary">
                  <User className="size-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>Sign in</DropdownMenuItem>
              <DropdownMenuItem>Create account</DropdownMenuItem>
              <DropdownMenuItem>My trips</DropdownMenuItem>
              <DropdownMenuItem>Wishlist</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Sheet>
          <SheetTrigger
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10 lg:hidden",
              showSolidNav ? "text-bolex-secondary" : "text-white"
            )}
          >
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-bolex-primary text-bolex-secondary sm:max-w-sm">
            <SheetHeader className="border-b border-white/10 pb-4">
              <SheetTitle className="font-heading text-xl tracking-[0.08em] text-bolex-secondary">
                {SITE_NAME}
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-bolex-secondary/90 transition-colors hover:bg-white/5 hover:text-bolex-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
              <Button
                variant="outline"
                className="w-full border-white/20 bg-transparent text-bolex-secondary hover:bg-white/5"
              >
                List Your Property
              </Button>
              <Button className="w-full bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90">
                Sign in
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
