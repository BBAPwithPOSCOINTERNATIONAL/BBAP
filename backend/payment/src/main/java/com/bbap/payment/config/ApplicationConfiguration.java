package com.bbap.payment.config;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.core.task.support.TaskExecutorAdapter;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableAsync
public class ApplicationConfiguration {
	@Bean
	public AsyncTaskExecutor applicationTaskExecutor() {
		return new TaskExecutorAdapter(Executors.newVirtualThreadPerTaskExecutor());
	}

	@Bean(name = "virtualThreadExecutor")
	public ExecutorService virtualThreadExecutor() {
		return Executors.newVirtualThreadPerTaskExecutor();
	}

	@Bean
	public WebMvcConfigurer webMvcConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
				configurer.setDefaultTimeout(600000);
				configurer.setTaskExecutor(applicationTaskExecutor());
			}
		};
	}
}