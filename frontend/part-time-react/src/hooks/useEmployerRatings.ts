import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface RatingDetailData {
  id: string;
  jobId: string;
  jobTitle: string;
  raterId: string;
  raterName: string; // This is the job seeker name
  rateReceiverId: string;
  rating: number;
  comment: string;
  createdDate: string;
}

export interface RatingsPageResponse {
  content: RatingDetailData[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

const useEmployerRatings = (id: string, page: number = 0, size: number = 10) => {
  const apiClient = new APIClient<RatingsPageResponse>(
    `/ratings/user/${id}/details?page=${page}&size=${size}`
  );

  return useQuery<RatingsPageResponse, Error>({
    queryKey: ["employer", "ratings", id, page, size],
    queryFn: apiClient.get,
    enabled: !!id,
  });
};

export default useEmployerRatings;
