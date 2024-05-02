package com.bbap.restaurant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bbap.restaurant.dto.RestaurantDto;
import com.bbap.restaurant.entity.RestaurantEntity;

@Repository
public interface RestaurantRepository extends JpaRepository<RestaurantEntity, Integer> {
	@Query("select new com.bbap.restaurant.dto.RestaurantDto"
		+ "(r.restaurantId, r.workplaceId,r.restaurantName,r.startTime,r.endTime) "
		+ "from RestaurantEntity r")
	List<RestaurantDto> findAllDto();

	RestaurantEntity findFirstByWorkplaceId(int workplaceId);
}
