package com.bbap.payment.dto.response;

import java.util.List;

import com.bbap.payment.dto.DayPaymentDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListMonthPaymentResponseData {
	private long totalPaymentAmountSum;
	private long useSubsidySum;
	private long selfPaymentSum;
	private List<DayPaymentDto> dayPaymentList;
}
