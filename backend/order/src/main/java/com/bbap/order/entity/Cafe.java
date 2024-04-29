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
@Document(collection = "cafes")
public class Cafe {
	@Id
	private String id;
	private String name;
	@Field("work_place_id")
	private Integer workPlaceId;
	@Field("open_time")
	private String openTime;
	@Field("close_time")
	private String closeTime;
}
