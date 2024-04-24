package com.bbap.cafe.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.cafe.dto.response.CafeListResponseDto;
import com.bbap.cafe.dto.response.CafeSummaryDto;
import com.bbap.cafe.dto.response.MenuSummaryDto;
import com.bbap.cafe.dto.response.SelectedCafeDto;
import com.bbap.cafe.dto.responseDto.DataResponseDto;
import com.bbap.cafe.dto.responseDto.ResponseDto;
import com.bbap.cafe.entity.Cafe;
import com.bbap.cafe.entity.Menu;
import com.bbap.cafe.exception.CafeEntityNotFoundException;
import com.bbap.cafe.repository.CafeRepository;
import com.bbap.cafe.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class CafeServiceImpl implements CafeService {
	private final Logger logger = LogManager.getLogger(CafeServiceImpl.class);
	private final CafeRepository cafeRepository;
	private final MenuRepository menuRepository;
	@Override
	public ResponseEntity<DataResponseDto<CafeListResponseDto>> listAllCafe(String cafeId) {
		if (cafeId.equals("-1")) {
			//근무지 찾아와서 우선순위의 카페 넣기
			cafeId = "66276af2412ced9137ecabe9";
		}
		Cafe cafe = cafeRepository.findById(cafeId).orElseThrow(CafeEntityNotFoundException::new);
		List<Menu> menus = menuRepository.findByCafeId(cafeId);

		//보여줄 카페의 메뉴들과 상세 정보 가져오기
		SelectedCafeDto selectedCafe = getSelectedCafeDto(menus, cafe);

		//근무지 이름 가져오기
		String workPlaceName = "근무지이름";

		//토글바에 들어갈 카페 목록
		List<CafeSummaryDto> cafeSummaries = cafeRepository.findAll().stream()
			.map(c -> new CafeSummaryDto(c.getId(), c.getName(), workPlaceName))
			.collect(Collectors.toList());
		CafeListResponseDto response = new CafeListResponseDto(cafeSummaries, selectedCafe);

		return DataResponseDto.of(response);
	}

	private static SelectedCafeDto getSelectedCafeDto(List<Menu> menus, Cafe cafe) {
		List<MenuSummaryDto> coffeeMenus = new ArrayList<>();
		List<MenuSummaryDto> beverageMenus = new ArrayList<>();
		List<MenuSummaryDto> dessertMenus = new ArrayList<>();

		for (Menu menu : menus) {
			MenuSummaryDto menuSummary = new MenuSummaryDto(menu.getId(), menu.getName(), menu.getPrice(), menu.getDescription());

			switch (menu.getMenuCategory()) {
				case "coffee":
					coffeeMenus.add(menuSummary);
					break;
				case "beverage":
					beverageMenus.add(menuSummary);
					break;
				case "desert":
					dessertMenus.add(menuSummary);
					break;
			}
		}

		return new SelectedCafeDto(
			cafe.getId(),
			cafe.getOpenTime(),
			cafe.getCloseTime(),
			coffeeMenus,
			beverageMenus,
			dessertMenus
		);
	}
}
