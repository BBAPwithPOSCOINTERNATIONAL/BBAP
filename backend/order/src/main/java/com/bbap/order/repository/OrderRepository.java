package com.bbap.order.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bbap.order.entity.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
	// @Query("{'emp_id': ?2, 'pick_up_time': {$gte: ?0, $lt: ?1}}")
	// List<Order> findByEmployeeAndPickUpTimeBetween(LocalDateTime start, LocalDateTime end, Integer empId);
}
