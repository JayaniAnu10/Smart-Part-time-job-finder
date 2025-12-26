import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

type Category = {
  id: number;
  category: string;
};

const apiClient = new APIClient<Category[]>("/jobs/category");

const useCategory = () => {
  return useQuery<any, Error, Category[]>({
    queryKey: ["jobs", "categories"],
    queryFn: apiClient.getAll,
  });
};

export default useCategory;
