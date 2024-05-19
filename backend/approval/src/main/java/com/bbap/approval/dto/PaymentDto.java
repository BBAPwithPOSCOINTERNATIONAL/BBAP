package com.bbap.approval.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
	private int totalPaymentAmount;
	private int useSubsidy;
	private int selfPayment;
	private LocalDateTime paymentDate;
}
