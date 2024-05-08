package com.bbap.order.dto.responseDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmployeeDto {
	private Integer empId;
	private String empNo;
	private String empName;
	private DepartmentDto department;
	private PositionDto position;
	private WorkplaceDto workplace;

}
