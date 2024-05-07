package com.bbap.order.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bbap.order.entity.Cafe;

public interface CafeRepository extends MongoRepository<Cafe, String> {
}
