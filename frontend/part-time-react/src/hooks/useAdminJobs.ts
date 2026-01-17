import { useCallback, useEffect, useState } from "react";
import APIClient from "@/services/apiClient";

export type AdminJob = {
  id: string;
  title: string;
  category: string;
  employerEmail: string;
  status: "ACTIVE" | "CLOSED";
  postedDate: string;
};

const jobClient = new APIClient<AdminJob[]>("/admin/jobs");

export function useAdminJobs(status?: string, keyword?: string) {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data: AdminJob[];

      if (keyword && keyword.trim() !== "") {
        data = await jobClient.getAll({ keyword });
      } else if (status && status !== "ALL") {
        data = await jobClient.getAll({ status });
      } else {
        data = await jobClient.get();
      }

      setJobs(data); 
    } catch {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [status, keyword]);

  // initial load + filter change
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    refetch: fetchJobs, 
  };
}
