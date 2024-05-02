package com.bbap.restaurant.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.bbap.restaurant.dto.response.DataResponseDto;
import com.bbap.restaurant.dto.response.EmployeeDto;

@FeignClient(name = "hr", url = "http://localhost:8080/api/v1/hr")
public interface HrServiceFeignClient {
	@GetMapping("/auth/user-info")
	ResponseEntity<DataResponseDto<EmployeeDto>> getUserInfo(@RequestHeader(value = "X-Employee-Id") int empId);
}