package com.bbap.face.dto.response;

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
public class ResponseDto {
	@Schema(description = "응답 메시지")
	private String message = "Success";

	public static ResponseEntity<ResponseDto> success() {
		ResponseDto responseBody = new ResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
