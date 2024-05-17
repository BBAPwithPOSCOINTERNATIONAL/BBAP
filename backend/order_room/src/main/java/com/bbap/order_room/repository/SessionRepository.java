package com.bbap.order_room.repository;

import org.springframework.data.repository.CrudRepository;

import com.bbap.order_room.entity.redis.Room;
import com.bbap.order_room.entity.redis.Session;

public interface SessionRepository extends CrudRepository<Session, String> {
}
