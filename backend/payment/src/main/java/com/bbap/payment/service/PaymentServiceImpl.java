package com.bbap.payment.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.payment.dto.DayPaymentDto;
import com.bbap.payment.dto.request.PayRestaurantRequestDto;
import com.bbap.payment.dto.request.ProcessPayRequestDto;
import com.bbap.payment.dto.response.DataResponseDto;
import com.bbap.payment.dto.response.DetailPaymentResponseData;
import com.bbap.payment.dto.response.ListDayPaymentResponseData;
import com.bbap.payment.dto.response.ListMonthPaymentResponseData;
import com.bbap.payment.dto.response.PayMenuResponseData;
import com.bbap.payment.dto.response.ResponseDto;
import com.bbap.payment.entity.PaymentHistoryEntity;
import com.bbap.payment.feign.RestaurantServiceFeignClient;
import com.bbap.payment.repository.PaymentHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {
	private final RestaurantServiceFeignClient restaurantServiceFeignClient;

	private final PaymentHistoryRepository paymentHistoryRepository;

	@Override
	public ResponseEntity<ResponseDto> payRestaurant(PayRestaurantRequestDto request) {
		//메뉴 정보를 받아옴
		PayMenuResponseData data
			= restaurantServiceFeignClient.payMenu(request.getMenuId()).getBody().getData();

		//cardID를 통해 사원 정보를 받아옴
		//HR에서 받아와야 함

		//테스트 코드
		int empId = 1;
		int subsidy = 5000;

		//결제 내역 처리
		PaymentHistoryEntity entity = PaymentHistoryEntity.builder()
			.empId(empId)
			.payStore(data.getStoreName())
			.totalPaymentAmount(data.getMenuPrice())
			.useSubsidy(subsidy)
			.paymentDetail(data.getMenuName())
			.paymentDate(LocalDateTime.now())
			.build();

		paymentHistoryRepository.save(entity);

		return ResponseDto.success();
	}

	@Override
	public ResponseEntity<ResponseDto> processPay(ProcessPayRequestDto request) {
		//현재의 정보와 결제 정보가 맞는 지 확인
		//HR에서 empId를 이용해 사원정보를 받아옴
		//HR에서 받아온 남은 지원금이 request의 사용 지원금보다 크다면 정상적으로 결제 처리

		//결제 내역 처리
		PaymentHistoryEntity entity = PaymentHistoryEntity.builder()
			.empId(request.getEmpId())
			.payStore(request.getPayStore())
			.totalPaymentAmount(request.getTotalPaymentAccount())
			.useSubsidy(request.getUseSubsidy())
			.paymentDetail(request.getPaymentDetail())
			.paymentDate(LocalDateTime.now())
			.build();

		paymentHistoryRepository.save(entity);

		return ResponseDto.success();
	}

	@Override
	public ResponseEntity<DataResponseDto<ListMonthPaymentResponseData>> listMonthPayment(YearMonth yearMonth) {
		//날짜 범위 구하기
		LocalDate startDate = yearMonth.atDay(1);
		LocalDate endDate = yearMonth.atEndOfMonth();
		LocalDateTime start = startDate.atStartOfDay();  // 일의 시작 시간
		LocalDateTime end = endDate.atTime(23, 59, 59, 999999999);  // 일의 종료 시간

		ListMonthPaymentResponseData data = new ListMonthPaymentResponseData();
		data.setDayPaymentList(paymentHistoryRepository.findByYearAndMonth(start, end));

		// totalPaymentAmount의 총합을 계산
		long totalPaymentSum = 0;
		long useSubsidySum = 0;
		for (DayPaymentDto dayPaymentDto : data.getDayPaymentList()) {
			totalPaymentSum += dayPaymentDto.getTotalPaymentAmount();
			useSubsidySum += dayPaymentDto.getUseSubsidy();
		}

		data.setTotalPaymentAmountSum(totalPaymentSum);
		data.setUseSubsidySum(useSubsidySum);
		data.setSelfPaymentSum(totalPaymentSum - useSubsidySum);

		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<DataResponseDto<ListDayPaymentResponseData>> listDayPayment(LocalDate date) {
		//인덱스 기반으로 검색하기 위해 LocalDateTime으로 변경
		LocalDateTime start = date.atStartOfDay();  // 일의 시작 시간
		LocalDateTime end = date.atTime(23, 59, 59, 999999999);  // 일의 종료 시간

		ListDayPaymentResponseData data = new ListDayPaymentResponseData(
			paymentHistoryRepository.findByYearAndMonthAndDay(start, end));

		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<DataResponseDto<DetailPaymentResponseData>> detailPayment(int historyId) {
		return DataResponseDto.of(paymentHistoryRepository.findByHistoryId(historyId));
	}
}
