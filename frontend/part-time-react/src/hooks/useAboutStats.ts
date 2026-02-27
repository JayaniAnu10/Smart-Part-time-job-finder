import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

interface AboutStats {
  totalUsers: number;
  totalJobs: number;
}

const useAboutStats = () => {
  const apiClient = new APIClient<AboutStats>("/admin/analytics/overview");

  return useQuery<AboutStats>({
    queryKey: ["aboutStats"],
    queryFn: async () => {
      const data = await apiClient.getAll();
      return {
        totalUsers: data.totalUsers || 0,
        totalJobs: data.totalJobs || 0,
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

export default useAboutStats;
