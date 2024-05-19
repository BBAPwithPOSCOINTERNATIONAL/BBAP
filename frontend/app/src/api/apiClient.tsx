import axios, { AxiosInstance } from "axios";
const {VITE_API_URL: url} = import.meta.env;

const apiClient: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
