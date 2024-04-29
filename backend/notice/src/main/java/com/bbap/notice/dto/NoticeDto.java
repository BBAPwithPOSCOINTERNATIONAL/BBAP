package com.bbap.notice.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDto {
	private int noticeId;
	private String noticeClassification;
	private String noticeText;
	private String noticeUrl;
	private String storeName;
	private LocalDateTime noticeDate;
}
