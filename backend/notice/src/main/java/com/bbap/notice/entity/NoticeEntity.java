package com.bbap.notice.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notice", indexes = {
	@Index(name = "idx_emp_id", columnList = "emp_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "notice_id", nullable = false)
	private Integer noticeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "notice_template_id", nullable = false)
	NoticeTemplateEntity noticeTemplateEntity;

	@Column(name = "emp_id", nullable = false)
	private Integer empId;

	@Column(name = "notice_url", length = 100)
	private String noticeUrl;

	@Column(name = "store_name", length = 30)
	private String storeName;

	@Column(name = "notice_date", nullable = false)
	private LocalDateTime noticeDate;
}
