import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

const useJobDetails = (id: string) => {
  const apiClient = new APIClient(`/jobs/${id}`);

  return useQuery({
    queryKey: ["jobs", id],
    queryFn: apiClient.getAll,
  });
};

export default useJobDetails;
