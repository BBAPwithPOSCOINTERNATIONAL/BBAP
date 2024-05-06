package com.bbap.hr.dto.response;

import java.util.List;

import com.bbap.hr.entity.DepartmentEntity;
import com.bbap.hr.entity.PositionEntity;
import com.bbap.hr.entity.WorkplaceEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListCategoryData {
    private List<WorkplaceEntity> workplaceList;
    private List<DepartmentEntity> departmentList;
    private List<PositionEntity> positionList;
}
