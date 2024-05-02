package com.bbap.order_room.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bbap.order_room.entity.redis.EntireParticipant;

@Repository
public interface ParticipantRepository extends CrudRepository<EntireParticipant, Integer> {

}
