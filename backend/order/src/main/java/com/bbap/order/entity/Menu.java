package com.bbap.order.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "menus")
public class Menu {
	@Id
	private String id;
	@Field("cafe_id")
	private String cafeId;
	private String name;
	private int price;
	private String description;
	@Field("menu_category")
	private String menuCategory;
	private List<Option> options;
}

