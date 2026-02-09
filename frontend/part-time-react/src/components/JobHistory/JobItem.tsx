import {
  Briefcase,
  Calendar,
  CircleDollarSign,
  Star,
  Trash2,
} from "lucide-react";
import type { Job } from "../../pages/JobHistory/JobHistory";
import useDeleteRating from "@/hooks/useDeleteRating";
import { useAuthStore } from "@/store/AuthStore";

interface JobItemProps {
  job: Job;
  onAddRating: () => void;
  onEditRating: () => void;
}

const JobItem = ({ job, onAddRating, onEditRating }: JobItemProps) => {
  const { user } = useAuthStore();
  const deleteRatingMutation = useDeleteRating();

  // Check if job has been rated
  const hasRating = job.rating > 0 && job.ratingId;

  const handleDeleteRating = async () => {
    if (!job.ratingId || !user?.id) return;

    if (window.confirm("Are you sure you want to delete this rating?")) {
      try {
        await deleteRatingMutation.mutateAsync({
          userId: user.id,
          ratingId: job.ratingId,
        });
      } catch (error) {
        console.error("Error deleting rating:", error);
      }
    }
  };

  return (
    <div className="p-7 flex flex-col gap-5">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h4 className="text-[24px] font-semibold tracking-tight text-slate-900 dark:text-white">
            {job.title}
          </h4>
          <p className="text-[16px] font-normal text-slate-500 dark:text-slate-400">
            {job.company}
          </p>
        </div>

        <span
          className="px-4 py-1.5 rounded-full text-[12px] font-bold
                       bg-[#e0e7ff] text-[#4338ca] 
                       dark:bg-white/10 dark:text-slate-300 dark:border dark:border-white/10"
        >
          {job.status}
        </span>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-x-12 gap-y-4 text-[15.5px]">
        <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
          <Calendar size={18} className="text-[#fbbd23]" strokeWidth={2.2} />
          <div className="flex flex-col">
            {job.dates.map((date, index) => (
              <span key={index} className="font-normal">
                {date}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
          <Briefcase size={18} className="text-[#fbbd23]" strokeWidth={2.2} />
          <span className="font-normal">{job.duration}</span>
        </div>

        <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
          <CircleDollarSign
            size={18}
            className="text-[#fbbd23]"
            strokeWidth={2.2}
          />
          <span className="font-normal">
            LKR {job.earnings.toLocaleString()}
          </span>
        </div>

        {hasRating ? (
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= job.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-slate-300 dark:text-slate-600"
                  }
                />
              ))}
            </div>
            <span className="font-medium text-slate-600 dark:text-slate-400 ml-1">
              {job.rating}/5
            </span>
          </div>
        ) : (
          <span className="font-normal ml-auto text-slate-400 dark:text-slate-500/50">
            No ratings yet
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <button className="px-6 py-2 border border-slate-300 dark:border-white/10 rounded-lg text-[13.5px] font-medium text-slate-600 dark:text-slate-400 transition-all hover:scale-105">
          View Details
        </button>

        {hasRating ? (
          <>
            <button
              onClick={onEditRating}
              className="px-6 py-2 rounded-lg text-[13.5px] font-semibold bg-yellow-400 text-secondary hover:bg-yellow-300 shadow-sm transition-all active:scale-97 cursor-pointer"
            >
              Edit Rating
            </button>
            <button
              onClick={handleDeleteRating}
              disabled={deleteRatingMutation.isPending}
              className="px-6 py-2 rounded-lg text-[13.5px] font-semibold bg-red-500 text-white hover:bg-red-600 shadow-sm transition-all active:scale-97 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Trash2 size={16} />
              {deleteRatingMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </>
        ) : (
          <button
            onClick={onAddRating}
            className="px-6 py-2 rounded-lg text-[13.5px] font-semibold bg-yellow-400 text-secondary hover:bg-yellow-300 shadow-sm transition-all active:scale-97 cursor-pointer"
          >
            Rate Employer
          </button>
        )}
      </div>
    </div>
  );
};

export default JobItem;
