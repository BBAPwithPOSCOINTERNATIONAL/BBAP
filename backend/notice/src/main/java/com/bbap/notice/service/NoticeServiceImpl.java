package com.bbap.notice.service;

import java.time.LocalDateTime;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.notice.dto.request.SaveFcmRequestDto;
import com.bbap.notice.dto.request.SendNoticeRequestDto;
import com.bbap.notice.dto.response.DataResponseDto;
import com.bbap.notice.dto.response.ListNoticeResponseData;
import com.bbap.notice.dto.response.ResponseDto;
import com.bbap.notice.entity.NoticeEntity;
import com.bbap.notice.entity.NoticeTemplateEntity;
import com.bbap.notice.repository.NoticeRepository;
import com.bbap.notice.repository.NoticeTemplateRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeServiceImpl implements NoticeService {
	// private final FaceServiceFeignClient faceServiceFeignClient;

	private final NoticeRepository noticeRepository;
	private final NoticeTemplateRepository noticeTemplateRepository;

	private final RedisTemplate<String, String> redisTemplate;

	@Override
	public ResponseEntity<DataResponseDto<ListNoticeResponseData>> listNotice() {
		//테스트 코드
		int empId = 1;

		ListNoticeResponseData data = new ListNoticeResponseData(noticeRepository.findByEmpId(empId));
		return DataResponseDto.of(data);
	}

	@SneakyThrows
	@Override
	public ResponseEntity<ResponseDto> sendNotice(SendNoticeRequestDto request) {
		//테스트 코드
		int empId = 1;

		NoticeTemplateEntity template = noticeTemplateRepository.findById(request.getNoticeTemplateId()).orElseThrow();

		//알림 목록에 저장
		NoticeEntity noticeEntity = NoticeEntity.builder()
			.noticeTemplateEntity(template)
			.empId(empId)
			.noticeUrl(request.getNoticeUrl())
			.storeName(request.getStoreName())
			.noticeDate(LocalDateTime.now())
			.build();

		noticeRepository.save(noticeEntity);

		//fcm 토큰을 이용해 푸쉬 알림 요청
		// //Notification (push알림)
		// Notification notification = Notification.builder()
		// 	.setTitle(template.getNoticeClassification())
		// 	.setBody(request.getStoreName() + template.getNoticeText())
		// 	.build();

		//일반 알림
		Message message = Message.builder()
			.putData("title", template.getNoticeClassification())
			.putData("body", request.getStoreName() + template.getNoticeText())
			.putData("url", request.getNoticeUrl())
			.setToken(
				"c0w0nAelt-DSN9XghA0gIk:APA91bEjNgZCOV61z5vx6loJ2qehRK0UbfqlgzQ7AqMJ35Az0VS1zrV7sS4mQyMUU-21-SCk1nAdmDLbsaMgmD18w-JQrpFCzKtHhI-EFjuZIY4Usj0N7UQ8Bl_AMCxg-i711yok61w4")
			.build();

		FirebaseMessaging.getInstance().send(message);

		log.info("알림 전송 성공");

		return ResponseDto.success();
	}

	@Override
	public ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteNotice(int noticeId) {
		noticeRepository.deleteOne(noticeId);

		//테스트 코드
		int empId = 1;

		ListNoticeResponseData data = new ListNoticeResponseData(noticeRepository.findByEmpId(empId));
		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteAllNotice() {
		//테스트 코드
		int empId = 1;

		noticeRepository.deleteAllbyEmpId(empId);

		ListNoticeResponseData data = new ListNoticeResponseData(noticeRepository.findByEmpId(empId));
		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<ResponseDto> saveFcm(SaveFcmRequestDto request) {
		// Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		// int userSeq = customUserDetails.getUserSeq();

		//테스트 코드
		int empId = 1;

		//레디스에 유저별 fcmToken저장
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
		valueOperations.set(String.valueOf(empId), request.getFcmToken());

		log.info("{} : 토큰 저장 - {}", empId, request.getFcmToken());

		return ResponseDto.success();
	}

	// @Override
	// public ResponseEntity<ResponseDto> addEat(AddEatRequestDto request) {
	// 	restaurantMenuRepository.addEat(request.getMenuId());
	//
	// 	return ResponseDto.success();
	// }
}
