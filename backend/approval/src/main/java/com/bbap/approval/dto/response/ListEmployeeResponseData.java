package com.bbap.approval.dto.response;

import java.util.List;

import com.bbap.approval.dto.EmployeeDto;

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
public class ListEmployeeResponseData {
	private List<EmployeeDto> employeeList;
}
