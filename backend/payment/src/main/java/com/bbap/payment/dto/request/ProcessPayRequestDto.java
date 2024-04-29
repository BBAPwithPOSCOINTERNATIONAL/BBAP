package com.bbap.payment.dto.request;

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
public class ProcessPayRequestDto {
	@NotNull
	@Schema(description = "사원 ID")
	private int empId;

	@NotNull
	@Schema(description = "총 결제 금액")
	private int totalPaymentAccount;

	@NotNull
	@Schema(description = "사용 지원금")
	private int useSubsidy;

	@Schema(description = "결제 상세")
	private String paymentDetail;

	@Schema(description = "점포 이름")
	private String payStore;
}
