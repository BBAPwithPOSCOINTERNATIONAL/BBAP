package com.bbap.order_room.entity.redis;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Orderer {
	private Integer empId;
	private String name;
	private String empNo;

	@JsonCreator
	public Orderer(
		@JsonProperty("empId") Integer empId,
		@JsonProperty("name") String name,
		@JsonProperty("empNo") String empNo) {
		this.empId = empId;
		this.name = name;
		this.empNo = empNo;
	}
}