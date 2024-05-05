package com.bbap.order_room.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.bbap.order_room.dto.requestDto.OrderRequestDto;
import com.bbap.order_room.dto.responseDto.CheckEmpResponseData;
import com.bbap.order_room.dto.responseDto.DataResponseDto;
import com.bbap.order_room.dto.responseDto.OrderResponseDto;

@FeignClient(name = "order-api", url = "${feign-order}")
public interface OrderServiceFeignClient {
	@PostMapping("/pay/{empId}")
	ResponseEntity<DataResponseDto<OrderResponseDto>> order(@PathVariable int empId, OrderRequestDto orderRequestDto);
}
