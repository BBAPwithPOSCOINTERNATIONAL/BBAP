package com.bbap.approval.config;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class EmpIdCheckInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
		Exception {
		// PREFLIGHT 요청 처리
		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			return true; // 모든 PREFLIGHT 요청 허용
		}

		// Swagger UI 경로 요청 검사
		String uri = request.getRequestURI();
		System.out.println(uri);
		if (uri.startsWith("/api/v1/approvals/swagger") || uri.startsWith("/api/v1/approval/swagger-ui")
			|| uri.startsWith("/api/v1/approvals/api-docs")) {
			return true; // Swagger UI 경로면 검사 무시
		}

		// EmpID 헤더 값 검사
		String empId = request.getHeader("X-Employee-Id");
		if ("1".equals(empId)) {
			return true; // EmpID가 1이면 요청 허용
		}

		// EmpID가 1이 아니면 요청 거부
		response.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403 Forbidden
		response.getWriter().write("Access denied");
		return false;
	}
}
