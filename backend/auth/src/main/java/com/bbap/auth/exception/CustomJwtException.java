package com.bbap.auth.exception;

public class CustomJwtException extends RuntimeException {
    public CustomJwtException(String message, Throwable cause) {
        super(message, cause);
    }
}