import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";
import toast from "react-hot-toast";
import axios from "axios";

const useUpdateProfilePicture = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      await axiosInstance.put(`/jobseeker/${userId}/profile-picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobseeker", "profile", userId] });
      toast.success("Profile picture updated successfully", {
        position: "top-center",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.error || "Failed to update profile picture";
        toast.error(msg, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to update profile picture", {
          position: "top-center",
        });
      }
    },
  });
};

export default useUpdateProfilePicture;
