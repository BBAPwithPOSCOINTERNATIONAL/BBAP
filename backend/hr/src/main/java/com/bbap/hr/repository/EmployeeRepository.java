package com.bbap.hr.repository;

import com.bbap.hr.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Integer>, EmployeeRepositoryCustom {

    Optional<EmployeeEntity> findByEmpNo(String empNo);

    Optional<EmployeeEntity> findByEmpCard(String empCard);
}
