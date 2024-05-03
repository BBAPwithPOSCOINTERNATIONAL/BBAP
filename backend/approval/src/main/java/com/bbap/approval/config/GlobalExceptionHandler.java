package com.bbap.approval.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.approval.dto.response.ResponseDto;
import com.bbap.approval.exception.ApproveNotFoundException;
import com.bbap.approval.exception.CustomException;

import feign.FeignException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효하지 않은 요청입니다.");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}

	//결재 오류
	@ExceptionHandler(ApproveNotFoundException.class)
	public ResponseEntity<ResponseDto> ApproveNotFoundExceptionHandler(ApproveNotFoundException e) {
		return handleException(e);
	}

	//feign
	@ExceptionHandler(FeignException.class)
	public ResponseEntity<String> FeignExceptionHandler(FeignException e) {
		return ResponseEntity.status(e.status()).body(e.contentUTF8());
	}

	@ExceptionHandler(CustomException.class)
	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}
