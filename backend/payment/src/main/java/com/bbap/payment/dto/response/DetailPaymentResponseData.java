package com.bbap.payment.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetailPaymentResponseData {
	private int totalPaymentAmount;
	private int useSubsidy;
	private int selfPayment;
	private String paymentDetail;
	private String payStore;
	private String historyMemo;
	private LocalDateTime paymentDate;
}
