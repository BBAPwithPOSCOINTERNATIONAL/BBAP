package com.bbap.face.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.bbap.face.dto.request.FaceRequestDto;
import com.bbap.face.dto.request.RegisterFaceRequestDto;
import com.bbap.face.dto.response.CheckFaceResponseData;
import com.bbap.face.dto.response.DataResponseDto;
import com.bbap.face.dto.response.ResponseDto;

@FeignClient(name = "face-fastapi", url = "${feign-fast-api}")
public interface FaceServiceFeignClient {
	@PostMapping(value = "/train", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	ResponseEntity<ResponseDto> registerFace(@ModelAttribute RegisterFaceRequestDto request);

	@PostMapping(value = "/predict", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	ResponseEntity<DataResponseDto<CheckFaceResponseData>> predictFace(@ModelAttribute FaceRequestDto request);
}
