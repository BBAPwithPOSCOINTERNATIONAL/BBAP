package com.bbap.auth.service;

import com.bbap.auth.dto.CustomUserDetails;
import com.bbap.auth.provider.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class AuthServiceImpl implements AuthService{


    @Override
    public ResponseEntity<?> getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails;

        if(authentication.getPrincipal() instanceof CustomUserDetails) {
            customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int empId = customUserDetails.getEmpId();
            log.info("토큰 검증 결과 나온 직원 : {}", empId);

            return ResponseEntity.ok()
                    .header("X-Employee-Id", String.valueOf(empId))
                    .build();
        } else {
            // 이곳에 필요한 로직이나 적절한 대체 응답을 포함시켜 주세요!
//            log.warn("해당하는 유저가 없는 요청");
            return ResponseEntity.ok().build();
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }


    }
}
