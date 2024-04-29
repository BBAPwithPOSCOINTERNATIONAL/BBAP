package com.bbap.order.service;

import org.springframework.http.ResponseEntity;

import com.bbap.order.dto.request.PayInfoAuthRequestDto;
import com.bbap.order.dto.request.PayInfoCardRequestDto;
import com.bbap.order.dto.request.PayInfoFaceRequestDto;
import com.bbap.order.dto.request.PayKioskRequestDto;
import com.bbap.order.dto.request.PayRequestDto;
import com.bbap.order.dto.response.PayInfoResponseDto;
import com.bbap.order.dto.response.PayResponseDto;
import com.bbap.order.dto.responseDto.DataResponseDto;

public interface OrderService {
	ResponseEntity<DataResponseDto<PayResponseDto>> order(PayRequestDto dto);
	ResponseEntity<DataResponseDto<PayResponseDto>> orderKiosk(PayKioskRequestDto dto);
	ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByFace(PayInfoFaceRequestDto dto);
	ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByCard(PayInfoCardRequestDto dto);
	ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByAuth(PayInfoAuthRequestDto dto);
}
