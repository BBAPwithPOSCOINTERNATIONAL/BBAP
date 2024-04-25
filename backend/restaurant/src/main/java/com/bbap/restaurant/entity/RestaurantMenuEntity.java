package com.bbap.restaurant.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "restaurant_menu", indexes = {
	@Index(name = "idx_restaurant_menu", columnList = "restaurant_id, menu_date, meal_classification")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantMenuEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "restaurant_menu_id", nullable = false)
	private Integer restaurantMenuId;

	@ManyToOne(fetch = FetchType.LAZY)
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
