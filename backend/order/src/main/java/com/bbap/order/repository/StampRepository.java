package com.bbap.order.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bbap.order.entity.Stamp;

public interface StampRepository extends MongoRepository<Stamp, String> {

	Stamp findByEmpIdAndCafeId(Integer empId, String cafeId);
}
