package com.bbap.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestDto {
	private String id;
	private DayPaymentDto mealClassification;
	private PaymentDto startTime;
}
