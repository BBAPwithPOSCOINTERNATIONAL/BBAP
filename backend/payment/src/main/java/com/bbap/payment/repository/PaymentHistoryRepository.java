package com.bbap.payment.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bbap.payment.dto.DayPaymentDto;
import com.bbap.payment.dto.PaymentDto;
import com.bbap.payment.dto.response.DetailPaymentResponseData;
import com.bbap.payment.entity.PaymentHistoryEntity;

@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistoryEntity, Integer> {
	@Query("select new com.bbap.payment.dto.DayPaymentDto"
		+ "(day(p.paymentDate), sum(p.totalPaymentAmount), sum(p.useSubsidy))"
		+ "from PaymentHistoryEntity p where p.paymentDate between :start and :end "
		+ "group by day(p.paymentDate)")
	List<DayPaymentDto> findByYearAndMonth(LocalDateTime start, LocalDateTime end);

	@Query("select new com.bbap.payment.dto.PaymentDto"
		+ "(p.historyId,p.totalPaymentAmount,p.useSubsidy,p.totalPaymentAmount-p.useSubsidy,p.paymentDetail)"
		+ "from PaymentHistoryEntity p where p.paymentDate between :start and :end")
	List<PaymentDto> findByYearAndMonthAndDay(LocalDateTime start, LocalDateTime end);

	@Query("select new com.bbap.payment.dto.response.DetailPaymentResponseData"
		+ "(p.totalPaymentAmount,p.useSubsidy,p.totalPaymentAmount-p.useSubsidy,p.paymentDetail,p.payStore,p.historyMemo,p.paymentDate)"
		+ "from PaymentHistoryEntity p where p.historyId=:historyId")
	DetailPaymentResponseData findByHistoryId(int historyId);
}
