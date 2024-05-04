package com.bbap.order_room.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Random;

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
import com.bbap.order_room.feign.HrServiceFeignClient;
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
	private final HrServiceFeignClient hrServiceFeignClient;
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
			room.setOrderers(new HashMap<>());
		}
		// 방 상태 확인
		if (!room.getRoomStatus().equals("INITIAL") && !room.getRoomStatus().equals("ORDER_FILLED")) {
			throw new IllegalStateException("'INITIAL' or 'ORDER_FILLED' 상태여야 주문이 가능합니다.");
		}
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
		String name = hrServiceFeignClient.checkId(empId).getBody().getData().getEmpName();
		room.getOrderers().put(empId, name);
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
		// 방 상태 확인
		if (!room.getRoomStatus().equals("ORDER_FILLED")) {
			throw new IllegalStateException("'ORDER_FILLED' 상태여야 주문 삭제가 가능합니다.");
		}
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

	@Override
	public void startGame(String sessionId) {
		Integer empId = getEmpId(sessionId);
		EntireParticipant participant = participantRepository.findById(empId)
			.orElseThrow(() -> new IllegalArgumentException("User is not in any room"));
		String roomId = participant.getRoomId();
		Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);
		// 방 상태 확인
		if (!room.getRoomStatus().equals("ORDER_FILLED")) {
			throw new IllegalStateException("'ORDER_FILLED' 상태여야 게임 시작이 가능합니다.");
		}
		if (room.getCurrentOrderer() != empId) throw new IllegalStateException("현재 주문자만 게임 시작이 가능합니다.");
		room.setRoomStatus("GAME_START");
		roomRepository.save(room);
		messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
	}

	@Override
	public void runWheel(String sessionId) {
		Integer empId = getEmpId(sessionId);
		EntireParticipant participant = participantRepository.findById(empId)
			.orElseThrow(() -> new IllegalArgumentException("User is not in any room"));
		String roomId = participant.getRoomId();
		Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);
		// 방 상태 확인
		if (!room.getRoomStatus().equals("GAME_START")) {
			throw new IllegalStateException("'GAME_START' 상태여야 게임 시작이 가능합니다.");
		}
		if (room.getCurrentOrderer() != empId) throw new IllegalStateException("현재 주문자만 게임 시작이 가능합니다.");
		room.setRoomStatus("GAME_END");
		// 원판 결과 생성 (랜덤 또는 사전 정의된 결과를 사용)
		Integer result = generateWheelResult(room.getOrderers());
		room.setCurrentOrderer(result); //주문자 변경
		roomRepository.save(room);
		messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
	}

	private Integer getEmpId(String sessionId){
		Session session = sessionRepository.findById(sessionId).orElseThrow(SessionEntityNotFoundException::new);
		return session.getEmpId();
	}

	private boolean isLastOrderFromUser(Room room, Integer empId) {
		return room.getOrderItems().stream()
			.noneMatch(item -> item.getOrderer().equals(empId));
	}

	private Integer generateWheelResult(HashMap<Integer, String> orderers) {
		// HashSet을 List로 변환
		List<Integer> list = new ArrayList<>(orderers.keySet());
		// 랜덤 객체 생성
		Random random = new Random();
		// 리스트에서 랜덤 인덱스로 요소 선택
		int randomIndex = random.nextInt(list.size()); // 리스트 크기 내에서 랜덤 인덱스 생성
		return list.get(randomIndex);
	}
}
