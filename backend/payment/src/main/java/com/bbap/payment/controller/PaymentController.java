package com.bbap.payment.controller;

import java.time.LocalDate;
import java.time.YearMonth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbap.payment.dto.request.PayRestaurantRequestDto;
import com.bbap.payment.dto.request.ProcessPayRequestDto;
import com.bbap.payment.dto.response.DataResponseDto;
import com.bbap.payment.dto.response.DetailPaymentResponseData;
import com.bbap.payment.dto.response.ListDayPaymentResponseData;
import com.bbap.payment.dto.response.ListMonthPaymentResponseData;
import com.bbap.payment.dto.response.ResponseDto;
import com.bbap.payment.service.PaymentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/payments")
@Tag(name = "payment", description = "결제 API")
public class PaymentController {

	private final PaymentService paymentService;

	@Operation(
		summary = "식당 결제",
		description = "카드 태깅시에 해당 메뉴를 결제 처리한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "결제 성공."),
	})
	@PostMapping("/restaurant")
	public ResponseEntity<ResponseDto> payRestaurant(@RequestBody PayRestaurantRequestDto request) {
		return paymentService.payRestaurant(request);
	}

	@Operation(
		summary = "결제 처리",
		description = "이용자에게 확인 받은 결제 정보를 이용해 결제처리를 한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "결제 성공."),
	})
	@PostMapping
	public ResponseEntity<ResponseDto> processPay(@RequestBody ProcessPayRequestDto request) {
		return paymentService.processPay(request);
	}

	@Operation(
		summary = "월별 결제 목록 조회",
		description = "이용자에게 결제 목록을 월별로 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공."),
	})
	@GetMapping("/month/{yearMonth}")
	public ResponseEntity<DataResponseDto<ListMonthPaymentResponseData>> listMonthPayment(
		@RequestHeader int empId, @PathVariable YearMonth yearMonth) {
		return paymentService.listMonthPayment(empId, yearMonth);
	}

	@Operation(
		summary = "일별 결제 목록 조회",
		description = "이용자에게 결제 목록을 일별로 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공."),
	})
	@GetMapping("/day/{date}")
	public ResponseEntity<DataResponseDto<ListDayPaymentResponseData>> listDayPayment(@RequestHeader int empId,
		@PathVariable LocalDate date
	) {
		return paymentService.listDayPayment(empId, date);
	}

	@Operation(
		summary = "결제 상세 조회",
		description = "상세 결제 내역을 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공."),
	})
	@GetMapping("/{historyId}")
	public ResponseEntity<DataResponseDto<DetailPaymentResponseData>> detailPayment(@PathVariable int historyId) {
		return paymentService.detailPayment(historyId);
	}
}