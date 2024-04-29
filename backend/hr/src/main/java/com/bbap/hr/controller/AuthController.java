package com.bbap.hr.controller;

import com.bbap.hr.dto.request.LoginRequestDto;
import com.bbap.hr.dto.request.LogoutRequestDto;
import com.bbap.hr.dto.request.RegisterRequestDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.EmployeeInfoData;
import com.bbap.hr.dto.response.LoginResponseData;
import com.bbap.hr.dto.response.ResponseDto;
import com.bbap.hr.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/hr/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> register(@Valid @RequestBody RegisterRequestDto requestBody) {
        return authService.register(requestBody);

    }

    @PostMapping("/login")
    public ResponseEntity<DataResponseDto<LoginResponseData>> login(@RequestBody @Valid LoginRequestDto requestBody){
        return authService.login(requestBody);
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDto> logout(@RequestBody @Valid LogoutRequestDto requestBody) {
        return authService.logout(requestBody);
    }

    @GetMapping("/user-info")
    public ResponseEntity<DataResponseDto<EmployeeInfoData>> userInfo() {
        return authService.getUserInfo();
    }


}
