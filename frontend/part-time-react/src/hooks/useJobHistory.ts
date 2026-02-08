import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

// This interface must match the backend CompletedJobDetailDto
interface CompletedJobDetail {
  jobId: string;
  employerId: string;
  jobTitle: string;
  employerName: string;
  jobScheduleDates: string[];
  workedHours: number;
  salary: number;
  rating: number;
  ratingId: string | null;
  comment: string | null;
}

// This interface must match the backend JobHistoryResponseDto
interface JobHistoryResponse {
  completedJobsCount: number;
  totalEarnings: number;
  averageRate: number;
  completedJobs: CompletedJobDetail[];
}

const useJobHistory = (id: string) => {
  const apiClient = new APIClient<JobHistoryResponse>(
    `/jobseeker/history/${id}`,
  );

  return useQuery<JobHistoryResponse, Error>({
    queryKey: ["jobseeker", "history", id],
    queryFn: apiClient.get,
    enabled: !!id, // Only run if id is provided
  });
};

export default useJobHistory;
