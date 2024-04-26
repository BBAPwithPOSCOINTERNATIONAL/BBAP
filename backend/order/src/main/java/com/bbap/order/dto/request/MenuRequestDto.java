package com.bbap.order.dto.request;

import java.util.List;

import com.bbap.order.entity.Option;

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
