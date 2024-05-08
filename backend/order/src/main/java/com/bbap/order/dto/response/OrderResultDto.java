package com.bbap.order.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Field;

import com.bbap.order.entity.OrderMenu;

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
public class OrderResultDto {
	private String id;
	@Field("cafeName")
	private String cafeName;
	@Field("workPlaceId")
	private int workPlaceId;
	@Field("order_time")
	private LocalDateTime orderTime;
	@Field("pick_up_time")
	private LocalDateTime pickUpTime;
	@Field("used_subsidy")
	private int usedSubsidy;
	private List<OrderMenu> menus;
}