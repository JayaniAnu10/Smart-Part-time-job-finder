import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface JobStats {
  applicants: number;
  id: string;
  postedDate: string;
  status: string;
  title: string;
  deadline: Date;
}

export interface Stats {
  jobCount: number;
  applicantCount: number;
  pendingReviewCount: number;
  jobStats: JobStats[];
  monthRate: number;
}

const useEmpStats = (empId: string) => {
  const apiClient = new APIClient<Stats>(`/employer/stats/${empId}`);

  return useQuery<Stats, Error>({
    queryKey: ["employer", "stats", empId],
    queryFn: apiClient.getAll,
  });
};

export default useEmpStats;
