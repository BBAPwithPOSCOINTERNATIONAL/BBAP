package com.bbap.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bbap.order.dto.request.PaymentRequestDto;
import com.bbap.order.dto.responseDto.ResponseDto;

@FeignClient(name = "payment-api", url = "${feign-payment}")
public interface PaymentServiceFeignClient {
	@PostMapping
	ResponseEntity<ResponseDto> pay(@RequestBody PaymentRequestDto requestDto);
}
