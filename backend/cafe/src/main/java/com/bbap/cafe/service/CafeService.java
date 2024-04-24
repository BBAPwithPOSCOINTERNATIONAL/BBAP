package com.bbap.cafe.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.bbap.cafe.dto.response.CafeList;
import com.bbap.cafe.dto.responseDto.DataResponseDto;
import com.bbap.cafe.entity.Cafe;

public interface CafeService {
	ResponseEntity<DataResponseDto<CafeList>> listAllCafe();
}
