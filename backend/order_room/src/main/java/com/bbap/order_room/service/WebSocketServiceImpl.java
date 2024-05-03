package com.bbap.order_room.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.ChoiceRequestDto;
import com.bbap.order_room.dto.requestDto.OptionRequestDto;
import com.bbap.order_room.entity.redis.ChoiceOption;
import com.bbap.order_room.entity.redis.EntireParticipant;
import com.bbap.order_room.entity.redis.MenuOption;
import com.bbap.order_room.entity.redis.OrderItem;
import com.bbap.order_room.entity.redis.Room;
import com.bbap.order_room.entity.redis.Session;
import com.bbap.order_room.exception.OrderItemNotFoundException;
import com.bbap.order_room.exception.RoomEntityNotFoundException;
import com.bbap.order_room.exception.SessionEntityNotFoundException;
import com.bbap.order_room.repository.ParticipantRepository;
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
	private final ParticipantRepository participantRepository;
	private final SimpMessagingTemplate messagingTemplate;
	@Override
	public void connectRoom(Integer empId, String sessionId, String roomId) {
		Session session = new Session(sessionId, empId);
		sessionRepository.save(session);
	}

	@Override
	public void addOrderItem(String sessionId, AddOrderItemRequestDto requestDto) {
		Integer empId = getEmpId(sessionId);
		EntireParticipant participant = participantRepository.findById(empId)
			.orElseThrow(() -> new IllegalArgumentException("User is not in any room"));
		String roomId = participant.getRoomId();
		Room room = roomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Room not found"));
		if (room.getOrderItems() == null) {
			room.setOrderItems(new ArrayList<>());
		}
		if (room.getOrderers() == null) {
			room.setOrderers(new HashSet<>());
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
			empId
		);
		room.getOrderItems().add(orderItem); //아이템 추가
		room.getOrderers().add(empId);
		room.setRoomStatus("ORDER_FILLED");// 방 상태를 주문 담김으로 변경
		roomRepository.save(room);
		//구독자에게 알리기
		messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
	}

	@Override
	public void deleteOrderItem(String sessionId, String orderItemId) {
		Integer empId = getEmpId(sessionId);
		EntireParticipant participant = participantRepository.findById(empId)
			.orElseThrow(() -> new IllegalArgumentException("User is not in any room"));
		String roomId = participant.getRoomId();
		Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);
		Optional<OrderItem> itemToRemove = room.getOrderItems().stream()
			.filter(item -> item.getOrderItemId().equals(orderItemId))
			.findFirst();

		if (itemToRemove.isPresent()) {
			room.getOrderItems().remove(itemToRemove.get());
			// 주문 목록이 비어있으면 상태를 초기화
			if (room.getOrderItems().isEmpty()) {
				room.setRoomStatus("INITIAL");
			}
			// 해당 주문 항목을 담은 사용자의 ID 검사
			Integer ordererId = itemToRemove.get().getOrderer();
			// 사용자가 다른 주문 항목을 가지고 있지 않을 경우만 orderers에서 제거
			if (isLastOrderFromUser(room, ordererId)) {
				room.getOrderers().remove(ordererId);
			}
			roomRepository.save(room);
			messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
		} else {
			throw new OrderItemNotFoundException();
		}
	}

	private Integer getEmpId(String sessionId){
		Session session = sessionRepository.findById(sessionId).orElseThrow(SessionEntityNotFoundException::new);
		return session.getEmpId();
	}

	private boolean isLastOrderFromUser(Room room, Integer empId) {
		return room.getOrderItems().stream()
			.noneMatch(item -> item.getOrderer().equals(empId));
	}
}
