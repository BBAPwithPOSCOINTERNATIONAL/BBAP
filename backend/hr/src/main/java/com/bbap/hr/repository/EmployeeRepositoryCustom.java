package com.bbap.hr.repository;

import com.bbap.hr.entity.EmployeeEntity;

import java.util.List;

public interface EmployeeRepositoryCustom {

    List<EmployeeEntity> findByNameAndWorkplaceIdAndPositionIdAndDepartmentId(String name, Integer workplaceId, Integer positionId, Integer departmentId);
}
