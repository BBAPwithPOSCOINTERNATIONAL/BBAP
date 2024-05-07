package com.bbap.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.bbap.order.dto.request.FaceRequestDto;
import com.bbap.order.dto.responseDto.CheckFaceResponseData;
import com.bbap.order.dto.responseDto.DataResponseDto;

@FeignClient(name = "face-api", url = "${feign-face}")
public interface FaceServiceFeignClient {

	@PostMapping(value = "/check", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	ResponseEntity<DataResponseDto<CheckFaceResponseData>> predictFace(@ModelAttribute FaceRequestDto request);

}
