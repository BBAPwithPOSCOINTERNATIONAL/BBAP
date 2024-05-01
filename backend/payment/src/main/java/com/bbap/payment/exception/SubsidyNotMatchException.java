package com.bbap.payment.exception;

import lombok.Getter;

@Getter
public class SubsidyNotMatchException extends CustomException {
	private final int statusCode = 409;
	private final String message = "결제 지원금 정보가 일치하지 않습니다.";
}
