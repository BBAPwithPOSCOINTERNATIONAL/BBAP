package com.bbap.hr.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeSearchDto {
    private String name;
    private Integer workplaceId;
    private Integer positionId;
    private Integer departmentId;

}