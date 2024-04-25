package com.bbap.cafe.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbap.cafe.dto.response.CafeListDto;
import com.bbap.cafe.dto.response.MenuDto;
import com.bbap.cafe.dto.response.SelectedCafeDto;
import com.bbap.cafe.dto.responseDto.DataResponseDto;
import com.bbap.cafe.service.CafeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/cafes", produces = "application/json; charset=UTF8")
@Tag(name = "cafe", description = "카페 API")
public class CafeController {
	private final CafeService cafeService;


	@Operation(
		summary = "카페 목록",
		description = "회사 전체의 카페 목록을 불러온다. 해당 페이지에서 보여줘야할 카페의 메뉴를 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@GetMapping("/list/{cafeId}")
	ResponseEntity<DataResponseDto<CafeListDto>> listCafe(@PathVariable String cafeId) {

		return cafeService.listAllCafe(cafeId);
	}

	@Operation(
		summary = "메뉴 목록",
		description = "카페의 정보(오픈시간 마감시간 사용자별 카페 스탬프보유수) 와 해당 카페의 메뉴목록을 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@GetMapping("/menu-list/{cafeId}")
	ResponseEntity<DataResponseDto<SelectedCafeDto>> cafeDetail(@PathVariable String cafeId) {

		return cafeService.cafeDetail(cafeId);
	}

	@Operation(
		summary = "메뉴 상세",
		description = "메뉴 정보를 들고온다. 옵션을 포함한"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@GetMapping("/menu/{menuId}")
	ResponseEntity<DataResponseDto<MenuDto>> menuDetail(@PathVariable String menuId) {
		return cafeService.menuDetail(menuId);
	}

}
