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
public class MenuRequestDto {
	private String menuId;
	private int cnt;
	private List<OptionRequestDto> options;
}
