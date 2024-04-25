package com.bbap.face.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FaceUnprocessException extends CustomException {
	private final int statusCode = 422;
	private final String message = "처리할 수 없는 얼굴 이미지입니다.";
}