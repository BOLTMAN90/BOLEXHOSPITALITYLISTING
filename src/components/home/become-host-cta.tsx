"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { IMAGE_BLUR, imageSizes, optimizeUnsplashUrl } from "@/lib/image-utils";

const HOST_IMAGE = optimizeUnsplashUrl(
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  1600
);

export function BecomeHostCTA() {
  return (
    <section className="relative min-h-[480px] overflow-hidden">
      <Image
        src={HOST_IMAGE}
        alt="Luxury property interior"
        fill
        placeholder="blur"
        blurDataURL={IMAGE_BLUR}
        sizes={imageSizes.fullWidth}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-bolex-primary/80" />

      <ScrollReveal className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <p className="text-caption uppercase tracking-[0.2em] text-bolex-accent">
          Become a Host
        </p>
        <h2 className="text-h1 mt-4 max-w-3xl text-white">
          Share Your Extraordinary Space
        </h2>
        <p className="text-body-lg mx-auto mt-4 max-w-xl text-white/75">
          Join an exclusive network of premium hosts and welcome guests who
          appreciate the finest in hospitality.
        </p>
        <p className="font-price mt-6 text-xl text-bolex-accent md:text-2xl">
          Hosts earn up to $12,000/month
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/host#list-your-property"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-bolex-accent px-8 text-base font-medium text-bolex-primary transition-colors hover:bg-bolex-accent/90"
          >
            List Your Property
          </Link>
          <Link
            href="/host#learn-about-hosting"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            Learn About Hosting
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
