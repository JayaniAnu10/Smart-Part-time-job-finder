import APIClient from "@/services/apiClient";
import type { EmployerRegistrationData } from "@/store/useEmployerStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const apiClient = new APIClient<EmployerRegistrationData>("/employer/register");

const useAddEmployer = () => {
  return useMutation<any, Error, EmployerRegistrationData>({
    mutationFn: (data: EmployerRegistrationData) => {
      const formData = new FormData();

      const requestPayload = {
        companyName: data.companyName,
        registrationId: data.registrationID,
        contactPersonName: data.contactPerson,
        contactPersonPhone: data.phone,
        companyAddress: data.address,
        industry: data.industry,
        website: data.website,
        description: data.description,
        userId: "c64b05a2-295a-455a-9fe6-ac5a5db4a889",
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
          //Binary Large OBject. create a file-like object in memory.converts your JavaScript object into a JSON string, which can be sent like a file
          type: "application/json",
        })
      );

      if (data.logo) {
        formData.append("image", data.logo);
      }

      return apiClient.postForm(formData);
    },
    onSuccess: () => {
      toast.success("Signup successful!");
    },
  });
};

export default useAddEmployer;
