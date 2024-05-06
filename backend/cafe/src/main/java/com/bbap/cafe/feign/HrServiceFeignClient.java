package com.bbap.cafe.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.bbap.cafe.dto.responseDto.DataResponseDto;
import com.bbap.cafe.dto.responseDto.EmployeeDto;

@FeignClient(name = "hr", url = "${feign_hr}")
public interface HrServiceFeignClient {
    @GetMapping("/auth/user-info")
    ResponseEntity<DataResponseDto<EmployeeDto>> getUserInfo(@RequestHeader(value = "X-Employee-Id") int empId);
}