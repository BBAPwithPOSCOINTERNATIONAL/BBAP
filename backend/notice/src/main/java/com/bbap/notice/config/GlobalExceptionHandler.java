package com.bbap.notice.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.notice.dto.response.ResponseDto;
import com.bbap.notice.exception.CustomException;
import com.bbap.notice.exception.TemplateNotFoundException;
import com.google.firebase.messaging.FirebaseMessagingException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효하지 않은 요청입니다.");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}

	//firebase
	@ExceptionHandler(FirebaseMessagingException.class)
	public ResponseEntity<ResponseDto> firebaseMessagingExceptionHandler(FirebaseMessagingException e) {
		ResponseDto responseBody = new ResponseDto("파이어베이스 오류.");
		return ResponseEntity.status(503).body(responseBody);
	}

	//없는 알림 분류
	@ExceptionHandler(TemplateNotFoundException.class)
	public ResponseEntity<ResponseDto> TemplateNotFoundExceptionHandler(TemplateNotFoundException e) {
		return handleException(e);
	}

	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}

