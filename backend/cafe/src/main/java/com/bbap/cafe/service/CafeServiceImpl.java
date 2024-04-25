package com.bbap.cafe.service;

import static com.bbap.cafe.util.MakeKeyUtil.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.cafe.dto.response.CafeListDto;
import com.bbap.cafe.dto.response.CafeSummaryDto;
import com.bbap.cafe.dto.response.ChoiceDto;
import com.bbap.cafe.dto.response.MenuDto;
import com.bbap.cafe.dto.response.MenuSummaryDto;
import com.bbap.cafe.dto.response.OptionDto;
import com.bbap.cafe.dto.response.SelectedCafeDto;
import com.bbap.cafe.dto.response.StampDto;
import com.bbap.cafe.dto.responseDto.DataResponseDto;
import com.bbap.cafe.entity.Cafe;
import com.bbap.cafe.entity.Choice;
import com.bbap.cafe.entity.Menu;
import com.bbap.cafe.entity.Option;
import com.bbap.cafe.entity.Stamp;
import com.bbap.cafe.exception.CafeEntityNotFoundException;
import com.bbap.cafe.exception.MenuEntityNotFoundException;
import com.bbap.cafe.repository.CafeRepository;
import com.bbap.cafe.repository.MenuRepository;
import com.bbap.cafe.repository.StampRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class CafeServiceImpl implements CafeService {
	private final Logger logger = LogManager.getLogger(CafeServiceImpl.class);
	private final CafeRepository cafeRepository;
	private final MenuRepository menuRepository;
	private final StampRepository stampRepository;
	@Override
	public ResponseEntity<DataResponseDto<CafeListDto>> listAllCafe(String cafeId) {
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

		CafeListDto response = new CafeListDto(cafeSummaries, selectedCafe);

		return DataResponseDto.of(response);
	}

	@Override
	public ResponseEntity<DataResponseDto<SelectedCafeDto>> cafeDetail(String cafeId) {
		Cafe cafe = cafeRepository.findById(cafeId).orElseThrow(CafeEntityNotFoundException::new);
		List<Menu> menus = menuRepository.findByCafeId(cafeId);

		//보여줄 카페의 메뉴들과 상세 정보 가져오기
		SelectedCafeDto selectedCafe = getSelectedCafeDto(menus, cafe);

		return DataResponseDto.of(selectedCafe);
	}

	@Override
	public ResponseEntity<DataResponseDto<MenuDto>> menuDetail(String menuId) {
		Menu menu = menuRepository.findById(menuId).orElseThrow(MenuEntityNotFoundException::new);

		List<OptionDto> optionDtoList = new ArrayList<>();
		for (Option option : menu.getOptions()) {
			List<ChoiceDto> choiceDtoList = new ArrayList<>();
			List<Choice> choices = option.getChoices();
			for(Choice choice : choices) {
				choiceDtoList.add(new ChoiceDto(choice.getChoiceName(), choice.getPrice()));
			}
			optionDtoList.add(new OptionDto(option.getOptionName(), option.getType(), option.isRequired(), choiceDtoList));
		}
		String imageUrl = menuImage(menu.getCafeId(), menu.getId());
		MenuDto menuDto = new MenuDto(menu.getId(), menu.getName(), menu.getPrice(), menu.getDescription(),imageUrl,optionDtoList);

		return DataResponseDto.of(menuDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<StampDto>> stampCnt(String cafeId) {
		int empId = 1; //수정할 부분
		int stampCnt = getStampCount(cafeId, empId);
		StampDto stampDto = new StampDto(stampCnt);
		return DataResponseDto.of(stampDto);
	}

	private SelectedCafeDto getSelectedCafeDto(List<Menu> menus, Cafe cafe) {
		List<MenuSummaryDto> coffeeMenus = new ArrayList<>();
		List<MenuSummaryDto> beverageMenus = new ArrayList<>();
		List<MenuSummaryDto> dessertMenus = new ArrayList<>();

		for (Menu menu : menus) {
			String imageUrl = menuImage(menu.getCafeId(), menu.getId());
			MenuSummaryDto menuSummary = new MenuSummaryDto(menu.getId(), menu.getName(), menu.getPrice(), menu.getDescription(), imageUrl);

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
		int stampCount = getStampCount(cafe.getId(), 1);

		return new SelectedCafeDto(
			cafe.getId(),
			cafe.getOpenTime(),
			cafe.getCloseTime(),
			stampCount,
			coffeeMenus,
			beverageMenus,
			dessertMenus
		);
	}

	private int getStampCount(String cafeId, Integer empId) {
		logger.info("Querying stamp for cafeId: " + cafeId + ", empId: " + empId);
		Stamp stamp = stampRepository.findByCafeIdAndEmpId(cafeId, empId);
		return (stamp != null) ? stamp.getStampCnt() : 0;
	}
}
