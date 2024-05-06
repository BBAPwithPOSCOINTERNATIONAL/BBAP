package com.bbap.hr.controller;


import com.bbap.hr.dto.request.EmployeeSearchDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.EmployeePayData;
import com.bbap.hr.dto.response.ListCategoryData;
import com.bbap.hr.dto.response.ListEmployeeData;
import com.bbap.hr.dto.response.ListSubsidyData;
import com.bbap.hr.dto.response.ListWorkplaceData;
import com.bbap.hr.service.HrService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/hr")
public class HrController {

    private final HrService hrService;

    @GetMapping("/subsidy/{workplaceId}")
    public ResponseEntity<DataResponseDto<ListSubsidyData>> getSubsidyByWorkplaceId(@PathVariable Integer workplaceId) {
        return hrService.getSubsidyByWorkplace(workplaceId);
    }

    @GetMapping("/employees")
    public ResponseEntity<DataResponseDto<ListEmployeeData>> searchEmployees(EmployeeSearchDto employeeSearchDto) {
        return hrService.searchEmployees(employeeSearchDto);
    }

    @GetMapping("/employees/card/{empCard}")
    public ResponseEntity<DataResponseDto<EmployeePayData>> getEmployeeDataByEmpCard(@PathVariable String empCard) {

        return hrService.getEmployeeDataByEmpCard(empCard);
    }

    @GetMapping("/employees/id/{empId}")
    public ResponseEntity<DataResponseDto<EmployeePayData>> getEmployeeDataByEmpId(@PathVariable int empId) {

        return hrService.getEmployeeDataByEmpId(empId);
    }

    @GetMapping("/workplaces")
    public ResponseEntity<DataResponseDto<ListWorkplaceData>> ListWorkplace() {

        return hrService.getListworkplace();
    }

    @GetMapping("/category")
    public ResponseEntity<DataResponseDto<ListCategoryData>> ListCategory() {

        return hrService.ListCategory();
    }
}
