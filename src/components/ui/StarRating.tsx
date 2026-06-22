import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export default function StarRating({ rating, size = 14, showValue = true }: StarRatingProps) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <span className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={
              i < Math.round(rating) ? 'fill-gold text-gold' : 'fill-card-border text-card-border'
            }
          />
        ))}
      </span>
      {showValue && <span className="text-xs font-semibold text-heading">{rating.toFixed(1)}</span>}
    </span>
  );
}
