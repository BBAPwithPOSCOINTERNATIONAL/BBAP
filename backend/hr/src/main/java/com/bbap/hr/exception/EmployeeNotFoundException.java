package com.bbap.hr.exception;


import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeeNotFoundException extends CustomException {
    private final int statusCode = 404;
    private final String message ="존재하지 않는 사원번호입니다.";

}
