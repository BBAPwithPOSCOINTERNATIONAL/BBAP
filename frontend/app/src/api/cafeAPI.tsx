import apiClient from "./apiClient";

/**
 * 카페 목록 조회
 * @remarks
 * GET 요청을 '/api/v1/cafes/list/{cafeId}' 엔드포인트에 보냅니다.
 * @returns {Promise<CafeListResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws   400 "찾을 수 없는 카페 아이디 입니다" 오류를 반환할 수 있습니다.
 */

interface Cafe {
  id: string;
  name: string;
  workPlaceName: string;
}

interface CafeMenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  options: CafeOption[];
}

interface CafeOption {
  optionName: string;
  type: string;
  required: boolean;
  choice: Array<{
    choiceName: string;
    price: number;
  }>;
}

interface SelectedCafe {
  id: string;
  openTime: string;
  closeTime: string;
  stampCnt: number;
  menuListCoffee: CafeMenuItem[];
  menuListBeverage: CafeMenuItem[];
  menuListDesert: CafeMenuItem[];
}

interface CafeListResponse {
  message: string;
  data: {
    cafeList: Cafe[];
    selectedCafe: SelectedCafe;
  };
}

export const getCafeList = async (
  cafeId: string
): Promise<CafeListResponse> => {
  try {
    const response = await apiClient.get<CafeListResponse>(
      `/api/v1/cafes/list/${cafeId}`
    );
    console.log("Cafe List:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * 카페 목록 조회
 * @remarks
 * GET 요청을 '/api/v1/cafes/menu-list/{cafeId}' 엔드포인트에 보냅니다.
 * @returns {Promise<CafeMenuResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws   400 "찾을 수 없는 카페 아이디 입니다" 오류를 반환할 수 있습니다.
 */
interface CafeMenuOptionChoice {
  choiceName: string;
  price: number;
}

interface CafeMenuOption {
  optionName: string;
  type: string;
  required: boolean;
  choice: CafeMenuOptionChoice[];
}

interface CafeMenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  options: CafeMenuOption[];
}

interface CafeMenuData {
  openTime: string;
  closeTime: string;
  stampCnt: number;
  menuListCoffee: CafeMenuItem[];
  menuListBeverage: CafeMenuItem[];
  menuListDesert: CafeMenuItem[];
}

interface CafeMenuResponse {
  message: string;
  data: CafeMenuData;
}

export const getCafeMenuList = async (
  cafeId: string
): Promise<CafeMenuResponse> => {
  try {
    const response = await apiClient.get<CafeMenuResponse>(
      `/api/v1/cafes/menu-list/${cafeId}`
    );
    console.log("Cafe Menu List:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
