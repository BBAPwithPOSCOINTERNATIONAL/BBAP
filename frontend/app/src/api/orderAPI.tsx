import apiClient from "./apiClient";
import axios from "axios";

/**
 * 결제 정보 확인_앱
 * @remarks
 * GET 요청을 '/api/v1/orders/payInfo/{cafeId}' 엔드포인트에 보냅니다.
 * @returns {Promise<PayInfoResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws   오류를 반환할 수 있습니다.
 */

interface PayInfo {
  empId: number;
  empName: string;
  stampCnt: number;
  availableSubsidy: number;
}

interface PayInfoResponse {
  message: string;
  data: PayInfo;
}

export const getPayInfo = async (cafeId: string): Promise<PayInfoResponse> => {
  try {
    const response = await apiClient.get<PayInfoResponse>(
      `/orders/payInfo/${cafeId}`
    );
    console.log("Payment:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * 오더 결제 하기_앱
 * @remarks
 * POST 요청을 '/api/v1/orders/pay' 엔드포인트에 보냅니다.
 * @returns {Promise<OrderPayResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws   400 "잘못된 주문 요청입니다."와 404 "찾을수 없는 메뉴 아이디 입니다." 오류를 반환할 수 있습니다.
 */

interface OrderOption {
  optionName: string;
  type: string;
  required: boolean;
  choiceOptions: {
    choiceName: string;
    price: number;
  }[];
}

interface MenuItem {
  menuId: string;
  cnt: number;
  options: OrderOption[];
}

interface OrderRequest {
  cafeId: string;
  usedSubsidy: number;
  pickUpTime: Date;
  menuList: MenuItem[];
}

interface OrderPayResponse {
  message: string;
  orderData: {
    orderNum: number;
  };
}

export const createOrder = async (
  orderData: OrderRequest
): Promise<OrderPayResponse> => {
  try {
    const response = await apiClient.post<OrderPayResponse>(
      "orders/pay",
      orderData
    );
    console.log("Order:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        console.error("잘못된 주문 요청입니다.");
      } else if (error.response?.status === 404) {
        console.error("찾을 수 없는 메뉴 아이디 입니다.");
      }
    }
    throw error;
  }
};

/**
 * 오더 주문 내역 목록 조회
 * @remarks
 * GET 요청을 '/api/v1/orders/list/{year}/{month}' 엔드포인트에 보냅니다.
 * @returns {Promise<OrderListResponse>} "Success" 메시지와 orderList 를 반환합니다.
 * @throws    오류를 반환할 수 있습니다.
 */
interface Order {
  orderId: string;
  pickUpTime: Date;
  cafeName: string;
  firstMenuName: string;
  menuCnt: number;
  payAmount: number;
  workPlaceName: string;
}

interface OrderListResponse {
  message: string;
  data: {
    orderList: Order[];
  };
}

export const getMyOrder = async (
  year: number,
  month: number
): Promise<OrderListResponse> => {
  try {
    const response = await apiClient.get<OrderListResponse>(
      `orders/list/${year}/${month}`
    );
    console.log("Orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * 오더 주문 내역 상세 조회
 * @remarks
 * GET 요청을 '/api/v1/orders/{orderId}}' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns   {Promise<OrderDetailResponse>} "Success" 메시지와 detaildata를 반환합니다.
 * @throws   오류를 반환할 수 있습니다.
 */

interface Menu {
  menuName: string;
  menuPrice: number;
  menuCnt: number;
  optionText: string;
}

interface OrderDetailResponse {
  message: string;
  data: {
    cafeName: string;
    payAmount: number;
    workPlaceName: string;
    usedSubsidy: number;
    orderTime: Date;
    menuList: Menu[];
  };
}

export const getMyorderDetail = async (
  orderId: string
): Promise<OrderDetailResponse> => {
  try {
    const response = await apiClient.get<OrderDetailResponse>(
      `orders/${orderId}`
    );
    console.log("Details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};
