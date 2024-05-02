package com.bbap.order_room;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class OrderRoomApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderRoomApplication.class, args);
	}

}
