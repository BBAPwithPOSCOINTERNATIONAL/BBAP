package com.bbap.order_room.feign;

import org.springframework.cloud.openfeign.FeignClient;


@FeignClient(name = "order-api", url = "http://localhost:8081/api/v1/orders")
public interface OrderServiceFeignClient {

}
