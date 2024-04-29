package com.bbap.hr.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmployeeInfoData {
    private Long empId;
    private String empNo;
    private String empName;
    private DepartmentData department;
    private PositionData position;
    private WorkplaceData workplace;

}
