package com.bbap.cafe.dto;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "cafes")
public class CafeDto {
	@Id
	private Integer id;
	private String name;
	private Integer workPlaceId;
	private LocalDateTime openTime;
	private LocalDateTime closeTime;
}
