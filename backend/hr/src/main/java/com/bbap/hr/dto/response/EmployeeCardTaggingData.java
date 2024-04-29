package com.bbap.hr.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeCardTaggingData {
    private Integer empId;
    private String empName;
    private Integer subsidy;

}
