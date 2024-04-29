package com.bbap.restaurant.dto.response;

import java.util.List;

import com.bbap.restaurant.dto.MenuDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListMenuResponseData {
	private List<MenuDto> menuList;
}
