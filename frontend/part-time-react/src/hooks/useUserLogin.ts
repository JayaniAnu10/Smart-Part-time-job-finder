import type { AuthFormData } from "@/pages/Auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useUserLogin = (onLog: () => void) => {
  return useMutation<any, Error, AuthFormData>({
    mutationFn: (data: AuthFormData) => {
      return axios
        .post("http://localhost:8080/user/login", data)
        .then((res) => res.data);
    },
    onSuccess: () => {
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
