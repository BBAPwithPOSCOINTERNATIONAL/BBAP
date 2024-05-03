package com.bbap.approval.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bbap.approval.dto.PaymentDto;
import com.bbap.approval.entity.PaymentHistoryEntity;

@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistoryEntity, Integer> {
	@Query("select new com.bbap.approval.dto.PaymentDto"
		+ "(p.totalPaymentAmount,p.useSubsidy,p.totalPaymentAmount-p.useSubsidy,p.paymentDate)"
		+ "from PaymentHistoryEntity p where p.empId=:empId and p.paymentDate between :start and :end")
	List<PaymentDto> findByDate(int empId, LocalDateTime start, LocalDateTime end);
}
