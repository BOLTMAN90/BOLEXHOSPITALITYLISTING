import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function RatingStars({
  rating,
  max = 5,
  showValue = true,
  reviewCount,
  className,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "size-3.5",
              index < Math.round(rating)
                ? "fill-bolex-accent text-bolex-accent"
                : "fill-transparent text-bolex-primary/20"
            )}
          />
        ))}
      </div>
      {showValue ? (
        <span className="text-caption font-medium text-bolex-primary">
          {rating.toFixed(1)}
        </span>
      ) : null}
      {reviewCount !== undefined ? (
        <span className="text-caption text-bolex-primary/50">
          ({reviewCount.toLocaleString()})
        </span>
      ) : null}
    </div>
  );
}
