package com.bbap.payment.dto.response;

import java.util.List;

import com.bbap.payment.dto.PaymentDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListDayPaymentResponseData {
	private List<PaymentDto> paymentList;
}
