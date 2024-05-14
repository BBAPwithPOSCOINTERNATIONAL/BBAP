package com.bbap.notice.service;

import org.springframework.http.ResponseEntity;

import com.bbap.notice.dto.response.DataResponseDto;
import com.bbap.notice.dto.response.ListNoticeResponseData;

public interface NoticeService {
	ResponseEntity<DataResponseDto<ListNoticeResponseData>> listNotice(int empId);

	ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteNotice(int empId, int noticeId);

	ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteAllNotice(int empId);

	void saveFcm(String kafkaMessage);
}
