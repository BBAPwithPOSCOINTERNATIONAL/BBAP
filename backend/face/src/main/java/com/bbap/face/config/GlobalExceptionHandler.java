package com.bbap.face.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.face.dto.response.ResponseDto;
import com.bbap.face.exception.CustomException;
import com.bbap.face.exception.FaceNotFoundException;
import com.bbap.face.exception.FaceUnprocessException;
import com.bbap.face.exception.RegisterNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효성 실패");
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

	//처리할 수 없는 이미지
	@ExceptionHandler(FaceUnprocessException.class)
	public ResponseEntity<ResponseDto> FaceUnprocessExceptionHandler(FaceUnprocessException e) {
		return handleException(e);
	}

	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}

