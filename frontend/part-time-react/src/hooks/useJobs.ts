import APIClient from "@/services/apiClient";
import type { PageResponse } from "@/types/pageResponse";
import type { Query } from "@/types/Query";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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

interface JobListing {
  jobs: PageResponse<Job>;
  totalJobs: number;
}

const useJobs = (filters: any, params: string, query: Query) => {
  const apiClient = new APIClient<JobListing>(`jobs/search?${params}`);
  return useQuery<JobListing, Error>({
    queryKey: ["jobs", "search", { ...filters, query }],
    queryFn: () =>
      apiClient.getAll({
        page: query.page - 1,
        size: query.pageSize,
      }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2, //2 min cache
  });
};

export default useJobs;
