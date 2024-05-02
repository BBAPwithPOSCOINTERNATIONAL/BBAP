package com.bbap.order_room.util;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MakeLinkUtil {
	//roomId를 이용한 방 링크 주소
	public static String roomLink(String roomId) {
		return " https://ssafybbap.com/order-room/" + roomId;
	}
}