package com.bbap.hr.repository;

import com.bbap.hr.entity.SubsidyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubsidyRepository extends JpaRepository<SubsidyEntity, Integer> {
    List<SubsidyEntity> findByWorkplace_Id(Integer workplaceId);

}
