package com.bbap.notice.dto.response;

import java.util.List;

import com.bbap.notice.dto.NoticeDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListNoticeResponseData {
	private List<NoticeDto> noticeList;
}
