package com.bbap.payment.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bbap.payment.dto.response.DataResponseDto;
import com.bbap.payment.dto.response.PayMenuResponseData;

@FeignClient(name = "restaurant", url = "${feign_restaurant}")
public interface RestaurantServiceFeignClient {
	@GetMapping("/menus/{menuId}")
	ResponseEntity<DataResponseDto<PayMenuResponseData>> payMenu(@PathVariable int menuId);
}
