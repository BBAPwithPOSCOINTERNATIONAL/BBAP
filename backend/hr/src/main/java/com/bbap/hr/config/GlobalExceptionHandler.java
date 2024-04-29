package com.bbap.hr.config;

import com.bbap.hr.dto.response.ResponseDto;
import com.bbap.hr.exception.CustomException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    //유효성 검사
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
        ResponseDto responseBody = new ResponseDto("유효하지 않은 요청입니다.");
        return ResponseEntity.status(e.getStatusCode()).body(responseBody);
    }

    @ExceptionHandler(CustomException.class)
    private ResponseEntity<ResponseDto> handleException(CustomException e) {
        ResponseDto responseBody = new ResponseDto(e.getMessage());
        return ResponseEntity.status(e.getStatusCode()).body(responseBody);
    }
}