import APIClient from "@/services/apiClient";
import type { JobSeekerRegistrationData } from "@/store/useJobSeekerStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const apiClient = new APIClient<JobSeekerRegistrationData>(
  "/jobseeker/register"
);

const useAddJobSeeker = () => {
  return useMutation<any, Error, JobSeekerRegistrationData>({
    mutationFn: (data: JobSeekerRegistrationData) => {
      const formData = new FormData();

      const requestPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        nic: data.nic,
        gender: data.gender,
        address: data.address,
        dateOfBirth: data.dob,
        bio: data.bio,
        skills: data.skills.join(","),
        profilePicture: data.profilePicture,
        userId: "d92a94b8-d04d-4ad4-aafe-0a3b72a1a246",
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
          //Binary Large OBject. create a file-like object in memory.converts your JavaScript object into a JSON string, which can be sent like a file
          type: "application/json",
        })
      );

      if (data.profilePicture) {
        formData.append("image", data.profilePicture);
      }

      return apiClient.postForm(formData);
    },
    onSuccess: () => {
      toast.success("Signup successful!");
    },
  });
};

export default useAddJobSeeker;
