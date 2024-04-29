package com.bbap.order.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PayInfoAuthRequestDto {
	private Integer empNo;
	private String password;
	private String cafeId;
}
