"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";
import { CONTAINER_CLASS } from "@/lib/constants";

interface SectionWrapperProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  id?: string;
}

export function SectionWrapper({
  eyebrow,
  title,
  subtitle,
  action,
  children,
  className,
  headerClassName,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className={CONTAINER_CLASS}>
        <ScrollReveal>
          <div
            className={cn(
              "mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between",
              headerClassName
            )}
          >
            <div className="max-w-2xl space-y-3">
              {eyebrow ? (
                <p className="text-caption uppercase tracking-[0.2em] text-bolex-accent">
                  {eyebrow}
                </p>
              ) : null}
              <h2 className="text-h2 font-heading text-bolex-primary">{title}</h2>
              {subtitle ? (
                <p className="text-body-lg text-bolex-primary/70">{subtitle}</p>
              ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        </ScrollReveal>
        {children}
      </div>
    </section>
  );
}
