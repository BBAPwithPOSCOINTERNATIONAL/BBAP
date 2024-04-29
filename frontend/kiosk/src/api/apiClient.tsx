import axios, { AxiosInstance } from "axios";

const env = import.meta.env.VITE_IS_PRODUCTION || "development";
const isProduction: boolean = env === "production";

const HOST: string = isProduction
	? "https://i10s210.p.ssafy.io"
	: "http://localhost";
const PORT: string = ":8080";
const URL: string = isProduction ? HOST : `${HOST}${PORT}`;

const apiClient: AxiosInstance = axios.create({
	baseURL: URL,
	withCredentials: true,
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
