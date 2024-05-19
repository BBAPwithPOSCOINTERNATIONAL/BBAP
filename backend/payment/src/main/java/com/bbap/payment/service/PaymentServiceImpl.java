package com.bbap.payment.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.Semaphore;

import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.payment.dto.DayPaymentDto;
import com.bbap.payment.dto.request.PayRestaurantRequestDto;
import com.bbap.payment.dto.request.ProcessPayRequestDto;
import com.bbap.payment.dto.request.SendNoticeRequestDto;
import com.bbap.payment.dto.response.AvailSubsidyResponseData;
import com.bbap.payment.dto.response.CheckEmpResponseData;
import com.bbap.payment.dto.response.DataResponseDto;
import com.bbap.payment.dto.response.DetailPaymentResponseData;
import com.bbap.payment.dto.response.ListDayPaymentResponseData;
import com.bbap.payment.dto.response.ListMonthPaymentResponseData;
import com.bbap.payment.dto.response.PayMenuResponseData;
import com.bbap.payment.dto.response.ResponseDto;
import com.bbap.payment.entity.PaymentHistoryEntity;
import com.bbap.payment.exception.HistoryNotFoundException;
import com.bbap.payment.exception.SubsidyNotMatchException;
import com.bbap.payment.feign.HrServiceFeignClient;
import com.bbap.payment.feign.RestaurantServiceFeignClient;
import com.bbap.payment.repository.PaymentHistoryRepository;
import com.google.gson.Gson;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {
	private final HrServiceFeignClient hrServiceFeignClient;
	private final RestaurantServiceFeignClient restaurantServiceFeignClient;
	private final CacheService cacheService;

	private final PaymentHistoryRepository paymentHistoryRepository;

	private final KafkaTemplate<String, String> kafkaTemplate;

	private final Executor virtualThreadExecutor;

	private static final Semaphore semaphore = new Semaphore(60);

	@Override
	public CompletableFuture<ResponseEntity<ResponseDto>> payRestaurant(PayRestaurantRequestDto request) {
		return CompletableFuture.supplyAsync(() -> {
			log.info("Fetching employee data asynchronously");
			System.out.println("1" + Thread.currentThread().getName());
			System.out.println("1" + Thread.currentThread().isVirtual());
			//cardID를 통해 사원 정보를 받아옴
			CheckEmpResponseData empData = cacheService.getEmployeeData(request.getCardId());
			return empData;

		}, virtualThreadExecutor).thenCombineAsync(CompletableFuture.supplyAsync(() -> {
			System.out.println("2" + Thread.currentThread().getName());
			System.out.println("2" + Thread.currentThread().isVirtual());
			log.info("Fetching menu data asynchronously");
			//메뉴 정보를 받아옴
			PayMenuResponseData menuData = cacheService.getMenuData(request.getMenuId());
			return menuData;

		}, virtualThreadExecutor), (empData, menuData) -> {
			log.info("Combining results and processing payment");
			System.out.println("3" + Thread.currentThread().getName());
			System.out.println("3" + Thread.currentThread().isVirtual());
			//사용 가능한 지원금 계산
			int availSubsidy = calSubsidy(empData);

			//결제 내역 처리
			PaymentHistoryEntity entity = PaymentHistoryEntity.builder()
				.empId(empData.getEmpId())
				.payStore(menuData.getStoreName())
				.totalPaymentAmount(menuData.getMenuPrice())
				.useSubsidy(Math.min(menuData.getMenuPrice(), availSubsidy))
				.paymentDetail(menuData.getMenuName())
				.paymentDate(LocalDateTime.now())
				.build();

			log.info("{} : 식당 결제 완료 - 총 금액 : {}, 사용 지원금 : {}",
				entity.getEmpId(), entity.getTotalPaymentAmount(), entity.getUseSubsidy());

			CompletableFuture<Void> saveFuture = CompletableFuture.runAsync(
				() -> {
					try {
						semaphore.acquire();
						paymentHistoryRepository.save(entity);
					} catch (InterruptedException e) {
						Thread.currentThread().interrupt();
						throw new RuntimeException("Failed to acquire semaphore", e);
					} finally {
						semaphore.release();
					}
				}, virtualThreadExecutor);

			//카프카를 통한 알림 전송
			CompletableFuture<Void> noticeFuture = CompletableFuture.runAsync(() -> sendPayNotice(entity),
				virtualThreadExecutor);

			//카프카를 통한 메뉴 먹은 인원 수 증가
			CompletableFuture<Void> eatFuture = CompletableFuture.runAsync(
				() -> kafkaSend("eat_topic", String.valueOf(request.getMenuId())), virtualThreadExecutor);

			return CompletableFuture.allOf(saveFuture, noticeFuture, eatFuture)
				.thenApply(v -> ResponseDto.success())
				.join();
		}, virtualThreadExecutor);
	}

	@Transactional
	@Override
	public ResponseEntity<ResponseDto> processPay(ProcessPayRequestDto request) {
		//HR에서 empId를 이용해 사원정보를 받아옴
		CheckEmpResponseData empData = hrServiceFeignClient.checkId(request.getEmpId()).getBody().getData();

		//HR에서 받아온 남은 지원금이 request의 사용 지원금보다 크다면 정상적으로 결제 처리
		int availSubsidy = calSubsidy(empData);

		if (availSubsidy < request.getUseSubsidy())
			throw new SubsidyNotMatchException();

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

		//알림 전송
		sendPayNotice(entity);

		log.info("{} : 결제 완료 - 총 금액 : {}, 사용 지원금 : {}", entity.getEmpId(), entity.getTotalPaymentAmount(),
			entity.getUseSubsidy());

		return ResponseDto.success();
	}

	@Transactional
	@Override
	public ResponseEntity<DataResponseDto<ListMonthPaymentResponseData>> listMonthPayment(int empId,
		YearMonth yearMonth) {
		//날짜 범위 구하기
		LocalDate startDate = yearMonth.atDay(1);
		LocalDate endDate = yearMonth.atEndOfMonth();
		LocalDateTime start = startDate.atStartOfDay();  // 일의 시작 시간
		LocalDateTime end = endDate.atTime(23, 59, 59, 999999999);  // 일의 종료 시간

		ListMonthPaymentResponseData data = new ListMonthPaymentResponseData();
		data.setDayPaymentList(paymentHistoryRepository.findByYearAndMonth(empId, start, end));

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

	@Transactional
	@Override
	public ResponseEntity<DataResponseDto<ListDayPaymentResponseData>> listDayPayment(int empId, LocalDate date) {
		//인덱스 기반으로 검색하기 위해 LocalDateTime으로 변경
		LocalDateTime start = date.atStartOfDay();  // 일의 시작 시간
		LocalDateTime end = date.atTime(23, 59, 59, 999999999);  // 일의 종료 시간

		ListDayPaymentResponseData data = new ListDayPaymentResponseData(
			paymentHistoryRepository.findByYearAndMonthAndDay(empId, start, end));

		return DataResponseDto.of(data);
	}

	@Transactional
	@Override
	public ResponseEntity<DataResponseDto<DetailPaymentResponseData>> detailPayment(int historyId) {
		return DataResponseDto.of(paymentHistoryRepository.findByHistoryId(historyId).orElseThrow(
			HistoryNotFoundException::new));
	}

	@Transactional
	@Override
	public ResponseEntity<DataResponseDto<AvailSubsidyResponseData>> availSubsidy(int empId) {
		//HR에서 empId를 이용해 사원정보를 받아옴
		CheckEmpResponseData empData = hrServiceFeignClient.checkId(empId).getBody().getData();

		//이용 가능한 지원금 계산
		int availSubsidy = calSubsidy(empData);

		AvailSubsidyResponseData data = new AvailSubsidyResponseData(empId, availSubsidy);

		return DataResponseDto.of(data);
	}

	//결제 알림 전송
	public void sendPayNotice(PaymentHistoryEntity entity) {
		List<Integer> empIds = new ArrayList<>();
		empIds.add(entity.getEmpId());
		//결제 알림
		SendNoticeRequestDto noticeRequest = SendNoticeRequestDto.builder()
			.empIds(empIds)
			//결제 알림 템플릿 - 1
			.noticeTemplateId(1)
			//url 수정 필요
			.noticeUrl("receipt")
			.storeName(entity.getPayStore()).build();

		String message = new Gson().toJson(noticeRequest);
		kafkaSend("notice_topic", message);
	}

	//사용 가능 지원금 계산
	public int calSubsidy(CheckEmpResponseData empData) {
		//사용 가능한 지원금 계산 처리
		LocalDateTime start = LocalDateTime.of(LocalDate.now(), empData.getSubsidy().getStartTime());
		LocalDateTime end = LocalDateTime.of(LocalDate.now(), empData.getSubsidy().getEndTime());

		try {
			semaphore.acquire();
			int usedSubsidy = paymentHistoryRepository.sumUseSubsidy(empData.getEmpId(), start, end).orElse(0);
			return empData.getSubsidy().getSubsidy() - usedSubsidy;

		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			throw new RuntimeException("Failed to acquire semaphore", e);
		} finally {
			semaphore.release();
		}
	}

	public void kafkaSend(String topic, String message) {
		kafkaTemplate.send(topic, message);
		System.out.println("Message sent to topic: " + topic);
	}
}
