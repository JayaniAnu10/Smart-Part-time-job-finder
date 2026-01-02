import type { AuthFormData } from "@/pages/Auth";
import APIClient, { axiosInstance } from "@/services/apiClient";
import { useAuthStore } from "@/store/AuthStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const apiClient = new APIClient<AuthFormData>("/auth/login");

const useUserLogin = (onLog: () => void) => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<any, Error, AuthFormData>({
    mutationFn: apiClient.post,
    onSuccess: async (data) => {
      const accessToken = data.token;

      const me = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setAuth(accessToken, me.data);

      toast.success("Login successful!");
      onLog();
    },
    onError: (error) => {
      //Axios error handle
      if (axios.isAxiosError(error)) {
        //Get error from server
        const msg =
          error.response?.data.error || "Login failed. Please try again.";
        toast.error(msg);
      } else {
        toast.error("Login failed. Please try again.");
      }
    },
  });
};

export default useUserLogin;
