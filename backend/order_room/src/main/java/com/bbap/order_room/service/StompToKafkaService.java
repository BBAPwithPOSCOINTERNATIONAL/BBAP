package com.bbap.order_room.service;

import java.time.LocalDateTime;

import com.bbap.order_room.config.LocalDateTimeAdapter;
import com.bbap.order_room.dto.kafkamessage.AddOrderItemMessage;
import com.bbap.order_room.dto.kafkamessage.ConnectRoomMessage;
import com.bbap.order_room.dto.kafkamessage.DeleteOrderItemMessage;
import com.bbap.order_room.dto.kafkamessage.LeaveRoomMessage;
import com.bbap.order_room.dto.kafkamessage.OrderMessage;
import com.bbap.order_room.dto.kafkamessage.RunWheelMessage;
import com.bbap.order_room.dto.kafkamessage.StartGameMessage;
import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.OrderRequestDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class StompToKafkaService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final Gson gson = new GsonBuilder()
        .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
        .create();

    public void sendConnectRoom(Integer empId, String sessionId, String roomId) {
        log.info("연결 요청: 세션 ID {}, 사원 ID {}, 방 ID {}", sessionId, empId, roomId);
        try {
            ConnectRoomMessage message = new ConnectRoomMessage(empId, sessionId, roomId);
            String kafkaMessage = gson.toJson(message);
            kafkaTemplate.send("connect_room_topic", kafkaMessage);
            log.info("연결 요청이 Kafka에 전송되었습니다.");
        } catch (Exception e) {
            log.error("Failed to send connect room message: {}", e.getMessage(), e);
        }
    }

    public void sendAddOrderItem(String sessionId, AddOrderItemRequestDto requestDto) {
        log.info("주문 아이템 추가 요청: 세션 ID {}, 요청 DTO {}", sessionId, requestDto);
        try {
            AddOrderItemMessage message = new AddOrderItemMessage(sessionId, requestDto);
            String kafkaMessage = gson.toJson(message);
            kafkaTemplate.send("add_order_item_topic", kafkaMessage);
            log.info("주문 아이템 추가 요청이 Kafka에 전송되었습니다.");
        } catch (Exception e) {
            log.error("Failed to send add order item message: {}", e.getMessage(), e);
        }
    }

    public void sendDeleteOrderItem(String sessionId, String orderItemId) {
        log.info("주문 아이템 삭제 요청: 세션 ID {}, 주문 아이템 ID {}", sessionId, orderItemId);
        try {
            DeleteOrderItemMessage message = new DeleteOrderItemMessage(sessionId, orderItemId);
            String kafkaMessage = gson.toJson(message);
            kafkaTemplate.send("delete_order_item_topic", kafkaMessage);
            log.info("주문 아이템 삭제 요청이 Kafka에 전송되었습니다.");
        } catch (Exception e) {
            log.error("Failed to send delete order item message: {}", e.getMessage(), e);
        }
    }

    public void sendStartGame(String sessionId) {
        log.info("게임 시작 요청: 세션 ID {}", sessionId);
        try {
            StartGameMessage message = new StartGameMessage(sessionId);
            String kafkaMessage = gson.toJson(message);
            kafkaTemplate.send("start_game_topic", kafkaMessage);
            log.info("게임 시작 요청이 Kafka에 전송되었습니다.");
        } catch (Exception e) {
            log.error("Failed to send start game message: {}", e.getMessage(), e);
        }
    }

    public void sendRunWheel(String sessionId) {
        log.info("원판 돌리기 요청: 세션 ID {}", sessionId);
        try {
            RunWheelMessage message = new RunWheelMessage(sessionId);
            String kafkaMessage = gson.toJson(message);
            kafkaTemplate.send("run_wheel_topic", kafkaMessage);
            log.info("원판 돌리기 요청이 Kafka에 전송되었습니다.");
        } catch (Exception e) {
            log.error("Failed to send run wheel message: {}", e.getMessage(), e);
        }
    }

    public void sendOrder(String sessionId, OrderRequestDto orderRequestDto) {
        log.info("주문 요청: 세션 ID {}, 요청 DTO {}", sessionId, orderRequestDto);
        try {
            OrderMessage message = new OrderMessage(sessionId, orderRequestDto);
            String kafkaMessage = gson.toJson(message);
            kafkaTemplate.send("order_topic", kafkaMessage);
            log.info("주문 요청이 Kafka에 전송되었습니다.");
        } catch (Exception e) {
            log.error("Failed to send order message: {}", e.getMessage(), e);
        }
    }

    public void sendLeaveRoom(String sessionId) {
        log.info("방 떠나기 요청: 세션 ID {}", sessionId);
        try {
            LeaveRoomMessage message = new LeaveRoomMessage(sessionId);
            String kafkaMessage = gson.toJson(message);
            kafkaTemplate.send("leave_room_topic", kafkaMessage);
            log.info("방 떠나기 요청이 Kafka에 전송되었습니다.");
        } catch (Exception e) {
            log.error("Failed to send leave room message: {}", e.getMessage(), e);
        }
    }
}
