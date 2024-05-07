package com.bbap.auth.filter;


import com.bbap.auth.dto.CustomUserDetails;
import com.bbap.auth.exception.CustomJwtException;
import com.bbap.auth.provider.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String forwardedMethod = request.getHeader("x-forwarded-method");
            Enumeration<String> headers = request.getHeaderNames();
            while (headers.hasMoreElements()) {
                String headerName = headers.nextElement();
                System.out.println(headerName + " : " + request.getHeader(headerName));
            }

            if ("OPTIONS".equalsIgnoreCase(forwardedMethod)) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = parseBearerToken(request);

            if (token == null) {
                filterChain.doFilter(request, response);
                return;
//                throw new CustomJwtException("Missing token in request headers", null); // 토큰이 없으면 예외를 발생시킨다
            }

            Jws<Claims> parsedToken = jwtProvider.validateToken(token);
            Integer empId = parsedToken.getPayload().get("employeeId", Integer.class);

            CustomUserDetails customUserDetails = new CustomUserDetails(empId);

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

            AbstractAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(customUserDetails, null, Collections.emptyList());// 1: 유저정보
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            securityContext.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(securityContext);


        } catch (CustomJwtException e) {
            throw new CustomJwtException(e.getMessage(), e);
        }

        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }
}
