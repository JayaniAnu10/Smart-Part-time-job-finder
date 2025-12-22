import type { AuthFormData } from "@/pages/Auth";
import APIClient from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const apiClient = new APIClient<AuthFormData>("/user");

const useAddUser = (onAddSucess: () => void) => {
  return useMutation<any, Error, AuthFormData>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      toast.success("Signup successful!");
      onAddSucess();
    },
    onError: (error) => {
      //Axios error handle
      if (axios.isAxiosError(error)) {
        //Get error from server
        const msg =
          error.response?.data.error || "Signup failed. Please try again.";
        toast.error(msg);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    },
  });
};

export default useAddUser;
