package com.bbap.order_room.entity.redis;

import java.util.List;

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
	private String menuId;
	private int cnt;
	private List<MenuOption> options;
	private Integer orderer;
}
