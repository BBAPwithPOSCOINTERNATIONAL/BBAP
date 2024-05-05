import apiClient from "./apiClient";

export interface Cafe {
  id: string;
  name: string;
  workPlaceName: string;
}

export interface Option {
  optionName: string;
  type: string;
  required: boolean;
  choice: OptionChoice[];
}

export interface CafeMenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  options: Option[];
}

interface OptionChoice {
  choiceName: string;
  price: number;
}

export interface CafeListResponse {
  message: string;
  data: {
    cafeList: Cafe[];
    selectedCafe: SelectedCafe;
  };
}

export interface CafeMenuResponse {
  message: string;
  data: CafeMenuData;
}

export interface CafeMenuData {
  openTime: string;
  closeTime: string;
  stampCnt: number;
  menuListCoffee: CafeMenuItem[];
  menuListBeverage: CafeMenuItem[];
  menuListDessert: CafeMenuItem[];
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

/**
 * 카페 목록 조회
 * @remarks
 * GET 요청을 '/api/v1/cafes/list/{id}' 엔드포인트에 보냅니다.
 * @returns {Promise<CafeListResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws   400 "찾을 수 없는 카페 아이디 입니다" 오류를 반환할 수 있습니다.
 */

export const getCafeList = async (id: string): Promise<CafeListResponse> => {
  try {
    const response = await apiClient.get<CafeListResponse>(`cafes/list/${id}`);
    // console.log("Cafe List:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * 카페 목록 조회
 * @remarks
 * GET 요청을 '/api/v1/cafes/menu-list/{id}' 엔드포인트에 보냅니다.
 * @returns {Promise<CafeMenuResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws   400 "찾을 수 없는 카페 아이디 입니다" 오류를 반환할 수 있습니다.
 */

export const getCafeMenuList = async (
  id: string
): Promise<CafeMenuResponse> => {
  try {
    const response = await apiClient.get<CafeMenuResponse>(
      `cafes/menu-list/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
