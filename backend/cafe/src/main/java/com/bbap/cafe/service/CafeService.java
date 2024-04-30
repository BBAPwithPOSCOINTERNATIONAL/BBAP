package com.bbap.cafe.service;

import org.springframework.http.ResponseEntity;

import com.bbap.cafe.dto.response.CafeInfoOrderListDto;
import com.bbap.cafe.dto.response.CafeListDto;
import com.bbap.cafe.dto.response.MenuDto;
import com.bbap.cafe.dto.response.MenuListDto;
import com.bbap.cafe.dto.response.SelectedCafeDto;
import com.bbap.cafe.dto.response.StampDto;
import com.bbap.cafe.dto.responseDto.DataResponseDto;

public interface CafeService {
	ResponseEntity<DataResponseDto<CafeListDto>> listAllCafe(String cafeId);
	ResponseEntity<DataResponseDto<SelectedCafeDto>> cafeDetail(String cafeId);
	// ResponseEntity<DataResponseDto<MenuDto>> menuDetail(String menuId);
	ResponseEntity<DataResponseDto<StampDto>> stampCnt(String cafeId);
	ResponseEntity<DataResponseDto<MenuListDto>> menuList(String cafeId);
	ResponseEntity<DataResponseDto<CafeInfoOrderListDto>> cafeInfoForOrderList(String cafeId);
}
