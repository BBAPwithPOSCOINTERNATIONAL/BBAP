package com.bbap.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bbap.notice.entity.NoticeTemplateEntity;

@Repository
public interface NoticeTemplateRepository extends JpaRepository<NoticeTemplateEntity, Integer> {

}
