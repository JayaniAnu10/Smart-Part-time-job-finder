import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface Job {
  title: string;
  companyName: string;
  completedDate: string;
  jobRating: number;
  status: string;
}

interface SeekerDetails {
  jobSeekerId: string;
  fullName: string;
  email: string;
  rate: number;
  contact: string;
  address: string;
  bio: string;
  skills: string;
  isVerified: boolean;
  gender: string;
  profilePicture: string;
  completedJobs: number;
}

export interface Profile {
  profileDetails: SeekerDetails;
  jobDetails: Job[];
}

const useSeekerDetails = (id: string) => {
  const apiClient = new APIClient<Profile>(`/jobseeker/profile/${id}`);

  return useQuery<Profile, Error>({
    queryKey: ["jobseeker", "profile", id],
    queryFn: () => apiClient.getAll(),
  });
};

export default useSeekerDetails;
