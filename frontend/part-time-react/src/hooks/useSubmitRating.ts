import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";
import toast from "react-hot-toast";
import axios from "axios";

interface RatingRequest {
  jobId: string;
  raterId: string;
  rateReceiverId: string;
  rating: number;
  comment?: string;
}

interface RatingResponse {
  id: string;
  jobId: string;
  raterId: string;
  rateReceiverId: string;
  rating: number;
  comment?: string;
}

const useSubmitRating = () => {
  const queryClient = useQueryClient();

  return useMutation<RatingResponse, Error, RatingRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post<RatingResponse>(
        "/ratings",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate any rating-related queries so UI updates instantly
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey as unknown as any[];
          const root = key?.[0];
          return (
            root === "rating" ||
            root === "ratings" ||
            root === "jobseeker" ||
            root === "employer" ||
            root === "applicants"
          );
        },
      });

      toast.success("Rating submitted successfully", {
        position: "top-center",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.error || "Failed to submit rating";
        toast.error(msg, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to submit rating", {
          position: "top-center",
        });
      }
    },
  });
};

export default useSubmitRating;
