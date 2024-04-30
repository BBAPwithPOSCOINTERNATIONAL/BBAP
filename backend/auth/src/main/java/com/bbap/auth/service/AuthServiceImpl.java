package com.bbap.auth.service;

import com.bbap.auth.provider.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final JwtProvider jwtProvider;

    @Override
    public boolean isValid(String token) {

        String parsedToken = jwtProvider.parseBearerToken(token);
        System.out.println(parsedToken);

        if (parsedToken == null) {
            log.warn("입력받은 토큰이 null : {}", token);
            return false;
        }


        boolean isValid = jwtProvider.validateToken(parsedToken) != null;
        log.info("토큰 검증 결과 {}: {}", token, isValid);

        return isValid;
    }

    @Override
    public String getUserIdFromToken(String token) {
        String parsedToken = jwtProvider.parseBearerToken(token);

        Jws<Claims> validatedToken = jwtProvider.validateToken(parsedToken);
        if (validatedToken != null) {

            Claims claims = validatedToken.getPayload();
            Integer employeeId = claims.get("employeeId", Integer.class);

            log.info("추출된 사원 아이디 : {}", employeeId); // Logging info about extracted employeeId
            return String.valueOf(employeeId);
        } else {
            return null;
        }
    }
}
