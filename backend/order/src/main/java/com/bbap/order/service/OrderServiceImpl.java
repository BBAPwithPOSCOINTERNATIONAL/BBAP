package com.bbap.order.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
import com.bbap.order.dto.request.FaceRequestDto;
import com.bbap.order.dto.request.MenuRequestDto;
import com.bbap.order.dto.request.PayInfoCardRequestDto;
import com.bbap.order.dto.request.PayInfoFaceRequestDto;
import com.bbap.order.dto.request.PayKioskRequestDto;
import com.bbap.order.dto.request.PayRequestDto;
import com.bbap.order.dto.response.PayInfoResponseDto;
import com.bbap.order.dto.response.PayResponseDto;
import com.bbap.order.dto.response.StampResponseDto;
import com.bbap.order.dto.responseDto.CheckFaceResponseData;
import com.bbap.order.dto.responseDto.DataResponseDto;
import com.bbap.order.entity.Choice;
import com.bbap.order.entity.Menu;
import com.bbap.order.entity.Option;
import com.bbap.order.entity.Order;
import com.bbap.order.entity.OrderMenu;
import com.bbap.order.exception.BadOrderRequestException;
import com.bbap.order.exception.MenuEntityNotFoundException;
import com.bbap.order.feign.CafeServiceFeignClient;
import com.bbap.order.feign.FaceServiceFeignClient;
import com.bbap.order.repository.MenuRepository;
import com.bbap.order.repository.OrderRepository;

import feign.FeignException;
import feign.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {
	private final FaceServiceFeignClient faceServiceFeignClient;
	private final CafeServiceFeignClient cafeServiceFeignClient;
	private final OrderRepository orderRepository;
	private final MenuRepository menuRepository;

	private final RedisTemplate<String, String> redisTemplate;
	@Override
	public ResponseEntity<DataResponseDto<PayResponseDto>> order(PayRequestDto dto) {
		// Validate pick-up time
		if (dto.getPickUpTime().isBefore(LocalDateTime.now())) {
			throw new BadOrderRequestException();
		}
		List<OrderMenu> orderMenus = getOrderMenus(dto);
		//사원 아이디
		int empId = 1;
		Order order = new Order(dto.getCafeId(), empId, LocalDateTime.now(), dto.getPickUpTime(), orderMenus);
		orderRepository.insert(order); // 주문 db에 넣기
		//결제 서비스 보내기
		//레디스에서 방 번호 가져오기
		Long orderNum = incrementOrderNumber(dto.getCafeId());
		PayResponseDto payResponseDto = new PayResponseDto(orderNum);
		return DataResponseDto.of(payResponseDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<PayResponseDto>> orderKiosk(PayKioskRequestDto dto) {
		List<OrderMenu> orderMenus = getOrderMenus(dto);
		//사원 아이디
		Order order = new Order(dto.getCafeId(), dto.getEmpId(), LocalDateTime.now(), LocalDateTime.now().plusMinutes(5), orderMenus);
		orderRepository.insert(order); // 주문 db에 넣기
		//결제 서비스 보내기
		//레디스에서 방 번호 가져오기
		Long orderNum = incrementOrderNumber(dto.getCafeId());
		PayResponseDto payResponseDto = new PayResponseDto(orderNum);
		return DataResponseDto.of(payResponseDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<PayInfoResponseDto>> getPayInfoByFace(PayInfoFaceRequestDto dto) {
		FaceRequestDto requestDto = new FaceRequestDto(dto.getFaceImage());
		ResponseEntity<DataResponseDto<CheckFaceResponseData>> response
			= faceServiceFeignClient.predictFace(requestDto);
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

	private <T extends BaseOrderDto> List<OrderMenu> getOrderMenus(T dto) {
		List<MenuRequestDto> menuRequestDtos = dto.getMenuList();

		// Extract menu IDs and fetch menus in bulk
		List<String> menuIds = menuRequestDtos.stream().map(MenuRequestDto::getMenuId).collect(Collectors.toList());
		List<Menu> menus = menuRepository.findAllById(menuIds);
		Map<String, Menu> menuMap = menus.stream().collect(Collectors.toMap(Menu::getId, Function.identity()));

		return menuRequestDtos.stream().map(menuDto -> {
			Menu menu = menuMap.get(menuDto.getMenuId());
			if (menu == null) {
				throw new MenuEntityNotFoundException();
			}

			AtomicInteger price = new AtomicInteger(menu.getPrice());
			List<Option> options = menuDto.getOptions().stream().map(optionDto -> {
				List<Choice> choices = optionDto.getChoiceOptions().stream().map(choiceDto ->
					new Choice(choiceDto.getChoiceName(), choiceDto.getPrice())
				).collect(Collectors.toList());

				if (optionDto.getType().equals("single") && choices.size() > 1) {
					throw new BadOrderRequestException();
				}

				price.addAndGet(choices.stream().mapToInt(Choice::getPrice).sum());
				return new Option(optionDto.getOptionName(), optionDto.getType(), optionDto.isRequired(), choices);
			}).collect(Collectors.toList());

			int finalPrice = price.get() * menuDto.getCnt();
			return new OrderMenu(menu.getName(), menuDto.getCnt(), finalPrice, options);
		}).collect(Collectors.toList());
	}

	private Long incrementOrderNumber(String cafeId) {
		String key = "orderNum:" + cafeId + ":" + LocalDate.now().toString();
		redisTemplate.expire(key, Duration.ofDays(1));
		return redisTemplate.opsForValue().increment(key);
	}

}
