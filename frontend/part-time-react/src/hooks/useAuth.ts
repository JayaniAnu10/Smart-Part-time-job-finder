import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import APIClient from "@/services/apiClient";
import { useAuthStore, type User } from "@/store/AuthStore";

export default function useAuth() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const accessToken = useAuthStore((s) => s.accessToken);
  const MeClient = new APIClient<User>("/auth/me");

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => MeClient.get(),
    retry: false,
    staleTime: 0,
  });

  // Handle successful data fetch
  useEffect(() => {
    if (query.isSuccess && query.data && accessToken) {
      setAuth(accessToken, query.data);
    }
  }, [query.isSuccess, query.data, accessToken, setAuth]);

  // Handle errors by clearing auth
  useEffect(() => {
    if (query.isError) {
      clearAuth();
    }
  }, [query.isError, clearAuth]);

  return query;
}
