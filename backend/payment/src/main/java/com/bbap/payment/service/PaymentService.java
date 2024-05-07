package com.bbap.payment.service;

import java.time.LocalDate;
import java.time.YearMonth;

import org.springframework.http.ResponseEntity;

import com.bbap.payment.dto.request.PayRestaurantRequestDto;
import com.bbap.payment.dto.response.DataResponseDto;
import com.bbap.payment.dto.response.DetailPaymentResponseData;
import com.bbap.payment.dto.response.ListDayPaymentResponseData;
import com.bbap.payment.dto.response.ListMonthPaymentResponseData;
import com.bbap.payment.dto.response.ResponseDto;

public interface PaymentService {
	ResponseEntity<ResponseDto> payRestaurant(PayRestaurantRequestDto request);

	ResponseEntity<DataResponseDto<ListMonthPaymentResponseData>> listMonthPayment(int empId, YearMonth yearMonth);

	ResponseEntity<DataResponseDto<ListDayPaymentResponseData>> listDayPayment(int empId, LocalDate date);

	ResponseEntity<DataResponseDto<DetailPaymentResponseData>> detailPayment(int historyId);

	void processPay(String kafkaMessage);
}
