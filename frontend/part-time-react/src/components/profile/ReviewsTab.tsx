import { Star } from "lucide-react";
import useJobSeekerRatings from "@/hooks/useJobSeekerRatings";
import { useAuthStore } from "@/store/AuthStore";

// Simple function to get time ago without date-fns
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  const years = Math.floor(diffInDays / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export default function ReviewsTab() {
  const { user } = useAuthStore();
  const {
    data: ratingsData,
    isLoading,
    error,
  } = useJobSeekerRatings(
    user?.id || "",
    0,
    50, // Get first 50 ratings
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-secondary dark:text-primary">
          Loading reviews...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-red-500">
          Error loading reviews: {error.message}
        </div>
      </div>
    );
  }

  const reviews = ratingsData?.content || [];

  if (reviews.length === 0) {
    return (
      <p className="text-xl font-semibold text-center text-secondary dark:text-primary py-12">
        No reviews yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        // Calculate how long ago the review was created
        const timeAgo = review.createdDate
          ? getTimeAgo(review.createdDate)
          : "Unknown date";

        return (
          <div
            key={review.id}
            className="rounded-xl p-4 bg-[#FAFAFA] dark:bg-background shadow-md"
          >
            {/* Stars + employer */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-secondary dark:text-primary">
                {review.raterName}
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
            {review.comment && (
              <div className="bg-[#E0E7F5]/40 dark:bg-card/40 rounded-lg p-3 mr-6 mb-2">
                <p className="text-sm italic text-secondary/80 dark:text-primary/80">
                  {review.comment}
                </p>
              </div>
            )}

            {/* Job title (if available) */}
            {review.jobTitle && review.jobTitle !== "N/A" && (
              <div className="text-sm text-secondary/70 dark:text-primary/70 ml-4 mb-1">
                Job: {review.jobTitle}
              </div>
            )}

            {/* date */}
            <div className="text-xs text-secondary/70 dark:text-primary/70 flex ml-4 justify-between">
              <span>{timeAgo}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
