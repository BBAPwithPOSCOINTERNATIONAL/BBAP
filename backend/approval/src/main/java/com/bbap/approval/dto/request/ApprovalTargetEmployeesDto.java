package com.bbap.approval.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ApprovalTargetEmployeesDto {
    private List<Integer> employeeIds;
}