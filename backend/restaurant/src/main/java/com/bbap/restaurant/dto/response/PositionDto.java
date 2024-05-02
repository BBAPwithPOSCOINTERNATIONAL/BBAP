package com.bbap.restaurant.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PositionDto {
    private Integer positionId;
    private String positionName;
}
