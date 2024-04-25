package com.bbap.cafe.dto.response;

import java.util.List;

import com.bbap.cafe.entity.Option;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuDto {
	private String id;
	private String name;
	private int price;
	private String description;
	private String imageUrl;
	private List<OptionDto> options;
}
