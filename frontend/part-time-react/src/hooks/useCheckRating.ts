import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface ExistingRating {
  id: string;
  jobId: string;
  raterId: string;
  rateReceiverId: string;
  rating: number;
  comment: string;
}

const useCheckRating = (
  raterId: string,
  rateReceiverId: string,
  jobId: string,
  enabled: boolean = true
) => {
  const apiClient = new APIClient<ExistingRating>(
    `/ratings/check?raterId=${raterId}&rateReceiverId=${rateReceiverId}&jobId=${jobId}`
  );

  return useQuery<ExistingRating | null, Error>({
    queryKey: ["rating", "check", raterId, rateReceiverId, jobId],
    queryFn: async () => {
      try {
        return await apiClient.get();
      } catch (error: any) {
        // If 404, rating doesn't exist - return null
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: enabled && !!raterId && !!rateReceiverId && !!jobId,
  });
};

export default useCheckRating;
