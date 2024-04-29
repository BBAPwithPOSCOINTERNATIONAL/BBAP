package com.bbap.restaurant.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataResponseDto<T> extends ResponseDto {
	@Schema(description = "응답 데이터")
	private T data;

	public static <T> ResponseEntity<DataResponseDto<T>> of(T data) {
		DataResponseDto<T> responseBody = new DataResponseDto<>(data);
		return
			ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
