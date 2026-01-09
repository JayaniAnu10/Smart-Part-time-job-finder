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
  startTime: string;
  endTime: string;
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

const useSeekerStat = (id: string) => {
  const apiClient = new APIClient<JobDetails>(`/jobseeker/stats/${id}`);
  return useQuery<JobDetails, Error>({
    queryKey: ["jobseeker", "stat", id],
    queryFn: apiClient.getAll,
  });
};

export default useSeekerStat;
