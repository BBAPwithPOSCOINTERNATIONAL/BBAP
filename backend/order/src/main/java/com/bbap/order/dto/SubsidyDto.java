package com.bbap.order.dto;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubsidyDto {
	private int mealClassification;
	private LocalTime startTime;
	private LocalTime endTime;
	private int subsidy;
}
