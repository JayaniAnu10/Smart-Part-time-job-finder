import APIClient from "@/services/apiClient";
import type { PageResponse } from "@/types/pageResponse";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Query {
  page: number;
  pageSize?: number;
}

export interface Applicants {
  applicationId: string;
  jobSeekerId: string;
  fullName: string;
  status: string;
  averageRate: number;
  address: string;
  profilePicture: string;
  completedJobs: number;
  appliedDate: string;
}

export interface JobApplicants {
  title: string;
  applicants: PageResponse<Applicants>;
}

const useApplicants = (id: string, query: Query) => {
  const apiClient = new APIClient<JobApplicants>(`/applications/job/${id}`);

  return useQuery<JobApplicants, Error>({
    queryKey: ["applicants", id, query],
    queryFn: () =>
      apiClient.getAll({
        page: query.page - 1,
        size: query.pageSize,
      }),
    placeholderData: keepPreviousData,
  });
};

export default useApplicants;
