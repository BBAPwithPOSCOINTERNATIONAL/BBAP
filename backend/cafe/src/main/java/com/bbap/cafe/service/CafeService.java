package com.bbap.cafe.service;

import org.springframework.http.ResponseEntity;

import com.bbap.cafe.dto.response.CafeInfoOrderListDto;
import com.bbap.cafe.dto.response.CafeListDto;
import com.bbap.cafe.dto.response.MenuListDto;
import com.bbap.cafe.dto.response.SelectedCafeDto;
import com.bbap.cafe.dto.response.StampDto;
import com.bbap.cafe.dto.responseDto.DataResponseDto;

public interface CafeService {
	ResponseEntity<DataResponseDto<CafeListDto>> listAllCafe(Integer empId, String cafeId);

	ResponseEntity<DataResponseDto<SelectedCafeDto>> cafeDetail(Integer empId, String cafeId);

	ResponseEntity<DataResponseDto<StampDto>> stampCnt(int empId, String cafeId);

	ResponseEntity<DataResponseDto<MenuListDto>> menuList(String cafeId);

	ResponseEntity<DataResponseDto<CafeInfoOrderListDto>> cafeInfoForOrderList(String cafeId);
}
