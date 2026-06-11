import type { Metadata } from "next";
import { Suspense } from "react";
import { StaysPageContent } from "@/components/home/stays-page-content";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Luxury Stays — BOLEXMAN",
  description: "Browse handpicked hotels, resorts, villas, and apartments on an interactive map.",
};

export default function StaysPage() {
  return (
    <SiteShell>
      <Suspense>
        <StaysPageContent />
      </Suspense>
    </SiteShell>
  );
}
