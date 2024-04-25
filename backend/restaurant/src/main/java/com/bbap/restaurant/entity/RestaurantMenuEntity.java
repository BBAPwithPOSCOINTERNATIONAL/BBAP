package com.bbap.restaurant.entity;

import java.sql.Date;

import com.bbap.restaurant.entity.compositeKey.MenuId;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "restaurant_menu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantMenuEntity {
	@EmbeddedId
	private MenuId menuId;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("restaurantId")
	@JoinColumn(name = "restaurant_id", nullable = false)
	RestaurantEntity restaurantEntity;

	@Column(name = "menu_date", nullable = false)
	private Date menuDate;

	@Column(name = "meal_classification", nullable = false)
	private Integer mealClassification;

	@Column(name = "menu_name", nullable = false, length = 30)
	private String menuName;

	@Column(name = "menu_image", length = 50)
	private String menuImage;

	@Column(name = "menu_detail", columnDefinition = "TEXT")
	private String menuDetail;

	@Column(name = "menu_price", nullable = false)
	private Integer menuPrice;

	@Column(name = "eat_count", nullable = false)
	private Integer eatCount;
}
