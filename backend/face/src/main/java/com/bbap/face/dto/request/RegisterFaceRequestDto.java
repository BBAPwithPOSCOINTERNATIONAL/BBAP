package com.bbap.face.dto.request;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterFaceRequestDto {
	@NotNull
	@Schema(description = "얼굴 이미지", format = "binary")
	private MultipartFile faceImage;

	@NotNull
	@Schema(description = "사원 식별 ID")
	private int empId;
}
