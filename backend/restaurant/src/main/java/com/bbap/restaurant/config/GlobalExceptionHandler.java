package com.bbap.restaurant.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.restaurant.dto.response.ResponseDto;
import com.bbap.restaurant.exception.CustomException;
import com.bbap.restaurant.exception.MenuNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효하지 않은 요청입니다.");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}

	//없는 메뉴
	@ExceptionHandler(MenuNotFoundException.class)
	public ResponseEntity<ResponseDto> MenuNotFoundExceptionHandler(MenuNotFoundException e) {
		return handleException(e);
	}

	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}

