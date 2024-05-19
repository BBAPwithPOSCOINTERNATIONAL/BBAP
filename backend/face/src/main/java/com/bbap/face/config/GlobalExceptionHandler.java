package com.bbap.face.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.face.dto.response.ResponseDto;
import com.bbap.face.exception.CustomException;
import com.bbap.face.exception.FaceNotFoundException;
import com.bbap.face.exception.RegisterNotFoundException;

import feign.FeignException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효하지 않은 요청입니다.");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}

	//등록되지 않은 얼굴
	@ExceptionHandler(FaceNotFoundException.class)
	public ResponseEntity<ResponseDto> FaceNotFoundExceptionHandler(FaceNotFoundException e) {
		return handleException(e);
	}

	//등록되지 않은 이용자
	@ExceptionHandler(RegisterNotFoundException.class)
	public ResponseEntity<ResponseDto> RegisterNotFoundExceptionHandler(RegisterNotFoundException e) {
		return handleException(e);
	}

	//feign
	@ExceptionHandler(FeignException.class)
	public ResponseEntity<String> FeignExceptionHandler(FeignException e) {
		return ResponseEntity.status(e.status()).body(e.contentUTF8());
	}

	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}

