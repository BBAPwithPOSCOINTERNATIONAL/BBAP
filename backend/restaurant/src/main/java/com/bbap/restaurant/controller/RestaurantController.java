package com.bbap.restaurant.controller;

import java.sql.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbap.restaurant.dto.response.DataResponseDto;
import com.bbap.restaurant.dto.response.ListMenuResponseData;
import com.bbap.restaurant.dto.response.ListRestaurantResponseData;
import com.bbap.restaurant.dto.response.PayMenuResponseData;
import com.bbap.restaurant.service.RestaurantService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/restaurants")
@Tag(name = "restaurant", description = "식당 정보 API")
public class RestaurantController {

	private final RestaurantService restaurantService;

	@Operation(
		summary = "식당 정보 조회",
		description = "식당의 목록과 이용자의 최근 조회 또는 근무지의 식당 정보와"
			+ "해당 식당의 현재 또는 곧 제공될 메뉴 리스트를 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "식당 정보 조회 성공."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패.")
	})
	@GetMapping("/{restaurantId}")
	public ResponseEntity<DataResponseDto<ListRestaurantResponseData>> listRestaurant(@PathVariable int restaurantId) {
		return restaurantService.listRestaurant(restaurantId);
	}

	@Operation(
		summary = "메뉴 정보 조회",
		description = "메뉴 리스트를 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "메뉴 정보 조회 성공."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패.")
	})
	@GetMapping("/menus/{restaurantId}/{menuDate}/{mealClassification}")
	public ResponseEntity<DataResponseDto<ListMenuResponseData>> listMenu(@PathVariable int restaurantId,
		@PathVariable Date menuDate, @PathVariable int mealClassification) {
		return restaurantService.listMenu(restaurantId, menuDate, mealClassification);
	}

	@Operation(
		summary = "결제 메뉴 정보 조회",
		description = "결제 처리를 위해 메뉴 정보를 제공하고 먹은 인원 수를 추가한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패.")
	})
	@GetMapping("/menus/{menuId}")
	public ResponseEntity<DataResponseDto<PayMenuResponseData>> payMenu(@PathVariable int menuId) {
		return restaurantService.payMenu(menuId);
	}
}