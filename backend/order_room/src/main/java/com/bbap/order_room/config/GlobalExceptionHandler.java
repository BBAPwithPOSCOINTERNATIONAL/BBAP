package com.bbap.order_room.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.order_room.dto.responseDto.ResponseDto;
import com.bbap.order_room.exception.CustomException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효성 실패");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}


	// //존재하지 않는 메뉴 아이디
	// @ExceptionHandler(MenuEntityNotFoundException.class)
	// public ResponseEntity<ResponseDto> menuNotFoundExceptionHandler(MenuEntityNotFoundException e) {
	// 	return handleException(e);
	// }


	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}
