import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

interface HomeStats {
  activeJobs: number;
  totalJobs: number;
  totalJobSeekers: number;
  totalEmployers: number;
}

const useHomeStats = () => {
  const apiClient = new APIClient<HomeStats>("/jobs/stats");

  return useQuery<HomeStats>({
    queryKey: ["publicStats"],
    queryFn: async () => {
      const data = await apiClient.getAll();
      return {
        activeJobs: data.activeJobs || 0,
        totalJobs: data.totalJobs || 0,
        totalJobSeekers: data.totalJobSeekers || 0,
        totalEmployers: data.totalEmployers || 0,
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

export default useHomeStats;
