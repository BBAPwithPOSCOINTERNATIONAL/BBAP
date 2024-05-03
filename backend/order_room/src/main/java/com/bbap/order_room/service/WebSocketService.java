package com.bbap.order_room.service;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;

public interface WebSocketService {
	void connectRoom(Integer empId, String sessionId, String roomId);
	void addOrderItem(String sessionId, AddOrderItemRequestDto requestDto);
	void deleteOrderItem(String sessionId, String orderItemId);
}
