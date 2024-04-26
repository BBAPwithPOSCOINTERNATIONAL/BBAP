package com.bbap.order.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.order.dto.request.ChoiceRequestDto;
import com.bbap.order.dto.request.MenuRequestDto;
import com.bbap.order.dto.request.OptionRequestDto;
import com.bbap.order.dto.request.PayRequestDto;
import com.bbap.order.dto.response.PayResponseDto;
import com.bbap.order.dto.responseDto.DataResponseDto;
import com.bbap.order.entity.Choice;
import com.bbap.order.entity.Menu;
import com.bbap.order.entity.Option;
import com.bbap.order.entity.Order;
import com.bbap.order.entity.OrderMenu;
import com.bbap.order.exception.MenuEntityNotFoundException;
import com.bbap.order.repository.MenuRepository;
import com.bbap.order.repository.OrderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {
	private final OrderRepository orderRepository;
	private final MenuRepository menuRepository;
	@Override
	public ResponseEntity<DataResponseDto<PayResponseDto>> order(PayRequestDto dto) {
		List<OrderMenu> orderMenus = getOrderMenus(dto);
		//사원 아이디
		int empId = 1;
		Order order = new Order(dto.getCafeId(), empId, LocalDateTime.now(), dto.getPickUpTime(), orderMenus);
		orderRepository.insert(order); // 주문 db에 넣기
		//결제 서비스 보내기
		//레디스에서 방 번호 가져오기
		int orderNum = 1;
		PayResponseDto payResponseDto = new PayResponseDto(orderNum);
		return DataResponseDto.of(payResponseDto);
	}

	private List<OrderMenu> getOrderMenus (PayRequestDto dto) {
		List<MenuRequestDto> menuRequestDtos = dto.getMenuList();
		List<OrderMenu> orderMenus= new ArrayList<>();
		for (MenuRequestDto menu: menuRequestDtos) {
			Menu menuOptional = menuRepository.findById(menu.getMenuId()).orElseThrow(MenuEntityNotFoundException::new);
			int price = menuOptional.getPrice();
			List<Option> options = new ArrayList<>();
			List<OptionRequestDto> optionRequests = menu.getOptions();
			for (OptionRequestDto optionRequestDto : optionRequests) {
				List<Choice> choices = new ArrayList<>();
				List<ChoiceRequestDto> choiceRequestDtos = optionRequestDto.getChoiceOptions();
				for (ChoiceRequestDto choiceRequestDto : choiceRequestDtos) {
					choices.add(new Choice(choiceRequestDto.getChoiceName(), choiceRequestDto.getPrice()));
					price += choiceRequestDto.getPrice();
				}
				options.add(new Option(optionRequestDto.getOptionName(),
					optionRequestDto.getType(), optionRequestDto.isRequired(), choices));
			}
			price *= menu.getCnt();
			orderMenus.add(new OrderMenu(menuOptional.getName(), menu.getCnt(), price,options));
		}
		return orderMenus;
	}

}
