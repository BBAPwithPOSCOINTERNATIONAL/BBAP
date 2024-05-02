package com.bbap.hr.dto.response;

import com.bbap.hr.dto.SubsidyDto;
import lombok.*;

import java.sql.Time;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeePayData {
    private Integer empId;
    private String empName;
    private SubsidyDto subsidy;
    private Time currTime;

}
