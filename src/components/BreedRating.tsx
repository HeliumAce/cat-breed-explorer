import { Star } from 'lucide-react';
import { isRating } from '@/data/breed-ratings';

interface BreedRatingProps {
  label: string;
  value?: number | null;
  display?: 'stars' | 'scale';
}

const levels = ['Low', 'Moderately low', 'Moderate', 'Moderately high', 'High'];

export function BreedRating({ label, value, display = 'stars' }: BreedRatingProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
      <div className="text-amber-600 font-medium mb-1">{label}</div>
      {!isRating(value) ? (
        <p className="text-sm text-muted-foreground">Rating unavailable</p>
      ) : display === 'scale' ? (
        <div className="pt-1">
          <div
            role="meter"
            aria-label={label}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-valuenow={value}
            aria-valuetext={`${levels[value - 1]} (${value} of 5)`}
            className="flex gap-1"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                aria-hidden="true"
                className={`h-2 flex-1 rounded-full ${index < value ? 'bg-amber-500' : 'bg-muted'}`}
              />
            ))}
          </div>
          <div aria-hidden="true" className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      ) : (
        <div role="img" aria-label={`${label}: ${value} out of 5 stars`} className="flex">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className={`h-4 w-4 ${index < value ? 'text-amber-500 fill-amber-500' : 'text-muted'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
