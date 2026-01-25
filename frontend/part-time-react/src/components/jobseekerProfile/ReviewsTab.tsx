import { Star } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  comment: string;
  employer: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment: "Very responsible and hardworking.",
    employer: "ABC Hotel",
    date: "December 20, 2025",
  },
  {
    id: 2,
    rating: 3,
    comment: "Better teamwork.",
    employer: "XYZ Company",
    date: "May 3, 2025",
  },
];

export default function ReviewsTab() {
  if (mockReviews.length === 0) {
    return <p className="text-xl font-semibold text-center text-secondary dark:text-primary">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {mockReviews.map((review) => (
        <div
          key={review.id}
          className="rounded-xl p-4 bg-[#FAFAFA] dark:bg-background shadow-md"
        >
          {/* Stars + Date */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={16}
                className={
                n <= review.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-secondary/80 dark:text-primary/80"
                }
              />
           ))}
          </div>  

          <span className="text-xs text-muted-foreground">
            {review.date}
          </span>
        </div>

          {/* Comment */}
          <p className="text-sm text-secondary dark:text-primary mb-1">{review.comment}</p>

          {/* Footer */}
          <div className="text-xs text-secondary/70 dark:text-primary/70 flex justify-between">
            <span>{review.employer}</span>

          </div>
        </div>
      ))}
    </div>
  );
}
