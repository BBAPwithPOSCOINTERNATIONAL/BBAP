package com.bbap.face.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbap.face.dto.request.FaceRequestDto;
import com.bbap.face.dto.request.RegisterFaceRequestDto;
import com.bbap.face.dto.response.CheckFaceResponseData;
import com.bbap.face.dto.response.DataResponseDto;
import com.bbap.face.dto.response.ResponseDto;
import com.bbap.face.entity.FaceEntity;
import com.bbap.face.exception.FaceNotFoundException;
import com.bbap.face.exception.RegisterNotFoundException;
import com.bbap.face.feign.FaceServiceFeignClient;
import com.bbap.face.repository.FaceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class FaceServiceImpl implements FaceService {
	private final FaceServiceFeignClient faceServiceFeignClient;

	private final FaceRepository faceRepository;

	@Override
	public ResponseEntity<ResponseDto> registerFace(int empId, FaceRequestDto request) {
		//기존에 등록되지 않은 경우
		if (!faceRepository.existsById(empId)) {
			FaceEntity faceEntity = new FaceEntity(empId);
			faceRepository.save(faceEntity);
			log.info("{} : 얼굴 첫 등록", empId);
		}

		//fast api로 등록 처리
		RegisterFaceRequestDto feignRequest = new RegisterFaceRequestDto(request.getFaceImage(), empId);

		ResponseEntity<ResponseDto> result = faceServiceFeignClient.registerFace(feignRequest);

		log.info("{} : 얼굴 정보 등록 성공", empId);

		return result;
	}

	@Override
	public ResponseEntity<DataResponseDto<CheckFaceResponseData>> checkFace(FaceRequestDto request) {
		//얼굴 인식 처리
		ResponseEntity<DataResponseDto<CheckFaceResponseData>> response
			= faceServiceFeignClient.predictFace(request);

		if (response.getBody() == null || response.getBody().getData().getEmpId() == -1) {
			log.debug("등록되지 않은 얼굴");
			throw new FaceNotFoundException();
		}

		log.info("인식된 empId : {}", response.getBody().getData().getEmpId());
		return response;
	}

	@Override
	public ResponseEntity<ResponseDto> checkRegister(int empId) {
		//기존에 등록되지 않은 경우
		if (!faceRepository.existsById(empId)) {
			log.debug("{} : 얼굴 정보를 등록하지 않은 사원", empId);
			throw new RegisterNotFoundException();
		}

		return ResponseDto.success();
	}
}
