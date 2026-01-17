import { X, User, Calendar, Mail, ShieldCheck, Activity, Fingerprint, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import APIClient from "@/services/apiClient";

interface Props {
  open: boolean;
  userId: string | null;
  onClose: () => void;
}

export default function UserDetailsModal({ open, userId, onClose }: Props) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !userId) return;

    setLoading(true);
    const client = new APIClient<any>(`/admin/users/${userId}`);

    client
      .get()
      .then(setUser)
      .finally(() => setLoading(false));
  }, [open, userId]);

  return (
    <AnimatePresence>
      {open && userId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with heavy blur to match brand feel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="bg-[#0f172a] w-full max-w-2xl rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-slate-800 relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Theme Gradient Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent opacity-50" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 rounded-xl bg-slate-800/50 hover:bg-[#fbbf24] hover:text-slate-900 text-slate-400 transition-all duration-300"
            >
              <X size={18} />
            </button>

            {/* Header / Identity Section */}
            <div className="p-8 pt-10 flex flex-col items-center sm:flex-row gap-6 border-b border-slate-800 bg-slate-900/30">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#fbbf24] to-amber-200 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative h-20 w-20 rounded-2xl bg-[#1e293b] flex items-center justify-center border border-slate-700">
                  <User className="text-[#fbbf24]" size={36} />
                </div>
              </div>
              
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {user?.name || "Member Profile"}
                </h2>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5 text-slate-400">
                  <Fingerprint size={14} className="text-[#fbbf24]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-70">Admin Management Portal</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8 bg-[#0f172a]">
              {loading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-4 w-32 bg-slate-800 rounded" />
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-slate-800/50 rounded-2xl" />)}
                  </div>
                </div>
              ) : user ? (
                <>
                  {/* Info Cards */}
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard 
                      icon={<Mail size={18} />} 
                      label="Contact Email" 
                      value={user.email} 
                    />
                    <InfoCard 
                      icon={<Calendar size={18} />} 
                      label="Date Joined" 
                      value={user.createdAt} 
                    />
                  </section>

                  {/* Status & Permissions */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-slate-800" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Account Control</span>
                      <div className="h-px flex-1 bg-slate-800" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-[#1e293b]/50 border border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Access Level</p>
                          <p className="text-white font-semibold">{user.role}</p>
                        </div>
                        <ShieldCheck className="text-indigo-400 opacity-50" size={24} />
                      </div>

                      <div className="p-5 rounded-2xl bg-[#1e293b]/50 border border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Status</p>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${user.status === "ACTIVE" ? "bg-emerald-500" : "bg-rose-500"} animate-pulse`} />
                            <p className={`font-bold ${user.status === "ACTIVE" ? "text-emerald-400" : "text-rose-400"}`}>
                              {user.status}
                            </p>
                          </div>
                        </div>
                        <Activity className="text-slate-600 opacity-50" size={24} />
                      </div>
                    </div>
                  </section>
                </>
              ) : null}
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex flex-col sm:flex-row gap-3 sm:justify-end items-center">
               <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-transparent text-slate-400 text-sm font-bold hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-10 py-3 rounded-xl bg-[#fbbf24] text-[#0f172a] text-sm font-black uppercase tracking-wider hover:bg-[#fcd34d] transition-all transform active:scale-95 shadow-[0_4px_20px_-5px_rgba(251,191,36,0.4)]"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-[#1e293b]/50 border border-slate-800 hover:border-slate-600 transition-all group">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-[#fbbf24] group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-slate-200 font-medium truncate pl-7">{value}</p>
    </div>
  );
}