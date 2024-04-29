package com.bbap.hr.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalTime;

@Getter
@Setter
@Builder
public class SubsidyDto {
//    private Integer id;
//    private WorkplaceDto workplace;
    private Integer mealClassification;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer subsidy;
}