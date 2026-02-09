import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface JobSeekerProfileData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  bio: string;
  address: string;
  profilePicture: string;
  skills: string;
  nic: string;
  contact: string;
}

const useJobSeekerProfile = (id: string) => {
  const apiClient = new APIClient<JobSeekerProfileData>(`/jobseeker/${id}`);

  return useQuery<JobSeekerProfileData, Error>({
    queryKey: ["jobseeker", "profile", id],
    queryFn: apiClient.get,
    enabled: !!id,
  });
};

export default useJobSeekerProfile;
