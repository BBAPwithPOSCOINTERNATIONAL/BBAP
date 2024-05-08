package com.bbap.order_room.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.bbap.order_room.dto.requestDto.OrderRequestDto;
import com.bbap.order_room.dto.responseDto.CheckEmpResponseData;
import com.bbap.order_room.dto.responseDto.DataResponseDto;
import com.bbap.order_room.dto.responseDto.OrderResponseDto;

@FeignClient(name = "order-api", url = "${feign-order}")
public interface OrderServiceFeignClient {
	@PostMapping("/pay")
	ResponseEntity<DataResponseDto<OrderResponseDto>> order(@RequestHeader(value = "X-Employee-Id") int empId,@RequestBody OrderRequestDto orderRequestDto);
}
