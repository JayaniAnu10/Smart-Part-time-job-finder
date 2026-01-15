import { useEffect, useState } from "react";
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

  useEffect(() => {
    let request: Promise<AdminJob[]>;

    setLoading(true);
    setError(null);

    
    if (keyword && keyword.trim() !== "") {
      request = jobClient.getAll({ keyword });
    }
    
    else if (status && status !== "ALL") {
      request = jobClient.getAll({ status });
    }
    
    else {
      request = jobClient.get();
    }

    request
      .then((data) => setJobs(data))
      .catch(() => setError("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, [status, keyword]);

  return { jobs, loading, error };
}
