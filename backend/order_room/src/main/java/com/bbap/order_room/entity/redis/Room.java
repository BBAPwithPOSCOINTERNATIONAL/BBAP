package com.bbap.order_room.entity.redis;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

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
@RedisHash("Room")
public class Room {
	@Id
	private String roomId;
	private String roomStatus;
	private Integer currentOrderer; //empId 사용 - 사용자는 활성화된 하나의 방만 가질 수 있음
	private List<Integer> orderers; //empId 사용
	private List<OrderItem> orderItems;

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@ToString
    public static class OrderItem {
		private String menuId;
		private int cnt;
		private List<MenuOption> options;
		private String orderer;

		@Getter
		@Setter
		@NoArgsConstructor
		@AllArgsConstructor
		@ToString
		public static class MenuOption {
			private String optionName;
			private String type;
			private boolean required;
			private List<ChoiceOption> choiceOptions;

			@Getter
			@Setter
			@NoArgsConstructor
			@AllArgsConstructor
			@ToString
			public static class ChoiceOption {
				private String choiceName;
				private int price;
			}
		}
	}


}


