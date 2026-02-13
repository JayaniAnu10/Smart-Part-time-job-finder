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
  schedules: JobSchedule[];
  latitude: number;
  longitude: number;
  isUrgent: boolean;
  requiredGender: string;
}

interface JobResponse {
  id: string;
  title: string;
}

const useAddJob = (
  id: string,
  onAddSuccess: (jobId: string, jobTitle: string) => void,
) => {
  const apiClient = new APIClient<JobResponse>(`jobs/create/${id}`);

  return useMutation<JobResponse, Error, JobData>({
    mutationFn: (data: JobData) => apiClient.post(data),
    onSuccess: (data) => {
      toast.success("Job post created successfully! 🎉");
      onAddSuccess(data.id, data.title);
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
