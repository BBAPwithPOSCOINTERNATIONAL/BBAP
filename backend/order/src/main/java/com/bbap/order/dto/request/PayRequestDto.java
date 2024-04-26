package com.bbap.order.dto.request;

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
public class PayRequestDto {
	private String cafeId;
	private int usedSubsidy;
	private LocalDateTime pickUpTime;
	private List<MenuRequestDto> menuList;
}
