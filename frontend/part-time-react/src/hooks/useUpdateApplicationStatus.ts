import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "@/services/apiClient";
import axios from "axios";
import toast from "react-hot-toast";

type Status = "APPROVED" | "REJECTED";

const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { applicationId: string; status: Status }>({
    mutationFn: ({ applicationId, status }) => {
      const apiClient = new APIClient("/applications");
      return apiClient.patch(applicationId, { status });
    },
    onSuccess: () => {
      // Invalidate all applicants queries
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data.error || "Failed to update status";
        toast.error(msg, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to update status", {
          position: "top-center",
        });
      }
    },
  });
};

export default useUpdateApplicationStatus;
