import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/apiClient";
import { useAuthStore } from "@/store/AuthStore";

export function useNotifications() {
  const user = useAuthStore((state) => state.user);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = () => {
    if (!user?.id) return;

    setLoading(true);

    axiosInstance
      .get(`/notifications/user/${user.id}`)
      .then((res) => setNotifications(res.data))
      .catch(() => setError("Failed to load notifications"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);

  return {
    notifications,
    loading,
    error,
    refetch: fetchNotifications,
  };
}
