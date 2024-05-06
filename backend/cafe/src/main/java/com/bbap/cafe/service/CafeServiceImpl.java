package com.bbap.cafe.service;

import static com.bbap.cafe.util.MakeKeyUtil.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.cafe.dto.response.CafeInfoOrderListDto;
import com.bbap.cafe.dto.response.CafeListDto;
import com.bbap.cafe.dto.response.CafeSummaryDto;
import com.bbap.cafe.dto.response.ChoiceDto;
import com.bbap.cafe.dto.response.MenuDto;
import com.bbap.cafe.dto.response.MenuListDto;
import com.bbap.cafe.dto.response.OptionDto;
import com.bbap.cafe.dto.response.SelectedCafeDto;
import com.bbap.cafe.dto.response.StampDto;
import com.bbap.cafe.dto.responseDto.DataResponseDto;
import com.bbap.cafe.dto.responseDto.EmployeeDto;
import com.bbap.cafe.entity.Cafe;
import com.bbap.cafe.entity.Menu;
import com.bbap.cafe.entity.Option;
import com.bbap.cafe.entity.Stamp;
import com.bbap.cafe.exception.CafeEntityNotFoundException;
import com.bbap.cafe.feign.HrServiceFeignClient;
import com.bbap.cafe.repository.CafeRepository;
import com.bbap.cafe.repository.MenuRepository;
import com.bbap.cafe.repository.StampRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class CafeServiceImpl implements CafeService {
	private final CafeRepository cafeRepository;
	private final MenuRepository menuRepository;
	private final StampRepository stampRepository;
	private final HrServiceFeignClient hrServiceFeignClient;
	@Override
	public ResponseEntity<DataResponseDto<CafeListDto>> listAllCafe(Integer empId, String cafeId) {
		if (cafeId.equals("-1")) {
			//근무지 찾아와서 우선순위의 카페 넣기
			ResponseEntity<DataResponseDto<EmployeeDto>> employeeDto = hrServiceFeignClient.getUserInfo(empId);
			Integer workPlaceId = employeeDto.getBody().getData().getWorkplace().getWorkplaceId();
			cafeId = cafeRepository.findFirstByWorkPlaceIdOrderByIdAsc(workPlaceId).getId();
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
	public ResponseEntity<DataResponseDto<SelectedCafeDto>> cafeDetail(Integer empId, String cafeId) {
		Cafe cafe = cafeRepository.findById(cafeId).orElseThrow(CafeEntityNotFoundException::new);
		List<Menu> menus = menuRepository.findByCafeId(cafeId);
		//보여줄 카페의 메뉴들과 상세 정보 가져오기
		SelectedCafeDto selectedCafe = getSelectedCafeDto(menus, cafe);
		return DataResponseDto.of(selectedCafe);
	}

	@Override
	public ResponseEntity<DataResponseDto<StampDto>> stampCnt(String cafeId) {
		int empId = 1; //수정할 부분
		int stampCnt = getStampCount(cafeId, empId);
		StampDto stampDto = new StampDto(stampCnt);
		return DataResponseDto.of(stampDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<MenuListDto>> menuList(String cafeId) {
		List<Menu> menus = menuRepository.findByCafeId(cafeId);
		List<MenuDto> coffeeMenus = new ArrayList<>();
		List<MenuDto> beverageMenus = new ArrayList<>();
		List<MenuDto> dessertMenus = new ArrayList<>();
		List<MenuDto> popularMenus = new ArrayList<>();

		for (Menu menu : menus) {
			MenuDto menuDto = createMenuDto(menu);
			// 메뉴를 카테고리에 따라 적절한 리스트에 추가
			switch (menu.getMenuCategory()) {
				case "coffee":
					coffeeMenus.add(menuDto);
					break;
				case "beverage":
					beverageMenus.add(menuDto);
					break;
				case "dessert":
					dessertMenus.add(menuDto);
					break;
				case "popular":
					popularMenus.add(menuDto);
					break;
			}
		}

		// 모든 카테고리별 메뉴 리스트를 포함하는 DTO 생성
		MenuListDto menuListDto = new MenuListDto(cafeId, coffeeMenus, beverageMenus, dessertMenus, popularMenus);
		return DataResponseDto.of(menuListDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<CafeInfoOrderListDto>> cafeInfoForOrderList(String cafeId) {
		Cafe cafe = cafeRepository.findById(cafeId).orElseThrow(CafeEntityNotFoundException:: new);
		int workPlaceId = cafe.getWorkPlaceId();

		//근무지 이름 가져오기
		String workPlaceName = "부산";

		CafeInfoOrderListDto response = new CafeInfoOrderListDto(cafe.getName(), workPlaceName);

		return DataResponseDto.of(response);
	}

	private SelectedCafeDto getSelectedCafeDto(List<Menu> menus, Cafe cafe) {
		List<MenuDto> coffeeMenus = new ArrayList<>();
		List<MenuDto> beverageMenus = new ArrayList<>();
		List<MenuDto> dessertMenus = new ArrayList<>();

		for (Menu menu : menus) {
			String imageUrl = menuImage(menu.getCafeId(), menu.getId());

			// 각 메뉴의 옵션을 포함한 상세 정보 생성
			List<OptionDto> optionDtoList = new ArrayList<>();
			for (Option option : menu.getOptions()) {
				List<ChoiceDto> choiceDtoList = option.getChoices().stream()
					.map(choice -> new ChoiceDto(choice.getChoiceName(), choice.getPrice()))
					.collect(Collectors.toList());
				optionDtoList.add(new OptionDto(option.getOptionName(), option.getType(), option.isRequired(), choiceDtoList));
			}

			// MenuDto 객체 생성
			MenuDto menuDto = new MenuDto(
				menu.getId(),
				menu.getName(),
				menu.getPrice(),
				menu.getDescription(),
				imageUrl,
				optionDtoList
			);

			// 메뉴를 적절한 카테고리 리스트에 추가
			switch (menu.getMenuCategory()) {
				case "coffee":
					coffeeMenus.add(menuDto);
					break;
				case "beverage":
					beverageMenus.add(menuDto);
					break;
				case "dessert":
					dessertMenus.add(menuDto);
					break;
			}
		}

		int stampCount = getStampCount(cafe.getId(), 1);  // 직원 ID 예시로 '1' 사용, 실제로는 파라미터로 받거나 세션에서 가져올 수 있음

		// 선택된 카페의 모든 정보와 메뉴 리스트를 포함하여 SelectedCafeDto 객체 생성
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
		log.info("Querying stamp for cafeId: " + cafeId + ", empId: " + empId);
		Stamp stamp = stampRepository.findByCafeIdAndEmpId(cafeId, empId);
		return (stamp != null) ? stamp.getStampCnt() : 0;
	}

	private MenuDto createMenuDto(Menu menu) {
		List<OptionDto> optionDtoList = menu.getOptions().stream().map(option -> {
			List<ChoiceDto> choiceDtoList = option.getChoices().stream()
				.map(choice -> new ChoiceDto(choice.getChoiceName(), choice.getPrice()))
				.collect(Collectors.toList());
			return new OptionDto(option.getOptionName(), option.getType(), option.isRequired(), choiceDtoList);
		}).collect(Collectors.toList());

		String imageUrl = menuImage(menu.getCafeId(), menu.getId());
		return new MenuDto(
			menu.getId(),
			menu.getName(),
			menu.getPrice(),
			menu.getDescription(),
			imageUrl,
			optionDtoList
		);
	}

}
