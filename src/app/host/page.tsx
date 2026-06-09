import type { Metadata } from "next";
import { BecomeHostCTA } from "@/components/home/become-host-cta";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Become a Host — BOLEXMAN",
  description: "List your luxury property on BOLEXMAN and join an exclusive network of premium hosts.",
};

export default function HostPage() {
  return (
    <SiteShell>
      <main>
        <BecomeHostCTA />
      </main>
    </SiteShell>
  );
}
