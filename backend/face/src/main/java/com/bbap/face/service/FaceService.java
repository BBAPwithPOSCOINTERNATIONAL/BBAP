package com.bbap.face.service;

import org.springframework.http.ResponseEntity;

import com.bbap.face.dto.request.FaceRequestDto;
import com.bbap.face.dto.response.CheckFaceResponseData;
import com.bbap.face.dto.response.DataResponseDto;
import com.bbap.face.dto.response.ResponseDto;

public interface FaceService {
	ResponseEntity<ResponseDto> registerFace(FaceRequestDto request);

	ResponseEntity<DataResponseDto<CheckFaceResponseData>> checkFace(FaceRequestDto request);

	ResponseEntity<ResponseDto> checkRegister();
}
