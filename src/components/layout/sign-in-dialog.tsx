"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/user-context";

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignUp: () => void;
}

export function SignInDialog({
  open,
  onOpenChange,
  onSwitchToSignUp,
}: SignInDialogProps) {
  const router = useRouter();
  const { signIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }
    const name = email.split("@")[0] ?? "Guest";
    signIn({ email: email.trim(), name: name.charAt(0).toUpperCase() + name.slice(1) });
    setEmail("");
    setPassword("");
    onOpenChange(false);
    router.push("/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-4">
        <DialogHeader>
          <DialogTitle className="font-heading">Sign in</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sign-in-email">Email</Label>
            <Input
              id="sign-in-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sign-in-password">Password</Label>
            <Input
              id="sign-in-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
          >
            Sign in
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New to BOLEXMAN?{" "}
            <button
              type="button"
              className="font-medium text-bolex-primary hover:text-bolex-accent"
              onClick={onSwitchToSignUp}
            >
              Create an account
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
