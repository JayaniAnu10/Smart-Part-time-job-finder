import { useEffect, useState } from "react";
import APIClient from "@/services/apiClient";

const client = new APIClient<any[]>("/admin/users");

export function useAdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    client
      .get()
      .then(setUsers)
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
}
