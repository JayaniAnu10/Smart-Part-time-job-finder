import APIClient from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDelJob = (empId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const apiClient = new APIClient(`/jobs/${id}`);
      return apiClient.delete();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer", "stats", empId] });
      toast.success("Job deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete job");
    },
  });
};

export default useDelJob;
