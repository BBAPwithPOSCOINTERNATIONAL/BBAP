package com.bbap.order_room.entity.redis;

import java.util.List;
import java.util.UUID;

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
public class OrderItem {
	private String orderItemId;
	private String menuId;
	private int cnt;
	private List<MenuOption> options;
	private Integer orderer;

	@JsonCreator
	public OrderItem(
		@JsonProperty("orderItemId") String orderItemId,
		@JsonProperty("menuId") String menuId,
		@JsonProperty("cnt") int cnt,
		@JsonProperty("options") List<MenuOption> options,
		@JsonProperty("orderer") Integer orderer) {
		this.orderItemId = orderItemId;
		this.menuId = menuId;
		this.cnt = cnt;
		this.options = options;
		this.orderer = orderer;
	}

	public OrderItem(String menuId, int cnt, List<MenuOption> options, Integer orderer) {
		this.orderItemId = UUID.randomUUID().toString(); // UUID로 고유 식별자 생성
		this.menuId = menuId;
		this.cnt = cnt;
		this.options = options;
		this.orderer = orderer;
	}
}