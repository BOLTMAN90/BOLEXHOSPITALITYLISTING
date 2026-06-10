"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { useAuthUI } from "@/contexts/auth-ui-context";
import { useUser } from "@/contexts/user-context";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { CONTAINER_CLASS, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { GUEST_NAV_LINKS } from "@/lib/locales";
import { navbarScroll, navbarScrollTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useUser();
  const { openSignIn, openSignUp } = useAuthUI();
  const isHome = pathname === "/";
  const { isScrolled } = useScrollPosition(80);
  const showSolidNav = !isHome || isScrolled;

  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = user ? NAV_LINKS : GUEST_NAV_LINKS;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : null;

  const navLinkClass = cn(
    "text-sm font-medium transition-colors hover:text-bolex-accent",
    showSolidNav ? "text-bolex-secondary/90" : "text-white/90"
  );

  const goTo = (href: string) => {
    setMobileOpen(false);
    router.push(href);
  };

  const handleSignOut = () => {
    signOut();
    setMobileOpen(false);
    router.push("/");
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

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSelector
            triggerClassName={showSolidNav ? "text-bolex-secondary" : "text-white"}
          />

          {user ? (
            <Link
              href="/host#list-your-property"
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-lg border border-white/20 px-4 text-sm font-medium transition-colors hover:bg-white/10",
                showSolidNav
                  ? "text-bolex-secondary hover:text-bolex-secondary"
                  : "text-white"
              )}
            >
              List Your Property
            </Link>
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-bolex-accent">
              <Avatar size="sm">
                <AvatarFallback className="bg-bolex-accent text-bolex-primary">
                  {initials ?? <User className="size-4" />}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    Signed in as {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/trips")}>
                    My trips
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/wishlist")}>
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={openSignIn}>Sign in</DropdownMenuItem>
                  <DropdownMenuItem onClick={openSignUp}>Create account</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10 lg:hidden",
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
                    variant="outline"
                    className="w-full border-white/20 bg-transparent text-bolex-secondary hover:bg-white/5"
                    onClick={() => goTo("/trips")}
                  >
                    My trips
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 bg-transparent text-bolex-secondary hover:bg-white/5"
                    onClick={() => goTo("/wishlist")}
                  >
                    Wishlist
                  </Button>
                  <Button
                    className="w-full bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
                    onClick={handleSignOut}
                  >
                    Sign out
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
    </motion.header>
  );
}
