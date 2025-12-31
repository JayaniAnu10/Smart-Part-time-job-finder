import APIClient from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface JobApplicationBody {
  jobId: string;
  jobseeker: string;
  scheduleId: string;
}

const apiClient = new APIClient("/applications");

const useJobApply = () => {
  return useMutation({
    mutationFn: (body: JobApplicationBody) => apiClient.post(body),
    onError: (error) => {
      //Axios error handle
      if (axios.isAxiosError(error)) {
        //Get error from server
        const msg = error.response?.data.error || "Failed to apply. Try again.";
        toast.error(msg);
      } else {
        toast.error("Failed to apply. Try again.");
      }
    },
  });
};

export default useJobApply;
