import apiClient from "./apiClient";
import axios from "axios";

interface Notice {
	noticeId: number;
	noticeClassification: string;
	noticeText: string;
	noticeUrl: string;
	noticeDate: string;
}
interface ApiResponse {
	message: string;
	data: { noticeList: Notice[] };
}

export async function fetchNotificationData(): Promise<ApiResponse> {
	try {
		const { data } = await apiClient.get("/api/v1/notices");
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
		const { data } = await apiClient.delete(`/api/v1/notices/${noticeId}`);
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
		const { data } = await apiClient.delete("/api/v1/notices");
		return data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "Failed to data");
		} else {
			throw new Error("Failed to data");
		}
	}
}
