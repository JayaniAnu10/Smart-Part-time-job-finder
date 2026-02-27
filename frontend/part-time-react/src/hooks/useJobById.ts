import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface JobSchedule {
  id?: string;
  startDatetime: string;
  endDatetime: string;
  requiredWorkers: number;
}

export interface JobDetailData {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId: number;
  location: string;
  jobType: string;
  deadline: string;
  minSalary: number;
  maxSalary: number;
  requirements: string;
  accommodation: string;
  jobSchedules: JobSchedule[];
  latitude: number;
  longitude: number;
  isUrgent: boolean;
  requiredGender: string;
  status: string;
}

const useJobById = (jobId: string) => {
  const apiClient = new APIClient<JobDetailData>(`/jobs/${jobId}`);

  return useQuery<JobDetailData, Error>({
    queryKey: ["job", jobId],
    queryFn: apiClient.get,
    enabled: !!jobId,
  });
};

export default useJobById;
