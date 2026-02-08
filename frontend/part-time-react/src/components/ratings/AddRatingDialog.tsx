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
<<<<<<< HEAD
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-3xl font-semibold text-secondary dark:text-primary font-semibold">Add Rating</h2>

        <div>
          <label className="text-m font-medium text-secondary/90 dark:text-primary/90">Rating</label>
          <div className="flex space-x-1 mt-1">
=======
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
>>>>>>> main
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={30}
                className={`cursor-pointer transition-all ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
<<<<<<< HEAD
                    : "text-secondary/70 dark:text-primary/70"
=======
                    : "text-slate-300 dark:text-slate-600"
>>>>>>> main
                }`}
                onClick={() => setRating(star)}
                aria-label={`${star} star`}
              />
            ))}
          </div>
        </div>

        <div>
<<<<<<< HEAD
          <label className="text-m font-medium text-secondary/90 dark:text-primary/90">Review (Optional)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full rounded text-secondary dark:text-primary focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
=======
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Review (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-2 w-full rounded text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 mt-2"
            rows={4}
            placeholder="Write a comment..."
>>>>>>> main
          />
        </div>

        <div className="flex justify-end gap-3">
<<<<<<< HEAD
          <button onClick={onClose} 
                  className="px-4 py-1 rounded border border-secondary/60 bg-primary-foreground/60 dark:border-white/30 
                             dark:bg-white/10 dark:text-white backdrop-blur-sm text-[18px] text-secondary foreground transition-all 
                             duration-300 hover:scale-102 active:scale-98 hover:bg-primary-foreground/40 dark:hover:bg-secondary/50 
                             hover:text-secondary dark:hover:text-secondary-foreground cursor-pointer">
=======
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
>>>>>>> main
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
