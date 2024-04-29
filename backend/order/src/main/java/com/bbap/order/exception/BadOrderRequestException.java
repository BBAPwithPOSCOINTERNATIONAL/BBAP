package com.bbap.order.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BadOrderRequestException extends CustomException{
	private final int statusCode = 400;
	private final String message = "잘못된 주문 옵션 요청입니다.";
}
