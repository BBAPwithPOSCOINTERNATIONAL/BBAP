package com.bbap.order.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bbap.order.entity.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
}
