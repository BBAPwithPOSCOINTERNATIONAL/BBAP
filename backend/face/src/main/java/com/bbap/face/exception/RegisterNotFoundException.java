package com.bbap.face.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RegisterNotFoundException extends CustomException {
	private final int statusCode = 404;
	private final String message = "등록되지 않은 이용자입니다.";
}