package com.bbap.hr.service;

import com.bbap.hr.dto.request.LoginRequestDto;
import com.bbap.hr.dto.request.LogoutRequestDto;
import com.bbap.hr.dto.request.RegisterRequestDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.EmployeeInfoData;
import com.bbap.hr.dto.response.LoginResponseData;
import com.bbap.hr.dto.response.ResponseDto;
import com.bbap.hr.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<DataResponseDto<LoginResponseData>> login(LoginRequestDto requestBody);

    ResponseEntity<ResponseDto> logout(LogoutRequestDto requestBody);

    ResponseEntity<ResponseDto> register(RegisterRequestDto requestBody);

    ResponseEntity<DataResponseDto<EmployeeInfoData>> getUserInfo();
}
