package com.bbap.order.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailMenuDto {
	private String menuName;
	private int menuPrice;
	private int menuCnt;
	private String optionText;
}