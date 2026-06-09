import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
}

export function GlassPanel({
  className,
  variant = "light",
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl border backdrop-blur-glass",
        variant === "light" && "glass-panel-light",
        variant === "dark" && "glass-panel-dark",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
