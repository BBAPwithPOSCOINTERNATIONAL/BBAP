package com.bbap.cafe.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collation = "menus")
public class Menu {
	@Id
	private String id;
	private String cafeId;
	private String name;
	private int price;
	private String menuCategory;
	private List<Option> options;
}

