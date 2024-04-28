package com.bbap.notice.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notice_template")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeTemplateEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "notice_template_id", nullable = false)
	private Integer noticeTemplateId;

	@Column(name = "notice_classification", nullable = false, length = 10)
	private String noticeClassification;

	@Column(name = "notice_text", nullable = false, length = 50)
	private String noticeText;

	@OneToMany(mappedBy = "noticeTemplateEntity", fetch = FetchType.LAZY)
	private List<NoticeEntity> noticeList = new ArrayList<>();

	public NoticeTemplateEntity(Integer noticeTemplateId) {
		this.noticeTemplateId = noticeTemplateId;
	}
}
