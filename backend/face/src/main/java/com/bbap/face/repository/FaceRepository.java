package com.bbap.face.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bbap.face.entity.FaceEntity;

@Repository
public interface FaceRepository extends JpaRepository<FaceEntity, Integer> {

}
