import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";
import toast from "react-hot-toast";
import axios from "axios";
import type { JobData } from "./useAddJob";

interface UpdateJobResponse {
  id: string;
  title: string;
  status: string;
}

const useUpdateJob = (jobId: string) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateJobResponse, Error, JobData>({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch<UpdateJobResponse>(
        `/jobs/${jobId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["employer", "stats"] });
      
      toast.success("Job updated successfully!", {
        position: "top-center",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Failed to update job";
        toast.error(msg, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to update job", {
          position: "top-center",
        });
      }
    },
  });
};

export default useUpdateJob;
