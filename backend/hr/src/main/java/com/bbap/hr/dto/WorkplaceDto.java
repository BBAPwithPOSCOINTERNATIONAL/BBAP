package com.bbap.hr.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class WorkplaceDto {
    private Long workplaceId;
    private String workplaceName;
}
