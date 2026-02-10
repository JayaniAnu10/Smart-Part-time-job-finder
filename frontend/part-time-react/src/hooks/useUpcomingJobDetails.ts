import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

interface UpcomingJobDetails {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  category: string;
  jobType: string;
  employerId: string;
  employerName: string;
  employerContact: string;
  employerRating: number;
  scheduleId: string;
  startDatetime: string;
  endDatetime: string;
  minSalary: number;
  maxSalary: number;
  location: string;
  latitude: number;
  longitude: number;
  requirements: string;
  accommodation: string;
  requiredGender: string;
  applicationId: string;
  applicationStatus: string;
  appliedDate: string;
}

interface UseUpcomingJobDetailsOptions {
  enabled?: boolean;
}

const useUpcomingJobDetails = (
  applicationId: string,
  jobseekerId: string,
  options?: UseUpcomingJobDetailsOptions,
) => {
  const apiClient = new APIClient<UpcomingJobDetails>(
    `/jobseeker/upcoming-job/${applicationId}?jobseekerId=${jobseekerId}`,
  );

  return useQuery<UpcomingJobDetails, Error>({
    queryKey: ["upcomingJob", applicationId, jobseekerId],
    queryFn: apiClient.getAll,
    enabled:
      options?.enabled !== undefined
        ? options.enabled
        : !!applicationId && !!jobseekerId,
  });
};

export default useUpcomingJobDetails;
