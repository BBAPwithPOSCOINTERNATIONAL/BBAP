package com.bbap.approval.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.bbap.approval.dto.request.ListApprovalRequestDto;
import com.bbap.approval.dto.response.DataResponseDto;
import com.bbap.approval.dto.response.ListEmployeeResponseData;

@FeignClient(name = "hr", url = "${feign_hr}")
public interface HrServiceFeignClient {
	@GetMapping("/employees")
	ResponseEntity<DataResponseDto<ListEmployeeResponseData>> searchEmployees(
		@SpringQueryMap ListApprovalRequestDto request);
}