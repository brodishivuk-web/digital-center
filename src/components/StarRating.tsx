import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviewsCount,
  size = 14,
}: {
  rating: number;
  reviewsCount?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5" dir="ltr">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(rating) ? "fill-brand-blue text-brand-blue" : "fill-brand-border text-brand-border"}
          />
        ))}
      </div>
      <span className="text-sm text-neutral-600">
        {rating.toFixed(1)}
        {reviewsCount !== undefined && ` (${reviewsCount})`}
      </span>
    </div>
  );
}
