package com.bbap.payment.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.concurrent.CompletableFuture;

import org.springframework.http.ResponseEntity;

import com.bbap.payment.dto.request.PayRestaurantRequestDto;
import com.bbap.payment.dto.request.ProcessPayRequestDto;
import com.bbap.payment.dto.response.AvailSubsidyResponseData;
import com.bbap.payment.dto.response.DataResponseDto;
import com.bbap.payment.dto.response.DetailPaymentResponseData;
import com.bbap.payment.dto.response.ListDayPaymentResponseData;
import com.bbap.payment.dto.response.ListMonthPaymentResponseData;
import com.bbap.payment.dto.response.ResponseDto;

public interface PaymentService {
	CompletableFuture<ResponseEntity<ResponseDto>> payRestaurant(PayRestaurantRequestDto request);

	ResponseEntity<ResponseDto> processPay(ProcessPayRequestDto request);

	ResponseEntity<DataResponseDto<ListMonthPaymentResponseData>> listMonthPayment(int empId, YearMonth yearMonth);

	ResponseEntity<DataResponseDto<ListDayPaymentResponseData>> listDayPayment(int empId, LocalDate date);

	ResponseEntity<DataResponseDto<DetailPaymentResponseData>> detailPayment(int historyId);

	ResponseEntity<DataResponseDto<AvailSubsidyResponseData>> availSubsidy(int empId);
}
