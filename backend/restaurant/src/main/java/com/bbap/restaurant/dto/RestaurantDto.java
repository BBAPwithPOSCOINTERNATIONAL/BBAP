package com.bbap.restaurant.dto;

import java.sql.Time;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDto {
	private int restaurantId;
	private int workplaceId;
	private String restaurantName;
	private Time startTime;
	private Time endTime;
}
