package com.bbap.cafe.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderMenu {
	private String name;
	private int cnt;
	private int price;
	private List<Option> options;
}
