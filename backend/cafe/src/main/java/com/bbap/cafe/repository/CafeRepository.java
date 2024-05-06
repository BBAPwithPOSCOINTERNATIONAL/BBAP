package com.bbap.cafe.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bbap.cafe.entity.Cafe;

@Repository
public interface CafeRepository extends MongoRepository<Cafe, String> {
	Cafe findFirstByWorkPlaceIdOrderByIdAsc(Integer workPlaceId);
}
