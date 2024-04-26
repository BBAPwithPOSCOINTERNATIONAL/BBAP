package com.bbap.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuDto {
	private String menuName;
	private String menuImage;
	private String menuDetail;
	private int menuPrice;
	private int eatCount;
}
