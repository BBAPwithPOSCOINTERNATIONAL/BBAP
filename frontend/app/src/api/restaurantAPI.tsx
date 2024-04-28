import axios from "axios";
import apiClient from "./apiClient";

// API 응답 타입 정의
interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  workPlaceName: string;
  startTime: string;
  endTime: string;
}

interface MenuApiResponse {
  message: string;
  data: {
    menueList: Array<{
      menuName: string;
      menuImage: string; // URL
      menuDetail: string;
      price: number;
      eatCount: number;
    }>;
  };
}

interface Menu {
  menuName: string;
  menuImage: string; // URL
  menuDetail: string;
  price: number;
  eatCount: number;
}

interface ApiResponse {
  message: string;
  data: {
    restaurantList: Restaurant[];
    restaurantId: number;
    todayDate: string; // 'Date' 타입 대신 'string' 사용, 실제 Date 타입에 맞게 조정 필요
    mealClassification: number;
    menuList: Menu[];
  };
}

export async function fetchRestaurantData(
  restaurantId: number
): Promise<ApiResponse> {
  try {
    const effectiveRestaurantId = restaurantId === -1 ? 0 : restaurantId; // 근무지 정보로 ID 대체
    const { data } = await apiClient.get<ApiResponse>(
      `/api/v1/restaurants/${effectiveRestaurantId}`
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

// URL 파라미터 타입 정의
interface FetchMenuParams {
  restaurantId: number;
  menuDate: Date;
  mealClassification: number;
}

// 메뉴 조회 API 호출 함수
export const fetchMenus = async ({
  restaurantId,
  menuDate,
  mealClassification,
}: FetchMenuParams): Promise<MenuApiResponse> => {
  const dateString = menuDate.toISOString().split("T")[0]; // Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
  try {
    const response = await apiClient.get<MenuApiResponse>(
      `/api/v1/restaurants/menus/${restaurantId}/${dateString}/${mealClassification}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to fetch menu data"
      );
    } else {
      throw new Error("Failed to fetch menu data");
    }
  }
};
