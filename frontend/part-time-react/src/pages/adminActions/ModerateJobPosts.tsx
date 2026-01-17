import { useState, useMemo } from "react";
import StatusFilter from "@/components/admin/Statusfilter";
import JobsTable from "@/components/admin/JobsTable";
import { useAdminJobs } from "@/hooks/useAdminJobs";

export default function ModerateJobPosts() {
  const [status, setStatus] = useState<string>("ALL");
  const [keyword, setKeyword] = useState("");

  const { jobs, loading, error, refetch } = useAdminJobs(status);

  
  const filteredJobs = useMemo(() => {
    if (!keyword.trim()) return jobs;

    const q = keyword.toLowerCase();

    return jobs.filter((job) =>
      (job.title ?? "").toLowerCase().includes(q) ||
      (job.category ?? "").toLowerCase().includes(q) ||
      (job.employerEmail ?? "").toLowerCase().includes(q)
    );
  }, [jobs, keyword]);

  return (
    <div className="p-12 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary dark:text-primary">
          Moderate Job Posts
        </h1>
        <p className="text-secondary/70 dark:text-primary/70">
          Review, approve, or reject job listings
        </p>
      </div>

      {/* Filters */}
      <StatusFilter
        status={status}
        onStatusChange={setStatus}
        onSearch={setKeyword}
      />

      {/* States */}
      {loading && <p className="text-muted-foreground">Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <JobsTable
          jobs={filteredJobs}
          refetch={refetch}
        />
      )}
    </div>
  );
}
