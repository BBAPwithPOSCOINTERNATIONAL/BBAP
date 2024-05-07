package com.bbap.order_room.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.xml.sax.EntityResolver;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.ChoiceRequestDto;
import com.bbap.order_room.dto.requestDto.OptionRequestDto;
import com.bbap.order_room.dto.requestDto.OrderRequestDto;
import com.bbap.order_room.dto.responseDto.DataResponseDto;
import com.bbap.order_room.dto.responseDto.OrderResponseDto;
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
import com.bbap.order_room.feign.OrderServiceFeignClient;
import com.bbap.order_room.repository.ParticipantRepository;
import com.bbap.order_room.repository.RoomRepository;
import com.bbap.order_room.repository.SessionRepository;

import feign.FeignException;
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
	private final OrderServiceFeignClient orderServiceFeignClient;
	@Override
	public void connectRoom(Integer empId, String sessionId, String roomId) {
		Session session = new Session(sessionId, empId);
		sessionRepository.save(session);
		log.info("사원 ID {}, 세션 ID {}을 사용하여 방 ID {}에 성공적으로 연결되었습니다.", empId, sessionId, roomId);
	}

	@Override
	public void addOrderItem(String sessionId, AddOrderItemRequestDto requestDto) {
		log.info("세션 ID {} 과 주문 상세 정보를 이용해 주문 아이템을 추가하려고 합니다: {}", sessionId, requestDto);
		Integer empId = getEmpId(sessionId);
		EntireParticipant participant = participantRepository.findById(empId)
				.orElseThrow(() -> {
					log.error("사용자가 어떤 방에도 참여하고 있지 않습니다. 사원 ID: {}", empId);
					return new IllegalArgumentException("User is not in any room");
				});
		String roomId = participant.getRoomId();
		Room room = roomRepository.findById(roomId).orElseThrow(() -> {
			log.error("잘못된 방 ID{} 가 주어졌습니다.", roomId);
			return new IllegalArgumentException("Room not found");
		});

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

//		List<OptionRequestDto> optionList = requestDto.getOptions();
//		List<MenuOption> menuOptions = new ArrayList<>();
//		for (OptionRequestDto option : optionList) {
//			List<ChoiceRequestDto> choiceRequestDtos = option.getChoiceOptions();
//			List<ChoiceOption> choiceOptions = new ArrayList<>();
//			for (ChoiceRequestDto choice : choiceRequestDtos) {
//				choiceOptions.add(new ChoiceOption(choice.getChoiceName(), choice.getPrice()));
//			}
//			MenuOption menuOption = new MenuOption(
//				option.getOptionName(),
//				option.getType(),
//				option.isRequired(),
//				choiceOptions
//			);
//			menuOptions.add(menuOption);
//		}

		List<OptionRequestDto> optionList = requestDto.getOptions();
		List<MenuOption> menuOptions = optionList.stream().map(option -> {
			List<ChoiceOption> choiceOptions = option.getChoiceOptions().stream().map(
					choice -> new ChoiceOption(choice.getChoiceName(), choice.getPrice())
			).collect(Collectors.toList());
			return new MenuOption(option.getOptionName(), option.getType(), option.isRequired(), choiceOptions);
		}).collect(Collectors.toList());


		OrderItem orderItem = new OrderItem(
			requestDto.getMenuId(),
			requestDto.getCnt(),
			menuOptions,
			empId
		);

		room.getOrderItems().add(orderItem); //아이템 추가
		log.info("주문 아이템이 성공적으로 추가되었습니다. 아이템: {}", orderItem);

		String name = hrServiceFeignClient.checkId(empId).getBody().getData().getEmpName();
		room.getOrderers().put(empId, name);
		log.info("사원 ID {}와 이름 {}을 주문자 목록에 추가했습니다.", empId, name);

		room.setRoomStatus("ORDER_FILLED");// 방 상태를 주문 담김으로 변경
		roomRepository.save(room);
		//구독자에게 알리기
		messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
		log.info("방 {}의 정보가 구독자들에게 전송되었습니다.", roomId);
	}

	@Override
	public void deleteOrderItem(String sessionId, String orderItemId) {
		log.info("세션 ID {}과 주문 아이템 ID {}을 이용해 주문 아이템을 삭제하려고 합니다.", sessionId, orderItemId);


		Integer empId = getEmpId(sessionId);
		EntireParticipant participant = participantRepository.findById(empId)
				.orElseThrow(() -> {
					log.error("사용자가 어떤 방에도 참여하고 있지 않습니다. 사원 ID: {}", empId);
					return new IllegalArgumentException("User is not in any room");
				});
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
			log.info("주문 아이템 ID {} 삭제되었습니다.", orderItemId);

			// 주문 목록이 비어있으면 상태를 초기화
			if (room.getOrderItems().isEmpty()) {
				room.setRoomStatus("INITIAL");
			}
			// 해당 주문 항목을 담은 사용자의 ID 검사
			Integer ordererId = itemToRemove.get().getOrderer();
			// 사용자가 다른 주문 항목을 가지고 있지 않을 경우만 `orderers` 및 `participantRepository`에서 제거
			if (isLastOrderFromUser(room, ordererId)) {
				room.getOrderers().remove(ordererId);
				participantRepository.deleteById(ordererId); // `EntireParticipant`에서 제거
			}
			roomRepository.save(room);
			messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
			log.info("방 {}의 업데이트 정보가 구독자들에게 전송되었습니다.", roomId);

		} else {
			log.error("주문 아이템 ID {}를 찾을 수 없습니다.", orderItemId);
			throw new OrderItemNotFoundException();
		}
	}

	@Override
	public void startGame(String sessionId) {
		log.info("세션 ID {}을 이용해 게임 시작을 시도합니다.", sessionId);

		Integer empId = getEmpId(sessionId);
		EntireParticipant participant = participantRepository.findById(empId)
			.orElseThrow(() -> new IllegalArgumentException("User is not in any room"));
		String roomId = participant.getRoomId();
		Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);
		// 방 상태 확인
		if (!room.getRoomStatus().equals("ORDER_FILLED")) {
			throw new IllegalStateException("'ORDER_FILLED' 상태여야 게임 시작이 가능합니다.");
		}
		if (!Objects.equals(room.getCurrentOrderer(), empId)) throw new IllegalStateException("현재 주문자만 게임 시작이 가능합니다.");
		room.setRoomStatus("GAME_START");
		log.info("방 {}의 상태가 'GAME_START'로 변경되었습니다.", roomId);

		roomRepository.save(room);
		messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
		log.info("방 {}의 업데이트 정보가 구독자들에게 전송되었습니다.", roomId);

	}

	@Override
	public void runWheel(String sessionId) {
		log.info("세션 ID {}을 이용해 원판을 돌리려고 합니다.", sessionId);
		Integer empId = getEmpId(sessionId);
		EntireParticipant participant = participantRepository.findById(empId)
			.orElseThrow(() -> new IllegalArgumentException("User is not in any room"));
		String roomId = participant.getRoomId();
		Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);
		// 방 상태 확인
		if (!room.getRoomStatus().equals("GAME_START")) {
			throw new IllegalStateException("'GAME_START' 상태여야 게임 시작이 가능합니다.");
		}
		if (!Objects.equals(room.getCurrentOrderer(), empId)) throw new IllegalStateException("현재 주문자만 게임 시작이 가능합니다.");
		room.setRoomStatus("GAME_END");
		log.info("방 {}의 상태가 'GAME_END'로 변경되었습니다.", roomId);

		// 원판 결과 생성 (랜덤 또는 사전 정의된 결과를 사용)
		Integer result = generateWheelResult(room.getOrderers());
		room.setCurrentOrderer(result); //주문자 변경
		log.info("원판 결과에 따라 새로운 주문자 ID {}가 결정되었습니다.", result);

		roomRepository.save(room);
		messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
		log.info("방 {}의 업데이트 정보가 구독자들에게 전송되었습니다.", roomId);

	}

	@Override
	public void order(String sessionId, OrderRequestDto orderRequestDto) {
		Integer empId = getEmpId(sessionId);
		//order 서비스로 주문 보내기
		ResponseEntity<DataResponseDto<OrderResponseDto>> orderResponse;
		try {
			orderResponse = orderServiceFeignClient.order(empId, orderRequestDto);
		} catch (FeignException e) {
			log.error("Order request failed: " + e.getMessage());
			// 필요한 로직을 추가할 수 있습니다.
			throw new RuntimeException("Order service request failed", e);
		}
		Long orderNumber = orderResponse.getBody().getData().getOrderNum();
		//알림 보내기 -> kafka
		//방 상태 주문 종료로 바꾸기
		EntireParticipant participant = participantRepository.findById(empId)
			.orElseThrow(() -> new IllegalArgumentException("User is not in any room"));
		String roomId = participant.getRoomId();
		Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);
		room.setRoomStatus("ORDERED");
		room.setOrderNumber(orderNumber);
		roomRepository.save(room);

		// Room 객체의 orderers HashMap을 사용하여 EntireParticipant에서 제거
		for (Integer ordererId : room.getOrderers().keySet()) {
			participantRepository.deleteById(ordererId);
		}

		// 메시지 전송을 통해 방의 상태가 바뀌었음을 알릴 수 있습니다.
		messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
	}

	@Override
	public void leaveRoom(String sessionId) {
		log.info("세션 ID {}을 이용해서 방을 나가려고 합니다.", sessionId);

		Integer empId = getEmpId(sessionId);
		// 방과 관련된 `EntireParticipant` 객체를 찾음
		EntireParticipant participant = participantRepository.findById(empId)
			.orElseThrow(() -> new IllegalArgumentException("User is not in any room"));
		String roomId = participant.getRoomId();

		// 해당 방 객체를 찾음
		Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);

		// 현재 주문자 여부 확인
		if (room.getCurrentOrderer().equals(empId)) {
			// 현재 주문자인 경우: 방 상태를 "ROOM_BOOM"으로 설정
			room.setRoomStatus("ROOM_BOOM");
			roomRepository.save(room);

			// 방의 모든 참여자 제거
			List<EntireParticipant> participantsToDelete = participantRepository.findAllByRoomId(roomId);
			log.info("사원 ID {}이(가) 방 {}의 방장이므로 전체 참여자를 제거했습니다.", empId, roomId);

			participantRepository.deleteAll(participantsToDelete);
		} else {
			// 현재 주문자가 아닌 경우: 해당 사용자가 시킨 주문 항목 제거
			List<OrderItem> itemsToRemove = room.getOrderItems().stream()
				.filter(item -> item.getOrderer().equals(empId))
				.toList();
			room.getOrderItems().removeAll(itemsToRemove);
			log.info("사원 ID {}가 방 {}에서 나갔으므로 참여자 목록에서 제거했습니다.", empId, roomId);

			// 사용자가 더 이상 주문한 항목이 없다면 `orderers` 목록에서 제거
			if (room.getOrderItems().stream().noneMatch(item -> item.getOrderer().equals(empId))) {
				room.getOrderers().remove(empId);
			}

			// `EntireParticipant`에서 해당 사용자를 제거
			participantRepository.deleteById(empId);

			// 방 상태 업데이트 후 저장
			roomRepository.save(room);
		}

		// 방 상태 변경을 구독 중인 모든 사용자에게 알림
		messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
		log.info("방 {}의 업데이트 정보가 구독자들에게 전송되었습니다.", roomId);
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
