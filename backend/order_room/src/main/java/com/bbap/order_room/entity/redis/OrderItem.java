package com.bbap.order_room.entity.redis;

import java.util.List;
import java.util.UUID;

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
public class OrderItem {
	private String orderItemId;
	private String menuId;
	private int cnt;
	private List<MenuOption> options;
	private Integer orderer;

	public OrderItem(String menuId, int cnt, List<MenuOption> options, Integer orderer) {
		this.orderItemId = UUID.randomUUID().toString(); // UUID로 고유 식별자 생성
		this.menuId = menuId;
		this.cnt = cnt;
		this.options = options;
		this.orderer = orderer;
	}
}
