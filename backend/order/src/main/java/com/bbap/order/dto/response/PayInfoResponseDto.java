package com.bbap.order.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayInfoResponseDto {
	private Integer empId;
	private String empName;
	private int stampCnt;
	private int availableSubsidy;
}