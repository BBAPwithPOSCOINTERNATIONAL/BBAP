package com.bbap.restaurant.dto.response;

import java.sql.Date;
import java.util.List;

import com.bbap.restaurant.dto.MenuDto;
import com.bbap.restaurant.dto.RestaurantDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ListRestaurantResponseData {
	private List<RestaurantDto> restaurantList;
	private int restaurantId;
	private Date todayDate;
	private int mealClassification;
	private List<MenuDto> menuList;
}
