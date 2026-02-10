import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/apiClient";

type ComplaintPayload = {
  reporterId: string;
  targetId: string;
  typeId: number;
  description: string;
};

const apiClient = new APIClient<ComplaintPayload>("/complaints");

const useCreateComplaint = () => {
  return useMutation({
    mutationFn: (data: ComplaintPayload) => apiClient.post(data),
  });
};

export default useCreateComplaint;
