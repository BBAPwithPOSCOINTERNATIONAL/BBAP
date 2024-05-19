package com.bbap.hr.dto;

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
    private String empImage;
    private DepartmentDto department;
    private PositionDto position;
    private WorkplaceDto workplace;


}
