"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  CreditCard,
  Globe,
  Mail,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CONTAINER_CLASS,
  FOOTER_LINKS,
  SITE_NAME,
} from "@/lib/constants";

const FOOTER_COLUMNS = [
  { title: "Discover", links: FOOTER_LINKS.discover },
  { title: "Host", links: FOOTER_LINKS.host },
  { title: "Company", links: FOOTER_LINKS.company },
  { title: "Support", links: FOOTER_LINKS.support },
] as const;

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: Share2 },
  { label: "Twitter", href: "#", icon: Globe },
  { label: "LinkedIn", href: "#", icon: Mail },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    toast.success("Welcome to BOLEXMAN. You're subscribed to our newsletter.");
    setEmail("");
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
                    className="h-10 bg-bolex-accent px-5 text-bolex-primary hover:bg-bolex-accent/90"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>

              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-bolex-secondary/80 transition-colors hover:border-bolex-accent hover:text-bolex-accent"
                  >
                    <Icon className="size-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.title} className="space-y-4">
                  <h3 className="text-caption uppercase tracking-[0.15em] text-bolex-accent">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
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
            <Link href="#" className="hover:text-bolex-secondary">
              Privacy
            </Link>
            <Link href="#" className="hover:text-bolex-secondary">
              Terms
            </Link>
            <span>© {new Date().getFullYear()} {SITE_NAME}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
