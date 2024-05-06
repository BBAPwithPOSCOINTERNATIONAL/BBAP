package com.bbap.order_room.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbap.order_room.dto.data.RoomParticipationDto;
import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import com.bbap.order_room.dto.responseDto.DataResponseDto;
import com.bbap.order_room.dto.responseDto.ResponseDto;
import com.bbap.order_room.service.RoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/api/v1/order-rooms")
public class RoomController {
	private final RoomService roomService;
	@GetMapping
	ResponseEntity<DataResponseDto<RoomParticipationDto>> hasRoom(@RequestHeader(value = "X-Employee-Id") Integer empId) {
		return roomService.checkHasRoom(empId);
	}
	@PostMapping
	ResponseEntity<DataResponseDto<RoomParticipationDto>> createRoom(@RequestHeader(value = "X-Employee-Id") Integer empId) {
		return roomService.createRoom(empId);
	}


}
