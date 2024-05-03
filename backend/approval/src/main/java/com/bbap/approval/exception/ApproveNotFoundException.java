package com.bbap.approval.exception;

import lombok.Getter;

@Getter
public class ApproveNotFoundException extends CustomException {
	private final int statusCode = 404;
	private final String message = "결재 오류";
}
