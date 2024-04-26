package com.bbap.order.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bbap.order.entity.Menu;

public interface MenuRepository extends MongoRepository<Menu, String> {
	List<Menu> findByCafeId(String cafeId);
	List<Menu> findByCafeIdAndMenuCategory(String cafeId, String menuCategory);
}
