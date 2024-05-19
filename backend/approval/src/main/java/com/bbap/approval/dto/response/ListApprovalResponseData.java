package com.bbap.approval.dto.response;

import java.util.List;

import com.bbap.approval.dto.ApprovalInfoDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListApprovalResponseData {
	private List<ApprovalInfoDto> employeeList;
}
