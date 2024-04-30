package com.bbap.auth.controller;

import com.bbap.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;


    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader(value="Authorization") String token) {
        boolean isValid = authService.isValid(token);


        if (isValid) {
            return ResponseEntity.ok().header("X-Employee-Id", authService.getUserIdFromToken(token)).build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}