package com.bbap.hr.service;

import com.bbap.hr.dto.*;
import com.bbap.hr.dto.request.EmployeeSearchDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.response.EmployeePayData;
import com.bbap.hr.dto.response.ListCategoryData;
import com.bbap.hr.dto.response.ListEmployeeData;
import com.bbap.hr.dto.response.ListSubsidyData;
import com.bbap.hr.dto.response.ListWorkplaceData;
import com.bbap.hr.entity.EmployeeEntity;
import com.bbap.hr.entity.SubsidyEntity;
import com.bbap.hr.entity.WorkplaceEntity;
import com.bbap.hr.exception.EmployeeNotFoundException;
import com.bbap.hr.exception.EmployeeWorkplaceNotFoundException;
import com.bbap.hr.exception.SubsidyNotFoundException;
import com.bbap.hr.repository.DepartmentRepository;
import com.bbap.hr.repository.EmployeeRepository;
import com.bbap.hr.repository.PositionRepository;
import com.bbap.hr.repository.SubsidyRepository;
import com.bbap.hr.repository.WorkplaceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class HrServiceImpl implements HrService {

    private final EmployeeRepository employeeRepository;
    private final SubsidyRepository subsidyRepository;
    private final WorkplaceRepository workplaceRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;

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
                        .empImage(entity.getEmpImage())
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
    public ResponseEntity<DataResponseDto<EmployeePayData>> getEmployeeDataByEmpCard(String empCard) {
        log.info("직원의 카드 정보로 직원 정보를 조회합니다: {}", empCard);

        EmployeeEntity employee = employeeRepository.findByEmpCard(empCard)
                .orElseThrow(EmployeeNotFoundException::new);

        WorkplaceEntity workplace = employee.getWorkplace();
        if (workplace == null) {
            throw new EmployeeWorkplaceNotFoundException();
        }

        SubsidyEntity subsidy = subsidyRepository.findSubsidyByWorkplaceAndCurrentTime(workplace, LocalTime.now())
                .orElseThrow(SubsidyNotFoundException::new);

        Date date = new Date();
        Time time = new Time(date.getTime());

        EmployeePayData data = EmployeePayData
                .builder()
                .empId(employee.getEmpId())
                .empName(employee.getEmpName())
                .subsidy(
                        SubsidyDto.builder()
                                .startTime(subsidy.getStartTime())
                                .endTime(subsidy.getEndTime())
                                .mealClassification(subsidy.getMealClassification())
                                .subsidy(subsidy.getSubsidy())
                                .build()
                )
                .currTime(time)
                .build();


        log.info("직원 정보 응답: 직원 ID - {}, 이름 - {}, 현재 시간 - {}, 지원금 - {}",
                data.getEmpId(), data.getEmpName(), time, data.getSubsidy().getSubsidy());
        return DataResponseDto.of(data);
    }

    @Override
    public ResponseEntity<DataResponseDto<EmployeePayData>> getEmployeeDataByEmpId(int empId) {
        log.info("EMP ID 정보로 직원 정보를 조회합니다: {}", empId);

        EmployeeEntity employee = employeeRepository.findByEmpId(empId)
            .orElseThrow(EmployeeNotFoundException::new);

        WorkplaceEntity workplace = employee.getWorkplace();
        if (workplace == null) {
            throw new EmployeeWorkplaceNotFoundException();
        }

        SubsidyEntity subsidy = subsidyRepository.findSubsidyByWorkplaceAndCurrentTime(workplace, LocalTime.now())
            .orElseThrow(SubsidyNotFoundException::new);

        Date date = new Date();
        Time time = new Time(date.getTime());

        EmployeePayData data = EmployeePayData
            .builder()
            .empId(employee.getEmpId())
            .empName(employee.getEmpName())
            .subsidy(
                SubsidyDto.builder()
                    .startTime(subsidy.getStartTime())
                    .endTime(subsidy.getEndTime())
                    .mealClassification(subsidy.getMealClassification())
                    .subsidy(subsidy.getSubsidy())
                    .build()
            )
            .currTime(time)
            .build();


        log.info("EMP ID 직원 정보 응답: 직원 ID - {}, 이름 - {}, 현재 시간 - {}, 지원금 - {}",
            data.getEmpId(), data.getEmpName(), time, data.getSubsidy().getSubsidy());
        return DataResponseDto.of(data);
    }

    @Override
    public ResponseEntity<DataResponseDto<ListWorkplaceData>> getListworkplace() {
        ListWorkplaceData data = new ListWorkplaceData(workplaceRepository.findAll());

        return DataResponseDto.of(data);
    }

    @Override
    public ResponseEntity<DataResponseDto<ListCategoryData>> ListCategory() {
       ListCategoryData data =  ListCategoryData.builder()
           .workplaceList(workplaceRepository.findAll())
           .departmentList(departmentRepository.findAll())
           .positionList(positionRepository.findAll())
           .build();

        return DataResponseDto.of(data);
    }
}
