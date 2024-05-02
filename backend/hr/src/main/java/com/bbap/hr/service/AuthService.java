package com.bbap.hr.service;

import com.bbap.hr.dto.request.LoginRequestDto;
import com.bbap.hr.dto.request.LogoutRequestDto;
import com.bbap.hr.dto.request.RegisterRequestDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.EmployeeDto;
import com.bbap.hr.dto.response.LoginResponseData;
import com.bbap.hr.dto.response.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<DataResponseDto<LoginResponseData>> login(LoginRequestDto requestBody);

    ResponseEntity<ResponseDto> logout(int empId,LogoutRequestDto requestBody);

    ResponseEntity<ResponseDto> register(RegisterRequestDto requestBody);

    ResponseEntity<DataResponseDto<EmployeeDto>> getUserInfo();
}
