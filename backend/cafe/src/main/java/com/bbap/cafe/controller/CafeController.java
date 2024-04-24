package com.bbap.cafe.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbap.cafe.dto.response.CafeList;
import com.bbap.cafe.dto.responseDto.DataResponseDto;
import com.bbap.cafe.service.CafeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
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
		description = "회사 전체의 카페 목록을 불러온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = DataResponseDto.class))),
	})
	@GetMapping("/list")
	ResponseEntity<DataResponseDto<CafeList>> listCafe() {
		return cafeService.listAllCafe();
	}
}
