package com.bbap.hr.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.bbap.hr.dto.request.SaveFcmRequestDto;
import com.bbap.hr.dto.response.ResponseDto;

@FeignClient(name = "notice", url = "http://localhost:8083/api/v1/notices")
public interface NoticeServiceFeignClient {
	@GetMapping("/fcm")
	ResponseEntity<ResponseDto> saveFcm(@RequestHeader(value = "X-Employee-Id") int empId,SaveFcmRequestDto request);
}