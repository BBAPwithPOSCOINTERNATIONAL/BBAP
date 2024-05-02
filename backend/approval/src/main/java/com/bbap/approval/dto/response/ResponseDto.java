package com.bbap.approval.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto {
	private String message = "Success";

	public static ResponseEntity<ResponseDto> success() {
		ResponseDto responseBody = new ResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
