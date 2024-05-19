package com.bbap.payment.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.bbap.payment.dto.response.CheckEmpResponseData;
import com.bbap.payment.dto.response.PayMenuResponseData;
import com.bbap.payment.feign.HrServiceFeignClient;
import com.bbap.payment.feign.RestaurantServiceFeignClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CacheService {
	private final HrServiceFeignClient hrServiceFeignClient;
	private final RestaurantServiceFeignClient restaurantServiceFeignClient;

	@Cacheable(value = "empData", key = "#cardId")
	public CheckEmpResponseData getEmployeeData(String cardId) {
		CheckEmpResponseData empData = hrServiceFeignClient.checkCard(cardId).getBody().getData();
		return empData;
	}

	@Cacheable(value = "menuData", key = "#menuId")
	public PayMenuResponseData getMenuData(int menuId) {
		PayMenuResponseData menuData = restaurantServiceFeignClient.payMenu(menuId).getBody().getData();
		return menuData;
	}
}
