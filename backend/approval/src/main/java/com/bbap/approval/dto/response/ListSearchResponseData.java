package com.bbap.approval.dto.response;

import java.util.List;

import com.bbap.approval.dto.SearchInfoDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListSearchResponseData {
	private List<SearchInfoDto> employeeList;
}
