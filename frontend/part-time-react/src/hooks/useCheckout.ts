import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services/apiClient";

export interface CheckoutRequest {
  userId: string;
  jobId: string;
  promotionCategoryId: number;
}

export interface CheckoutResponse {
  promotionId: string;
  checkoutUrl: string;
}

const useCheckout = () => {
  return useMutation<CheckoutResponse, Error, CheckoutRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post<CheckoutResponse>(
        "/checkout",
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      window.location.href = data.checkoutUrl;
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Checkout Session failed");
      } else {
        toast.error("Checkout Session failed");
      }
    },
  });
};

export default useCheckout;
