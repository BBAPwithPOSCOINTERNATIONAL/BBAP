package com.bbap.hr.service;

import com.bbap.hr.dto.request.EmployeeSearchDto;
import com.bbap.hr.dto.request.LoginRequestDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.EmployeePayData;
import com.bbap.hr.dto.response.EmployeeSummaryData;
import com.bbap.hr.dto.response.ListCategoryData;
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

    ResponseEntity<DataResponseDto<ListCategoryData>> ListCategory();

    ResponseEntity<DataResponseDto<EmployeeSummaryData>> getEmployeeDataByAuth(LoginRequestDto request);
}
