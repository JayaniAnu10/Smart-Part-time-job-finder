import {
  X,
  Trash2,
  Briefcase,
  ShieldAlert,
  CheckCircle2,
  Ban,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const { job: jobDetails, loading, error } = useAdminJobDetails(job?.id);

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
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
          />

          {/* ================= MAIN MODAL ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#0f172a] w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-slate-800 relative flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 rounded-xl bg-slate-800/50 hover:bg-[#fbbf24] hover:text-slate-900 text-slate-400 transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="p-8 border-b border-slate-800 bg-slate-900/40 flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-[#1e293b] flex items-center justify-center border border-slate-700 shadow-inner">
                <Briefcase className="text-[#fbbf24]" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Job Management
                </h2>
                <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                  Verification & Moderation Portal
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 overflow-y-auto custom-scrollbar bg-[#0f172a]">
              {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-10 h-10 border-4 border-[#fbbf24]/10 border-t-[#fbbf24] rounded-full animate-spin mb-4" />
                  <p className="text-slate-400 font-medium">
                    Loading details...
                  </p>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center font-medium">
                  {error}
                </div>
              )}

              {/* Added high-contrast wrapper for the internal component */}
              {jobDetails && (
                <div
                  className="text-slate-200 prose prose-invert max-w-none 
                                [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white 
                                [&_p]:text-slate-300 [&_strong]:text-[#fbbf24] [&_li]:text-slate-300"
                >
                  <JobDetailsView job={jobDetails} />
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="border-t border-slate-800 p-6 bg-slate-900/80 flex flex-wrap justify-between items-center gap-4">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={actionLoading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500/10 text-rose-500 font-bold text-sm hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
              >
                <Trash2 size={18} />
                Remove Listing
              </button>

              <div className="flex gap-3">
                {status === "CLOSED" && (
                  <button
                    onClick={handleApprove}
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#fbbf24] text-[#0f172a] font-black text-sm uppercase tracking-wider hover:bg-[#fcd34d] transition-all transform active:scale-95 shadow-[0_4px_20px_-5px_rgba(251,191,36,0.4)]"
                  >
                    <CheckCircle2 size={18} />
                    Approve & Publish
                  </button>
                )}

                {status === "ACTIVE" && (
                  <button
                    onClick={handleReject}
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-rose-600 transition-all active:scale-95"
                  >
                    <Ban size={18} />
                    Reject Listing
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* ================= DELETE CONFIRMATION ================= */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#1e293b] rounded-[2rem] shadow-3xl w-full max-w-md p-8 relative border border-slate-700"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 mb-6">
                      <ShieldAlert size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      Delete Job Listing?
                    </h3>
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                      This action is{" "}
                      <span className="text-rose-400 font-bold underline">
                        permanent
                      </span>
                      . The listing will be removed from all search results
                      immediately.
                    </p>

                    <div className="flex w-full gap-3">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800 text-white text-sm font-bold hover:bg-slate-700 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmDelete}
                        disabled={actionLoading}
                        className="flex-1 px-4 py-3 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 transition"
                      >
                        Confirm Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
