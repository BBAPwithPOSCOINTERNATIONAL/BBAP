package com.bbap.cafe.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bbap.cafe.entity.Cafe;
import com.bbap.cafe.entity.Menu;

public interface MenuRepository extends MongoRepository<Menu, String> {
	List<Menu> findByCafeId(String cafeId);
	List<Menu> findByCafeIdAndMenuCategory(String cafeId, String menuCategory);
}
