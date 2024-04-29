package com.bbap.order.entity;

import java.time.LocalDateTime;
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
@Document(collection = "orders")
public class Order {
	@Id
	private String id;
	@Field("cafe_id")
	private String cafeId;
	@Field("emp_id")
	private Integer empId;
	@Field("order_time")
	private LocalDateTime orderTime;
	@Field("pick_up_time")
	private LocalDateTime pickUpTime;
	@Field("used_subsidy")
	private int usedSubsidy;
	private List<OrderMenu> menus;


	public Order(String cafeId, Integer empId, LocalDateTime orderTime, LocalDateTime pickUpTime,int usedSubsidy, List<OrderMenu> menus) {
		this.cafeId = cafeId;
		this.empId = empId;
		this.orderTime = orderTime;
		this.pickUpTime = pickUpTime;
		this.usedSubsidy = usedSubsidy;
		this.menus = menus;
	}
}
