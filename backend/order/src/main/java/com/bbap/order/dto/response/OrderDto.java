package com.bbap.order.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
	private String orderId;
	private LocalDateTime pickUpTime;
	private String cafeName;
	private String firstMenuName;
	private int menuCnt;
	private int payAmount;
	private String workPlaceName;
}