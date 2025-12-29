import APIClient from "@/services/apiClient";
import type { PageResponse } from "@/types/pageResponse";
import { useQuery } from "@tanstack/react-query";

interface Schedules {
  startDatetime: Date;
  endDatetime: Date;
  requiredWorkers: number;
}

interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  jobType: string;
  deadline: string;
  postedDate: string;
  minSalary: number;
  jobSchedules: Schedules[];
  accommodation: string;
  availableVacancies: number;
  employer: string;
  isUrgent: boolean;
}

const useJobs = (filters: any, params: string) => {
  const apiClient = new APIClient<PageResponse<Job>>(`jobs/search?${params}`);
  return useQuery<PageResponse<Job>, Error>({
    queryKey: ["jobs", "search", filters],
    queryFn: apiClient.getAll,
    staleTime: 1000 * 60 * 2, //2 min cache
  });
};

export default useJobs;
