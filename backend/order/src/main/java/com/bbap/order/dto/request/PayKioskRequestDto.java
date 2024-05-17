package com.bbap.order.dto.request;

import java.util.List;

import com.bbap.order.dto.BaseOrderDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayKioskRequestDto implements BaseOrderDto {
	private String cafeId;
	private Integer empId;
	private int usedSubsidy;
	private List<MenuRequestDto> menuList;
	private int cntCouponToUse;
}
