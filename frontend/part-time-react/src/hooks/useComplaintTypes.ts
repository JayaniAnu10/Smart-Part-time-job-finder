import { useQuery } from "@tanstack/react-query";
import APIClient from "@/services/apiClient";

export type ComplaintType = {
  id: number;
  type: string;
};

const apiClient = new APIClient<ComplaintType[]>("/complaint-types");

const useComplaintTypes = () => {
  return useQuery({
    queryKey: ["complaint-types"],
    queryFn: () => apiClient.get(),
  });
};

export default useComplaintTypes;
