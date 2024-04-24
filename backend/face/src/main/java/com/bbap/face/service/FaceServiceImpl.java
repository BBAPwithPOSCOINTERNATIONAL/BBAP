package com.bbap.face.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.face.dto.request.FaceRequestDto;
import com.bbap.face.dto.response.CheckFaceResponseData;
import com.bbap.face.dto.response.DataResponseDto;
import com.bbap.face.dto.response.ResponseDto;
import com.bbap.face.entity.FaceEntity;
import com.bbap.face.exception.RegisterNotFoundException;
import com.bbap.face.repository.FaceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class FaceServiceImpl implements FaceService {
	private final FaceRepository faceRepository;

	@Override
	public ResponseEntity<ResponseDto> registerFace(FaceRequestDto request) {
		//test코드
		int empId = 1;

		//기존에 등록되지 않은 경우
		if (!faceRepository.existsById(empId)) {
			FaceEntity faceEntity = new FaceEntity(empId);
			faceRepository.save(faceEntity);
			log.info("얼굴 첫 등록");
		}

		//등록 처리 코드
		//fast api로 file과 empId를 보내 train 요청.

		return ResponseDto.success();
	}

	@Override
	public ResponseEntity<DataResponseDto<CheckFaceResponseData>> checkFace(FaceRequestDto request) {
		//test코드
		int empId = 1;

		//얼굴 인식 처리
		//fast api 로 file을 보내 predict 요청

		//기존에 등록되지 않은 경우
		// if (처리결과가 -1 인 경우)
		// 	throw new FaceNotFoundException();

		CheckFaceResponseData data = new CheckFaceResponseData(empId);
		return DataResponseDto.of(data);
	}

	@Override
	public ResponseEntity<ResponseDto> checkRegister() {
		//test코드
		int empId = 1;

		//기존에 등록되지 않은 경우
		if (!faceRepository.existsById(empId)) {
			throw new RegisterNotFoundException();
		}

		return ResponseDto.success();
	}
}
