import APIClient from "@/services/apiClient";
import type { PageResponse } from "@/types/pageResponse";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Query {
  page: number;
  pageSize: number;
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

const useApplicants = (id: string, query: Query) => {
  const apiClient = new APIClient<PageResponse<Applicants>>(
    `/applications/job/${id}`
  );

  return useQuery<PageResponse<Applicants>, Error>({
    queryKey: ["applicants", id, query],
    queryFn: () =>
      apiClient.getAll({
        _start: (query.page - 1) * query.pageSize,
        _limit: query.pageSize,
      }),
    placeholderData: keepPreviousData,
  });
};

export default useApplicants;
