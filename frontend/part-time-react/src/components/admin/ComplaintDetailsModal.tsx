import {
  X,
  AlertTriangle,
  User,
  Mail,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Ban,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "@/services/apiClient";
import type { AdminComplaint } from "@/components/admin/ComplaintsTable";

interface Props {
  open: boolean;
  complaint: AdminComplaint | null;
  onClose: () => void;
  onActionSuccess: () => void;
}

export default function ComplaintDetailsModal({
  open,
  complaint,
  onClose,
  onActionSuccess,
}: Props) {
  if (!open || !complaint) return null;

  const updateStatus = async (status: "RESOLVED" | "REJECTED") => {
    await axiosInstance.put(
      `/admin/complaints/${complaint.id}/status`,
      null,
      { params: { status } }
    );

    onActionSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-[#0f172a] w-full max-w-2xl rounded-[2rem] border border-slate-800 relative overflow-hidden"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-[#fbbf24] hover:text-slate-900"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="p-8 border-b border-slate-800 flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <AlertTriangle className="text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Complaint Details
              </h2>
              <p className="text-xs text-slate-400 uppercase">
                {complaint.type}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div>
              <p className="text-xs text-slate-400 uppercase mb-1">
                Description
              </p>
              <p className="text-slate-200 leading-relaxed">
                {complaint.description}
              </p>
            </div>

            <Info label="Reporter" value={`${complaint.reporterName} (${complaint.reporterEmail})`} icon={<User size={16} />} />
            <Info label="Target" value={`${complaint.targetName} (${complaint.targetEmail})`} icon={<Mail size={16} />} />
            <Info label="Created" value={complaint.createdAt} icon={<Clock size={16} />} />

            <div className="flex items-center gap-2 text-sm">
              <ShieldAlert size={16} />
              <span className="font-bold text-yellow-400">
                {complaint.status}
              </span>
            </div>
          </div>

          {/* Footer */}
          {complaint.status === "PENDING" && (
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => updateStatus("REJECTED")}
                className="px-6 py-2 rounded-xl bg-rose-500/10 text-rose-400 font-bold flex items-center gap-2"
              >
                <Ban size={16} />
                Reject
              </button>

              <button
                onClick={() => updateStatus("RESOLVED")}
                className="px-6 py-2 rounded-xl bg-emerald-500 text-black font-bold flex items-center gap-2"
              >
                <CheckCircle2 size={16} />
                Resolve
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-xl bg-[#1e293b]/50 border border-slate-800">
      <div className="flex items-center gap-2 text-xs text-yellow-400 mb-1">
        {icon}
        {label}
      </div>
      <p className="text-slate-200 text-sm">{value}</p>
    </div>
  );
}
