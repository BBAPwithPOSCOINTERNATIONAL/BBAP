package com.bbap.approval.service;

import org.springframework.http.ResponseEntity;

import com.bbap.approval.dto.request.ApprovalTargetEmployeesDto;
import com.bbap.approval.dto.request.DetailSearchRequestDto;
import com.bbap.approval.dto.request.ListApprovalRequestDto;
import com.bbap.approval.dto.response.DataResponseDto;
import com.bbap.approval.dto.response.DetailSearchResponseData;
import com.bbap.approval.dto.response.ListApprovalResponseData;
import com.bbap.approval.dto.response.ListSearchResponseData;
import com.bbap.approval.dto.response.ResponseDto;

public interface ApprovalService {
	ResponseEntity<DataResponseDto<ListApprovalResponseData>> listApproval(ListApprovalRequestDto request);

	ResponseEntity<DataResponseDto<ListSearchResponseData>> listSearch(ListApprovalRequestDto request);

	ResponseEntity<DataResponseDto<DetailSearchResponseData>> detailSearch(int empId, DetailSearchRequestDto request);

	ResponseEntity<ResponseDto> approve(ApprovalTargetEmployeesDto request);
}
