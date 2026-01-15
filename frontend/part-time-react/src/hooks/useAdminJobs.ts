import { useEffect, useState } from "react";
import APIClient from "@/services/apiClient";

export type AdminJob = {
  id: string;
  title: string;
  companyName: string;
  location: string;
  status: "ACTIVE" | "CLOSED";
  createdAt: string;
};

const jobClient = new APIClient<AdminJob[]>("/admin/jobs");

export function useAdminJobs(status?: string, keyword?: string) {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let request;

    if (keyword) {
      request = jobClient.getAll({ keyword });
    } else if (status && status !== "ALL") {
      request = jobClient.getAll({ status });
    } else {
      request = jobClient.get();
    }

    request
      .then(setJobs)
      .catch(() => setError("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, [status, keyword]);

  return { jobs, loading, error };
}
