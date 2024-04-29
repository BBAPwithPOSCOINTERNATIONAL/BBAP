package com.bbap.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
	private int historyId;
	private int totalPaymentAmount;
	private int useSubsidy;
	private int selfPayment;
	private String paymentDetail;
}
