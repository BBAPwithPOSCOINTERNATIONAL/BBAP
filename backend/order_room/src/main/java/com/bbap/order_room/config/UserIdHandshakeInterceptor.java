package com.bbap.order_room.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

public class UserIdHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // HTTP 헤더에서 사용자 ID 추출
        String empId = request.getHeaders().getFirst("empId");
        System.out.println(empId);
        if (empId != null) {
            // WebSocket 세션 속성에 사용자 ID 저장
            attributes.put("empId", empId);
            return true;
        } else {
            // 사용자 ID가 없는 경우, 연결을 거부
            response.setStatusCode(HttpStatus.FORBIDDEN);
            return false;
        }
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        // Handshake 후 처리할 내용이 있다면 여기에 작성
    }
}