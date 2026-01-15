import { useState } from "react";
import StatusFilter from "@/components/admin/Statusfilter";
import JobsTable from "@/components/admin/JobsTable";
import { useAdminJobs } from "@/hooks/useAdminJobs";

export default function ModerateJobPosts() {
  const [status, setStatus] = useState<string>("ALL");
  const [keyword, setKeyword] = useState("");

  const { jobs, loading, error } = useAdminJobs(status, keyword);

  return (
    <div className="p-12 space-y-6">
      {/* Page Header */}
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

      {/* Jobs Table */}
      {!loading && !error && <JobsTable jobs={jobs} />}
    </div>
  );
}
