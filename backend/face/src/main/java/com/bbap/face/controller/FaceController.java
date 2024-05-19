package com.bbap.face.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbap.face.dto.request.FaceRequestDto;
import com.bbap.face.dto.response.CheckFaceResponseData;
import com.bbap.face.dto.response.DataResponseDto;
import com.bbap.face.dto.response.ResponseDto;
import com.bbap.face.service.FaceService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/faces")
@Tag(name = "face_recognition", description = "얼굴 인식 API")
public class FaceController {

	private final FaceService faceService;

	@Operation(
		summary = "얼굴 등록",
		description = "이용자의 얼굴 정보를 등록한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "얼굴 정보 등록 성공."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패.")
	})
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> registerFace(@RequestHeader(value = "X-Employee-Id") int empId,
		@ModelAttribute FaceRequestDto request) {
		return faceService.registerFace(empId, request);
	}

	@Operation(
		summary = "얼굴 인식",
		description = "이용자의 얼굴 정보를 기존에 저장된 얼굴 데이터와 비교 후 식별한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "얼굴 식별 성공"),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패.")
	})
	@PostMapping(value = "/check", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<DataResponseDto<CheckFaceResponseData>> checkFace(@ModelAttribute FaceRequestDto request) {
		return faceService.checkFace(request);
	}

	@Operation(
		summary = "등록 여부 확인",
		description = "이용자의 얼굴 정보 등록 여부를 확인한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "등록된 이용자."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "404", description = "등록되지 않은 이용자.")
	})
	@GetMapping
	public ResponseEntity<ResponseDto> checkRegister(@RequestHeader(value = "X-Employee-Id") int empId) {
		return faceService.checkRegister(empId);
	}
}
