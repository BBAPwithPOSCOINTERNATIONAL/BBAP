package com.bbap.approval.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TotalPaymentDto {
	private int empId;
	private long totalPaymentAmountSum;
	private long useSubsidySum;
	private long selfPaymentSum;

	public TotalPaymentDto(int empId, long totalPaymentAmountSum, long useSubsidySum) {
		this.empId = empId;
		this.totalPaymentAmountSum = totalPaymentAmountSum;
		this.useSubsidySum = useSubsidySum;
		this.selfPaymentSum = totalPaymentAmountSum - useSubsidySum;
	}
}
