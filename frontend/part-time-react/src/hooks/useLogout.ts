import APIClient from "@/services/apiClient";
import { useAuthStore } from "@/store/AuthStore";
import { useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();
  const client = new APIClient<void>("/auth/logout");

  return async () => {
    try {
      await client.post(); // backend clears cookie
    } catch (_) {
      // ignore — even if cookie isn’t there, we'll still clear local state
    }

    clearAuth();
    queryClient.removeQueries({ queryKey: ["auth", "me"] });
  };
}
