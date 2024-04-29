package com.bbap.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayMenuResponseData {
	private String storeName;
	private String menuName;
	private int menuPrice;
}
