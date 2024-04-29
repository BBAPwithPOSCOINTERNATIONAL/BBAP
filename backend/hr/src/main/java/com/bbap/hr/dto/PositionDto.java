package com.bbap.hr.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PositionDto {
    private Long positionId;
    private String positionName;
}
