package com.bbap.order.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.order.dto.BaseOrderDto;
import com.bbap.order.dto.OrderSummary;
import com.bbap.order.dto.request.FaceRequestDto;
import com.bbap.order.dto.request.MenuRequestDto;
import com.bbap.order.dto.request.PayInfoAuthRequestDto;
import com.bbap.order.dto.request.PayInfoCardRequestDto;
import com.bbap.order.dto.request.PayInfoFaceRequestDto;
import com.bbap.order.dto.request.PayKioskRequestDto;
import com.bbap.order.dto.request.PayRequestDto;
import com.bbap.order.dto.request.PaymentRequestDto;
import com.bbap.order.dto.response.CafeInfoForOrderListDto;
import com.bbap.order.dto.response.OrderDetailMenuDto;
import com.bbap.order.dto.response.OrderDetailResponseDto;
import com.bbap.order.dto.response.OrderDto;
import com.bbap.order.dto.response.OrderListResponseDto;
import com.bbap.order.dto.response.PayInfoResponseDto;
import com.bbap.order.dto.response.PayResponseDto;
import com.bbap.order.dto.response.StampResponseDto;
import com.bbap.order.dto.responseDto.CheckFaceResponseData;
import com.bbap.order.dto.responseDto.DataResponseDto;
import com.bbap.order.dto.responseDto.ResponseDto;
import com.bbap.order.entity.Cafe;
import com.bbap.order.entity.Choice;
import com.bbap.order.entity.Menu;
import com.bbap.order.entity.Option;
import com.bbap.order.entity.Order;
import com.bbap.order.entity.OrderMenu;
import com.bbap.order.entity.Stamp;
import com.bbap.order.exception.BadCouponRequestException;
import com.bbap.order.exception.BadOrderRequestException;
import com.bbap.order.exception.CafeEntityNotFoundException;
import com.bbap.order.exception.MenuEntityNotFoundException;
import com.bbap.order.exception.OrderEntityNotFoundException;
import com.bbap.order.feign.CafeServiceFeignClient;
import com.bbap.order.feign.FaceServiceFeignClient;
import com.bbap.order.feign.PaymentServiceFeignClient;
import com.bbap.order.repository.CafeRepository;
import com.bbap.order.repository.MenuRepository;
import com.bbap.order.repository.OrderRepository;
import com.bbap.order.repository.StampRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {
	private final FaceServiceFeignClient faceServiceFeignClient;
	private final CafeServiceFeignClient cafeServiceFeignClient;
	private final PaymentServiceFeignClient paymentServiceFeignClient;
	private final OrderRepository orderRepository;
	private final MenuRepository menuRepository;
	private final CafeRepository cafeRepository;
	private final StampRepository stampRepository;
	private final RedisTemplate<String, String> redisTemplate;

	@Override
	public ResponseEntity<DataResponseDto<PayResponseDto>> order(Integer empId, PayRequestDto dto) {
		// Validate pick-up time
		if (dto.getPickUpTime().isBefore(LocalDateTime.now())) {
			throw new BadOrderRequestException();
		}

		Stamp stamp = stampRepository.findByEmpIdAndCafeId(empId, dto.getCafeId());
		//스탬프 조회와 개수 확인
		if (dto.getCntCouponToUse() != 0)
			validateStampAvailability(stamp, dto.getCntCouponToUse());

		// 주문 메뉴들 order로 정리, 총 가격
		OrderSummary orderSummary = getOrderMenusAndTotalPriceWithPaymentDetail(dto);
		List<OrderMenu> orderMenus = orderSummary.getOrderMenus();
		int totalPaymentAccount = orderSummary.getTotalFinalPrice();
		String paymentDeatil = orderSummary.getPaymentDetail();

		int discountAccount = dto.getCntCouponToUse() * 3000;

		// 할인 금액이 총 결제 가격보다 크지 않은지 확인
		if (dto.getCntCouponToUse() != 0)
			validateDiscount(totalPaymentAccount, dto.getUsedSubsidy(), discountAccount);

		//카페 이름 가져오기
		Cafe cafe = cafeRepository.findById(dto.getCafeId()).orElseThrow(CafeEntityNotFoundException::new);

		Order order = new Order(dto.getCafeId(), empId, LocalDateTime.now(), dto.getPickUpTime(), dto.getUsedSubsidy(),
			orderMenus);
		orderRepository.insert(order); // 주문 db에 넣기
		PaymentRequestDto paymentRequestDto = PaymentRequestDto.builder()
			.empId(empId)
			.totalPaymentAccount(totalPaymentAccount - discountAccount)
			.useSubsidy(dto.getUsedSubsidy())
			.paymentDetail(paymentDeatil)
			.payStore(cafe.getName()).build();

		//결제 서비스 보내기
		ResponseEntity<ResponseDto> response = paymentServiceFeignClient.pay(paymentRequestDto);
		// String message = new Gson().toJson(paymentRequestDto);
		// //결제 서비스 보내기
		// kafkaSend("pay_topic", message);

		// 스탬프 업데이트
		if (dto.getCntCouponToUse() != 0)
			updateStamp(stamp, dto.getCntCouponToUse());
		addStampAfterOrder(empId, dto.getCafeId());

		//레디스에서 방 번호 가져오기
		Long orderNum = incrementOrderNumber(dto.getCafeId());
		PayResponseDto payResponseDto = new PayResponseDto(orderNum);

		return DataResponseDto.of(payResponseDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<PayResponseDto>> orderKiosk(PayKioskRequestDto dto) {
		int empId = dto.getEmpId();
		Stamp stamp = stampRepository.findByEmpIdAndCafeId(empId, dto.getCafeId());
		//스탬프 조회와 개수 확인
		if (dto.getCntCouponToUse() != 0)
			validateStampAvailability(stamp, dto.getCntCouponToUse());

		// 주문 메뉴들 order로 정리, 총 가격
		OrderSummary orderSummary = getOrderMenusAndTotalPriceWithPaymentDetail(dto);
		List<OrderMenu> orderMenus = orderSummary.getOrderMenus();
		int totalPaymentAccount = orderSummary.getTotalFinalPrice();
		String paymentDeatil = orderSummary.getPaymentDetail();

		int discountAccount = dto.getCntCouponToUse() * 3000;

		// 할인 금액이 총 결제 가격보다 크지 않은지 확인
		if (dto.getCntCouponToUse() != 0)
			validateDiscount(totalPaymentAccount, dto.getUsedSubsidy(), discountAccount);

		//카페 이름 가져오기
		Cafe cafe = cafeRepository.findById(dto.getCafeId()).orElseThrow(CafeEntityNotFoundException::new);

		//사원 아이디
		Order order = new Order(dto.getCafeId(), dto.getEmpId(), LocalDateTime.now(),
			LocalDateTime.now().plusMinutes(5), dto.getUsedSubsidy(), orderMenus);
		orderRepository.insert(order); // 주문 db에 넣기

		PaymentRequestDto paymentRequestDto = PaymentRequestDto.builder()
			.empId(empId)
			.totalPaymentAccount(totalPaymentAccount - discountAccount)
			.useSubsidy(dto.getUsedSubsidy())
			.paymentDetail(paymentDeatil)
			.payStore(cafe.getName()).build();

		//결제 서비스 보내기
		ResponseEntity<ResponseDto> response = paymentServiceFeignClient.pay(paymentRequestDto);

		// 스탬프 업데이트
		if (dto.getCntCouponToUse() != 0)
			updateStamp(stamp, dto.getCntCouponToUse());
		addStampAfterOrder(empId, dto.getCafeId());

		//레디스에서 방 번호 가져오기
		Long orderNum = incrementOrderNumber(dto.getCafeId());
		PayResponseDto payResponseDto = new PayResponseDto(orderNum);
		return DataResponseDto.of(payResponseDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByFace(PayInfoFaceRequestDto dto) {
		FaceRequestDto requestDto = new FaceRequestDto(dto.getFaceImage());
		ResponseEntity<DataResponseDto<CheckFaceResponseData>> response
			= faceServiceFeignClient.checkFace(requestDto);
		int empId = response.getBody().getData().getEmpId();

		//사원 이름 가져오기
		String empName = "다희";

		//스탬프 수 가져오기
		ResponseEntity<DataResponseDto<StampResponseDto>> stampResponse
			= cafeServiceFeignClient.getStampCnt(dto.getCafeId());
		int stampCnt = stampResponse.getBody().getData().getStampCnt();
		//지원금 가져오기
		int availableSubsidy = 1000;
		PayInfoResponseDto responseDto = new PayInfoResponseDto(
			empId, empName, stampCnt, availableSubsidy
		);
		return DataResponseDto.of(responseDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByCard(PayInfoCardRequestDto dto) {
		//card번호로 사원Id 와 사원이름 가져오기
		int empId = 1;
		String empName = "다희";

		//스탬프 수 가져오기
		ResponseEntity<DataResponseDto<StampResponseDto>> stampResponse
			= cafeServiceFeignClient.getStampCnt(dto.getCafeId());
		int stampCnt = stampResponse.getBody().getData().getStampCnt();
		//지원금 가져오기
		int availableSubsidy = 1000;
		PayInfoResponseDto responseDto = new PayInfoResponseDto(
			empId, empName, stampCnt, availableSubsidy
		);
		return DataResponseDto.of(responseDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByAuth(PayInfoAuthRequestDto dto) {
		//아이디 비번으로 사원 pk랑 이름 가져오기
		int empId = 1;
		String empName = "다희";

		//스탬프 수 가져오기
		ResponseEntity<DataResponseDto<StampResponseDto>> stampResponse
			= cafeServiceFeignClient.getStampCnt(dto.getCafeId());
		int stampCnt = stampResponse.getBody().getData().getStampCnt();
		//지원금 가져오기
		int availableSubsidy = 1000;
		PayInfoResponseDto responseDto = new PayInfoResponseDto(
			empId, empName, stampCnt, availableSubsidy
		);
		return DataResponseDto.of(responseDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfo(Integer empId, String cafeId) {
		//이름 가져오기
		String empName = "다희";

		//스탬프 수 가져오기
		ResponseEntity<DataResponseDto<StampResponseDto>> stampResponse
			= cafeServiceFeignClient.getStampCnt(cafeId);
		int stampCnt = stampResponse.getBody().getData().getStampCnt();
		//지원금 가져오기
		int availableSubsidy = 1000;
		PayInfoResponseDto responseDto = new PayInfoResponseDto(
			empId, empName, stampCnt, availableSubsidy
		);
		return DataResponseDto.of(responseDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<OrderListResponseDto>> orderList(Integer empId, Integer month, Integer year) {
		// 해당 월의 첫 날과 마지막 날을 계산
		LocalDateTime startOfMonth = YearMonth.of(year, month).atDay(1).atStartOfDay();
		LocalDateTime endOfMonth = YearMonth.of(year, month).atEndOfMonth().atTime(23, 59, 59);

		List<Order> orderList = orderRepository.findByEmployeeAndPickUpTimeBetween(startOfMonth, endOfMonth, empId);
		List<OrderDto> orderDtos = new ArrayList<>();
		for (Order order : orderList) {
			ResponseEntity<DataResponseDto<CafeInfoForOrderListDto>> cafeResponse = cafeServiceFeignClient.getCafeInfo(
				order.getCafeId());
			// 주문의 모든 메뉴의 가격 합산
			int totalOrderPrice = order.getMenus().stream()
				.mapToInt(OrderMenu::getPrice)
				.sum();
			// OrderDto 생성
			OrderDto orderDto = new OrderDto(
				order.getId(),
				order.getPickUpTime(),
				cafeResponse.getBody().getData().getCafeName(),
				order.getMenus().get(0).getName(),
				order.getMenus().size(),
				totalOrderPrice, // 계산된 총 가격
				cafeResponse.getBody().getData().getWorkPlaceName()
			);
			orderDtos.add(orderDto); // 생성된 OrderDto를 리스트에 추가
		}
		OrderListResponseDto responseDto = new OrderListResponseDto(orderDtos);
		return DataResponseDto.of(responseDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<OrderDetailResponseDto>> orderDetail(Integer empId, String orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(OrderEntityNotFoundException::new);
		List<OrderMenu> menus = order.getMenus();
		List<OrderDetailMenuDto> orderDetailMenuDtos = new ArrayList<>();
		int totalOrderPrice = 0;  // 전체 주문 가격을 저장할 변수
		for (OrderMenu orderMenu : menus) {
			// 각 메뉴의 옵션들에서 선택된 choice 이름을 문자열로 결합
			String optionText = orderMenu.getOptions().stream()
				.flatMap(option -> option.getChoices().stream())
				.map(Choice::getChoiceName)
				.collect(Collectors.joining(", "));  // 선택지 이름을 쉼표로 구분하여 하나의 문자열로 만듦

			OrderDetailMenuDto orderDetailMenuDto = new OrderDetailMenuDto(
				orderMenu.getName(),
				orderMenu.getPrice(),
				orderMenu.getCnt(),
				optionText
			);
			totalOrderPrice += orderMenu.getPrice();  // 메뉴 가격을 총합에 더함
			orderDetailMenuDtos.add(orderDetailMenuDto);
		}
		ResponseEntity<DataResponseDto<CafeInfoForOrderListDto>> cafeInfo = cafeServiceFeignClient.getCafeInfo(
			order.getCafeId());
		OrderDetailResponseDto response = new OrderDetailResponseDto(
			cafeInfo.getBody().getData().getCafeName(),
			totalOrderPrice,
			cafeInfo.getBody().getData().getWorkPlaceName(),
			order.getUsedSubsidy(),
			order.getOrderTime(),
			order.getPickUpTime(),
			orderDetailMenuDtos
		);

		return DataResponseDto.of(response);
	}

	// 메뉴 이름과 갯수를 포함한 결제 세부사항 생성
	private <T extends BaseOrderDto> OrderSummary getOrderMenusAndTotalPriceWithPaymentDetail(T dto) {
		// 주문 요청 목록에서 메뉴 ID를 추출하고 이를 이용해 일괄로 메뉴를 조회
		List<MenuRequestDto> menuRequestDtos = dto.getMenuList();
		List<String> menuIds = menuRequestDtos.stream().map(MenuRequestDto::getMenuId).collect(Collectors.toList());
		List<Menu> menus = menuRepository.findAllById(menuIds);

		// 각 메뉴 ID를 키로 하는 Map 생성 (효율적인 접근을 위해)
		Map<String, Menu> menuMap = menus.stream().collect(Collectors.toMap(Menu::getId, Function.identity()));

		// 총 가격과 첫 번째 메뉴 이름을 추적하기 위한 변수들 초기화
		AtomicInteger totalFinalPrice = new AtomicInteger(0);
		final String[] primaryMenuName = {null}; // 첫 번째 메뉴 이름을 저장하기 위한 배열
		final AtomicInteger totalMenuCount = new AtomicInteger(0);

		// 주문된 메뉴 목록을 순회하면서 각 메뉴의 최종 가격을 계산
		List<OrderMenu> orderMenus = menuRequestDtos.stream().map(menuDto -> {
			// 메뉴 ID를 이용해 해당 메뉴를 가져옴
			Menu menu = menuMap.get(menuDto.getMenuId());
			if (menu == null) {
				throw new MenuEntityNotFoundException(); // 메뉴가 없을 경우 예외 처리
			}

			// 기본 가격에 더해 옵션 가격을 추가할 변수를 설정
			AtomicInteger price = new AtomicInteger(menu.getPrice());

			// 각 옵션에 대해 순회하며 총 가격 계산
			List<Option> options = menuDto.getOptions().stream().map(optionDto -> {
				// 옵션에 대한 선택지를 생성
				List<Choice> choices = optionDto.getChoiceOptions().stream().map(choiceDto ->
					new Choice(choiceDto.getChoiceName(), choiceDto.getPrice())
				).collect(Collectors.toList());

				// 단일 선택(single) 옵션인데 여러 개의 선택지가 있을 경우 예외 처리
				if (optionDto.getType().equals("single") && choices.size() > 1) {
					throw new BadOrderRequestException();
				}

				// 각 선택지의 가격을 총 가격에 추가
				price.addAndGet(choices.stream().mapToInt(Choice::getPrice).sum());
				return new Option(optionDto.getOptionName(), optionDto.getType(), optionDto.isRequired(), choices);
			}).collect(Collectors.toList());

			// 주문 수량을 반영한 최종 가격 계산 및 총 가격에 추가
			int finalPrice = price.get() * menuDto.getCnt();
			totalFinalPrice.addAndGet(finalPrice);

			// 첫 번째 메뉴의 이름 설정
			if (primaryMenuName[0] == null) {
				primaryMenuName[0] = menu.getName();
			}

			// 전체 메뉴 수를 추가
			totalMenuCount.addAndGet(menuDto.getCnt());

			// 최종적으로 주문한 메뉴를 반환
			return new OrderMenu(menu.getName(), menuDto.getCnt(), finalPrice, options);
		}).collect(Collectors.toList());

		// 첫 번째 메뉴를 제외한 다른 메뉴의 수 계산
		int otherMenuCount = totalMenuCount.get() - 1;

		// 결제 세부 정보 생성 (첫 번째 메뉴 이름 + 다른 메뉴의 수)
		String paymentDetail = primaryMenuName[0] + (otherMenuCount == 0 ? "" : " 외 " + otherMenuCount + "개");

		// 주문한 메뉴 목록, 총 가격, 결제 상세 정보를 함께 반환
		return new OrderSummary(orderMenus, totalFinalPrice.get(), paymentDetail);
	}

	private Long incrementOrderNumber(String cafeId) {
		String key = "orderNum:" + cafeId + ":" + LocalDate.now().toString();
		redisTemplate.expire(key, Duration.ofDays(1));
		return redisTemplate.opsForValue().increment(key);
	}

	// public void kafkaSend(String topic, String message) {
	// 	kafkaTemplate.send(topic, message);
	// 	System.out.println("Message sent to topic: " + topic);
	// }

	private void validateStampAvailability(Stamp stamp, int cntCouponToUse) {
		if (stamp == null || stamp.getStampCnt() < cntCouponToUse * 10) {
			throw new BadCouponRequestException();
		}
	}

	private void validateDiscount(int totalPaymentAccount, int usedSubsidy, int discountAccount) {
		if ((totalPaymentAccount - usedSubsidy) < discountAccount) {
			throw new BadCouponRequestException();
		}
	}

	private void updateStamp(Stamp stamp, int cntCouponToUse) {
		stamp.setStampCnt(stamp.getStampCnt() - cntCouponToUse * 10);
		stampRepository.save(stamp);
	}

	private void addStampAfterOrder(Integer empId, String cafeId) {
		// 사원 ID와 카페 ID를 이용해 스탬프 정보를 가져옴
		Stamp stamp = stampRepository.findByEmpIdAndCafeId(empId, cafeId);

		// 스탬프가 없으면 새로 생성하여 초기화
		if (stamp == null) {
			stamp = new Stamp(cafeId, empId, 1); // 스탬프를 0으로 시작
		} else {
			stamp.setStampCnt(stamp.getStampCnt() + 1);
		}

		// 최종적으로 스탬프 정보 저장
		stampRepository.save(stamp);
	}

}
