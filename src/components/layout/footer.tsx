"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  GmailIcon,
  InstagramIcon,
} from "@/components/shared/social-icons";
import { useAuthUI } from "@/contexts/auth-ui-context";
import { useUser } from "@/contexts/user-context";
import {
  CONTAINER_CLASS,
  FOOTER_LINKS,
  SITE_NAME,
} from "@/lib/constants";
import { FOOTER_HOME_SECTION_LINKS } from "@/lib/locales";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FacebookIcon,
  },
  {
    label: "Gmail",
    href: "mailto:belrender000@gmail.com",
    Icon: GmailIcon,
  },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useAuthUI();

  const footerColumns = user
    ? [
        { title: "Home", links: FOOTER_HOME_SECTION_LINKS },
        { title: "Discover", links: FOOTER_LINKS.discover },
        { title: "Host", links: FOOTER_LINKS.host },
        { title: "Support", links: FOOTER_LINKS.support },
      ]
    : [{ title: "Homepage", links: FOOTER_HOME_SECTION_LINKS }];

  const handleProtectedClick = (
    event: React.MouseEvent,
    href: string
  ) => {
    if (user || href.startsWith("/#") || href === "/") return;
    event.preventDefault();
    openSignIn();
    toast.message("Sign in to access this section.");
  };

  const handleNewsletter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      toast.error("Please enter your email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        toast.error(data.error ?? "Unable to subscribe right now.");
        return;
      }

      toast.success("Welcome to BOLEXMAN. You're subscribed to our newsletter.");
      setEmail("");
    } catch {
      toast.error("Unable to subscribe right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-bolex-primary text-bolex-secondary">
      <div className={CONTAINER_CLASS}>
        <div className="section-padding pb-12">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
            <div className="space-y-6">
              <Link
                href="/"
                className="font-heading inline-block text-2xl font-medium tracking-[0.08em]"
              >
                {SITE_NAME}
              </Link>
              <p className="max-w-sm text-body text-bolex-secondary/70">
                A luxury hospitality ecosystem for extraordinary stays,
                experiences, and concierge services worldwide.
              </p>

              <form onSubmit={handleNewsletter} className="space-y-3">
                <p className="text-caption uppercase tracking-[0.15em] text-bolex-accent">
                  Newsletter
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-10 border-white/15 bg-white/5 text-bolex-secondary placeholder:text-bolex-secondary/40"
                  />
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-10 bg-bolex-accent px-5 text-bolex-primary hover:bg-bolex-accent/90"
                  >
                    {submitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </form>

              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-bolex-secondary/80 transition-colors hover:border-bolex-accent hover:text-bolex-accent"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div
              className={
                user
                  ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                  : "grid gap-8 sm:grid-cols-2"
              }
            >
              {footerColumns.map((column) => (
                <div key={column.title} className="space-y-4">
                  <h3 className="text-caption uppercase tracking-[0.15em] text-bolex-accent">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={(event) => handleProtectedClick(event, link.href)}
                          className="text-sm text-bolex-secondary/75 transition-colors hover:text-bolex-secondary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-bolex-accent/30" />

        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-caption text-bolex-secondary/60">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-bolex-accent" />
              Secure booking
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CreditCard className="size-3.5 text-bolex-accent" />
              Visa · Mastercard · Amex
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-caption text-bolex-secondary/60">
            {user ? (
              <>
                <Link href="/concierge" className="hover:text-bolex-secondary">
                  Help
                </Link>
                <Link href="/host#list-your-property" className="hover:text-bolex-secondary">
                  List your property
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={openSignIn}
                className="hover:text-bolex-secondary"
              >
                Sign in to explore
              </button>
            )}
            <span>© {new Date().getFullYear()} {SITE_NAME}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
