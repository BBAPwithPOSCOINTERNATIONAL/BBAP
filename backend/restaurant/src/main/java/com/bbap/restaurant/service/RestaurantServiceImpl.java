package com.bbap.restaurant.service;

import java.sql.Date;
import java.time.LocalTime;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.restaurant.dto.response.DataResponseDto;
import com.bbap.restaurant.dto.response.ListMenuResponseData;
import com.bbap.restaurant.dto.response.ListRestaurantResponseData;
import com.bbap.restaurant.dto.response.PayMenuResponseData;
import com.bbap.restaurant.repository.RestaurantMenuRepository;
import com.bbap.restaurant.repository.RestaurantRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class RestaurantServiceImpl implements RestaurantService {
	// private final FaceServiceFeignClient faceServiceFeignClient;

	private final RestaurantRepository restaurantRepository;
	private final RestaurantMenuRepository restaurantMenuRepository;

	@Override
	public ResponseEntity<DataResponseDto<ListRestaurantResponseData>> listRestaurant(int restaurantId) {
		//restaurantId가 -1로 넘어왔을 경우 이용자의 근무지에 속해있는 사전순 제일 앞의 식당 정보를 보여준다.
		//restaurantId를 사원에 맞게 변경 처리
		Date todatDate = new Date(System.currentTimeMillis());
		int mealClassification = classifyMealTime();

		ListRestaurantResponseData data = ListRestaurantResponseData.builder()
			.restaurantList(restaurantRepository.findAllDto())
			.restaurantId(restaurantId)
			.todayDate(todatDate)
			.mealClassification(mealClassification)
			.menuList(restaurantMenuRepository.findMenuList(restaurantId, todatDate, mealClassification))
			.build();

		log.info("{} : 식당 정보 정상 조회", restaurantId);

		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<DataResponseDto<ListMenuResponseData>> listMenu(int restaurantId, Date menuDate,
		int mealClassification) {
		ListMenuResponseData data = new ListMenuResponseData(
			restaurantMenuRepository.findMenuList(restaurantId, menuDate, mealClassification));
		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<DataResponseDto<PayMenuResponseData>> payMenu(int menuId) {
		restaurantMenuRepository.addEat(menuId);

		return DataResponseDto.of(restaurantMenuRepository.findPayMenu(menuId));
	}

	//시간별 식사 분류 지정
	public static int classifyMealTime() {
		// 현재 시간을 가져옴
		LocalTime now = LocalTime.now();

		// 아침, 점심, 저녁 시간 범위 설정
		LocalTime breakfastEnd = LocalTime.of(10, 0); // 10시까지 아침
		LocalTime lunchEnd = LocalTime.of(15, 0); // 16시까지 점심

		// 현재 시간에 따라 mealClassification 값 반환
		if (now.isBefore(breakfastEnd)) {
			return 1; // 아침
		} else if (now.isBefore(lunchEnd)) {
			return 2; // 점심
		} else {
			return 3; // 저녁
		}
	}
}
