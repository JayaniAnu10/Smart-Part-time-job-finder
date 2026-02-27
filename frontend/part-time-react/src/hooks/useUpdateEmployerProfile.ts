import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";
import toast from "react-hot-toast";
import axios from "axios";

export interface UpdateEmployerRequest {
  contact: string;
  companyName: string;
  companyAddress: string;
  contactPersonName: string;
  contactPersonPhone: string;
  website: string;
  description: string;
  registrationId: string;
  industry: string;
}

export interface UpdateEmployerResponse {
  userId: string;
  companyName: string;
  companyAddress: string;
  contactPersonName: string;
  contactPersonPhone: string;
  logo: string;
  website: string;
  description: string;
  registrationId: string;
  industry: string;
  email: string;
  contact: string;
}

const useUpdateEmployerProfile = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateEmployerResponse, Error, UpdateEmployerRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch<UpdateEmployerResponse>(
        `/employer/${userId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer", "profile", userId] });
      toast.success("Profile updated successfully", {
        position: "top-center",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.error || "Failed to update profile";
        toast.error(msg, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to update profile", {
          position: "top-center",
        });
      }
    },
  });
};

export default useUpdateEmployerProfile;
