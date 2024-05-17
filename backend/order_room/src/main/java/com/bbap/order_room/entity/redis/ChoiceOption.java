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
public class ChoiceOption {
	private String choiceName;
	private int price;

	@JsonCreator
	public ChoiceOption(
		@JsonProperty("choiceName") String choiceName,
		@JsonProperty("price") int price) {
		this.choiceName = choiceName;
		this.price = price;
	}
}
