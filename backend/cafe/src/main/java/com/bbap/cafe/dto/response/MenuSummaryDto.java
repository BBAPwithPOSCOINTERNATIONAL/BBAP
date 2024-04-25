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
public class MenuSummaryDto {
	private String id;
	private String name;
	private int price;
	private String description;
	private String imageUrl;
}
