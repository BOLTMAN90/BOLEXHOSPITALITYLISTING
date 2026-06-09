import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewAllLinkProps {
  href: string;
  label?: string;
  className?: string;
}

export function ViewAllLink({
  href,
  label = "View all",
  className,
}: ViewAllLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-bolex-primary transition-colors hover:text-bolex-accent",
        className
      )}
    >
      {label}
      <ArrowRight className="size-4" />
    </Link>
  );
}
