package com.bbap.order.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayKioskRequestDto {
	private String cafeId;
	private String empId;
	private int usedSubsidy;
	private List<MenuRequestDto> menuList;
}
