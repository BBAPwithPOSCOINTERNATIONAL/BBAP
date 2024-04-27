package com.bbap.hr.service;


import com.bbap.hr.dto.request.LoginRequestDto;
import com.bbap.hr.dto.request.LogoutRequestDto;
import com.bbap.hr.dto.request.RegisterRequestDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.LoginResponseData;
import com.bbap.hr.dto.response.ResponseDto;
import com.bbap.hr.entity.EmployeeEntity;
import com.bbap.hr.exception.EmployeeNotFoundException;
import com.bbap.hr.exception.InvalidPasswordException;
import com.bbap.hr.provider.JwtProvider;
import com.bbap.hr.repository.EmployeeRepository;
import com.bbap.hr.util.PasswordEncoderUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthServiceImpl implements AuthService {


    private final EmployeeRepository employeeRepository;
    private final JwtProvider jwtProvider;
    private final StringRedisTemplate redisTemplate;
    private final PasswordEncoderUtils passwordEncoderUtils;

    @Override
    public ResponseEntity<ResponseDto> register(RegisterRequestDto requestBody) {
        String encodedPassword = passwordEncoderUtils.encrypt(requestBody.getPassword());

        EmployeeEntity newEmployee = new EmployeeEntity();
        newEmployee.setEmpNo(requestBody.getEmpNo());
        newEmployee.setEmpName(requestBody.getEmpName());
        newEmployee.setPassword(encodedPassword);

        employeeRepository.save(newEmployee);
        log.info("새로운 사용자 {} 가 성공적으로 등록되었습니다.", requestBody.getEmpNo());
        return ResponseDto.success();
    }


    @Override
    public ResponseEntity<DataResponseDto<LoginResponseData>> login(LoginRequestDto requestBody) {

        EmployeeEntity employee = employeeRepository.findByEmpNo(requestBody.getEmpNo())
                .orElseThrow(EmployeeNotFoundException::new);

        if (!passwordEncoderUtils.isMatch(requestBody.getPassword(), employee.getPassword())) {
            log.warn("사용자 {} :: 로그인 실패 - 잘못된 비밀번호", requestBody.getEmpNo());
            throw new InvalidPasswordException();
        }

        String accessToken = jwtProvider.createToken(employee.getEmpId(), 30, ChronoUnit.DAYS);
        String refreshToken = jwtProvider.createToken(employee.getEmpId(), 30, ChronoUnit.DAYS);

        LoginResponseData responseData = LoginResponseData.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        redisTemplate.opsForValue().set(accessToken, "active", 30, TimeUnit.DAYS);
        redisTemplate.opsForValue().set(refreshToken, "active", 30, TimeUnit.DAYS);
        log.info("사용자 {} :: 로그인 성공", requestBody.getEmpNo());

        return DataResponseDto.of(responseData);
    }


    @Override
    public ResponseEntity<ResponseDto> logout(LogoutRequestDto requestBody) {
        redisTemplate.opsForValue().set(requestBody.getAccessToken(), "blacklisted", jwtProvider.getExpiryTime(requestBody.getAccessToken()), TimeUnit.SECONDS);
        redisTemplate.opsForValue().set(requestBody.getRefreshToken(), "blacklisted", jwtProvider.getExpiryTime(requestBody.getRefreshToken()), TimeUnit.SECONDS);

        log.info("사용자 로그아웃 - 액세스 토큰 : {}, 리프레시 토큰 : {}", requestBody.getAccessToken(), requestBody.getRefreshToken());
        return ResponseDto.success();
    }


}
