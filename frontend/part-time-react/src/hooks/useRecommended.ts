import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

interface JobSchedule {
  startDatetime: string;
  endDatetime: string;
}

interface Job {
  id: string;
  title: string;
  location: string;
  employer: string;
  isUrgent: boolean;
  minSalary: number;
  category: string;
  jobSchedules: JobSchedule[];
}

const useRecommended = (
  id: string | undefined,
  options?: { enabled?: boolean }
) => {
  const apiClient = new APIClient<Job[]>(`/recommendations/seeker/${id}`);
  return useQuery<Job[], Error>({
    queryKey: ["recommendations", "seeker", id],
    queryFn: apiClient.getAll,
    enabled: options?.enabled ?? !!id,
  });
};

export default useRecommended;
