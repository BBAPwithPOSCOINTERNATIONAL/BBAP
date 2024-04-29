package com.bbap.restaurant.service;

import java.sql.Date;

import org.springframework.http.ResponseEntity;

import com.bbap.restaurant.dto.request.AddEatRequestDto;
import com.bbap.restaurant.dto.response.DataResponseDto;
import com.bbap.restaurant.dto.response.ListMenuResponseData;
import com.bbap.restaurant.dto.response.ListRestaurantResponseData;
import com.bbap.restaurant.dto.response.ResponseDto;

public interface RestaurantService {
	ResponseEntity<DataResponseDto<ListRestaurantResponseData>> listRestaurant(int restaurantId);

	ResponseEntity<DataResponseDto<ListMenuResponseData>> listMenu(int restaurantId, Date menuDate,
		int mealClassification);

	ResponseEntity<ResponseDto> addEat(AddEatRequestDto request);
}
