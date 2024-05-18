package com.bbap.order_room.config;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import com.bbap.order_room.entity.redis.Room;
import com.google.gson.Gson;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisPublisher {
    private final RedisTemplate<String, Object> redisTemplate;

    public void publishRoomUpdate(Room room) {
        try {
            String message = new Gson().toJson(room);
            redisTemplate.convertAndSend("room_update_channel", message);
            log.info("방 {}의 정보가 Redis에 게시되었습니다.", room.getRoomId());
        } catch (Exception e) {
            log.error("Failed to publish room update message: {}", e.getMessage(), e);
        }
    }
}
