package com.bbap.order_room.service;

import org.springframework.http.ResponseEntity;

import com.bbap.order_room.dto.data.RoomParticipationDto;
import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.responseDto.DataResponseDto;
import com.bbap.order_room.dto.responseDto.ResponseDto;

public interface RoomService {
	ResponseEntity<DataResponseDto<RoomParticipationDto>> checkHasRoom(Integer empId);
	ResponseEntity<DataResponseDto<RoomParticipationDto>> createRoom(Integer empId);
}
