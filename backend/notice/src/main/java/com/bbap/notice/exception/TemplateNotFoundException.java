package com.bbap.notice.exception;

import lombok.Getter;

@Getter
public class TemplateNotFoundException extends CustomException {
	private final int statusCode = 404;
	private final String message = "유효하지 알림 분류입니다.";
}
