package com.bbap.order_room.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bbap.order_room.dto.responseDto.CheckEmpResponseData;
import com.bbap.order_room.dto.responseDto.DataResponseDto;

@FeignClient(name = "hr", url = "${feign-hr}")
public interface HrServiceFeignClient {
	@GetMapping("/employees/id/{empId}")
	ResponseEntity<DataResponseDto<CheckEmpResponseData>> checkId(@PathVariable Integer empId);
}