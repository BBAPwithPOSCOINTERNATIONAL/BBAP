package com.bbap.notice.service;

import java.time.LocalDateTime;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.notice.dto.request.SaveFcmRequestDto;
import com.bbap.notice.dto.request.SendNoticeRequestDto;
import com.bbap.notice.dto.response.DataResponseDto;
import com.bbap.notice.dto.response.ListNoticeResponseData;
import com.bbap.notice.dto.response.ResponseDto;
import com.bbap.notice.entity.NoticeEntity;
import com.bbap.notice.entity.NoticeTemplateEntity;
import com.bbap.notice.exception.TemplateNotFoundException;
import com.bbap.notice.repository.NoticeRepository;
import com.bbap.notice.repository.NoticeTemplateRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.gson.Gson;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeServiceImpl implements NoticeService {
	private final NoticeRepository noticeRepository;
	private final NoticeTemplateRepository noticeTemplateRepository;

	private final RedisTemplate<String, String> redisTemplate;

	@Override
	public ResponseEntity<DataResponseDto<ListNoticeResponseData>> listNotice(int empId) {
		ListNoticeResponseData data = new ListNoticeResponseData(noticeRepository.findByEmpId(empId));
		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteNotice(int empId, int noticeId) {
		noticeRepository.deleteOne(noticeId);

		ListNoticeResponseData data = new ListNoticeResponseData(noticeRepository.findByEmpId(empId));
		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteAllNotice(int empId) {
		noticeRepository.deleteAllbyEmpId(empId);

		ListNoticeResponseData data = new ListNoticeResponseData(noticeRepository.findByEmpId(empId));
		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<ResponseDto> saveFcm(int empId, SaveFcmRequestDto request) {
		//레디스에 유저별 fcmToken저장
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

		if (request.getFcmToken() == null)
			redisTemplate.delete(String.valueOf(empId));
		else
			valueOperations.set(String.valueOf(empId), request.getFcmToken());

		log.info("{} : 토큰 저장 - {}", empId, request.getFcmToken());

		return ResponseDto.success();
	}

	@KafkaListener(topics = "notice_topic", groupId = "notice-service-group")
	public void sendNotice(String kafkaMessage) {
		SendNoticeRequestDto request = new Gson().fromJson(kafkaMessage, SendNoticeRequestDto.class);

		NoticeTemplateEntity template = noticeTemplateRepository.findById(request.getNoticeTemplateId())
			.orElseThrow(TemplateNotFoundException::new);

		for (Integer empId : request.getEmpIds()) {
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

			//redis 에서 해당 유저의 fcm 토큰을 찾아내고 발송
			ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
			String fcmToken = valueOperations.get(String.valueOf(empId));

			//일반 알림
			Message message = Message.builder()
				.putData("title", template.getNoticeClassification())
				.putData("body", request.getStoreName() + template.getNoticeText())
				.putData("url", request.getNoticeUrl())
				.setToken(fcmToken)
				.build();

			try {
				FirebaseMessaging.getInstance().send(message);

			} catch (FirebaseMessagingException e) {

				log.info("푸시 알림 전송 실패");
			}

			log.info("알림 전송 성공");
		}
	}
}
