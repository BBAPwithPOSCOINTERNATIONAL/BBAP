package com.bbap.hr.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class InvalidPasswordException extends CustomException {
    private final int statusCode = 400;
    private final String message ="비밀번호가 일치하지 않습니다.";

}
