import { cn } from "@/lib/utils";

const STAR_PATH =
  "M12 1.5l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 13.63 2 8.76l6.91-1z";

export function Star({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("transition-colors", filled ? "fill-star" : "fill-star-empty", className)}
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

type StarRatingProps = {
  value: number;
  className?: string;
  starClassName?: string;
};

/** Read-only row of 5 stars */
export default function StarRating({ value, className, starClassName }: StarRatingProps) {
  return (
    <div role="img" aria-label={`${value} out of 5 stars`} className={cn("flex", className)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= value} className={starClassName} />
      ))}
    </div>
  );
}