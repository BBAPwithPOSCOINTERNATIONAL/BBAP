package com.bbap.order.service;

import org.springframework.http.ResponseEntity;

import com.bbap.order.dto.request.PayRequestDto;
import com.bbap.order.dto.response.PayResponseDto;
import com.bbap.order.dto.responseDto.DataResponseDto;

public interface OrderService {
	ResponseEntity<DataResponseDto<PayResponseDto>> order(PayRequestDto dto);
}
