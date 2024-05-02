package com.bbap.order_room.service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.order_room.dto.data.RoomParticipationDto;
import com.bbap.order_room.dto.responseDto.DataResponseDto;
import com.bbap.order_room.entity.redis.EntireParticipant;
import com.bbap.order_room.repository.ParticipantRepository;
import com.bbap.order_room.util.MakeLinkUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class RoomServiceImpl implements RoomService{
	private final ParticipantRepository participantRepository;
	@Override
	public ResponseEntity<DataResponseDto<RoomParticipationDto>> checkHasRoom(Integer empId) {
		Optional<EntireParticipant> participant = participantRepository.findById(empId);
		RoomParticipationDto roomParticipationDto = new RoomParticipationDto();
		if (participant.isPresent()) {
			String roomLink = MakeLinkUtil.roomLink(participant.get().getRoomId());
			roomParticipationDto.setRoomLink(roomLink);
		}else {
			roomParticipationDto.setRoomLink(null);
		}
		return DataResponseDto.of(roomParticipationDto);
	}
}
