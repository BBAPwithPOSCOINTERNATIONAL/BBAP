import axios from "axios";

const env = import.meta.env.VITE_IS_PRODUCTION || "development";
export const isProduction = env === "production";

export const HOST = isProduction
  ? "https://i10s210.p.ssafy.io"
  : "http://localhost";

export const PORT = ":8443";

export const URL = isProduction ? HOST : HOST + PORT;

const apiClient = axios.create({
  baseURL: URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
