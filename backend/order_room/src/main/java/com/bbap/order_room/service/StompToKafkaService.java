package com.bbap.order_room.service;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.OrderRequestDto;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class StompToKafkaService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendConnectRoom(Integer empId, String sessionId, String roomId) {
        log.info("연결 요청: 세션 ID {}, 사원 ID {}, 방 ID {}", sessionId, empId, roomId);
        Map<String, Object> message = new HashMap<>();
        message.put("empId", empId);
        message.put("sessionId", sessionId);
        message.put("roomId", roomId);
        String kafkaMessage = new Gson().toJson(message);
        kafkaTemplate.send("connect_room_topic", kafkaMessage);
        log.info("연결 요청이 Kafka에 전송되었습니다.");
    }

    public void sendAddOrderItem(String sessionId, AddOrderItemRequestDto requestDto) {
        log.info("주문 아이템 추가 요청: 세션 ID {}, 요청 DTO {}", sessionId, requestDto);
        Map<String, Object> message = new HashMap<>();
        message.put("sessionId", sessionId);
        message.put("requestDto", requestDto);
        String kafkaMessage = new Gson().toJson(message);
        kafkaTemplate.send("add_order_item_topic", kafkaMessage);
        log.info("주문 아이템 추가 요청이 Kafka에 전송되었습니다.");
    }

    public void sendDeleteOrderItem(String sessionId, String orderItemId) {
        log.info("주문 아이템 삭제 요청: 세션 ID {}, 주문 아이템 ID {}", sessionId, orderItemId);
        Map<String, Object> message = new HashMap<>();
        message.put("sessionId", sessionId);
        message.put("orderItemId", orderItemId);
        String kafkaMessage = new Gson().toJson(message);
        kafkaTemplate.send("delete_order_item_topic", kafkaMessage);
        log.info("주문 아이템 삭제 요청이 Kafka에 전송되었습니다.");
    }

    public void sendStartGame(String sessionId) {
        log.info("게임 시작 요청: 세션 ID {}", sessionId);
        Map<String, Object> message = new HashMap<>();
        message.put("sessionId", sessionId);
        String kafkaMessage = new Gson().toJson(message);
        kafkaTemplate.send("start_game_topic", kafkaMessage);
        log.info("게임 시작 요청이 Kafka에 전송되었습니다.");
    }

    public void sendRunWheel(String sessionId) {
        log.info("원판 돌리기 요청: 세션 ID {}", sessionId);
        Map<String, Object> message = new HashMap<>();
        message.put("sessionId", sessionId);
        String kafkaMessage = new Gson().toJson(message);
        kafkaTemplate.send("run_wheel_topic", kafkaMessage);
        log.info("원판 돌리기 요청이 Kafka에 전송되었습니다.");
    }

    public void sendOrder(String sessionId, OrderRequestDto orderRequestDto) {
        log.info("주문 요청: 세션 ID {}, 요청 DTO {}", sessionId, orderRequestDto);
        Map<String, Object> message = new HashMap<>();
        message.put("sessionId", sessionId);
        message.put("orderRequestDto", orderRequestDto);
        String kafkaMessage = new Gson().toJson(message);
        kafkaTemplate.send("order_topic", kafkaMessage);
        log.info("주문 요청이 Kafka에 전송되었습니다.");
    }

    public void sendLeaveRoom(String sessionId) {
        log.info("방 떠나기 요청: 세션 ID {}", sessionId);
        Map<String, Object> message = new HashMap<>();
        message.put("sessionId", sessionId);
        String kafkaMessage = new Gson().toJson(message);
        kafkaTemplate.send("leave_room_topic", kafkaMessage);
        log.info("방 떠나기 요청이 Kafka에 전송되었습니다.");
    }
}
