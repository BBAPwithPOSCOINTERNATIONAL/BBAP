package com.bbap.order.dto.request;

import java.io.File;

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
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PayInfoFaceRequestDto {
	@NotNull
	@Schema(description = "얼굴 이미지", format = "binary")
	private MultipartFile faceImage;

	@NotNull
	@Schema(description = "카페 ID")
	private String cafeId;
}