import type { AuthFormData } from "@/pages/Auth";
import APIClient, { axiosInstance } from "@/services/apiClient";
import { useAuthStore } from "@/store/AuthStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const apiClient = new APIClient<AuthFormData>("/auth/login");

const useUserLogin = (onLog: () => void) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);
  const from = (location.state as any)?.from?.pathname || "/";

  return useMutation<any, Error, AuthFormData>({
    mutationFn: apiClient.post,
    onSuccess: async (data) => {
      const accessToken = data.token;
      setAuth(accessToken, null as any);

      const me = await axiosInstance.get("/auth/me");
      setAuth(accessToken, me.data);

      toast.success("Login successful!");
      navigate(from && from !== "/auth" ? from : "/", { replace: true });
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
