package com.bbap.order_room.entity.redis;

import java.util.List;

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
public class MenuOption {
	private String optionName;
	private String type;
	private boolean required;
	private List<ChoiceOption> choiceOptions;

	@JsonCreator
	public MenuOption(
		@JsonProperty("optionName") String optionName,
		@JsonProperty("type") String type,
		@JsonProperty("required") boolean required,
		@JsonProperty("choiceOptions") List<ChoiceOption> choiceOptions) {
		this.optionName = optionName;
		this.type = type;
		this.required = required;
		this.choiceOptions = choiceOptions;
	}
}
