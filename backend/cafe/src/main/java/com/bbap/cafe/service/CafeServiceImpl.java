package com.bbap.cafe.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.cafe.config.GlobalExceptionHandler;
import com.bbap.cafe.dto.response.CafeList;
import com.bbap.cafe.dto.response.CafeResponseDto;
import com.bbap.cafe.dto.responseDto.DataResponseDto;
import com.bbap.cafe.dto.responseDto.ResponseDto;
import com.bbap.cafe.entity.Cafe;
import com.bbap.cafe.repository.CafeRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class CafeServiceImpl implements CafeService {
	private final Logger logger = LogManager.getLogger(CafeServiceImpl.class);
	private final CafeRepository cafeRepository;
	@Override
	public ResponseEntity<DataResponseDto<CafeList>> listAllCafe() {
		List<Cafe> list = cafeRepository.findAll();
		CafeList cafeList = new CafeList();
		List<CafeResponseDto> responseDtos = new ArrayList<>();
		for (Cafe cafe : list) {
			CafeResponseDto dto = new CafeResponseDto();
			dto.setId(cafe.getId());
			//HR가서 근무지 이름 가져오기
			String workPlaceName = "testName";
			dto.setName(cafe.getName());
			dto.setWorkPlaceName(workPlaceName);
			dto.setCloseTime(cafe.getCloseTime());
			dto.setOpenTime(cafe.getOpenTime());
			responseDtos.add(dto);
		}
		cafeList.setCafeList(responseDtos);
		return DataResponseDto.of(cafeList);

	}
}
