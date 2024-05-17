package com.bbap.cafe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bbap.cafe.entity.Cafe;
import com.bbap.cafe.entity.Menu;
import com.bbap.cafe.entity.Option;

public interface MenuRepository extends MongoRepository<Menu, String> {
	List<Menu> findByCafeId(String cafeId);

	Optional<Menu> findByCafeIdAndName(String cafeId, String menuName);
}
