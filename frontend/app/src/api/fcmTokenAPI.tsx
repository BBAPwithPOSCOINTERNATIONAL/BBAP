import apiClient from "./apiClient";

interface ApiResponse {
  message: string;
}

export const sendTokenToServer = async (
  token: string
): Promise<ApiResponse> => {
  const response = await apiClient.post("notices/fcm", {
    fcmToken: token,
  });

  return response.data;
};
