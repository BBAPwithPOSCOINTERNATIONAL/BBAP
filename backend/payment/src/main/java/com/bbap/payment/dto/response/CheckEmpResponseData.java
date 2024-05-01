package com.bbap.payment.dto.response;

import java.time.LocalTime;

import com.bbap.payment.dto.SubsidyDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckEmpResponseData {
	private int empId;
	private String empName;
	private SubsidyDto subsidy;
	private LocalTime currTime;
}