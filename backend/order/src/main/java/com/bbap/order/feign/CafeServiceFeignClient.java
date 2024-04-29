package com.bbap.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.bbap.order.dto.request.FaceRequestDto;
import com.bbap.order.dto.response.CafeInfoForOrderListDto;
import com.bbap.order.dto.response.OrderListResponseDto;
import com.bbap.order.dto.response.StampResponseDto;
import com.bbap.order.dto.responseDto.CheckFaceResponseData;
import com.bbap.order.dto.responseDto.DataResponseDto;

@FeignClient(name = "cafe-api", url = "http://localhost:8082/api/v1/cafes")
public interface CafeServiceFeignClient {

	@GetMapping(value = "/stamp/{cafeId}")
	ResponseEntity<DataResponseDto<StampResponseDto>> getStampCnt(@PathVariable String cafeId);

	@GetMapping(value = "/order-list/{cafeId}")
	ResponseEntity<DataResponseDto<CafeInfoForOrderListDto>> getCafeInfo(@PathVariable String cafeId);
}
