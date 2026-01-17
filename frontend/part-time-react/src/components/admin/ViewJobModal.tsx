import { X, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import JobDetailsView from "@/components/job/JobDetailsView";
import { useAdminJobDetails } from "@/hooks/useAdminJobDetails";
import { useAdminActions } from "@/hooks/useAdminActions";

interface ViewJobModalProps {
  open: boolean;
  onClose: () => void;
  job: { id: string } | null;
  onActionSuccess: () => void;
}

export default function ViewJobModal({
  open,
  onClose,
  job,
  onActionSuccess,
}: ViewJobModalProps) {
  const { job: jobDetails, loading, error } =
    useAdminJobDetails(job?.id);

  const {
    approveJob,
    rejectJob,
    deleteJob,
    loading: actionLoading,
  } = useAdminActions();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!open || !job) return null;

  const status = jobDetails?.status;

  const handleApprove = async () => {
    await approveJob(job.id);
    onActionSuccess();
    onClose();
  };

  const handleReject = async () => {
    await rejectJob(job.id);
    onActionSuccess();
    onClose();
  };

  const confirmDelete = async () => {
    await deleteJob(job.id);
    setShowDeleteConfirm(false);
    onActionSuccess();
    onClose();
  };

  return (
    <>
      {/* ================= MAIN MODAL ================= */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-secondary"
          >
            <X />
          </button>

          {/* Header */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-secondary">
              Job Details
            </h2>
            <p className="text-muted-foreground text-sm">
              Admin view – read only
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading && <p className="text-muted-foreground">Loading job details...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {jobDetails && <JobDetailsView job={jobDetails} />}
          </div>

          {/* Actions */}
          <div className="border-t p-6 flex justify-between items-center">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg
                         bg-red-100 text-red-700 font-semibold text-sm
                         hover:bg-red-200 disabled:opacity-50 transition"
            >
              <Trash2 size={16} />
              Delete Job
            </button>

            <div className="flex gap-4">
              {status === "CLOSED" && (
                <button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="px-6 py-2 rounded-lg bg-green-500 text-white
                             font-semibold text-sm hover:bg-green-600
                             disabled:opacity-50 transition"
                >
                  Approve
                </button>
              )}

              {status === "ACTIVE" && (
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="px-6 py-2 rounded-lg bg-red-500 text-white
                             font-semibold text-sm hover:bg-red-600
                             disabled:opacity-50 transition"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= DELETE CONFIRMATION ================= */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle />
              <h3 className="text-lg font-bold">Delete Job</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              This action is <strong>permanent</strong>.  
              All related data will be removed.  
              Are you sure you want to continue?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg border text-sm font-medium
                           hover:bg-muted transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg bg-red-500 text-white
                           text-sm font-semibold hover:bg-red-600
                           disabled:opacity-50 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
