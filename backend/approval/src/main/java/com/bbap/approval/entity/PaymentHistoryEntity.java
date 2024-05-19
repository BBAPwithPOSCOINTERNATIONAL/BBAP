package com.bbap.approval.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payment_history", indexes = {
	@Index(name = "idx_emp_id", columnList = "emp_id"),
	@Index(name = "idx_payment_date", columnList = "payment_date")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentHistoryEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "history_id", nullable = false)
	private Integer historyId;

	@Column(name = "emp_id", nullable = false)
	private Integer empId;

	@Column(name = "pay_store", length = 30)
	private String payStore;

	@Column(name = "total_payment_amount", nullable = false)
	private Integer totalPaymentAmount;

	@Column(name = "use_subsidy", nullable = false)
	private Integer useSubsidy;

	@Column(name = "payment_detail", length = 50)
	private String paymentDetail;

	@Column(name = "history_memo", columnDefinition = "TEXT")
	private String historyMemo;

	@Column(name = "payment_date", nullable = false)
	private LocalDateTime paymentDate;
}
