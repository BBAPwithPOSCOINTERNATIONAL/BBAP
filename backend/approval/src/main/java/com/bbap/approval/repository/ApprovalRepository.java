package com.bbap.approval.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bbap.approval.dto.TotalPaymentDto;
import com.bbap.approval.entity.ApprovalEntity;

import jakarta.transaction.Transactional;

@Repository
public interface ApprovalRepository extends JpaRepository<ApprovalEntity, Integer> {
    @Query(
            "SELECT new com.bbap.approval.dto.TotalPaymentDto(p.empId,SUM(p.totalPaymentAmount), SUM(p.useSubsidy)) " +
                    "FROM PaymentHistoryEntity p JOIN ApprovalEntity a ON p.empId = a.empId " +
                    "WHERE a.empId IN :empIds AND a.approvalStatus = FALSE " +
                    "AND p.paymentDate BETWEEN :start AND :end GROUP BY p.empId")
    List<TotalPaymentDto> findTotalPayment(List<Integer> empIds, LocalDateTime start, LocalDateTime end);

    @Modifying
    @Transactional
    @Query("UPDATE ApprovalEntity a SET a.approvalStatus = TRUE WHERE a.empId IN :empIds")
    int empsApprove(List<Integer> empIds);


    @Modifying
    @Transactional
    @Query("UPDATE ApprovalEntity a SET a.approvalStatus = false")
    void updateAllApprovalStatusToFalse();
}
