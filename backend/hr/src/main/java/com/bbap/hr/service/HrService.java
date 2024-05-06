package com.bbap.hr.service;

import com.bbap.hr.dto.request.EmployeeSearchDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.EmployeePayData;
import com.bbap.hr.dto.response.ListEmployeeData;
import com.bbap.hr.dto.response.ListSubsidyData;
import com.bbap.hr.dto.response.ListWorkplaceData;

import org.springframework.http.ResponseEntity;

public interface HrService {
    ResponseEntity<DataResponseDto<ListSubsidyData>> getSubsidyByWorkplace(Integer workplaceId);

    ResponseEntity<DataResponseDto<ListEmployeeData>> searchEmployees(EmployeeSearchDto employeeSearchDto);

    ResponseEntity<DataResponseDto<EmployeePayData>> getEmployeeDataByEmpCard(String empCard);

    ResponseEntity<DataResponseDto<EmployeePayData>> getEmployeeDataByEmpId(int empId);

    ResponseEntity<DataResponseDto<ListWorkplaceData>> getListworkplace();
}
