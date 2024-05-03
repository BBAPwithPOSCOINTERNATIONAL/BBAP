package com.bbap.order_room.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.order_room.dto.responseDto.ResponseDto;
import com.bbap.order_room.exception.CustomException;
import com.bbap.order_room.exception.OrderItemNotFoundException;
import com.bbap.order_room.exception.RoomEntityNotFoundException;
import com.bbap.order_room.exception.SessionEntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효성 실패");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}


	//존재하지 않는 방 아이디
	@ExceptionHandler(RoomEntityNotFoundException.class)
	public ResponseEntity<ResponseDto> roomNotFoundExceptionHandler(RoomEntityNotFoundException e) {
		return handleException(e);
	}

	//존재하지 않는 세션 아이디
	@ExceptionHandler(SessionEntityNotFoundException.class)
	public ResponseEntity<ResponseDto> sessionNotFoundExceptionHandler(SessionEntityNotFoundException e) {
		return handleException(e);
	}

	//존재하지 않는 주문 메뉴 아이디
	@ExceptionHandler(OrderItemNotFoundException.class)
	public ResponseEntity<ResponseDto> OrderItemNotFoundExceptionHandler(OrderItemNotFoundException e) {
		return handleException(e);
	}


	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}
