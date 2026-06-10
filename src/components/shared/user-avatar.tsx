"use client";

import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/contexts/user-context";
import type { User as UserType } from "@/contexts/user-context";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: UserType | null;
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function UserAvatar({ user, size = "sm", className }: UserAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      {user?.avatar ? (
        <AvatarImage src={user.avatar} alt={user.name} />
      ) : null}
      <AvatarFallback className="bg-bolex-accent text-bolex-primary">
        {user?.name ? getUserInitials(user.name) : <User className="size-4" />}
      </AvatarFallback>
    </Avatar>
  );
}
