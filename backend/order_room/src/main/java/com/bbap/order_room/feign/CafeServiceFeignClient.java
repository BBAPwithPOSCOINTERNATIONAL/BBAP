package com.bbap.order_room.feign;

import org.springframework.cloud.openfeign.FeignClient;


@FeignClient(name = "cafe-api", url = "http://localhost:8082/api/v1/cafes")
public interface CafeServiceFeignClient {
}
