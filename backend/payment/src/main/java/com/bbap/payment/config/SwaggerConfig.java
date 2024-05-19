package com.bbap.payment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {
	SecurityScheme bearerAuth = new SecurityScheme()
		.type(SecurityScheme.Type.HTTP)
		.scheme("bearer")
		.bearerFormat("JWT")
		.in(SecurityScheme.In.HEADER)
		.name(HttpHeaders.AUTHORIZATION);

	// Security 요청 설정
	SecurityRequirement addSecurityItem = new SecurityRequirement().addList("JWT");

	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
			.components(new Components().addSecuritySchemes("JWT", bearerAuth))
			.addSecurityItem(addSecurityItem)
			.info(new Info()
				.title("BBAP_PAYMENT")
				.description("대규모 프로젝트.")
				.version("1.0.0"));
	}
}