package com.bbap.order.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuEntityNotFoundException extends CustomException{
	private final int statusCode = 404;
	private final String message = "찾을 수 없는 메뉴 아이디 입니다.";
}
