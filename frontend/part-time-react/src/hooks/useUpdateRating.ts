import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";
import toast from "react-hot-toast";
import axios from "axios";

interface RatingUpdateRequest {
  id: string;
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

const useUpdateRating = () => {
  const queryClient = useQueryClient();

  return useMutation<RatingResponse, Error, RatingUpdateRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch<RatingResponse>("/ratings", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobseeker", "history"] });
      toast.success("Rating updated successfully", {
        position: "top-center",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.error || "Failed to update rating";
        toast.error(msg, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to update rating", {
          position: "top-center",
        });
      }
    },
  });
};

export default useUpdateRating;
