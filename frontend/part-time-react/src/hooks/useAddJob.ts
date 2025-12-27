import APIClient from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface JobSchedule {
  startDatetime: string;
  endDatetime: string;
  requiredWorkers: number;
}

export interface JobData {
  title: string;
  description: string;
  categoryId: number;
  location: string;
  jobType: string;
  deadline: string;
  minSalary: number;
  maxSalary: number;
  requirements: string;
  accommodation: string;
  totalVacancies: number;
  schedules: JobSchedule[];
  latitude: number;
  longitude: number;
  isUrgent: boolean;
}

const useAddJob = (id: string, onAddSucess: () => void) => {
  const apiClient = new APIClient<JobData>(`jobs/create/${id}`);

  return useMutation<any, Error, JobData>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      toast.success("Job post created successfully! 🎉");
      onAddSucess();
    },
    onError: (error) => {
      //Axios error handle
      if (axios.isAxiosError(error)) {
        //Get error from server
        const msg =
          error.response?.data.error ||
          "Job post submission failed. Please try again.";
        toast.error(msg);
      } else {
        toast.error("Job post submission failed. Please try again.");
      }
    },
  });
};

export default useAddJob;
