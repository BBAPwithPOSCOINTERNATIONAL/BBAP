package com.bbap.hr.provider;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.bbap.hr.exception.CustomJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    public String createToken(
            long employeeId, long duration, ChronoUnit unit
    ) {

        Date expiredDate = Date.from(Instant.now().plus(duration, unit));
        SecretKey key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

        Map<String, Object> claims = new HashMap<>();
        claims.put("employeeId", employeeId);

        return Jwts.builder()
                .signWith(key)
                .claims(claims)
                .claim("iat", Date.from(Instant.now()))
                .claim("exp", expiredDate)
                .compact();
    }

    public Jws<Claims> validateToken(String token) {
        SecretKey key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
        } catch (ExpiredJwtException e) {
            throw new CustomJwtException("만료된 토큰입니다.", e);
        } catch (SignatureException | UnsupportedJwtException | MalformedJwtException e) {
            throw new CustomJwtException("토큰이 검증되지 않았습니다", e);
        }

    }

    public long getExpiryTime(String token) {
        SecretKey key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        long differenceInMillis = claims.getExpiration().getTime() - System.currentTimeMillis();

        return TimeUnit.MILLISECONDS.toSeconds(differenceInMillis);
    }
}

