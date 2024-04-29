package com.bbap.hr.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SubsidyNotFoundException extends CustomException {
    private final int statusCode = 404;
    private final String message ="해당 근무지의 현재 지원금 정보를 찾을 수 없습니다.";
}
