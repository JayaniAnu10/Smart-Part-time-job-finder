import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

interface Schedules {
  id: string;
  startDatetime: Date;
  endDatetime: Date;
  requiredWorkers: number;
}

interface JobDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  jobType: string;
  deadline: string;
  postedDate: string;
  status: string;
  minSalary: number;
  maxSalary: number;
  jobSchedules: Schedules[];
  requirements: string;
  accommodation: string;
  availableVacancies: number;
  totalVacancies: number;
  employer: string;
  employerId: string;
  latitude: number;
  longitude: number;
  isUrgent: boolean;
  requiredGender: string;
}

const useJobDetails = (id: string) => {
  const apiClient = new APIClient<JobDetails>(`/jobs/${id}`);

  return useQuery<JobDetails, Error>({
    queryKey: ["jobs", id],
    queryFn: apiClient.getAll,
  });
};

export default useJobDetails;
