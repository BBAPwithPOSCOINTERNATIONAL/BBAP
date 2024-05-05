package com.bbap.order_room.dto.requestDto;

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
public class OrderRequestDto {
	private String cafeId;
	private int usedSubsidy;
	private LocalDateTime pickUpTime;
	private List<MenuRequestDto> menuList;
}
