import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

export function StarRating({ rating, reviews, size = "sm", showCount = true, className }: StarRatingProps) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.floor(rating)
                ? "fill-accent text-accent"
                : i < rating
                  ? "fill-accent/50 text-accent"
                  : "fill-transparent text-border"
            )}
          />
        ))}
      </div>
      {showCount && reviews !== undefined && (
        <span className="text-xs text-muted-foreground">({reviews})</span>
      )}
    </div>
  );
}
