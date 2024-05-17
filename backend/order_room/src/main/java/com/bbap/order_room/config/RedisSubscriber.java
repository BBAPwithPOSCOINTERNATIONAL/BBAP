package com.bbap.order_room.config;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.bbap.order_room.entity.redis.Room;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisSubscriber implements MessageListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String messageBody = new String(message.getBody());
            log.info("Received message: {}", messageBody);  // 메시지 내용을 로깅
            Room room = objectMapper.readValue(messageBody, Room.class);
            messagingTemplate.convertAndSend("/topic/room/" + room.getRoomId(), room);
            log.info("방 {}의 업데이트 정보가 STOMP 구독자들에게 전송되었습니다.", room.getRoomId());
        } catch (Exception e) {
            log.error("Failed to parse Redis message: {}", e.getMessage(), e);  // 전체 예외 메시지 로깅
        }
    }
}
