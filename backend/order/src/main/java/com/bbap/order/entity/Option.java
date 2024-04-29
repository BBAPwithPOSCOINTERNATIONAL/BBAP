package com.bbap.order.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Option {
	@Field("option_name")
	private String optionName;
	private String type;
	private boolean required;
	private List<Choice> choices;
}
