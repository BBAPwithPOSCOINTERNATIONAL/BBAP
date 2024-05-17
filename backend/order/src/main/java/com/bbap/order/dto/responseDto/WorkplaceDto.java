package com.bbap.order.dto.responseDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class WorkplaceDto {
	private Integer workplaceId;
	private String workplaceName;
}
