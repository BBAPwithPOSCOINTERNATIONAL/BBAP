package com.bbap.approval.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListApprovalRequestDto {
	private String name;
	private Integer workplaceId;
	private Integer positionId;
	private Integer departmentId;
}