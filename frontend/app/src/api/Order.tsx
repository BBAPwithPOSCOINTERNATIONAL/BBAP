import apiClient from "./apiClient";

// 오더 주문 내역 목록 조회
export const getMyOrder = async (year: number, month: number) => {
  try {
    const response = await apiClient.get(
      `/api/v1/orders/list/${year}/${month}`
    );
    console.log("Orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// 오더 주문 내역 상세
export const getMyorderDetail = async (orderId: string) => {
  try {
    const response = await apiClient.get(`/api/v1/orders/${orderId}`);
    console.log("Order Details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};
