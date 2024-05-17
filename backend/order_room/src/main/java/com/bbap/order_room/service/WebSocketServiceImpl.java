package com.bbap.order_room.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.OptionRequestDto;
import com.bbap.order_room.dto.requestDto.OrderRequestDto;
import com.bbap.order_room.dto.requestDto.SendNoticeRequestDto;
import com.bbap.order_room.dto.responseDto.CafeInfoOrderListDto;
import com.bbap.order_room.dto.responseDto.CheckEmpResponseData;
import com.bbap.order_room.dto.responseDto.DataResponseDto;
import com.bbap.order_room.dto.responseDto.OrderResponseDto;
import com.bbap.order_room.entity.redis.ChoiceOption;
import com.bbap.order_room.entity.redis.Orderer;
import com.bbap.order_room.entity.redis.EntireParticipant;
import com.bbap.order_room.entity.redis.MenuOption;
import com.bbap.order_room.entity.redis.OrderItem;
import com.bbap.order_room.entity.redis.Room;
import com.bbap.order_room.entity.redis.Session;
import com.bbap.order_room.exception.OrderItemNotFoundException;
import com.bbap.order_room.exception.RoomEntityNotFoundException;
import com.bbap.order_room.exception.SessionEntityNotFoundException;
import com.bbap.order_room.feign.CafeServiceFeignClient;
import com.bbap.order_room.feign.HrServiceFeignClient;
import com.bbap.order_room.feign.OrderServiceFeignClient;
import com.bbap.order_room.repository.ParticipantRepository;
import com.bbap.order_room.repository.RoomRepository;
import com.bbap.order_room.repository.SessionRepository;
import com.google.gson.Gson;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class WebSocketServiceImpl implements WebSocketService {
    private final SessionRepository sessionRepository;
    private final RoomRepository roomRepository;
    private final ParticipantRepository participantRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final HrServiceFeignClient hrServiceFeignClient;
    private final OrderServiceFeignClient orderServiceFeignClient;
    private final CafeServiceFeignClient cafeServiceFeignClient;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public void connectRoom(Integer empId, String sessionId, String roomId) {
        Session session = new Session(sessionId, empId, roomId);
        sessionRepository.save(session);
        log.info("사원 ID {}, 세션 ID {}을 사용하여 방 ID {}에 성공적으로 연결되었습니다.", empId, sessionId, roomId);
        Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);
        messagingTemplate.convertAndSend("/topic/room/" + roomId, room, createHeaders(sessionId));
    }

    @Override
    public void addOrderItem(String sessionId, AddOrderItemRequestDto requestDto) {
        log.info("세션 ID {} 과 주문 상세 정보를 이용해 주문 아이템을 추가하려고 합니다: {}", sessionId, requestDto);
        Integer empId = getEmpId(sessionId);
        String roomId = getRoomId(sessionId);
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
        if (!room.getRoomStatus().equals("INITIAL") && !room.getRoomStatus().equals("ORDER_FILLED")) {
            throw new IllegalStateException("'INITIAL' or 'ORDER_FILLED' 상태여야 주문이 가능합니다.");
        }

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

        Optional<EntireParticipant> participant = participantRepository.findById(empId);
        if (participant.isEmpty()) {
            EntireParticipant newParticipant = new EntireParticipant(empId, roomId);
            participantRepository.save(newParticipant);
        } else {
            EntireParticipant entireParticipant = participant.get();
            if (!Objects.equals(entireParticipant.getRoomId(), roomId)) {
                entireParticipant.setRoomId(roomId);
            }
        }

        room.getOrderItems().add(orderItem);
        log.info("주문 아이템이 성공적으로 추가되었습니다. 아이템: {}", orderItem);

        CheckEmpResponseData data = hrServiceFeignClient.checkId(empId).getBody().getData();
        String name = data.getEmpName();
        String empNo = data.getEmpNo();
        Orderer currentOrderer = new Orderer(empId, name, empNo);
        room.getOrderers().put(empId, currentOrderer);
        log.info("사원 ID {}와 이름 {}을 주문자 목록에 추가했습니다.", empId, name);

        room.setRoomStatus("ORDER_FILLED");
        roomRepository.save(room);

        messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
        log.info("방 {}의 정보가 구독자들에게 전송되었습니다.", roomId);
    }

    @Override
    public void deleteOrderItem(String sessionId, String orderItemId) {
        log.info("세션 ID {}과 주문 아이템 ID {}을 이용해 주문 아이템을 삭제하려고 합니다.", sessionId, orderItemId);

        Integer empId = getEmpId(sessionId);
        String roomId = getRoomId(sessionId);
        Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);

        if (!room.getRoomStatus().equals("ORDER_FILLED")) {
            throw new IllegalStateException("'ORDER_FILLED' 상태여야 주문 삭제가 가능합니다.");
        }
        Optional<OrderItem> itemToRemove = room.getOrderItems().stream()
            .filter(item -> item.getOrderItemId().equals(orderItemId))
            .findFirst();

        if (itemToRemove.isPresent()) {
            room.getOrderItems().remove(itemToRemove.get());
            log.info("주문 아이템 ID {} 삭제되었습니다.", orderItemId);

            if (room.getOrderItems().isEmpty()) {
                room.setRoomStatus("INITIAL");
            }

            Integer ordererId = itemToRemove.get().getOrderer();
            if (isLastOrderFromUser(room, ordererId)) {
                room.getOrderers().remove(ordererId);
                participantRepository.deleteById(ordererId);
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
        String roomId = getRoomId(sessionId);
        Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);

        if (!room.getRoomStatus().equals("ORDER_FILLED")) {
            throw new IllegalStateException("'ORDER_FILLED' 상태여야 게임 시작이 가능합니다.");
        }
        if (!Objects.equals(room.getCurrentOrderer().getEmpId(), empId)) throw new IllegalStateException("현재 주문자만 게임 시작이 가능합니다.");
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
        String roomId = getRoomId(sessionId);
        Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);

        if (!room.getRoomStatus().equals("GAME_START")) {
            throw new IllegalStateException("'GAME_START' 상태여야 게임 시작이 가능합니다.");
        }
        if (!Objects.equals(room.getCurrentOrderer().getEmpId(), empId)) throw new IllegalStateException("현재 주문자만 게임 시작이 가능합니다.");
        room.setRoomStatus("GAME_END");
        log.info("방 {}의 상태가 'GAME_END'로 변경되었습니다.", roomId);

        Orderer result = generateWheelResult(room.getOrderers());
        room.setCurrentOrderer(result);
        log.info("원판 결과에 따라 새로운 주문자 ID {}가 결정되었습니다.", result);

        Integer[] empIds = new Integer[]{result.getEmpId()};
        StringBuilder url = new StringBuilder();
        url.append("together/").append(roomId);
        SendNoticeRequestDto sendNoticeRequestDto = new SendNoticeRequestDto(
            empIds, 3, url.toString(), result.getName()
        );
        String message = new Gson().toJson(sendNoticeRequestDto);
        kafkaTemplate.send("notice_topic", message);
        log.info("같이 주문 방 내기 결과 알림 전송");

        roomRepository.save(room);
        messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
        log.info("방 {}의 업데이트 정보가 구독자들에게 전송되었습니다.", roomId);
    }

    @Override
    public void order(String sessionId, OrderRequestDto orderRequestDto) {
        Integer empId = getEmpId(sessionId);
        ResponseEntity<DataResponseDto<OrderResponseDto>> orderResponse;
        try {
            orderResponse = orderServiceFeignClient.order(empId, orderRequestDto);
        } catch (FeignException e) {
            log.error("Order request failed: " + e.getMessage());
            throw new RuntimeException("Order service request failed", e);
        }
        Long orderNumber = orderResponse.getBody().getData().getOrderNum();

        String roomId = getRoomId(sessionId);
        Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);
        room.setRoomStatus("ORDERED");
        room.setOrderNumber(orderNumber);
        roomRepository.save(room);

        Map<Integer, Orderer> orderers = room.getOrderers();
        Integer[] empIds = (orderers != null) ? orderers.keySet().toArray(new Integer[0]) : new Integer[0];
        StringBuilder url = new StringBuilder();
        url.append("together/").append(roomId);
        CafeInfoOrderListDto responseDto = cafeServiceFeignClient.cafeInfo(room.getCafeId()).getBody().getData();
        String storeName = responseDto.getCafeName();
        SendNoticeRequestDto sendNoticeRequestDto = new SendNoticeRequestDto(
            empIds, 2, url.toString(), storeName
        );
        String message = new Gson().toJson(sendNoticeRequestDto);
        kafkaTemplate.send("notice_topic", message);
        log.info("같이 주문 방 알림 전송");

        for (Integer ordererId : room.getOrderers().keySet()) {
            participantRepository.deleteById(ordererId);
        }

        messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
    }

    @Override
    public void leaveRoom(String sessionId) {
        log.info("세션 ID {}을 이용해서 방을 나가려고 합니다.", sessionId);

        Integer empId = getEmpId(sessionId);
        String roomId = getRoomId(sessionId);

        Room room = roomRepository.findById(roomId).orElseThrow(RoomEntityNotFoundException::new);

        if (room.getCurrentOrderer().getEmpId().equals(empId)) {
            room.setRoomStatus("ROOM_BOOM");
            roomRepository.save(room);

            List<EntireParticipant> participantsToDelete = participantRepository.findAllByRoomId(roomId);
            log.info("사원 ID {}이(가) 방 {}의 방장이므로 전체 참여자 {}명의 참여 정보를 제거했습니다.", empId, roomId, participantsToDelete.size());

            participantRepository.deleteAll(participantsToDelete);
        } else {
            List<OrderItem> itemsToRemove = room.getOrderItems().stream()
                .filter(item -> item.getOrderer().equals(empId))
                .toList();
            room.getOrderItems().removeAll(itemsToRemove);
            log.info("사원 ID {}가 방 {}에서 나갔으므로 참여자 목록에서 제거했습니다.", empId, roomId);

            if (room.getOrderItems().stream().noneMatch(item -> item.getOrderer().equals(empId))) {
                room.getOrderers().remove(empId);
            }

            participantRepository.deleteById(empId);

            roomRepository.save(room);
        }

        messagingTemplate.convertAndSend("/topic/room/" + roomId, room);
        log.info("방 {}의 업데이트 정보가 구독자들에게 전송되었습니다.", roomId);
    }

    private Integer getEmpId(String sessionId) {
        Session session = sessionRepository.findById(sessionId).orElseThrow(SessionEntityNotFoundException::new);
        return session.getEmpId();
    }

    private String getRoomId(String sessionId) {
        Session session = sessionRepository.findById(sessionId).orElseThrow(SessionEntityNotFoundException::new);
        return session.getRoomId();
    }

    private boolean isLastOrderFromUser(Room room, Integer empId) {
        return room.getOrderItems().stream()
            .noneMatch(item -> item.getOrderer().equals(empId));
    }

    private Orderer generateWheelResult(HashMap<Integer, Orderer> orderers) {
        List<Integer> list = new ArrayList<>(orderers.keySet());
        Random random = new Random();
        int randomIndex = random.nextInt(list.size());
        return orderers.get(list.get(randomIndex));
    }

    private MessageHeaders createHeaders(String sessionId) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);
        return headerAccessor.getMessageHeaders();
    }
}
