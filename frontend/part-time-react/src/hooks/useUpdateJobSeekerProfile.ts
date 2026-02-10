import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";
import toast from "react-hot-toast";
import axios from "axios";

export interface UpdateProfileRequest {
  contact: string;
  firstName: string;
  lastName: string;
  gender?: string;
  dateOfBirth?: Date;
  bio: string;
  address: string;
  skills: string;
  nic: string;
}

export interface UpdateProfileResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: string;
  dateOfBirth: string;
  bio: string;
  address: string;
  skills: string;
  nic: string;
}

const useUpdateJobSeekerProfile = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch<UpdateProfileResponse>(
        `/jobseeker/${userId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobseeker", "profile", userId] });
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

export default useUpdateJobSeekerProfile;
