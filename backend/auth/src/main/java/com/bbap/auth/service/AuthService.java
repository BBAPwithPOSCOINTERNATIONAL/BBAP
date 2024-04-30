package com.bbap.auth.service;


public interface AuthService {
    boolean isValid(String token);

    String getUserIdFromToken(String token);
}
