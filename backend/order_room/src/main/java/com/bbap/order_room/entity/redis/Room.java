package com.bbap.order_room.entity.redis;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@RedisHash("Room")
public class Room {
	@Id
	private String roomId;
	private String roomStatus;
	private Integer currentOrderer; //empId 사용 - 사용자는 활성화된 하나의 방만 가질 수 있음
	private HashMap<Integer, String> orderers; //empId 사용
	private List<OrderItem> orderItems;
	private Long orderNumber;
}


