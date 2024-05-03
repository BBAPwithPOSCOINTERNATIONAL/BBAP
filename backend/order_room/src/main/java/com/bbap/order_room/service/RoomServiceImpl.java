package com.bbap.order_room.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.order_room.dto.data.RoomParticipationDto;
import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.requestDto.ChoiceRequestDto;
import com.bbap.order_room.dto.requestDto.OptionRequestDto;
import com.bbap.order_room.dto.responseDto.DataResponseDto;
import com.bbap.order_room.dto.responseDto.ResponseDto;
import com.bbap.order_room.entity.redis.ChoiceOption;
import com.bbap.order_room.entity.redis.EntireParticipant;
import com.bbap.order_room.entity.redis.MenuOption;
import com.bbap.order_room.entity.redis.OrderItem;
import com.bbap.order_room.entity.redis.Room;
import com.bbap.order_room.entity.redis.Session;
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
public class RoomServiceImpl implements RoomService{
	private final RoomRepository roomRepository;
	private final ParticipantRepository participantRepository;
	private final SessionRepository sessionRepository;
	private SimpMessagingTemplate messagingTemplate;
	@Override
	public ResponseEntity<DataResponseDto<RoomParticipationDto>> checkHasRoom(Integer empId) {
		Optional<EntireParticipant> participant = participantRepository.findById(empId);
		RoomParticipationDto roomParticipationDto = new RoomParticipationDto();
		if (participant.isPresent()) {
			roomParticipationDto.setRoomId(participant.get().getRoomId());
		}else {
			roomParticipationDto.setRoomId(null);
		}
		return DataResponseDto.of(roomParticipationDto);
	}

	@Override
	public ResponseEntity<DataResponseDto<RoomParticipationDto>> createRoom(Integer empId) {
		String newRoomId = generateRoomId();
		Room newRoom = new Room(newRoomId, "INITIAL", empId,
			new HashSet<>(), new ArrayList<>());
		roomRepository.save(newRoom);
		EntireParticipant newParticipant = new EntireParticipant(empId, newRoomId);
		participantRepository.save(newParticipant);
		return DataResponseDto.of(new RoomParticipationDto(newRoomId));
	}

	private String generateRoomId() {
		// 실제 구현에서는 더 복잡한 로직을 사용하여 유니크한 ID 생성
		return UUID.randomUUID().toString();
	}
}
