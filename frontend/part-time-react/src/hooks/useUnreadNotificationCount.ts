import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<number>("/notifications/unread-count");

const useUnreadNotificationCount = () => {
  return useQuery<number, Error>({
    queryKey: ["notifications", "unread-count"],
    queryFn: apiClient.get,
    refetchInterval: 30000, 
  });
};

export default useUnreadNotificationCount;
