package com.bbap.approval.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DayPaymentDto {
	private int day;
	private long totalPaymentAmount;
	private long useSubsidy;
	private long selfPayment;

	public DayPaymentDto(int day, long totalPaymentAmount, long useSubsidy) {
		this.day = day;
		this.totalPaymentAmount = totalPaymentAmount;
		this.useSubsidy = useSubsidy;
		this.selfPayment = totalPaymentAmount - useSubsidy;
	}
}
