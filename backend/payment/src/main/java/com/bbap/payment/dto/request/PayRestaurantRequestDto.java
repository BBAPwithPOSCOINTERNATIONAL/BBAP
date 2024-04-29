package com.bbap.payment.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PayRestaurantRequestDto {
	@NotNull
	@Schema(description = "사원 카드 번호")
	private String cardId;

	@NotNull
	@Schema(description = "메뉴 번호")
	private int menuId;
}
