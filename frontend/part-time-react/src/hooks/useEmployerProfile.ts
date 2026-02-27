import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface EmployerProfileData {
  userId: string;
  companyName: string;
  companyAddress: string;
  contactPersonName: string;
  contactPersonPhone: string;
  logo: string;
  website: string;
  description: string;
  registrationId: string;
  industry: string;
  email: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
}

const useEmployerProfile = (id: string) => {
  const apiClient = new APIClient<EmployerProfileData>(`/employer/${id}`);

  return useQuery<EmployerProfileData, Error>({
    queryKey: ["employer", "profile", id],
    queryFn: apiClient.get,
    enabled: !!id,
  });
};

export default useEmployerProfile;
