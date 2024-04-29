package com.bbap.hr.dto.response;

import com.bbap.hr.dto.DepartmentDto;
import com.bbap.hr.dto.PositionDto;
import com.bbap.hr.dto.WorkplaceDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmployeeInfoData {
    private Integer empId;
    private String empNo;
    private String empName;
    private DepartmentDto department;
    private PositionDto position;
    private WorkplaceDto workplace;

}
