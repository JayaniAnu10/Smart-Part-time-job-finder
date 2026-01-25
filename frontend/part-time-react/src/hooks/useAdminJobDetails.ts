import { useEffect, useState } from "react";
import APIClient from "@/services/apiClient";

export type AdminJobDetails = {
  id: string;
  title: string;
  companyName: string;
  location: string;
  category: string;
  status: string;
  postedDate: string;
  description: string;
  requirements: string;
  benefits: string;
  minSalary: number;
  maxSalary: number;
};

export function useAdminJobDetails(jobId?: string) {
  const [job, setJob] = useState<AdminJobDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    setLoading(true);
    setError(null);

    const client = new APIClient<AdminJobDetails>(
      `/admin/jobs/${jobId}/details`
    );

    client
      .get()
      .then(setJob)
      .catch(() => setError("Failed to load job details"))
      .finally(() => setLoading(false));
  }, [jobId]);

  return { job, loading, error };
}
