package com.bbap.order.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequestDto {
	private Integer empId;
	private int totalPaymentAccount;
	private int useSubsidy;
	private String paymentDetail;
	private String payStore;
}