package com.bbap.cafe.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bbap.cafe.entity.Menu;
import com.bbap.cafe.entity.Stamp;

public interface StampRepository extends MongoRepository<Stamp, String> {
	Stamp findByCafeIdAndEmpId(String cafeId, Integer empId);
}
