package com.bbap.cafe.dto.response;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CafeResponseDto {
	private String id;
	private String name;
	private String workPlaceName;
	private String openTime;
	private String closeTime;
}
