package com.bbap.payment.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bbap.payment.dto.response.CheckCardResponseData;
import com.bbap.payment.dto.response.DataResponseDto;

@FeignClient(name = "hr", url = "http://localhost:8080/api/v1/hr")
public interface HrServiceFeignClient {
	@GetMapping("/employees/card/{empCard}")
	ResponseEntity<DataResponseDto<CheckCardResponseData>> checkCard(@PathVariable String empCard);
}