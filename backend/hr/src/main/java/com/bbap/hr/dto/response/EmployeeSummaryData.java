package com.bbap.hr.dto.response;

import java.sql.Time;

import com.bbap.hr.dto.SubsidyDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeSummaryData {
    private Integer empId;
    private String empName;
}
