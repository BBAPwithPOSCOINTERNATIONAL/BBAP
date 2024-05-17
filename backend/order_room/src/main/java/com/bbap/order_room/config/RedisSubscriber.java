package com.bbap.order_room.config;

import com.bbap.order_room.entity.redis.Room;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisSubscriber implements MessageListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            Room room = objectMapper.readValue(message.getBody(), Room.class);
            messagingTemplate.convertAndSend("/topic/room/" + room.getRoomId(), room);
            log.info("방 {}의 업데이트 정보가 STOMP 구독자들에게 전송되었습니다.", room.getRoomId());
        } catch (Exception e) {
            log.error("Failed to parse Redis message: {}", e.getMessage());
        }
    }
}
