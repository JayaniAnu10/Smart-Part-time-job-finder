import { Eye, Briefcase, Building2, Calendar, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { AdminJob } from "@/hooks/useAdminJobs";
import ViewJobModal from "./ViewJobModal";

interface Props {
  jobs: AdminJob[];
  refetch: () => void;
}

export default function JobsTable({ jobs, refetch }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<AdminJob | null>(null);

  return (
    <>
      <div className="bg-white dark:bg-[#0f172a]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm dark:shadow-2xl transition-all duration-500">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            {/* Table Head */}
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-5 font-bold uppercase tracking-wider text-left">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-secondary dark:text-[#fbbf24]" />
                    Job Title
                  </div>
                </th>
                <th className="p-5 font-bold uppercase tracking-wider text-left">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} />
                    Company
                  </div>
                </th>
                <th className="p-5 font-bold uppercase tracking-wider text-left">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} />
                    Status
                  </div>
                </th>
                <th className="p-5 font-bold uppercase tracking-wider text-left">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    Posted
                  </div>
                </th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {jobs.map((job) => (
                <tr 
                  key={job.id} 
                  className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors duration-300"
                >
                  <td className="p-5">
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-secondary dark:group-hover:text-[#fbbf24] transition-colors">
                      {job.title}
                    </p>
                  </td>
                  
                  <td className="p-5 text-slate-600 dark:text-slate-400 font-medium">
                    {job.company}
                  </td>

                  <td className="p-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                        ${
                          job.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                        }
                      `}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${job.status === "ACTIVE" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                      {job.status}
                    </span>
                  </td>

                  <td className="p-5 text-slate-500 dark:text-slate-500 font-medium whitespace-nowrap">
                    {job.postedDate}
                  </td>

                  <td className="p-5 text-right">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setOpen(true);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl 
                                 bg-secondary dark:bg-[#fbbf24] text-white dark:text-[#020617] 
                                 font-bold text-xs uppercase tracking-widest 
                                 hover:scale-105 active:scale-95 transition-all 
                                 shadow-md dark:shadow-[#fbbf24]/20 group/btn"
                    >
                      <Eye size={16} className="group-hover/btn:animate-pulse" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
              
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-slate-400 font-medium italic">
                    No job postings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Integration */}
      <ViewJobModal
        open={open}
        job={selectedJob}
        onClose={() => {
          setOpen(false);
          setSelectedJob(null);
        }}
        onActionSuccess={refetch}
      />
    </>
  );
}