package com.bbap.approval.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ApprovalInfoDto {
	private Integer empId;
	private String empNo;
	private String empName;
	private String departmentName;
	private String positionName;
	private String workplaceName;
	private long totalPayment;
	private long totalSubsidy;
	private long totalSelfPayment;
}
