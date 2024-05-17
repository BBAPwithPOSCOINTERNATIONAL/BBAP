package com.bbap.order_room.config;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.OrderRequestDto;
import com.bbap.order_room.service.WebSocketService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderItemConsumer {

    private final WebSocketService webSocketService;

    @KafkaListener(topics = "connect_room_topic", groupId = "order_room_group")
    public void consumeConnectRoom(String message) {
        log.info("Kafka에서 수신한 연결 요청 메시지: {}", message);
        Map<String, Object> messageMap = new Gson().fromJson(message, HashMap.class);
        Integer empId = ((Double) messageMap.get("empId")).intValue();
        String sessionId = (String) messageMap.get("sessionId");
        String roomId = (String) messageMap.get("roomId");

        webSocketService.connectRoom(empId, sessionId, roomId);
    }

    @KafkaListener(topics = "add_order_item_topic", groupId = "order_room_group")
    public void consumeAddOrderItem(String message) {
        log.info("Kafka에서 수신한 주문 아이템 추가 메시지: {}", message);
        Map<String, Object> messageMap = new Gson().fromJson(message, HashMap.class);
        String sessionId = (String) messageMap.get("sessionId");
        AddOrderItemRequestDto requestDto = new Gson().fromJson(new Gson().toJson(messageMap.get("requestDto")), AddOrderItemRequestDto.class);

        webSocketService.addOrderItem(sessionId, requestDto);
    }

    @KafkaListener(topics = "delete_order_item_topic", groupId = "order_room_group")
    public void consumeDeleteOrderItem(String message) {
        log.info("Kafka에서 수신한 주문 아이템 삭제 메시지: {}", message);
        Map<String, Object> messageMap = new Gson().fromJson(message, HashMap.class);
        String sessionId = (String) messageMap.get("sessionId");
        String orderItemId = (String) messageMap.get("orderItemId");

        webSocketService.deleteOrderItem(sessionId, orderItemId);
    }

    @KafkaListener(topics = "start_game_topic", groupId = "order_room_group")
    public void consumeStartGame(String message) {
        log.info("Kafka에서 수신한 게임 시작 메시지: {}", message);
        Map<String, Object> messageMap = new Gson().fromJson(message, HashMap.class);
        String sessionId = (String) messageMap.get("sessionId");

        webSocketService.startGame(sessionId);
    }

    @KafkaListener(topics = "run_wheel_topic", groupId = "order_room_group")
    public void consumeRunWheel(String message) {
        log.info("Kafka에서 수신한 원판 돌리기 메시지: {}", message);
        Map<String, Object> messageMap = new Gson().fromJson(message, HashMap.class);
        String sessionId = (String) messageMap.get("sessionId");

        webSocketService.runWheel(sessionId);
    }

    @KafkaListener(topics = "order_topic", groupId = "order_room_group")
    public void consumeOrder(String message) {
        log.info("Kafka에서 수신한 주문 요청 메시지: {}", message);
        Map<String, Object> messageMap = new Gson().fromJson(message, HashMap.class);
        String sessionId = (String) messageMap.get("sessionId");
        OrderRequestDto orderRequestDto = new Gson().fromJson(new Gson().toJson(messageMap.get("orderRequestDto")), OrderRequestDto.class);

        webSocketService.order(sessionId, orderRequestDto);
    }

    @KafkaListener(topics = "leave_room_topic", groupId = "order_room_group")
    public void consumeLeaveRoom(String message) {
        log.info("Kafka에서 수신한 방 떠나기 메시지: {}", message);
        Map<String, Object> messageMap = new Gson().fromJson(message, HashMap.class);
        String sessionId = (String) messageMap.get("sessionId");

        webSocketService.leaveRoom(sessionId);
    }
}
