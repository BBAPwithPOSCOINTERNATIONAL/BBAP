package com.bbap.payment.exception;

import lombok.Getter;

@Getter
public class HistoryNotFoundException extends CustomException {
	private final int statusCode = 404;
	private final String message = "유효하지 않은 결제 내역입니다.";
}
