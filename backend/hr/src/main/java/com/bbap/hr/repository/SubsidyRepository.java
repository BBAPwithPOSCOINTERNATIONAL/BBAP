package com.bbap.hr.repository;

import com.bbap.hr.entity.SubsidyEntity;
import com.bbap.hr.entity.WorkplaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface SubsidyRepository extends JpaRepository<SubsidyEntity, Integer> {
    List<SubsidyEntity> findByWorkplace_WorkplaceId(Integer workplaceId);

    @Query("SELECT s FROM SubsidyEntity s WHERE :workplace = s.workplace AND :currentTime BETWEEN s.startTime AND s.endTime")
    Optional<SubsidyEntity> findSubsidyByWorkplaceAndCurrentTime(
            @Param("workplace") WorkplaceEntity workplace,
            @Param("currentTime") LocalTime currentTime);

}
