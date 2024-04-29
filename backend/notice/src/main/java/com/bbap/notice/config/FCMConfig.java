package com.bbap.notice.config;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Configuration
public class FCMConfig {

	@PostConstruct
	public void initialize() {
		try {
			ClassPathResource serviceAccount = new ClassPathResource("firebase/ddukddak-firebase-adminsdk.json");

			FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
				.build();

			if (FirebaseApp.getApps().isEmpty()) { // 이 조건은 중복 초기화를 방지합니다.
				FirebaseApp.initializeApp(options);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}