import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

interface JobStats {
  totalJobs: number;
  totalEarning: number;
}

interface UpcomingJobs {
  id: string;
  title: string;
  name: string;
  minSalary: number;
  startDatetime: string | null;
  endDatetime: string | null;
  status: string;
}

interface JobDetails {
  name: string;
  countUpcomingJobs: number;
  activeApplications: number;
  earning: JobStats;
  trustScore: number;
  upcomingJobs: UpcomingJobs[];
}

interface UseSeekerStatOptions {
  enabled?: boolean;
}

const useSeekerStat = (id: string, options?: UseSeekerStatOptions) => {
  const apiClient = new APIClient<JobDetails>(`/jobseeker/stats/${id}`);
  return useQuery<JobDetails, Error>({
    queryKey: ["jobseeker", "stat", id],
    queryFn: apiClient.getAll,
    enabled: options?.enabled !== undefined ? options.enabled : true,
  });
};

export default useSeekerStat;
