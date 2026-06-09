"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LazyWhenVisibleProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
}

export function LazyWhenVisible({
  children,
  className,
  fallback,
  rootMargin = "200px 0px",
  minHeight = 400,
}: LazyWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ minHeight: visible ? undefined : minHeight }}
    >
      {visible
        ? children
        : (fallback ?? (
            <div
              className="flex items-center justify-center rounded-2xl bg-bolex-primary/5"
              style={{ minHeight }}
              aria-hidden
            >
              <p className="text-caption text-muted-foreground">Loading...</p>
            </div>
          ))}
    </div>
  );
}
