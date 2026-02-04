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
    comment: "Very responsible and hardworking. Demonstrates a positive attitude, manages responsibilities efficiently, and can be trusted to handle tasks independently.",
    employer: "ABC Hotel",
    date: "11 days ago",
  },
  {
    id: 2,
    rating: 3,
    comment: "Shows excellent teamwork by communicating effectively and supporting team members.",
    employer: "XYZ Company",
    date: "4 days ago",
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
          {/* Stars + employer */}
        <div className="flex items-center justify-between mb-2">

          <span className="text-lg font-semibold text-secondary dark:text-primary">
            {review.employer}
          </span>

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

        </div>

          {/* Comment */}
          <div className="bg-[#E0E7F5]/40 dark:bg-card/40 rounded-lg p-3 mr-6">
            <p className="text-sm italic text-secondary/80 dark:text-primary/80 mb-1">{review.comment}</p>
          </div>
         

          {/* date */}
          <div className="text-xs text-secondary/70 dark:text-primary/70 flex ml-4 justify-between">
            <span>{review.date}</span>

          </div>
        </div>
      ))}
    </div>
  );
}
