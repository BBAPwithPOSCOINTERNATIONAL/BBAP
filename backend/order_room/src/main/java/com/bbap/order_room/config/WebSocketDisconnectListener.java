package com.bbap.order_room.config;

import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.broker.BrokerAvailabilityEvent;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.stereotype.Component;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.bbap.order_room.repository.SessionRepository;

@Component
public class WebSocketDisconnectListener implements ApplicationListener<SessionDisconnectEvent> {

    private final SessionRepository sessionRepository;

    public WebSocketDisconnectListener(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        // 이벤트로부터 헤더 액세서 가져오기
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        
        // 연결이 끊긴 세션의 정보를 레포지토리에서 삭제
        sessionRepository.deleteById(sessionId);
        
        System.out.println("세션 ID " + sessionId + "가 연결 해제되어 세션 레포지토리에서 삭제되었습니다.");
    }
}
