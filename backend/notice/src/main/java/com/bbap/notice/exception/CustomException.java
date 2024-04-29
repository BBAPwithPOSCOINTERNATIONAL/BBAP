package com.bbap.notice.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
	private int statusCode;
	private String message;
}
