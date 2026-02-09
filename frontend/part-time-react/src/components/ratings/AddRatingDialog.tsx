import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import useSubmitRating from "@/hooks/useSubmitRating";
import useUpdateRating from "@/hooks/useUpdateRating";
import { useAuthStore } from "@/store/AuthStore";

interface Props {
  jobId: string;
  employerId: string;
  existingRating?: {
    id: string;
    rating: number;
    comment?: string;
  };
  onClose: () => void;
}

export default function AddRatingDialog({
  jobId,
  employerId,
  existingRating,
  onClose,
}: Props) {
  const [rating, setRating] = useState(existingRating?.rating || 0);
  const [comment, setComment] = useState(existingRating?.comment || "");
  const { user } = useAuthStore();

  const submitRatingMutation = useSubmitRating();
  const updateRatingMutation = useUpdateRating();

  const isEditMode = !!existingRating;

  // Update state when existingRating changes
  useEffect(() => {
    if (existingRating) {
      setRating(existingRating.rating);
      setComment(existingRating.comment || "");
    }
  }, [existingRating]);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    if (!user?.id) {
      alert("User not authenticated");
      return;
    }

    try {
      if (isEditMode && existingRating) {
        // Update existing rating
        await updateRatingMutation.mutateAsync({
          id: existingRating.id,
          raterId: user.id,
          rateReceiverId: employerId,
          rating,
          comment: comment || undefined,
        });
      } else {
        // Submit new rating
        await submitRatingMutation.mutateAsync({
          jobId,
          raterId: user.id,
          rateReceiverId: employerId,
          rating,
          comment: comment || undefined,
        });
      }
      onClose();
    } catch (err) {
      console.error("Error submitting/updating rating:", err);
    }
  };

  const isLoading =
    submitRatingMutation.isPending || updateRatingMutation.isPending;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-2xl font-semibold text-yellow-400">
          {isEditMode ? "Edit Rating" : "Add Rating"}
        </h2>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Rating
          </label>

          <div className="flex space-x-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={30}
                className={`cursor-pointer transition-all ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-300 dark:text-slate-600"
                }`}
                onClick={() => setRating(star)}
                aria-label={`${star} star`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Review (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-2 w-full rounded text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 mt-2"
            rows={4}
            placeholder="Write a comment..."
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-slate-900 font-medium hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : isEditMode ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
