import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { HomeFeatures } from "@/components/home/home-features";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <HomeFeatures>
      <Navbar />
      {children}
      <Footer />
    </HomeFeatures>
  );
}
