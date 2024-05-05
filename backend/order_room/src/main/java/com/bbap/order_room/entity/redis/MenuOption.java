package com.bbap.order_room.entity.redis;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MenuOption {
	private String optionName;
	private String type;
	private boolean required;
	private List<ChoiceOption> choiceOptions;
}
