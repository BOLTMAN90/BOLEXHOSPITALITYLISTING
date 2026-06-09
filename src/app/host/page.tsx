import type { Metadata } from "next";
import { HostPageContent } from "@/components/home/host-page-content";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Become a Host — BOLEXMAN",
  description: "List your luxury property on BOLEXMAN and join an exclusive network of premium hosts.",
};

export default function HostPage() {
  return (
    <SiteShell>
      <main>
        <HostPageContent />
      </main>
    </SiteShell>
  );
}
