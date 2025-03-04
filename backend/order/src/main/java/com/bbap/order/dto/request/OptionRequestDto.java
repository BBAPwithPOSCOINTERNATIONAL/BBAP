package com.bbap.order.dto.request;

import java.util.List;

import com.bbap.order.entity.Choice;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OptionRequestDto {
	private String optionName;
	private String type;
	private boolean required;
	private List<ChoiceRequestDto> choiceOptions;
}
