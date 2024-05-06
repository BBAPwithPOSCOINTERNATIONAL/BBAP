package com.bbap.order.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bbap.order.dto.request.PayInfoAuthRequestDto;
import com.bbap.order.dto.request.PayInfoCardRequestDto;
import com.bbap.order.dto.request.PayInfoFaceRequestDto;
import com.bbap.order.dto.request.PayKioskRequestDto;
import com.bbap.order.dto.request.PayRequestDto;
import com.bbap.order.dto.response.OrderDetailResponseDto;
import com.bbap.order.dto.response.OrderListResponseDto;
import com.bbap.order.dto.response.PayInfoResponseDto;
import com.bbap.order.dto.response.PayResponseDto;
import com.bbap.order.dto.responseDto.DataResponseDto;
import com.bbap.order.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/orders")
@Tag(name = "order", description = "주문 API")
public class OrderController {
	private final OrderService orderService;

	@Operation(
		summary = "주문 하기",
		description = "어플에서 주문하기 ( pickuptime 필요 )"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping("/pay")
	ResponseEntity<DataResponseDto<PayResponseDto>> orderApp(@RequestBody PayRequestDto requestDto) {
		return orderService.order(requestDto);
	}

	@Operation(
		summary = "키오스크 주문 하기",
		description = "키오스크에서 주문하기 ( 사원 Id 필요 )"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping("/pay/kiosk")
	ResponseEntity<DataResponseDto<PayResponseDto>> orderKiosk(@RequestBody PayKioskRequestDto requestDto) {
		return orderService.orderKiosk(requestDto);
	}

	@Operation(
		summary = "결제 정보 확인 - 얼굴",
		description = "얼굴 사진으로 결제 정보 확인하기"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping(value="/payInfo/face", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByFace(@ModelAttribute PayInfoFaceRequestDto requestDto) {
		return orderService.getPayInfoByFace(requestDto);
	}

	@Operation(
		summary = "결제 정보 확인 - 사원증",
		description = "사원증으로 결제 정보 확인하기"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping(value="/payInfo/card")
	ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByCard(@RequestBody PayInfoCardRequestDto requestDto) {
		return orderService.getPayInfoByCard(requestDto);
	}

	@Operation(
		summary = "결제 정보 확인 - 아이디, 비번",
		description = "아이디, 비번으로 결제 정보 확인하기"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping(value="/payInfo/auth")
	ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByAuth(@RequestBody PayInfoAuthRequestDto requestDto) {
		return orderService.getPayInfoByAuth(requestDto);
	}

	@Operation(
		summary = "결제 정보 확인 - 앱",
		description = "결제 정보 확인하기"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@GetMapping(value="/payInfo/{cafeId}")
	ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfo(@PathVariable String cafeId) {
		return orderService.getPayInfo(cafeId);
	}
	@Operation(
		summary = "주문 내역 리스트",
		description = "월별 주문 내역 리스트"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@GetMapping(value="/list/{year}/{month}")
	ResponseEntity<DataResponseDto<OrderListResponseDto>> orderList(@PathVariable Integer month, @PathVariable Integer year) {
		return orderService.orderList(month, year);
	}

	@Operation(
		summary = "주문 내역 상세",
		description = "주문 내역 상세를 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@GetMapping(value="/{orderId}")
	ResponseEntity<DataResponseDto<OrderDetailResponseDto>> orderDetail(@PathVariable String orderId) {
		return orderService.orderDetail(orderId);
	}
}
