package com.bbap.restaurant.service;

import java.sql.Date;

import org.springframework.http.ResponseEntity;

import com.bbap.restaurant.dto.response.DataResponseDto;
import com.bbap.restaurant.dto.response.ListMenuResponseData;
import com.bbap.restaurant.dto.response.ListRestaurantResponseData;
import com.bbap.restaurant.dto.response.PayMenuResponseData;

public interface RestaurantService {
	ResponseEntity<DataResponseDto<ListRestaurantResponseData>> listRestaurant(int restaurantId);

	ResponseEntity<DataResponseDto<ListMenuResponseData>> listMenu(int restaurantId, Date menuDate,
		int mealClassification);

	ResponseEntity<DataResponseDto<PayMenuResponseData>> payMenu(int menuId);
}
