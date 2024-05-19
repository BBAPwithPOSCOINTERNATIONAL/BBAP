package com.bbap.approval.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbap.approval.dto.request.ApprovalTargetEmployeesDto;
import com.bbap.approval.dto.request.DetailSearchRequestDto;
import com.bbap.approval.dto.request.ListApprovalRequestDto;
import com.bbap.approval.dto.response.DataResponseDto;
import com.bbap.approval.dto.response.DetailSearchResponseData;
import com.bbap.approval.dto.response.ListApprovalResponseData;
import com.bbap.approval.dto.response.ListSearchResponseData;
import com.bbap.approval.dto.response.ResponseDto;
import com.bbap.approval.service.ApprovalService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/approvals")
@Tag(name = "approval", description = "결재 API")
public class ApprovalController {

	private final ApprovalService approvalService;

	@Operation(
		summary = "결재 정보 조회",
		description = "결재 정보 리스트를 제공한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공."),
	})
	@GetMapping
	public ResponseEntity<DataResponseDto<ListApprovalResponseData>> listApproval(ListApprovalRequestDto request) {
		return approvalService.listApproval(request);
	}

	@Operation(
		summary = "사원 리스트 조회",
		description = "조건에 맞는 사원 리스트를 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공."),
	})
	@GetMapping("/search")
	public ResponseEntity<DataResponseDto<ListSearchResponseData>> listSearch(ListApprovalRequestDto request) {
		return approvalService.listSearch(request);
	}

	@Operation(
		summary = "사원 결제 정보 상세 조회",
		description = "특정 사원의 검색 기간의 결제 목록 리스트를 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공."),
	})
	@GetMapping("/search/{empId}")
	public ResponseEntity<DataResponseDto<DetailSearchResponseData>> detailSearch(@PathVariable int empId,
		DetailSearchRequestDto request) {
		return approvalService.detailSearch(empId, request);
	}

	@Operation(
		summary = "결재 처리",
		description = "요청으로 온 사원들의 결제 지원금, 자기 부담금 내역을 승인한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "결재 처리 성공."),
	})
	@PutMapping
	public ResponseEntity<ResponseDto> approve(@RequestBody ApprovalTargetEmployeesDto request) {
		return approvalService.approve(request);
	}
}