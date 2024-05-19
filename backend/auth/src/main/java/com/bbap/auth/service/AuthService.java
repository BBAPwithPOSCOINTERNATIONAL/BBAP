package com.bbap.auth.service;


import org.springframework.http.ResponseEntity;

public interface AuthService {
//    boolean isValid(String token);

//    String getUserIdFromToken(String token);

    ResponseEntity<?> getUserId();
}
