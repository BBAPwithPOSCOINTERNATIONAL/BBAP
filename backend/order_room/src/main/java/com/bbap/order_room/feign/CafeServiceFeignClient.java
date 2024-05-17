package com.bbap.order_room.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bbap.order_room.dto.responseDto.CafeInfoOrderListDto;
import com.bbap.order_room.dto.responseDto.CheckEmpResponseData;
import com.bbap.order_room.dto.responseDto.DataResponseDto;

@FeignClient(name = "cafe", url = "${feign-cafe}")
public interface CafeServiceFeignClient {
	@GetMapping("/order-list/{cafeId}")
	ResponseEntity<DataResponseDto<CafeInfoOrderListDto>> cafeInfo(@PathVariable String cafeId);
}