package com.bbap.order.dto.responseDto;

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
