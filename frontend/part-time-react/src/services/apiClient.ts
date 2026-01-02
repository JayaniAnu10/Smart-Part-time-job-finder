import { useAuthStore } from "@/store/AuthStore";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// Attach access token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

//Refresh token automatically when 401 happens
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // If access token expired and we haven't retried yet
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        // Refresh automatically — cookie is sent by browser
        const res = await axiosInstance.post("/auth/refresh");

        const newAccess = res.data.token;

        const { user, setAuth } = useAuthStore.getState();
        setAuth(newAccess, user!);

        // retry original request with new token
        original.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(original);
      } catch (err) {
        // refresh also failed - force logout
        useAuthStore.getState().clearAuth();
      }
    }

    return Promise.reject(error);
  }
);

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  delete = () => {
    return axiosInstance.delete(this.endpoint).then((res) => res.data);
  };

  patch = (id: string, params?: Record<string, any>) => {
    return axiosInstance
      .patch(`${this.endpoint}/${id}`, null, { params })
      .then((res) => res.data);
  };

  getAll = (params?: Record<string, any>) => {
    return axiosInstance
      .get<T>(this.endpoint, { params })
      .then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  postForm = (formData: FormData) => {
    return axiosInstance
      .post(this.endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
}

export default APIClient;
