package com.bbap.order;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbap.order.dto.request.PayRequestDto;
import com.bbap.order.dto.response.PayResponseDto;
import com.bbap.order.dto.responseDto.DataResponseDto;
import com.bbap.order.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/orders", produces = "application/json; charset=UTF8")
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
}
