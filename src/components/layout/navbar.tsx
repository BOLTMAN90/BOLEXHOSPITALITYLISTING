"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
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
import { LocaleSelector, LocaleSelectorMobile } from "@/components/layout/locale-selector";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useAuthUI } from "@/contexts/auth-ui-context";
import { useUser } from "@/contexts/user-context";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import {
  CONTAINER_CLASS,
  NAV_LINKS,
  NAV_LINKS_MORE,
  NAV_LINKS_PRIMARY,
  SITE_NAME,
} from "@/lib/constants";
import { GUEST_NAV_LINKS } from "@/lib/locales";
import { navbarScroll, navbarScrollTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { openSignIn, openSignUp } = useAuthUI();
  const isHome = pathname === "/";
  const { isScrolled } = useScrollPosition(80);
  const showSolidNav = !isHome || isScrolled;

  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = user ? NAV_LINKS : GUEST_NAV_LINKS;
  const primaryLinks = user ? NAV_LINKS_PRIMARY : GUEST_NAV_LINKS;
  const moreLinks = user ? NAV_LINKS_MORE : [];
  const isMoreActive = moreLinks.some((link) => link.href === pathname);

  const navLinkClass = cn(
    "whitespace-nowrap px-1.5 text-sm font-medium tracking-wide transition-colors hover:text-bolex-accent",
    showSolidNav ? "text-bolex-secondary/90" : "text-white/90"
  );

  const goTo = (href: string) => {
    setMobileOpen(false);
    router.push(href);
  };

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
      <div
        className={cn(
          CONTAINER_CLASS,
          "flex h-16 items-center justify-between gap-6 xl:gap-10"
        )}
      >
        <Link
          href="/"
          className={cn(
            "relative z-10 shrink-0 font-heading text-lg font-medium tracking-[0.1em] transition-opacity hover:opacity-90 sm:text-xl xl:text-2xl",
            showSolidNav ? "text-bolex-secondary" : "text-white"
          )}
        >
          {SITE_NAME}
        </Link>

        {user ? (
          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 flex-1 items-center justify-center gap-x-6 2xl:gap-x-10 xl:flex"
          >
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  navLinkClass,
                  pathname === link.href && "text-bolex-accent"
                )}
              >
                {link.label}
              </Link>
            ))}

            {moreLinks.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    "inline-flex items-center gap-1 whitespace-nowrap px-1.5 text-sm font-medium tracking-wide outline-none transition-colors hover:text-bolex-accent focus-visible:text-bolex-accent",
                    showSolidNav ? "text-bolex-secondary/90" : "text-white/90",
                    isMoreActive && "text-bolex-accent"
                  )}
                >
                  More
                  <ChevronDown className="size-3.5 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="min-w-44">
                  {moreLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.href}
                      onClick={() => router.push(link.href)}
                    >
                      {link.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </nav>
        ) : (
          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 flex-1 items-center justify-center xl:flex"
          >
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  navLinkClass,
                  pathname === link.href && "text-bolex-accent"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="relative z-10 flex shrink-0 items-center justify-end gap-2 sm:gap-3 xl:gap-4">
          <div className="hidden items-center gap-2 sm:gap-3 xl:flex">
            <LocaleSelector
              triggerClassName={showSolidNav ? "text-bolex-secondary" : "text-white"}
            />

            {user ? (
              <Link
                href="/host#list-your-property"
                className={cn(
                  "inline-flex h-9 items-center justify-center rounded-lg border border-white/20 px-3 text-sm font-medium transition-colors hover:bg-white/10 2xl:px-4",
                  showSolidNav
                    ? "text-bolex-secondary hover:text-bolex-secondary"
                    : "text-white"
                )}
              >
                <span className="2xl:hidden">List Property</span>
                <span className="hidden 2xl:inline">List Your Property</span>
              </Link>
            ) : null}

            {user ? (
              <Link
                href="/dashboard"
                className="rounded-full outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-bolex-accent"
                aria-label="Open account dashboard"
              >
                <UserAvatar user={user} />
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-bolex-accent">
                  <UserAvatar user={null} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={openSignIn}>Sign in</DropdownMenuItem>
                  <DropdownMenuItem onClick={openSignUp}>Create account</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10 xl:hidden",
                showSolidNav ? "text-bolex-secondary" : "text-white"
              )}
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l-0 bg-bolex-primary text-bolex-secondary sm:max-w-sm"
            >
              <SheetHeader className="border-b border-white/10 pb-4">
                <SheetTitle className="font-heading text-xl tracking-[0.08em] text-bolex-secondary">
                  {SITE_NAME}
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-bolex-secondary/90 transition-colors hover:bg-white/5 hover:text-bolex-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <LocaleSelectorMobile />

              <div className="mt-4 space-y-3 border-t border-white/10 pt-6">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 bg-transparent text-bolex-secondary hover:bg-white/5"
                      onClick={() => goTo("/host#list-your-property")}
                    >
                      List Your Property
                    </Button>
                    <Button
                      className="w-full gap-2 bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
                      onClick={() => goTo("/dashboard")}
                    >
                      <UserAvatar user={user} size="sm" />
                      My account
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="w-full bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
                      onClick={() => {
                        setMobileOpen(false);
                        openSignIn();
                      }}
                    >
                      Sign in
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 bg-transparent text-bolex-secondary hover:bg-white/5"
                      onClick={() => {
                        setMobileOpen(false);
                        openSignUp();
                      }}
                    >
                      Create account
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
