import {
  Eye,
  AlertTriangle,
  User,
  Mail,
  Clock,
  ShieldAlert,
} from "lucide-react";

/* ================= TYPES ================= */

export type ComplaintStatus = "PENDING" | "RESOLVED" | "REJECTED";

export interface AdminComplaint {
  id: string;
  description: string;
  createdAt: string;
  status: string; // accept backend raw value
  type: string;
  reporterName: string;
  reporterEmail: string;
  targetName: string;
  targetEmail: string;
}

interface Props {
  complaints: AdminComplaint[];
  onView: (complaint: AdminComplaint) => void;
}

/* ================= HELPERS ================= */

function normalizeStatus(status: string): ComplaintStatus {
  if (status === "OPEN") return "PENDING";
  if (status === "RESOLVED") return "RESOLVED";
  if (status === "REJECTED") return "REJECTED";
  return "PENDING"; // fallback safety
}

function formatTime(date: string) {
  const diff = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

/* ================= COMPONENT ================= */

export default function ComplaintsTable({ complaints, onView }: Props) {
  return (
    <div className="bg-white dark:bg-[#0f172a]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm dark:shadow-2xl transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          {/* ================= HEADER ================= */}
          <thead className="bg-slate-50/60 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-5 text-left font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} />
                  Complaint
                </div>
              </th>
              <th className="p-5 text-left font-bold uppercase tracking-wider">
                <User size={14} />
                Reporter
              </th>
              <th className="p-5 text-left font-bold uppercase tracking-wider">
                <User size={14} />
                Target
              </th>
              <th className="p-5 text-left font-bold uppercase tracking-wider">
                <ShieldAlert size={14} />
                Status
              </th>
              <th className="p-5 text-left font-bold uppercase tracking-wider">
                <Clock size={14} />
                Created
              </th>
              <th className="p-5 text-right font-bold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {complaints.map((c) => {
              const status = normalizeStatus(c.status);

              return (
                <tr
                  key={c.id}
                  className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors"
                >
                  {/* Complaint */}
                  <td className="p-5 max-w-[320px]">
                    <p className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                      {c.description}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 uppercase tracking-wide">
                      {c.type}
                    </p>
                  </td>

                  {/* Reporter */}
                  <td className="p-5">
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {c.reporterName}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Mail size={12} />
                      {c.reporterEmail}
                    </p>
                  </td>

                  {/* Target */}
                  <td className="p-5">
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {c.targetName}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Mail size={12} />
                      {c.targetEmail}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                        ${
                          status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                            : status === "RESOLVED"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                        }
                      `}
                    >
                      {status}
                    </span>
                  </td>

                  {/* Created */}
                  <td className="p-5 text-slate-500 whitespace-nowrap">
                    {formatTime(c.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="p-5 text-right">
                    <button
                      onClick={() => onView(c)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl 
                                 bg-secondary dark:bg-[#fbbf24] text-white dark:text-[#020617] 
                                 font-bold text-xs uppercase tracking-widest 
                                 hover:scale-105 active:scale-95 transition-all 
                                 shadow-md dark:shadow-[#fbbf24]/20"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}

            {complaints.length === 0 && (
              <tr>
                <td colSpan={6} className="p-20 text-center text-slate-400 italic">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
