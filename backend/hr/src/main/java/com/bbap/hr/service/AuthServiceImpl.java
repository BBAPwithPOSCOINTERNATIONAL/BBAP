package com.bbap.hr.service;

import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.hr.dto.DepartmentDto;
import com.bbap.hr.dto.EmployeeDto;
import com.bbap.hr.dto.PositionDto;
import com.bbap.hr.dto.WorkplaceDto;
import com.bbap.hr.dto.request.LoginRequestDto;
import com.bbap.hr.dto.request.LogoutRequestDto;
import com.bbap.hr.dto.request.RegisterRequestDto;
import com.bbap.hr.dto.request.SaveFcmRequestDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.LoginResponseData;
import com.bbap.hr.dto.response.ResponseDto;
import com.bbap.hr.entity.EmployeeEntity;
import com.bbap.hr.exception.EmployeeNotFoundException;
import com.bbap.hr.exception.InvalidPasswordException;
import com.bbap.hr.provider.JwtProvider;
import com.bbap.hr.repository.EmployeeRepository;
import com.bbap.hr.util.PasswordEncoderUtils;
import com.google.gson.Gson;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthServiceImpl implements AuthService {
	private final KafkaTemplate<String, String> kafkaTemplate;

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
	public ResponseEntity<DataResponseDto<EmployeeDto>> getUserInfo(int empId) {
		EmployeeEntity employee = employeeRepository.findById(empId)
			.orElseThrow(EmployeeNotFoundException::new);

		DepartmentDto departmentData = employee.getDepartment() == null ? null : DepartmentDto.builder()
			.departmentId(employee.getDepartment().getDepartmentId())
			.departmentName(employee.getDepartment().getDepartmentName())
			.build();

		PositionDto positionData = employee.getPosition() == null ? null : PositionDto.builder()
			.positionId(employee.getPosition().getPositionId())
			.positionName(employee.getPosition().getPositionName())
			.build();

		WorkplaceDto workplaceData = employee.getWorkplace() == null ? null : WorkplaceDto.builder()
			.workplaceId(employee.getWorkplace().getWorkplaceId())
			.workplaceName(employee.getWorkplace().getWorkplaceName())
			.build();

		EmployeeDto employeeInfoData = EmployeeDto.builder()
			.empId(employee.getEmpId())
			.empNo(employee.getEmpNo())
			.empName(employee.getEmpName())
			.empImage(employee.getEmpImage())
			.department(departmentData)
			.position(positionData)
			.workplace(workplaceData)
			.build();

		log.info("사용자 정보 조회 : {}", employee.getEmpNo());
		return DataResponseDto.of(employeeInfoData);
	}

	@Override
	public ResponseEntity<DataResponseDto<LoginResponseData>> login(LoginRequestDto requestBody) {
		log.info("사용자 {} :: 로그인 시도. 비밀번호 {}", requestBody.getEmpNo(), requestBody.getPassword());

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

		//fcm토큰 저장
		String message = new Gson().toJson(new SaveFcmRequestDto(employee.getEmpId(), requestBody.getFcmToken()));
		kafkaSend("fcm_topic", message);

		return DataResponseDto.of(responseData);
	}

	@Override
	public ResponseEntity<ResponseDto> logout(int empId, LogoutRequestDto requestBody) {
		redisTemplate.opsForValue()
			.set(requestBody.getAccessToken(), "blacklisted", jwtProvider.getExpiryTime(requestBody.getAccessToken()),
				TimeUnit.SECONDS);
		redisTemplate.opsForValue()
			.set(requestBody.getRefreshToken(), "blacklisted", jwtProvider.getExpiryTime(requestBody.getRefreshToken()),
				TimeUnit.SECONDS);

		//fcm토큰 삭제
		String message = new Gson().toJson(new SaveFcmRequestDto(empId, null));
		kafkaSend("fcm_topic", message);

		log.info("사용자 로그아웃 - 액세스 토큰 : {}, 리프레시 토큰 : {}", requestBody.getAccessToken(), requestBody.getRefreshToken());
		return ResponseDto.success();
	}

	public void kafkaSend(String topic, String message) {
		kafkaTemplate.send(topic, message);
		System.out.println("Message sent to topic: " + topic);
	}
}
