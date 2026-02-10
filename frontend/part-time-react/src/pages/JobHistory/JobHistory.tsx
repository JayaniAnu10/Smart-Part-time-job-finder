import { Briefcase, CircleDollarSign, Star } from "lucide-react";
import StatsCard from "@/components/JobHistory/StatsCard";
import JobItem from "@/components/JobHistory/JobItem";
import { useState } from "react";
import AddRatingDialog from "@/components/ratings/AddRatingDialog";
import useJobHistory from "@/hooks/useJobHistory";
import { useAuthStore } from "@/store/AuthStore";

export interface Job {
  id: string;
  jobId: string;
  employerId: string;
  title: string;
  company: string;
  dates: string[];
  duration: string;
  earnings: number;
  status: string;
  rating: number;
  ratingId: string | null;
  comment: string | null;
}

interface RatingDialogState {
  jobId: string;
  employerId: string;
  existingRating?: {
    id: string;
    rating: number;
    comment?: string;
  };
}

export const JobHistory = () => {
  const [ratingDialog, setRatingDialog] = useState<RatingDialogState | null>(
    null,
  );
  const { user } = useAuthStore();

  // Fetch job history data using the custom hook
  const {
    data: jobHistoryData,
    isLoading,
    error,
  } = useJobHistory(user?.id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading job history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">
          Error loading job history: {error.message}
        </div>
      </div>
    );
  }

  // Transform backend data to match Job interface
  const transformedJobs: Job[] =
    jobHistoryData?.completedJobs.map((job, index) => {
      // Format dates
      const formattedDates = job.jobScheduleDates.map((date) =>
        new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      );

      return {
        id: `${index}`,
        jobId: job.jobId,
        employerId: job.employerId,
        title: job.jobTitle,
        company: job.employerName,
        dates: formattedDates,
        duration: `${job.workedHours.toFixed(1)} hours`,
        earnings: job.salary,
        status: "Completed",
        rating: job.rating,
        ratingId: job.ratingId,
        comment: job.comment,
      };
    }) || [];

  const handleAddRating = (job: Job) => {
    setRatingDialog({
      jobId: job.jobId,
      employerId: job.employerId,
    });
  };

  const handleEditRating = (job: Job) => {
    if (job.ratingId) {
      setRatingDialog({
        jobId: job.jobId,
        employerId: job.employerId,
        existingRating: {
          id: job.ratingId,
          rating: job.rating,
          comment: job.comment || undefined,
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-background text-secondary dark:text-primary">
      <div className="grow pt-14 pb-20">
        <div className="mx-8 md:mx-20">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight text-slate-900 dark:text-white">
            Job History
          </h1>

          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatsCard
              label="Jobs Completed"
              value={jobHistoryData?.completedJobsCount || 0}
              icon={Briefcase}
            />
            <StatsCard
              label="Total Earnings"
              value={`LKR ${(jobHistoryData?.totalEarnings || 0).toLocaleString()}`}
              icon={CircleDollarSign}
            />
            <StatsCard
              label="Average Rating"
              value={(jobHistoryData?.averageRate || 0).toFixed(1)}
              icon={Star}
            />
          </div>

          <div className="border shadow-md rounded-xl p-3">
            {/* Header section inside the main card */}
            <div className="p-3 md:p-5 border-b border-gray-400/50 dark:border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-medium text-slate-800 dark:text-white">
                Completed Jobs
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-gray-400/50 dark:divide-white/5 p-3">
              {transformedJobs.length > 0 ? (
                transformedJobs.map((job) => (
                  <JobItem
                    key={job.id}
                    job={job}
                    onAddRating={() => handleAddRating(job)}
                    onEditRating={() => handleEditRating(job)}
                  />
                ))
              ) : (
                <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                  No completed jobs yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {ratingDialog && (
        <AddRatingDialog
          jobId={ratingDialog.jobId}
          employerId={ratingDialog.employerId}
          existingRating={ratingDialog.existingRating}
          onClose={() => setRatingDialog(null)}
        />
      )}
    </div>
  );
};

export default JobHistory;
