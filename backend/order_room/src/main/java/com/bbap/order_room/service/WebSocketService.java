package com.bbap.order_room.service;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.OrderRequestDto;

public interface WebSocketService {
	void connectRoom(Integer empId, String sessionId, String roomId);
	void addOrderItem(String sessionId, AddOrderItemRequestDto requestDto);
	void deleteOrderItem(String sessionId, String orderItemId);
	void startGame(String sessionId);
	void runWheel(String sessionId);
	void order(String sessionId, OrderRequestDto orderRequestDto);
	void leaveRoom(String sessionId);
}
