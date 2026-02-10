import { useQuery } from "@tanstack/react-query";
import APIClient from "@/services/apiClient";



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

export interface TopCategory {
  category: string;
  count: number;
}

export interface Traffic {
  date: string;
  count: number;
}



const overviewClient = new APIClient<AdminOverview>(
  "/admin/analytics/overview"
);

const categoriesClient = new APIClient<TopCategory[]>(
  "/admin/analytics/top-categories"
);

const trafficClient = new APIClient<Traffic[]>(
  "/admin/analytics/daily-traffic"
);



export const useAdminAnalytics = () => {
  const overviewQuery = useQuery({
    queryKey: ["admin", "analytics", "overview"],
    queryFn: overviewClient.get,
  });

  const categoriesQuery = useQuery({
    queryKey: ["admin", "analytics", "categories"],
    queryFn: categoriesClient.get,
  });

  const trafficQuery = useQuery({
    queryKey: ["admin", "analytics", "traffic"],
    queryFn: trafficClient.get,
  });

  return {
    overview: overviewQuery.data,
    topCategories: categoriesQuery.data ?? [],
    dailyTraffic: trafficQuery.data ?? [],

    loading:
      overviewQuery.isLoading ||
      categoriesQuery.isLoading ||
      trafficQuery.isLoading,

    error:
      overviewQuery.error ||
      categoriesQuery.error ||
      trafficQuery.error,
  };
};
