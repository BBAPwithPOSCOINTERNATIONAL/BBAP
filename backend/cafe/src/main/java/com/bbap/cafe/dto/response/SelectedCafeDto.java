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
public class SelectedCafeDto {
	private String id;
	private String openTime;
	private String closeTime;
	private List<MenuSummaryDto> menuListCoffee;
	private List<MenuSummaryDto> menuListBeverage;
	private List<MenuSummaryDto> menuListDesert;
}
