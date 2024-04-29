package com.bbap.hr.repository;

import com.bbap.hr.entity.EmployeeEntity;
import com.bbap.hr.entity.QEmployeeEntity;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

public class EmployeeRepositoryCustomImpl implements EmployeeRepositoryCustom {

    private final JPAQueryFactory query;
    private final QEmployeeEntity employee = QEmployeeEntity.employeeEntity;

    public EmployeeRepositoryCustomImpl(JPAQueryFactory query) {
        this.query = query;
    }
    public List<EmployeeEntity> findByNameAndWorkplaceIdAndPositionIdAndDepartmentId(String name, Integer workplaceId, Integer positionId, Integer departmentId) {
        BooleanBuilder builder = new BooleanBuilder();

        if (name != null) {
            builder.and(employee.empName.like("%" + name + "%"));
        }

        if (workplaceId != null) {
            builder.and(employee.workplace.workplaceId.eq(workplaceId));
        }

        if (positionId != null) {
            builder.and(employee.position.positionId.eq(positionId));
        }

        if (departmentId != null) {
            builder.and(employee.department.departmentId.eq(departmentId));
        }

        return query
                .selectFrom(employee)
                .where(builder)
                .fetch();
    }
}