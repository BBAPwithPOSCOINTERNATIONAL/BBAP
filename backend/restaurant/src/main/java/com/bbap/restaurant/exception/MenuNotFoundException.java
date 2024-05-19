package com.bbap.restaurant.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuNotFoundException extends CustomException {
    private final int statusCode = 404;
    private final String message ="해당 메뉴의 정보를 찾을 수 없습니다.";
}
