package com.bbap.cafe.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.cafe.dto.response.CafeList;
import com.bbap.cafe.dto.responseDto.DataResponseDto;
import com.bbap.cafe.entity.Cafe;
import com.bbap.cafe.repository.CafeRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class CafeServiceImpl implements CafeService {
	private final CafeRepository cafeRepository;
	@Override
	public ResponseEntity<DataResponseDto<CafeList>> listAllCafe() {
		List<Cafe> list = cafeRepository.findAll();
		CafeList cafeList = new CafeList(list);
		return DataResponseDto.of(cafeList);
	}
}
