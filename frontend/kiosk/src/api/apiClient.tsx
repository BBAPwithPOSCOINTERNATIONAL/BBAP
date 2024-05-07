import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://pobap.com/",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// 키오스크에는 인증 토큰이 없음
// apiClient.interceptors.request.use((config) => {
// 	const token = localStorage.getItem("accessToken");
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}
// 	return config;
// });

export default apiClient;
