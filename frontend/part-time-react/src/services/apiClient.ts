import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

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
