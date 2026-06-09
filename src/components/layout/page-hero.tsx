import { cn } from "@/lib/utils";
import { CONTAINER_CLASS } from "@/lib/constants";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHero({ eyebrow, title, subtitle, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-white/10 bg-bolex-primary pt-28 pb-16 md:pt-32 md:pb-20",
        className
      )}
    >
      <div className={CONTAINER_CLASS}>
        {eyebrow ? (
          <p className="text-caption uppercase tracking-[0.2em] text-bolex-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-h1 mt-4 max-w-3xl text-white">{title}</h1>
        {subtitle ? (
          <p className="text-body-lg mt-4 max-w-2xl text-white/75">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
