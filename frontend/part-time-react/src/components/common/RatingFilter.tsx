import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StarRating } from "./StarRating";

interface RatingFilterProps {
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  className?: string;
}

export const RatingFilter = ({
  selectedRating,
  onRatingChange,
  className,
}: RatingFilterProps) => {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-foreground mb-3">
        Filter by Rating
      </p>
      <div className="space-y-1">
        <Button
          variant={selectedRating === null ? "default" : "outline"}
          size="sm"
          onClick={() => onRatingChange(null)}
          className="w-full justify-start"
        >
          All Ratings
        </Button>
        {ratings.map((rating) => (
          <Button
            key={rating}
            variant={selectedRating === rating ? "secondary" : "outline"}
            size="sm"
            onClick={() => onRatingChange(rating)}
            className="w-full justify-start gap-2 cursor-pointer"
          >
            <StarRating rating={rating} size="sm" />
            <span className="text-xs text-gray-400">& up</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
