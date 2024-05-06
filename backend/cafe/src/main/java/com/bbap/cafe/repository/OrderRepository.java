package com.bbap.cafe.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bbap.cafe.entity.Menu;
import com.bbap.cafe.entity.Order;

public interface OrderRepository extends MongoRepository<Order, String> {
	List<Order> findAllByCafeIdAndOrderTimeAfter(String cafeId, Date startDate);
}
