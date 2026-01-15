import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface AdminOverview {
  totalUsers: number;
  totalEmployers: number;
  totalJobSeekers: number;
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  totalPayments: number;
  totalPaymentAmount: number;
  totalComplaints: number;
  pendingComplaints: number;
}

const apiClient = new APIClient<AdminOverview>(
  "/admin/analytics/overview"
);

const useAdminOverview = () => {
  return useQuery<AdminOverview, Error>({
    queryKey: ["admin", "overview"],
    queryFn: apiClient.get,
  });
};

export default useAdminOverview;
