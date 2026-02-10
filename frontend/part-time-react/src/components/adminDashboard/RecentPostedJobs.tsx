import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, ChevronRight, Zap } from "lucide-react";
import { useRecentJobs } from "@/hooks/useRecentJobs";
import { cn } from "@/lib/utils"; // Assuming you have a cn helper

export default function RecentPostedJobs() {
  const { jobs, loading, error } = useRecentJobs();

  return (
    <Card className="rounded-3xl border-none bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-2xl shadow-zinc-200/50 dark:shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Recently Posted
          </CardTitle>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md">
            Live Feed
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-1">
        {loading && (
          <div className="space-y-4 p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="h-10 w-10 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-1/2 bg-zinc-100 dark:bg-zinc-900 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="p-4 text-center">
             <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 py-2 rounded-lg">{error}</p>
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-sm text-zinc-400">No recent opportunities found.</p>
          </div>
        )}

        {jobs.map((job) => (
          <div
            key={job.id}
            className="group relative flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            {/* Animated Icon Container */}
            <div className="relative mt-1">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none transition-transform group-hover:rotate-6">
                <Briefcase size={20} />
              </div>
              {job.status === "ACTIVE" && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white dark:border-zinc-900"></span>
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h4 className="font-bold text-zinc-800 dark:text-zinc-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {job.title}
                </h4>
                <ChevronRight size={16} className="text-zinc-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {job.company}
                </span>
                <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-400">
                  <Clock size={12} />
                  {formatTime(job.postedDate)}
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2">
                <span className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  job.status === "ACTIVE" 
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" 
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                )}>
                  {job.status === "ACTIVE" && <Zap size={10} className="fill-current" />}
                  {job.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* ================= Helper ================= */
function formatTime(date: string) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}