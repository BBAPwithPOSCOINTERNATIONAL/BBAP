package com.bbap.hr.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class WorkplaceData {
    private Long workplaceId;
    private String workplaceName;
}
