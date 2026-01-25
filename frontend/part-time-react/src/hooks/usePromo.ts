import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

interface Promotions {
  id: number;
  name: string;
  price: number;
  days: number;
}

const usePromo = () => {
  const apiClient = new APIClient<Promotions[]>("/promotions");

  return useQuery<Promotions[]>({
    queryKey: ["promotions"],
    queryFn: apiClient.getAll,
  });
};

export default usePromo;
