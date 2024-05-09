package com.bbap.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.bbap.order.dto.request.LoginRequestDto;
import com.bbap.order.dto.response.CheckEmpResponseData;
import com.bbap.order.dto.response.EmployeeSummaryData;
import com.bbap.order.dto.response.ListWorkplaceData;
import com.bbap.order.dto.responseDto.DataResponseDto;
import com.bbap.order.dto.responseDto.EmployeeDto;

@FeignClient(name = "hr", url = "${feign-hr}")
public interface HrServiceFeignClient {
	@GetMapping("/auth/user-info")
	ResponseEntity<DataResponseDto<EmployeeDto>> getUserInfo(@RequestHeader(value = "X-Employee-Id") int empId);

	@GetMapping("/employees/card/{empCard}")
	ResponseEntity<DataResponseDto<CheckEmpResponseData>> checkCard(@PathVariable String empCard);

	@PostMapping("/employees/user-info")
	ResponseEntity<DataResponseDto<EmployeeSummaryData>> getEmployeeDataByAuth(@RequestBody LoginRequestDto request);

	@GetMapping("/workplaces")
	ResponseEntity<DataResponseDto<ListWorkplaceData>> listWorkplace();
}