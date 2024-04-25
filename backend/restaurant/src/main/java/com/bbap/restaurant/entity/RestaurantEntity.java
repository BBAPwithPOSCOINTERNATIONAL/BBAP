package com.bbap.restaurant.entity;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "restaurant")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "restaurant_id", nullable = false)
	private Integer restaurantId;

	@Column(name = "workplace_id", nullable = false)
	private Integer workplaceId;

	@Column(name = "restaurant_name", nullable = false, length = 30)
	private String restaurantName;

	@Column(name = "start_time")
	private Time startTime;

	@Column(name = "end_time")
	private Time endTime;

	@OneToMany(mappedBy = "restaurantEntity", fetch = FetchType.LAZY)
	private List<RestaurantMenuEntity> menuEntityList = new ArrayList<>();
}
