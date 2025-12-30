import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

interface Rate {
  averageRate: number;
  reviews: number;
}

const useUserRate = (id?: string) => {
  const apiClient = new APIClient<Rate>(`ratings/user/${id}/average`);
  return useQuery<Rate>({
    queryKey: ["ratings", "user", id, "average"],
    queryFn: apiClient.getAll,
    enabled: !!id,
    initialData: { averageRate: 0, reviews: 0 },
  });
};

export default useUserRate;
