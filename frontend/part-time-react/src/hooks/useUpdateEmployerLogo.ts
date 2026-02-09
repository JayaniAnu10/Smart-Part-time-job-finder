import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";
import toast from "react-hot-toast";
import axios from "axios";

const useUpdateEmployerLogo = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      await axiosInstance.put(`/employer/${userId}/logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer", "profile", userId] });
      toast.success("Company logo updated successfully", {
        position: "top-center",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.error || "Failed to update logo";
        toast.error(msg, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to update logo", {
          position: "top-center",
        });
      }
    },
  });
};

export default useUpdateEmployerLogo;
