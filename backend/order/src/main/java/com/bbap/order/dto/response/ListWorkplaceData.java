package com.bbap.order.dto.response;

import java.util.List;

import com.bbap.order.dto.WorkplaceDto;

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
	private List<WorkplaceDto> workplaceList;
}
