package com.bbap.order.entity;

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
@Document(collection = "stamps")
public class Stamp {
	@Id
	private String id;
	@Field("cafe_id")
	private String cafeId;
	@Field("emp_id")
	private Integer empId;
	@Field("stamp_cnt")
	private int stampCnt;

}
