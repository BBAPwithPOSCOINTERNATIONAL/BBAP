package com.bbap.order_room.dto.requestDto;

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
public class SendNoticeRequestDto {
	private Integer[] empIds;
	private int noticeTemplateId;
	private String noticeUrl;
	private String storeName;
}
