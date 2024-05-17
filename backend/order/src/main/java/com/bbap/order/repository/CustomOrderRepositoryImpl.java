package com.bbap.order.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import com.bbap.order.dto.response.OrderResultDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CustomOrderRepositoryImpl implements CustomOrderRepository {
	private final MongoTemplate mongoTemplate;

	@Override
	public List<OrderResultDto> findOrderDetailsByEmpId(Integer empId, LocalDateTime start, LocalDateTime end) {
		// empId와 시간 범위에 맞는 Order 문서 필터링
		MatchOperation matchOperation = Aggregation.match(
			new Criteria().andOperator(
				Criteria.where("emp_id").is(empId),
				Criteria.where("pick_up_time").gte(start).lte(end)
			)
		);

		// Cafes 컬렉션과 조인
		LookupOperation lookupOperation = LookupOperation.newLookup()
			.from("cafes")
			.localField("id")
			.foreignField("cafe_id")
			.as("cafeDetails");

		// $project를 사용하여 cafeDetails의 원하는 필드만 포함시키기
		ProjectionOperation projectionOperation = Aggregation.project()
			.andInclude("id", "order_time", "pick_up_time", "used_subsidy", "menus")// 기존 필드 유지
			.and(ArrayOperators.ArrayElemAt.arrayOf("cafeDetails.name").elementAt(0)).as("cafeName")
			.and(ArrayOperators.ArrayElemAt.arrayOf("cafeDetails.work_place_id").elementAt(0)).as("workPlaceId");

		// 집계 파이프라인 구성
		Aggregation aggregation = Aggregation.newAggregation(
			matchOperation, // 먼저 empId에 해당하는 문서 필터링
			lookupOperation, // 필터링된 결과에 대해 조인 수행
			projectionOperation
		);

		// 집계 실행
		AggregationResults<OrderResultDto> results = mongoTemplate.aggregate(aggregation, "orders",
			OrderResultDto.class);

		return results.getMappedResults();
	}

	@Override
	public OrderResultDto findOrderDetailByOrderId(String orderId) {
		// empId와 시간 범위에 맞는 Order 문서 필터링
		MatchOperation matchOperation = Aggregation.match(Criteria.where("_id").is(orderId));

		// Cafes 컬렉션과 조인
		LookupOperation lookupOperation = LookupOperation.newLookup()
			.from("cafes")
			.localField("id")
			.foreignField("cafe_id")
			.as("cafeDetails");

		// $project를 사용하여 cafeDetails의 원하는 필드만 포함시키기
		ProjectionOperation projectionOperation = Aggregation.project()
			.andInclude("id", "order_time", "pick_up_time", "used_subsidy", "menus")// 기존 필드 유지
			.and(ArrayOperators.ArrayElemAt.arrayOf("cafeDetails.name").elementAt(0)).as("cafeName")
			.and(ArrayOperators.ArrayElemAt.arrayOf("cafeDetails.work_place_id").elementAt(0)).as("workPlaceId");

		// 집계 파이프라인 구성
		Aggregation aggregation = Aggregation.newAggregation(
			matchOperation, // 먼저 empId에 해당하는 문서 필터링
			lookupOperation, // 필터링된 결과에 대해 조인 수행
			projectionOperation
		);

		// 집계 실행
		AggregationResults<OrderResultDto> results = mongoTemplate.aggregate(aggregation, "orders",
			OrderResultDto.class);

		// 결과 리스트 중 첫 번째 요소 반환, 없으면 null 반환
		return results.getUniqueMappedResult();
	}
}
