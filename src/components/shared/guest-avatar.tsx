"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GuestAvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: 24,
  default: 40,
  lg: 56,
} as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function GuestAvatar({
  src,
  name,
  size = "default",
  className,
}: GuestAvatarProps) {
  const [failed, setFailed] = useState(false);
  const dimension = SIZE_MAP[size];
  const initials = getInitials(name);
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=C8A45D&color=0B1220&size=${dimension * 2}&bold=true`;

  const imageSrc = !src || failed ? fallbackSrc : src;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full ring-2 ring-bolex-accent/20",
        size === "sm" && "size-6",
        size === "default" && "size-10",
        size === "lg" && "size-14",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={name}
        width={dimension}
        height={dimension}
        className="size-full object-cover"
        onError={() => setFailed(true)}
        unoptimized={imageSrc.includes("ui-avatars.com")}
      />
    </span>
  );
}
