package com.bbap.hr.dto.response;

import com.bbap.hr.dto.SubsidyDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListSubsidyData {
    private List<SubsidyDto> subsidyList;
}
