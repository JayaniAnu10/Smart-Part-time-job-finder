import APIClient from "@/services/apiClient";
import { axiosInstance } from "@/services/apiClient";
import { useState } from "react";



const jobClient = new APIClient<void>("/admin/jobs");

export function useAdminActions() {
  const [loading, setLoading] = useState(false);

  const approveJob = async (jobId: string) => {
    setLoading(true);
    try {
      await jobClient.patch(`${jobId}/approve`);
    } finally {
      setLoading(false);
    }
  };

  const rejectJob = async (jobId: string) => {
    setLoading(true);
    try {
      await jobClient.patch(`${jobId}/reject`);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/admin/jobs/${jobId}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    approveJob,
    rejectJob,
    deleteJob,
    loading,
  };
}

/* for use */

const userClient = new APIClient<any>("/admin/users");

export function useAdminUserActions() {
  const updateUserActiveStatus = (id: string, isActive: boolean) => {
    // matches: PATCH /admin/users/{id}/status?isActive=true|false
    return userClient.patch(`${id}/status`, { isActive });
  };

  return { updateUserActiveStatus };
}
