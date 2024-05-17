package com.bbap.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.bbap.order.dto.request.PaymentRequestDto;
import com.bbap.order.dto.response.AvailSubsidyResponseData;
import com.bbap.order.dto.responseDto.DataResponseDto;
import com.bbap.order.dto.responseDto.ResponseDto;

@FeignClient(name = "payment-api", url = "${feign-payment}")
public interface PaymentServiceFeignClient {
	@PostMapping
	ResponseEntity<ResponseDto> pay(@RequestBody PaymentRequestDto requestDto);

	@GetMapping("/subsidy")
	ResponseEntity<DataResponseDto<AvailSubsidyResponseData>> availSubsidy(
		@RequestHeader(value = "X-Employee-Id") int empId);
}
