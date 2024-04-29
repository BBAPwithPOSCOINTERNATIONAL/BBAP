package com.bbap.payment.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
	private int statusCode;
	private String message;
}
