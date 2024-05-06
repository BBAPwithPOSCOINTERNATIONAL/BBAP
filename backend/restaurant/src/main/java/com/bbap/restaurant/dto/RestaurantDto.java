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
	private String workplaceName;
	private Time startTime;
	private Time endTime;

	public RestaurantDto(int restaurantId, int workplaceId, String restaurantName, Time startTime, Time endTime) {
		this.restaurantId = restaurantId;
		this.workplaceId = workplaceId;
		this.restaurantName = restaurantName;
		this.startTime = startTime;
		this.endTime = endTime;
	}
}
