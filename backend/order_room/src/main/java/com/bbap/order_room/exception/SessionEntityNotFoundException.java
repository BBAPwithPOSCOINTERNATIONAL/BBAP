package com.bbap.order_room.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SessionEntityNotFoundException extends CustomException{
	private final int statusCode = 404;
	private final String message = "찾을 수 없는 세션 아이디 입니다.";
}
