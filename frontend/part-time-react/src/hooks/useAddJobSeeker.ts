import APIClient from "@/services/apiClient";
import type { JobSeekerRegistrationData } from "@/store/useJobSeekerStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { FormState } from "react-hook-form";
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
        userId: "822c715a-4e94-4240-acab-c9590fb3cbfe",
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
    onError: (error) => {
      //Axios error handle
      if (axios.isAxiosError(error)) {
        //Get error from server
        const msg =
          error.response?.data.error ||
          "Job Seeker signup failed. Please try again.";
        toast.error(msg);
      } else {
        toast.error("Job Seeker signup failed. Please try again.");
      }
    },
  });
};

export default useAddJobSeeker;
