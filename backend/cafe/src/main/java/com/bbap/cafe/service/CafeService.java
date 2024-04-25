package com.bbap.cafe.service;

import org.springframework.http.ResponseEntity;

import com.bbap.cafe.dto.response.CafeListDto;
import com.bbap.cafe.dto.response.MenuDto;
import com.bbap.cafe.dto.response.SelectedCafeDto;
import com.bbap.cafe.dto.responseDto.DataResponseDto;

public interface CafeService {
	ResponseEntity<DataResponseDto<CafeListDto>> listAllCafe(String cafeId);
	ResponseEntity<DataResponseDto<SelectedCafeDto>> cafeDetail(String cafeId);
	ResponseEntity<DataResponseDto<MenuDto>> menuDetail(String menuId);
}
