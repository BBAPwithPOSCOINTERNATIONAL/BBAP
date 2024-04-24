package com.bbap.cafe.service;

import org.springframework.http.ResponseEntity;

import com.bbap.cafe.dto.response.CafeListResponseDto;
import com.bbap.cafe.dto.responseDto.DataResponseDto;

public interface CafeService {
	ResponseEntity<DataResponseDto<CafeListResponseDto>> listAllCafe(String cafeId);
}
