package com.bbap.order_room.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@TestConfiguration
@Testcontainers
public class RedisTestContainerConfig {

    private static final String REDIS_IMAGE = "redis:7.0.8-alpine";
    private static final int REDIS_PORT = 6379;

    @Container
    private static final GenericContainer<?> REDIS_CONTAINER = new GenericContainer<>(REDIS_IMAGE)
            .withExposedPorts(REDIS_PORT)
            .withReuse(true);

    static {
        REDIS_CONTAINER.start();
        String host = REDIS_CONTAINER.getHost();
        Integer port = REDIS_CONTAINER.getMappedPort(REDIS_PORT);
        System.setProperty("spring.redis.host", host);
        System.setProperty("spring.redis.port", port.toString());
    }
}