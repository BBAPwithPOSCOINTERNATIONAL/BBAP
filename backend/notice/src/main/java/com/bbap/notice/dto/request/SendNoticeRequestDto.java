package com.bbap.notice.dto.request;

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
public class SendNoticeRequestDto {
	@NotNull
	@Schema(description = "사원ID")
	private int empId;

	@NotNull
	@Schema(description = "알림 분류ID")
	private int noticeTemplateId;

	@Schema(description = "알림 URL")
	private String noticeUrl;

	@Schema(description = "점포 이름")
	private String storeName;
}
