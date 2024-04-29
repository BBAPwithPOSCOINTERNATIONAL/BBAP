package com.bbap.order.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponseDto {
	private String cafeName;
	private int payAmount;
	private String workPlaceName;
	private int usedSubsidy;
	private LocalDateTime orderTime;
	private LocalDateTime pickUpTime;
	private List<OrderDetailMenuDto> menuList;
}
