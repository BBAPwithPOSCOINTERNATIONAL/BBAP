package com.bbap.payment.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bbap.payment.dto.request.SendNoticeRequestDto;
import com.bbap.payment.dto.response.ResponseDto;

@FeignClient(name = "notice", url = "http://localhost:8083/api/v1/notices")
public interface NoticeServiceFeignClient {
	@PostMapping
	ResponseEntity<ResponseDto> sendNotice(@RequestBody SendNoticeRequestDto request);
}
