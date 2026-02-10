import { useEffect, useState } from "react";
import APIClient from "@/services/apiClient";

export interface RecentJob {
  id: string;
  title: string;
  companyName: string;
  postedDate: string;
  status: string;
}

const client = new APIClient<RecentJob[]>("/admin/jobs/recent");

export function useRecentJobs() {
  const [jobs, setJobs] = useState<RecentJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    client
      .get()
      .then(setJobs)
      .catch(() => setError("Failed to load recent jobs"))
      .finally(() => setLoading(false));
  }, []);

  return { jobs, loading, error };
}
