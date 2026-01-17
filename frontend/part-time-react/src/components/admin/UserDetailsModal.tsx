import {
  X,
  User,
  Calendar,
  Mail,
  Fingerprint,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import APIClient from "@/services/apiClient";
import { useAdminUserActions } from "@/hooks/useAdminActions";

interface Props {
  open: boolean;
  userId: string | null;
  onClose: () => void;
  onStatusChange: () => void; 
}

export default function UserDetailsModal({
  open,
  userId,
  onClose,
  onStatusChange,
}: Props) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const { updateUserActiveStatus } = useAdminUserActions();

  useEffect(() => {
    if (!open || !userId) return;

    setLoading(true);
    const client = new APIClient<any>(`/admin/users/${userId}`);

    client
      .get()
      .then(setUser)
      .finally(() => setLoading(false));
  }, [open, userId]);

  const handleToggleVerification = async () => {
    if (!user) return;

    const nextVerified = user.status !== "VERIFIED";

    try {
      setActionLoading(true);
      await updateUserActiveStatus(user.id, nextVerified);

      setUser({
        ...user,
        status: nextVerified ? "VERIFIED" : "NOT_VERIFIED",
      });

      onStatusChange(); 
      setConfirm(false);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && userId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/80"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.25 }}
            className="bg-[#0f172a] w-full max-w-2xl rounded-[2rem] border border-slate-800 relative overflow-hidden flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-[#fbbf24] hover:text-slate-900"
            >
              <X size={18} />
            </button>

            <div className="p-8 flex items-center gap-6 border-b border-slate-800">
              <div className="h-20 w-20 rounded-2xl bg-[#1e293b] flex items-center justify-center">
                <User className="text-[#fbbf24]" size={36} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user?.name || "User"}
                </h2>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Fingerprint size={14} className="text-[#fbbf24]" />
                  ADMIN MANAGEMENT PORTAL
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {loading ? (
                <p className="text-slate-400">Loading...</p>
              ) : (
                user && (
                  <>
                    <InfoCard label="Email" value={user.email} icon={<Mail size={18} />} />
                    <InfoCard label="Joined" value={user.createdAt} icon={<Calendar size={18} />} />

                    <div className="p-5 rounded-2xl bg-[#1e293b]/50 border border-slate-800">
                      <p className="text-xs uppercase text-slate-500 mb-1">
                        Account Status
                      </p>
                      <p
                        className={`font-bold ${
                          user.status === "VERIFIED"
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {user.status === "VERIFIED"
                          ? "VERIFIED"
                          : "NOT VERIFIED"}
                      </p>
                    </div>
                  </>
                )
              )}
            </div>

            <div className="p-6 border-t border-slate-800 flex justify-between">
              {user && user.role !== "ADMIN" && (
                !confirm ? (
                  <button
                    onClick={() => setConfirm(true)}
                    className="px-6 py-2 rounded-xl bg-slate-700 text-white"
                  >
                    {user.status === "VERIFIED"
                      ? "Mark as Not Verified"
                      : "Verify User"}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirm(false)}
                      className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleToggleVerification}
                      disabled={actionLoading}
                      className="px-4 py-2 rounded-xl bg-[#fbbf24] text-black font-bold"
                    >
                      Yes, Confirm
                    </button>
                  </div>
                )
              )}

              <button
                onClick={onClose}
                className="px-8 py-2 rounded-xl bg-[#fbbf24] text-black font-bold"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function InfoCard({ label, value, icon }: any) {
  return (
    <div className="p-5 rounded-2xl bg-[#1e293b]/50 border border-slate-800">
      <div className="flex items-center gap-2 text-[#fbbf24] text-xs mb-1">
        {icon}
        {label}
      </div>
      <p className="text-white font-medium truncate">{value}</p>
    </div>
  );
}
