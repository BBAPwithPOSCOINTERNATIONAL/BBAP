package com.bbap.order_room.dto.responseDto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataResponseDto<T> extends ResponseDto {
	private T data;

	public static <T> ResponseEntity<DataResponseDto<T>> of(T data) {
		DataResponseDto<T> responseBody = new DataResponseDto<>(data);
		return
			ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
