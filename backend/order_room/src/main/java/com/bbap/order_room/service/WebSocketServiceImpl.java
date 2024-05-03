package com.bbap.order_room.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.ChoiceRequestDto;
import com.bbap.order_room.dto.requestDto.OptionRequestDto;
import com.bbap.order_room.entity.redis.ChoiceOption;
import com.bbap.order_room.entity.redis.MenuOption;
import com.bbap.order_room.entity.redis.OrderItem;
import com.bbap.order_room.entity.redis.Room;
import com.bbap.order_room.entity.redis.Session;
import com.bbap.order_room.exception.SessionEntityNotFoundException;
import com.bbap.order_room.repository.RoomRepository;
import com.bbap.order_room.repository.SessionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class WebSocketServiceImpl implements WebSocketService{
	private final SessionRepository sessionRepository;
	private final RoomRepository roomRepository;
	private final SimpMessagingTemplate messagingTemplate;
	@Override
	public void connectRoom(Integer empId, String sessionId, String roomId) {
		Session session = new Session(sessionId, empId);
		sessionRepository.save(session);
	}

	@Override
	public void addOrderItem(String roomId, String sessionId, AddOrderItemRequestDto requestDto) {
		Session session = sessionRepository.findById(sessionId).orElseThrow(SessionEntityNotFoundException::new);
		Integer empId = session.getEmpId();
		Room room = roomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Room not found"));
		if (room.getOrderItems() == null) {
			room.setOrderItems(new ArrayList<>());
		}
		if (room.getOrderers() == null) {
			room.setOrderers(new ArrayList<>());
		}
		System.out.println(room.toString());
		List<OptionRequestDto> optionList = requestDto.getOptions();
		List<MenuOption> menuOptions = new ArrayList<>();
		for (OptionRequestDto option : optionList) {
			List<ChoiceRequestDto> choiceRequestDtos = option.getChoiceOptions();
			List<ChoiceOption> choiceOptions = new ArrayList<>();
			for (ChoiceRequestDto choice : choiceRequestDtos) {
				choiceOptions.add(new ChoiceOption(choice.getChoiceName(), choice.getPrice()));
			}
			MenuOption menuOption = new MenuOption(
				option.getOptionName(),
				option.getType(),
				option.isRequired(),
				choiceOptions
			);
		}
		OrderItem orderItem = new OrderItem(
			requestDto.getMenuId(),
			requestDto.getCnt(),
			menuOptions,
			session.getEmpId()
		);
		room.getOrderItems().add(orderItem); //아이템 추가
		if (!room.getOrderers().contains(session.getEmpId())) {
			room.getOrderers().add(session.getEmpId());
		}
		room.setRoomStatus("ORDER_FILLED");// 방 상태를 주문 담김으로 변경
		roomRepository.save(room);
		//구독자에게 알리기
		messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
	}
}
