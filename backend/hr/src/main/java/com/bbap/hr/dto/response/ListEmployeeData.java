package com.bbap.hr.dto.response;

import com.bbap.hr.dto.EmployeeDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListEmployeeData {
    List<EmployeeDto> employeeList;
}
