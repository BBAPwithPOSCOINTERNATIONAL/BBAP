package com.bbap.order.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.bbap.order.dto.response.OrderResultDto;

public interface CustomOrderRepository {
	List<OrderResultDto> findOrderDetailsByEmpId(Integer empId, LocalDateTime start, LocalDateTime end);

	OrderResultDto findOrderDetailByOrderId(String orderId);
}
