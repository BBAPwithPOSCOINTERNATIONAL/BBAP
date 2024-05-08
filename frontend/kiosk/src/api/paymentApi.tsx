import axios from "axios";
import apiClient from "./apiClient";

interface PayInfoApiResponse {
  message: string;
  data: {
    empId: number;
    empName: string;
    stampCnt: number;
    availableSubsidy: number;
  };
}

interface PayApiResponse {
  message: string;
  data: {
    orderNum: number;
  };
}

interface AuthReqData {
  empNo: string;
  password: string;
}

interface Menu {
  menuId: string;
  cnt: number;
  options: Option[];
}

interface Option {
  optionName: string;
  type: string;
  required: boolean;
  choiceOptions: {
    choiceName: string;
    price: number;
  }[];
}

interface PaymentReqData {
  empId: number;
  usedSubsidy: number;
  menuList: Menu[];
}

const CAFE_ID = "66276af2412ced9137ecabe9"; // 카페ID 고정

// 결제 정보 확인_ 얼굴인식
export async function payInfoByFace(file: File): Promise<PayInfoApiResponse> {
  const formData = new FormData();
  formData.append("faceImage", file);
  formData.append("cafeId", CAFE_ID);

  try {
    const { data } = await apiClient.post<PayInfoApiResponse>(
      `api/v1/orders/payInfo/face`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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

// 결제 정보 확인_사원증태그
export async function payInfoByCard(
  cardId: string
): Promise<PayInfoApiResponse> {
  try {
    const { data } = await apiClient.post<PayInfoApiResponse>(
      `api/v1/order/payInfo/card`,
      { cardId: cardId, cafeId: CAFE_ID }
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

// 결제 정보 확인_사번&비번
export async function payInfoByLogin(
  payload: AuthReqData
): Promise<PayInfoApiResponse> {
  try {
    const { data } = await apiClient.post<PayInfoApiResponse>(
      `api/v1/orders/payInfo/auth`,
      { ...payload, cafeId: CAFE_ID }
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

// 오더 결제 하기_키오스크
export async function paymentReq(
  payload: PaymentReqData
): Promise<PayApiResponse> {
  try {
    const { data } = await apiClient.post<PayApiResponse>(
      `api/v1/orders/pay/kiosk`,
      {
        ...payload,
        cafeId: CAFE_ID,
      }
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

// TODO: 식당 카드태깅 결제 요청 -> 응답 형식도 수정 필요
export async function paymentRestaurantReq(
  cardId: string
): Promise<PayApiResponse> {
  const MENU_ID = "메뉴아이디"; // 메뉴아이디 고정
  try {
    const { data } = await apiClient.post<PayApiResponse>(
      `api/v1/payments/restaurant`,
      {
        menuId: MENU_ID,
        cardId,
      }
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
