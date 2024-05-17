package com.bbap.order.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BadCouponRequestException extends CustomException{
	private final int statusCode = 400;
	private final String message = "쿠폰 수가 올바르지 않습니다.";
}
