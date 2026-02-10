import { useEffect, useState } from "react";
import APIClient from "@/services/apiClient";

export const useAdminAnalytics = () => {
  const [overview, setOverview] = useState<any>(null);
  const [topCategories, setTopCategories] = useState<any[]>([]);
  const [dailyTraffic, setDailyTraffic] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);

    try {
      const [overviewRes, categoriesRes, trafficRes] =
        await Promise.all([
          APIClient.get("/admin/analytics/overview"),
          APIClient.get("/admin/analytics/top-categories"),
          APIClient.get("/admin/analytics/daily-traffic"),
        ]);

      setOverview(overviewRes.data);
      setTopCategories(categoriesRes.data);
      setDailyTraffic(trafficRes.data);
    } catch (err) {
      setError("Failed to load admin analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    overview,
    topCategories,
    dailyTraffic,
    loading,
    error,
    refetch: fetchAnalytics,
  };
};
