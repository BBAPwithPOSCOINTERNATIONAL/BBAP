package com.bbap.cafe.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OptionDto {
	private String optionName;
	private String type;
	private boolean required;
    private List<ChoiceDto> choice;
}
