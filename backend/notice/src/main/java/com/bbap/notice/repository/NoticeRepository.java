package com.bbap.notice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bbap.notice.dto.NoticeDto;
import com.bbap.notice.entity.NoticeEntity;

import jakarta.transaction.Transactional;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer> {
	@Query("select new com.bbap.notice.dto.NoticeDto"
		+ "(n.noticeId, t.noticeClassification,t.noticeText,n.noticeUrl,n.storeName,n.noticeDate) "
		+ "from NoticeEntity n JOIN n.noticeTemplateEntity t WHERE n.empId = :empId")
	List<NoticeDto> findByEmpId(int empId);

	@Modifying
	@Transactional
	@Query("delete from NoticeEntity n where n.noticeId =:noticeId")
	void deleteOne(int noticeId);

	@Modifying
	@Transactional
	@Query("delete from NoticeEntity n where n.empId =:empId")
	void deleteAllbyEmpId(int empId);
}
