package com.bbap.order_room.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.OrderRequestDto;
import com.bbap.order_room.service.StompToKafkaService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class WebSocketController {
	private final StompToKafkaService stompToKafkaService;

	@MessageMapping("/connect/{roomId}/{empId}")
	public void connect(@DestinationVariable String roomId, @DestinationVariable Integer empId, SimpMessageHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		stompToKafkaService.sendConnectRoom(empId, sessionId, roomId);
	}

	@MessageMapping("/add-order-item")
	public void addOrderItem(@Payload AddOrderItemRequestDto requestDto, SimpMessageHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		stompToKafkaService.sendAddOrderItem(sessionId, requestDto);
	}

	@MessageMapping("/delete-order-item/{orderItemId}")
	public void deleteOrderItem(@DestinationVariable String orderItemId, SimpMessageHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		stompToKafkaService.sendDeleteOrderItem(sessionId, orderItemId);
	}

	@MessageMapping("/start-game")
	public void startGame(SimpMessageHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		stompToKafkaService.sendStartGame(sessionId);
	}

	@MessageMapping("/run-wheel")
	public void runWheel(SimpMessageHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		stompToKafkaService.sendRunWheel(sessionId);
	}

	@MessageMapping("/order")
	public void order(@Payload OrderRequestDto orderRequestDto, SimpMessageHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		stompToKafkaService.sendOrder(sessionId, orderRequestDto);
	}

	@MessageMapping("/leave-room")
	public void leaveRoom(SimpMessageHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		stompToKafkaService.sendLeaveRoom(sessionId);
	}
}
