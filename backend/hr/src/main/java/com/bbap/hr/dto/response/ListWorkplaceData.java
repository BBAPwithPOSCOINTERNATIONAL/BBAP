package com.bbap.hr.dto.response;

import java.util.List;

import com.bbap.hr.dto.EmployeeDto;
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
public class ListWorkplaceData {
    private List<WorkplaceEntity> workplaceList;
}
