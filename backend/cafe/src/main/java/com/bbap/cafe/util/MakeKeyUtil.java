package com.bbap.cafe.util;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MakeKeyUtil {
	//카페Id 와 메뉴 Id를 이용한 S3주소
	public static String menuImage(String cafeId, String menuId) {
		return "https://ssafy-bbap.s3.ap-northeast-2.amazonaws.com/cafe/"
			+ cafeId + "/menu-image/" + menuId + ".png";
	}
}