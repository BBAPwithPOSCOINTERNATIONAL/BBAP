package com.bbap.order.dto;

import java.util.List;

import com.bbap.order.entity.OrderMenu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderSummary {
	private List<OrderMenu> orderMenus;
	private int totalFinalPrice;
	private String paymentDetail;
}