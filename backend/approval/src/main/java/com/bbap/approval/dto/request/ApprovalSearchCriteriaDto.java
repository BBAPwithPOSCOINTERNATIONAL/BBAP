package com.bbap.approval.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ApprovalSearchCriteriaDto {
    private int workplaceId;
    private int positionId;
    private int departmentId;
}