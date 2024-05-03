package com.bbap.order_room.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.service.WebSocketService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class WebSocketController {
	private final WebSocketService webSocketService;

	@MessageMapping("/connect/{roomId}/{empId}")
	public void connet( @DestinationVariable String roomId, @DestinationVariable Integer empId, SimpMessageHeaderAccessor headerAccessor) {

		// System.out.println("Received empId: " + accessor.getSessionId());
		System.out.println("All headers: " + headerAccessor.toMap());
		String sessionId = headerAccessor.getSessionId();
		webSocketService.connectRoom(empId, sessionId, roomId);
	}

	@MessageMapping("/add-order-item/{roomId}")
	public void addOrderItem(@DestinationVariable String roomId, @Payload AddOrderItemRequestDto requestDto, SimpMessageHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		webSocketService.addOrderItem(roomId, sessionId, requestDto);
	}

	@MessageMapping("/delete-order-item/{roomId}/{orderItemId}")
	public void deleteOrderItem(@DestinationVariable String roomId, @DestinationVariable String orderItemId, SimpMessageHeaderAccessor headerAccessor){
		String sessionId = headerAccessor.getSessionId();
		webSocketService.deleteOrderItem(roomId, sessionId, orderItemId);
	}

}
