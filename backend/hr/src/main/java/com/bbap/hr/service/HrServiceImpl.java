package com.bbap.hr.service;

import com.bbap.hr.dto.*;
import com.bbap.hr.dto.request.EmployeeSearchDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.EmployeeNameData;
import com.bbap.hr.dto.response.ListEmployeeData;
import com.bbap.hr.dto.response.ListSubsidyData;
import com.bbap.hr.entity.EmployeeEntity;
import com.bbap.hr.entity.SubsidyEntity;
import com.bbap.hr.exception.EmployeeNotFoundException;
import com.bbap.hr.repository.EmployeeRepository;
import com.bbap.hr.repository.SubsidyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class HrServiceImpl implements HrService {

    private final EmployeeRepository employeeRepository;
    private final SubsidyRepository subsidyRepository;

    @Override
    public ResponseEntity<DataResponseDto<ListSubsidyData>> getSubsidyByWorkplace(Integer workplaceId) {
        List<SubsidyEntity> subsidyEntities = subsidyRepository.findByWorkplace_WorkplaceId(workplaceId);


        List<SubsidyDto> subsidyDtos = subsidyEntities.stream().map(entity ->
                SubsidyDto.builder()
                        .mealClassification(entity.getMealClassification())
                        .startTime(entity.getStartTime())
                        .endTime(entity.getEndTime())
                        .subsidy(entity.getSubsidy())
                        .build()
        ).collect(Collectors.toList());

        ListSubsidyData listSubsidyData = new ListSubsidyData(subsidyDtos);

        return DataResponseDto.of(listSubsidyData);
    }


    @Override
    public ResponseEntity<DataResponseDto<ListEmployeeData>> searchEmployees(EmployeeSearchDto employeeSearchDto) {

        List<EmployeeEntity> employees = employeeRepository.findByNameAndWorkplaceIdAndPositionIdAndDepartmentId(
                employeeSearchDto.getName(),
                employeeSearchDto.getWorkplaceId(),
                employeeSearchDto.getPositionId(),
                employeeSearchDto.getDepartmentId()
        );
        List<EmployeeDto> employeeDtos = employees.stream()
                .map(entity -> EmployeeDto.builder()
                        .empId(entity.getEmpId())
                        .empNo(entity.getEmpNo())
                        .empName(entity.getEmpName())
                        .department(
                                entity.getDepartment() == null ? null : DepartmentDto.builder()
                                        .departmentId(entity.getDepartment().getDepartmentId())
                                        .departmentName(entity.getDepartment().getDepartmentName())
                                        .build()
                        )
                        .position(
                                entity.getPosition() == null ? null : PositionDto.builder()
                                        .positionId(entity.getPosition().getPositionId())
                                        .positionName(entity.getPosition().getPositionName())
                                        .build()
                        )
                        .workplace(
                                entity.getWorkplace() == null ? null : WorkplaceDto.builder()
                                        .workplaceId(entity.getWorkplace().getWorkplaceId())
                                        .workplaceName(entity.getWorkplace().getWorkplaceName())
                                        .build()
                        )
                        .build()
                )
                .collect(Collectors.toList());

        ListEmployeeData listEmployeeData = ListEmployeeData.builder()
                .employeeList(employeeDtos)
                .build();

        return DataResponseDto.of(listEmployeeData);
    }

    @Override
    public ResponseEntity<DataResponseDto<EmployeeNameData>> getEmployeeDataByEmpCard(String empCard) {
        EmployeeEntity employee = employeeRepository.findByEmpCard(empCard)
                .orElseThrow(EmployeeNotFoundException::new);

        EmployeeNameData data = EmployeeNameData
                .builder()
                .empId(employee.getEmpId())
                .empName(employee.getEmpName())
                .build();

        return DataResponseDto.of(data);
    }
}
