package com.bbap.payment.config;

import java.util.concurrent.Semaphore;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class SemaphoreAspect {
	private static final Semaphore semaphore = new Semaphore(60);

	@Around("execution(* com.bbap.payment.controller.PaymentController.*(..))")
	public Object aroundControllerMethods(ProceedingJoinPoint joinPoint) throws Throwable {
		semaphore.acquire();
		try {
			return joinPoint.proceed();
		} finally {
			semaphore.release();
		}
	}
}
