package com.bbap.order.feign;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "payment-api", url = "${feign-payment}")
public interface PaymentServiceFeignClient {
}
