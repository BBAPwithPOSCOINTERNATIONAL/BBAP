import apiClient from "./apiClient";

interface OrderRoomResponse {
  message: string;
  data: {
    roomId: string | null;
  };
}

/**
 * 주문방 참여 여부( 주문완료되지 않은 방중에 참여한 방이 있는지)
 * @remarks
 * GET 요청을 '/api/v1/order-rooms' 엔드포인트에 보냅니다.
 * @returns {Promise<OrderRoomResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws  오류를 반환할 수 있습니다.
 */

export const checkOrderRoomParticipation =
  async (): Promise<OrderRoomResponse> => {
    try {
      const response = await apiClient.get<OrderRoomResponse>("/order-rooms");
      return response.data;
    } catch (error) {
      console.error("error participation:", error);
      throw error;
    }
  };

/**
 * 방 생성
 * @remarks
 * POST 요청을 '/api/v1/order-rooms' 엔드포인트에 보냅니다.
 * @returns {Promise<OrderRoomResponse>} "Success" 메시지와 data 를 반환합니다.
 * @throws  오류를 반환할 수 있습니다.
 */

export const createOrderRoom = async (cafeId: string): Promise<OrderRoomResponse> => {
  try {
    const response = await apiClient.post<OrderRoomResponse>("/order-rooms", {
      cafeId: cafeId,
    });
    return response.data;
  } catch (error) {
    console.error("Error while creating order room:", error);
    throw error;
  }
};
