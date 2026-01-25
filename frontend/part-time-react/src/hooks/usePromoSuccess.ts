import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

interface PromoSuccessResponse {
  jobTitle: string;
  planName: string;
  duration: number;
  price: number;
}

const usePromoSuccess = () => {
  const [searchParams] = useSearchParams();
  const promotionId = searchParams.get("promotion_id");
  const apiClient = new APIClient<PromoSuccessResponse>(
    `promotions/${promotionId}/success-details`
  );

  return useQuery<PromoSuccessResponse, AxiosError>({
    queryKey: ["promotions", promotionId, "success-details"],
    queryFn: apiClient.get,
    enabled: !!promotionId,
  });
};

export default usePromoSuccess;
