package com.bbap.order_room.entity.redis;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@RedisHash(value = "Room", timeToLive = 43200) // 12시간 유지
public class Room {
	@Id
	private String roomId;
	private String cafeId;
	private String roomStatus;
	private Orderer currentOrderer;
	private HashMap<Integer, Orderer> orderers = new HashMap<>(); // key = empId 사용
	private List<OrderItem> orderItems = new ArrayList<>();
	private Long orderNumber;

	@JsonCreator
	public Room(
		@JsonProperty("roomId") String roomId,
		@JsonProperty("cafeId") String cafeId,
		@JsonProperty("roomStatus") String roomStatus,
		@JsonProperty("currentOrderer") Orderer currentOrderer,
		@JsonProperty("orderers") HashMap<Integer, Orderer> orderers,
		@JsonProperty("orderItems") List<OrderItem> orderItems,
		@JsonProperty("orderNumber") Long orderNumber) {
		this.roomId = roomId;
		this.cafeId = cafeId;
		this.roomStatus = roomStatus;
		this.currentOrderer = currentOrderer;
		this.orderers = orderers != null ? orderers : new HashMap<>();
		this.orderItems = orderItems != null ? orderItems : new ArrayList<>();
		this.orderNumber = orderNumber;
	}
}
