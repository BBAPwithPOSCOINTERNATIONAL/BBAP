package com.bbap.order_room.config;

import java.time.LocalDateTime;

import com.bbap.order_room.dto.kafkamessage.*;
import com.bbap.order_room.service.WebSocketService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderItemConsumer {

    private final WebSocketService webSocketService;
    private final Gson gson = new GsonBuilder()
        .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
        .create();
    @KafkaListener(topics = "connect_room_topic", groupId = "order_room_group")
    public void consumeConnectRoom(String message) {
        try {
            ConnectRoomMessage connectRoomMessage = gson.fromJson(message, ConnectRoomMessage.class);
            log.info("Kafka에서 수신한 연결 요청 메시지: {}", connectRoomMessage);
            webSocketService.connectRoom(connectRoomMessage.getEmpId(), connectRoomMessage.getSessionId(), connectRoomMessage.getRoomId());
        } catch (Exception e) {
            log.error("Failed to process connect room message: {}", e.getMessage(), e);
        }
    }

    @KafkaListener(topics = "add_order_item_topic", groupId = "order_room_group")
    public void consumeAddOrderItem(String message) {
        try {
            AddOrderItemMessage addOrderItemMessage = gson.fromJson(message, AddOrderItemMessage.class);
            log.info("Kafka에서 수신한 주문 아이템 추가 메시지: {}", addOrderItemMessage);
            webSocketService.addOrderItem(addOrderItemMessage.getSessionId(), addOrderItemMessage.getRequestDto());
        } catch (Exception e) {
            log.error("Failed to process add order item message: {}", e.getMessage(), e);
        }
    }

    @KafkaListener(topics = "delete_order_item_topic", groupId = "order_room_group")
    public void consumeDeleteOrderItem(String message) {
        try {
            DeleteOrderItemMessage deleteOrderItemMessage = gson.fromJson(message, DeleteOrderItemMessage.class);
            log.info("Kafka에서 수신한 주문 아이템 삭제 메시지: {}", deleteOrderItemMessage);
            webSocketService.deleteOrderItem(deleteOrderItemMessage.getSessionId(), deleteOrderItemMessage.getOrderItemId());
        } catch (Exception e) {
            log.error("Failed to process delete order item message: {}", e.getMessage(), e);
        }
    }

    @KafkaListener(topics = "start_game_topic", groupId = "order_room_group")
    public void consumeStartGame(String message) {
        try {
            StartGameMessage startGameMessage = gson.fromJson(message, StartGameMessage.class);
            log.info("Kafka에서 수신한 게임 시작 메시지: {}", startGameMessage);
            webSocketService.startGame(startGameMessage.getSessionId());
        } catch (Exception e) {
            log.error("Failed to process start game message: {}", e.getMessage(), e);
        }
    }

    @KafkaListener(topics = "run_wheel_topic", groupId = "order_room_group")
    public void consumeRunWheel(String message) {
        try {
            RunWheelMessage runWheelMessage = gson.fromJson(message, RunWheelMessage.class);
            log.info("Kafka에서 수신한 원판 돌리기 메시지: {}", runWheelMessage);
            webSocketService.runWheel(runWheelMessage.getSessionId());
        } catch (Exception e) {
            log.error("Failed to process run wheel message: {}", e.getMessage(), e);
        }
    }

    @KafkaListener(topics = "order_topic", groupId = "order_room_group")
    public void consumeOrder(String message) {
        try {
            OrderMessage orderMessage = gson.fromJson(message, OrderMessage.class);
            log.info("Kafka에서 수신한 주문 요청 메시지: {}", orderMessage);
            webSocketService.order(orderMessage.getSessionId(), orderMessage.getOrderRequestDto());
        } catch (Exception e) {
            log.error("Failed to process order message: {}", e.getMessage(), e);
        }
    }

    @KafkaListener(topics = "leave_room_topic", groupId = "order_room_group")
    public void consumeLeaveRoom(String message) {
        try {
            LeaveRoomMessage leaveRoomMessage = gson.fromJson(message, LeaveRoomMessage.class);
            log.info("Kafka에서 수신한 방 떠나기 메시지: {}", leaveRoomMessage);
            webSocketService.leaveRoom(leaveRoomMessage.getSessionId());
        } catch (Exception e) {
            log.error("Failed to process leave room message: {}", e.getMessage(), e);
        }
    }
}
