package com.bbap.order_room.dto.requestDto;

import java.util.List;

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
