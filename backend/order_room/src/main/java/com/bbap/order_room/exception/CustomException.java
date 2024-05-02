package com.bbap.order_room.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
    private int statusCode;
    private String message;
}