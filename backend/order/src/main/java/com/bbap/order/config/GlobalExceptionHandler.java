package com.bbap.order.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.order.dto.responseDto.ResponseDto;
import com.bbap.order.exception.BadCouponRequestException;
import com.bbap.order.exception.BadOrderRequestException;
import com.bbap.order.exception.CafeEntityNotFoundException;
import com.bbap.order.exception.CustomException;
import com.bbap.order.exception.MenuEntityNotFoundException;
import com.bbap.order.exception.OrderEntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효성 실패");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}

	//존재하지 않는 메뉴 아이디
	@ExceptionHandler(MenuEntityNotFoundException.class)
	public ResponseEntity<ResponseDto> menuNotFoundExceptionHandler(MenuEntityNotFoundException e) {
		return handleException(e);
	}

	//존재하지 않는 카페 아이디
	@ExceptionHandler(CafeEntityNotFoundException.class)
	public ResponseEntity<ResponseDto> cafeNotFoundExceptionHandler(CafeEntityNotFoundException e) {
		return handleException(e);
	}

	//잘못된 주문 요청
	@ExceptionHandler(BadOrderRequestException.class)
	public ResponseEntity<ResponseDto> BadOrderRequestExceptionHandler(BadOrderRequestException e) {
		return handleException(e);
	}

	//잘못된 쿠폰 요청
	@ExceptionHandler(BadCouponRequestException.class)
	public ResponseEntity<ResponseDto> BadCouponRequestExceptionHandler(BadCouponRequestException e) {
		return handleException(e);
	}

	//존재하지 않는 주문 아이디
	@ExceptionHandler(OrderEntityNotFoundException.class)
	public ResponseEntity<ResponseDto> orderNotFoundExceptionHandler(OrderEntityNotFoundException e) {
		return handleException(e);
	}

	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}
