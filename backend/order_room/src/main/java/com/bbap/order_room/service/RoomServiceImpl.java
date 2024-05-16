package com.bbap.order_room.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.order_room.dto.data.RoomParticipationDto;
import com.bbap.order_room.dto.responseDto.CheckEmpResponseData;
import com.bbap.order_room.dto.responseDto.DataResponseDto;
import com.bbap.order_room.entity.redis.Orderer;
import com.bbap.order_room.entity.redis.EntireParticipant;
import com.bbap.order_room.entity.redis.Room;
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
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final ParticipantRepository participantRepository;
    private final SessionRepository sessionRepository;

    private final HrServiceFeignClient hrServiceFeignClient;
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public ResponseEntity<DataResponseDto<RoomParticipationDto>> checkHasRoom(Integer empId) {
        log.info("사원 ID {}에 대해 방을 검사하는 중...", empId);

        Optional<EntireParticipant> participant = participantRepository.findById(empId);
        RoomParticipationDto roomParticipationDto = new RoomParticipationDto();

        if (participant.isPresent() && roomRepository.findById(participant.get().getRoomId()).isPresent()) {
            roomParticipationDto.setRoomId(participant.get().getRoomId());
            log.info("사원 ID {}는 방 ID {}에 참여하고 있습니다.", empId, roomParticipationDto.getRoomId());
        } else {
            roomParticipationDto.setRoomId(null);
            log.warn("사원 ID {}는 어떤 방에도 참여하고 있지 않습니다.", empId);
        }
        return DataResponseDto.of(roomParticipationDto);
    }

    @Override
    public ResponseEntity<DataResponseDto<RoomParticipationDto>> createRoom(Integer empId, String cafeId) {
        log.info("사원 ID {}에 대해 새로운 방을 생성하는 중...", empId);

        String newRoomId = generateRoomId();
        CheckEmpResponseData data = hrServiceFeignClient.checkId(empId).getBody().getData();
        String name = data.getEmpName();
        String empNo = data.getEmpNo();
        Orderer currentOrderer = new Orderer(empId, name, empNo);
        Room newRoom = new Room(newRoomId, cafeId, "INITIAL", currentOrderer,
                new HashMap<>(), new ArrayList<>(), null);
        roomRepository.save(newRoom);


        EntireParticipant newParticipant = new EntireParticipant(empId, newRoomId);
        participantRepository.save(newParticipant);

        log.info("사원 ID {}에 대한 새로운 방 ID {}가 생성되었습니다.", empId, newRoomId);
        return DataResponseDto.of(new RoomParticipationDto(newRoomId));
    }

    private String generateRoomId() {
        return UUID.randomUUID().toString();
    }
}
