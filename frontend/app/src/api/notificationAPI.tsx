import apiClient from "./apiClient";
import axios from "axios";

export interface Notice {
  noticeId: number;
  noticeClassification: string;
  noticeText: string;
  noticeUrl: string;
  storeName: string;
  noticeDate: string;
}
interface ApiResponse {
  message: string;
  data: { noticeList: Notice[] };
}

export async function fetchNotificationData(): Promise<ApiResponse> {
  try {
    const { data } = await apiClient.get("notices");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to data");
    } else {
      throw new Error("Failed to data");
    }
  }
}

export async function deleteNotificationData(
  noticeId: number
): Promise<ApiResponse> {
  try {
    const { data } = await apiClient.delete(`notices/${noticeId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to data");
    } else {
      throw new Error("Failed to data");
    }
  }
}

export async function deleteAllNotificationData(): Promise<ApiResponse> {
  try {
    const { data } = await apiClient.delete("notices");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to data");
    } else {
      throw new Error("Failed to data");
    }
  }
}
