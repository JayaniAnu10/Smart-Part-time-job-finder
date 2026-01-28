import { useState } from "react";
import {Star} from "lucide-react";

interface Props {
  jobId: number;
  onClose: () => void;
}

export default function AddRatingDialog({ jobId, onClose }: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          rating,
          comment,
        }),
      });

      alert("Rating submitted");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error submitting rating");
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-3xl font-semibold text-secondary dark:text-primary font-semibold">Add Rating</h2>

        <div>
          <label className="text-m font-medium text-secondary/90 dark:text-primary/90">Rating</label>
          <div className="flex space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={30}
                className={`cursor-pointer transition-all ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-secondary/70 dark:text-primary/70"
                }`}
                onClick={() => setRating(star)}
              />
            ))} 
          </div>
        </div>

        <div>
          <label className="text-m font-medium text-secondary/90 dark:text-primary/90">Review (Optional)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full rounded text-secondary dark:text-primary focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} 
                  className="px-4 py-1 rounded border border-secondary/60 bg-primary-foreground/60 dark:border-white/30 
                             dark:bg-white/10 dark:text-white backdrop-blur-sm text-[18px] text-secondary foreground transition-all 
                             duration-300 hover:scale-102 active:scale-98 hover:bg-primary-foreground/40 dark:hover:bg-secondary/50 
                             hover:text-secondary dark:hover:text-secondary-foreground cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 rounded bg-yellow-400 text-secondary hover:scale-102 active:scale-98 transition cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
