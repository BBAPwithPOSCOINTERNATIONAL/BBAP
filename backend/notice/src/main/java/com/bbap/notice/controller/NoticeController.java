package com.bbap.notice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbap.notice.dto.response.DataResponseDto;
import com.bbap.notice.dto.response.ListNoticeResponseData;
import com.bbap.notice.service.NoticeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/notices")
@Tag(name = "notice", description = "알림 API")
public class NoticeController {

	private final NoticeService noticeService;

	@Operation(
		summary = "알림 목록 조회",
		description = "이용자가 받은 알림 목록을 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "알림 목록 조회 성공."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패.")
	})
	@GetMapping
	public ResponseEntity<DataResponseDto<ListNoticeResponseData>> listNotice(
		@RequestHeader(value = "X-Employee-Id") int empId) {
		return noticeService.listNotice(empId);
	}

	@Operation(
		summary = "알림 삭제",
		description = "알림을 클릭했을 때 삭제한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "알림 삭제 성공."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패.")
	})
	@DeleteMapping("{noticeId}")
	public ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteNotice(
		@RequestHeader(value = "X-Employee-Id") int empId,
		@PathVariable int noticeId) {
		return noticeService.deleteNotice(empId, noticeId);
	}

	@Operation(
		summary = "알림 전체 삭제",
		description = "알림을 전체 삭제한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "알림 전체 삭제 성공."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패.")
	})
	@DeleteMapping
	public ResponseEntity<DataResponseDto<ListNoticeResponseData>> deleteAllNotice(
		@RequestHeader(value = "X-Employee-Id") int empId) {
		return noticeService.deleteAllNotice(empId);
	}
}