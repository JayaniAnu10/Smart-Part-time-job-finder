import { X } from "lucide-react";
import JobDetailsView from "@/components/job/JobDetailsView";
import { useAdminJobDetails } from "@/hooks/useAdminJobDetails";

interface ViewJobModalProps {
  open: boolean;
  onClose: () => void;
  job: { id: string } | null;
}

export default function ViewJobModal({
  open,
  onClose,
  job,
}: ViewJobModalProps) {
  const {
    job: jobDetails,
    loading,
    error,
  } = useAdminJobDetails(job?.id);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="
          bg-white dark:bg-background
          w-full max-w-4xl
          rounded-xl shadow-lg
          relative
          max-h-[90vh] overflow-y-auto
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-secondary"
        >
          <X />
        </button>

        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-secondary dark:text-primary">
            Job Details
          </h2>
          <p className="text-muted-foreground text-sm">
            Admin view – read only
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading && (
            <p className="text-muted-foreground">
              Loading job details...
            </p>
          )}

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {jobDetails && <JobDetailsView job={jobDetails} />}
        </div>

        {/* Actions */}
        <div className="border-t p-6 flex justify-end gap-4">
          <button
            className="
              px-6 py-2 rounded-lg
              bg-green-500 text-white
              font-semibold text-sm
              hover:bg-green-600
              transition
            "
          >
            Approve
          </button>

          <button
            className="
              px-6 py-2 rounded-lg
              bg-red-500 text-white
              font-semibold text-sm
              hover:bg-red-600
              transition
            "
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
