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
public class CafeListResponseDto {
	List<CafeSummaryDto> cafeList;
	SelectedCafeDto selectedCafe;
}
