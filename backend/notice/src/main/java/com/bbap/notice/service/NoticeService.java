package com.bbap.notice.service;

import org.springframework.http.ResponseEntity;

import com.bbap.notice.dto.request.SaveFcmRequestDto;
import com.bbap.notice.dto.request.SendNoticeRequestDto;
import com.bbap.notice.dto.response.DataResponseDto;
import com.bbap.notice.dto.response.ListNoticeResponseData;
import com.bbap.notice.dto.response.ResponseDto;

public interface NoticeService {
	ResponseEntity<DataResponseDto<ListNoticeResponseData>> listNotice(int empId);

	ResponseEntity<ResponseDto> sendNotice(SendNoticeRequestDto request);

	ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteNotice(int empId, int noticeId);

	ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteAllNotice(int empId);

	ResponseEntity<ResponseDto> saveFcm(int empId, SaveFcmRequestDto request);
}
