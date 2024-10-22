package com.bbap.order_room.entity.redis;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@RedisHash(value = "Session", timeToLive = 7200)
public class Session {
	@Id
	private String sessionId;
	private Integer empId;
	private String roomId;
}
