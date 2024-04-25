package com.bbap.restaurant.entity.compositeKey;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@EqualsAndHashCode
public class MenuId implements Serializable {
	
	@Column(name = "restaurant_id", nullable = false)
	private Integer restaurantId;

	@Column(name = "restaurant_menu_id", nullable = false)
	private Integer restaurantMenuId;
}