package com.bbap.payment.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.payment.dto.response.ResponseDto;
import com.bbap.payment.exception.CustomException;
import com.bbap.payment.exception.HistoryNotFoundException;
import com.bbap.payment.exception.SubsidyNotMatchException;

import feign.FeignException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효하지 않은 요청입니다.");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}

	//feign
	@ExceptionHandler(FeignException.class)
	public ResponseEntity<String> FeignExceptionHandler(FeignException e) {
		return ResponseEntity.status(e.status()).body(e.contentUTF8());
	}

	//없는 결제 내역
	@ExceptionHandler(HistoryNotFoundException.class)
	public ResponseEntity<ResponseDto> HistoryNotFoundExceptionHandler(HistoryNotFoundException e) {
		return handleException(e);
	}

	//결제 지원금 불일치
	@ExceptionHandler(SubsidyNotMatchException.class)
	public ResponseEntity<ResponseDto> SubsidyNotMatchExceptionHandler(SubsidyNotMatchException e) {
		return handleException(e);
	}

	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}

