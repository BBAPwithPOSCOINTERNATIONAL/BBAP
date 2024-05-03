package com.bbap.order_room.service;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;

public interface WebSocketService {
	void connectRoom(Integer empId, String sessionId, String roomId);
	void addOrderItem(String roomId, String sessionId, AddOrderItemRequestDto requestDto);
}
