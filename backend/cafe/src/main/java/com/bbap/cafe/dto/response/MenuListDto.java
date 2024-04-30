package com.bbap.cafe.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuListDto {
	private String id;
	private List<MenuDto> menuListCoffee;
	private List<MenuDto> menuListBeverage;
	private List<MenuDto> menuListDesert;
	private List<MenuDto> menuListPopular;
}
