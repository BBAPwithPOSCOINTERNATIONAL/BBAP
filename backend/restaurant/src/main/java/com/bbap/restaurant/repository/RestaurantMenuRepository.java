package com.bbap.restaurant.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bbap.restaurant.dto.MenuDto;
import com.bbap.restaurant.entity.RestaurantMenuEntity;

import jakarta.transaction.Transactional;

@Repository
public interface RestaurantMenuRepository extends JpaRepository<RestaurantMenuEntity, Integer> {
	@Query("select new com.bbap.restaurant.dto.MenuDto(m.menuName, m.menuImage,m.menuDetail,m.menuPrice,m.eatCount) "
		+ "from RestaurantMenuEntity m where m.restaurantEntity.restaurantId=:restaurantId and m.menuDate=:menuDate and m.mealClassification=:mealClassification")
	List<MenuDto> findMenuList(int restaurantId, Date menuDate, int mealClassification);

	@Modifying
	@Transactional
	@Query("update RestaurantMenuEntity m set m.eatCount=m.eatCount+1 where m.restaurantMenuId=:restaurantMenuId")
	void addEat(int restaurantMenuId);
}
