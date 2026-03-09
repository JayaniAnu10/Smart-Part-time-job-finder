import { useState, useMemo } from "react";
import StatusFilter from "@/components/admin/Statusfilter";
import JobsTable from "@/components/admin/JobsTable";
import { useAdminJobs } from "@/hooks/useAdminJobs";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/adminDashboard/AdminSidebar";

export default function ModerateJobPosts() {
  const [status, setStatus] = useState<string>("ALL");
  const [keyword, setKeyword] = useState("");
  const { jobs, loading, error, refetch } = useAdminJobs(status);

  const filteredJobs = useMemo(() => {
    let data = jobs;
    if (status !== "ALL") data = data.filter((job) => job.status === status);
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      data = data.filter(
        (job) =>
          (job.title ?? "").toLowerCase().includes(q) ||
          (job.company ?? "").toLowerCase().includes(q)
      );
    }
    return data;
  }, [jobs, status, keyword]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      
      {/* Sidebar */}
      <div className="w-72 shrink-0 border-r border-slate-200 dark:border-slate-800/50 hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 space-y-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Moderate <span className="text-secondary dark:text-[#fbbf24]">Job Posts</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Review, approve, or reject job listings to maintain platform quality.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <StatusFilter status={status} onStatusChange={setStatus} onSearch={setKeyword} />
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-secondary/20 dark:border-[#fbbf24]/20 border-t-secondary dark:border-t-[#fbbf24] rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-center font-bold">
            {error}
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <JobsTable jobs={filteredJobs} refetch={refetch} />
          </motion.div>
        )}

      </main>
    </div>
  );
}