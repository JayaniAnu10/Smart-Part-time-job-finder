import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";
import toast from "react-hot-toast";
import axios from "axios";

interface DeleteRatingParams {
  userId: string;
  ratingId: string;
}

const useDeleteRating = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteRatingParams>({
    mutationFn: async ({ userId, ratingId }) => {
      await axiosInstance.delete(`/ratings/user/${userId}/${ratingId}`);
    },
    onSuccess: () => {
      // Invalidate rating-related queries so UI updates without refresh
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

      toast.success("Rating deleted successfully", {
        position: "top-center",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.error || "Failed to delete rating";
        toast.error(msg, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to delete rating", {
          position: "top-center",
        });
      }
    },
  });
};

export default useDeleteRating;
