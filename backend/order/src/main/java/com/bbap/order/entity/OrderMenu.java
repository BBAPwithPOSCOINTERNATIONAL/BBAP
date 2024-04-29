package com.bbap.order.entity;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.data.mongodb.core.mapping.Document;

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
