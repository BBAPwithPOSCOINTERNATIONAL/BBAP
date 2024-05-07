package com.bbap.order_room.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic"); //메시지 받을때
		config.setApplicationDestinationPrefixes("/app"); //메시지 보낼때
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/websocket").setAllowedOriginPatterns("https://ssafybbap.com", "http://localhost:3000").withSockJS();
	}
	// @Override
	// public void registerStompEndpoints(StompEndpointRegistry registry) {
	// 	registry.addEndpoint("/websocket").setAllowedOrigins("*").addInterceptors(
	// 		new UserIdHandshakeInterceptor()
	// 	);
	// }
}
