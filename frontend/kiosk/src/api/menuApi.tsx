import axios from "axios";
import apiClient from "./apiClient";
import { Menu } from "../types";

interface ApiResponse {
  message: string;
  data: {
    menuListCoffee: Menu[];
    menuListBeverage: Menu[];
    menuListDesert: Menu[];
    menuListPopular: Menu[];
  };
}

export async function fetchMenuData(): Promise<ApiResponse> {
  try {
    const CAFE_ID = "66276af2412ced9137ecabe9"; // 카페ID 고정
    const { data } = await apiClient.get<ApiResponse>(
      `/api/v1/cafes/kiosk/menus/${CAFE_ID}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to data");
    } else {
      throw new Error("Failed to data");
    }
  }
}
