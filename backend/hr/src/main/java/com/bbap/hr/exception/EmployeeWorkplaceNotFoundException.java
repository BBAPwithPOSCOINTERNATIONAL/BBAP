package com.bbap.hr.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeeWorkplaceNotFoundException extends CustomException {
    private final int statusCode = 404;
    private final String message ="해당 사원의 근무지 정보가 없습니다.";
}
