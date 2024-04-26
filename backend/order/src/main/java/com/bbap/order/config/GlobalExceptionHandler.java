package com.bbap.order.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.order.dto.responseDto.ResponseDto;
import com.bbap.order.exception.CustomException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효성 실패");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}

    //존재하지 않는 카페 아이디
	// @ExceptionHandler(CafeEntityNotFoundException.class)
	// public ResponseEntity<ResponseDto> cafeNotFoundExceptionHandler(CafeEntityNotFoundException e) {
	// 	return handleException(e);
	// }

	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}
