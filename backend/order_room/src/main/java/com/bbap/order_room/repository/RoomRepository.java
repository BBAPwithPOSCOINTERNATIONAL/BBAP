package com.bbap.order_room.repository;

import org.springframework.data.repository.CrudRepository;

import com.bbap.order_room.entity.redis.Room;

public interface RoomRepository extends CrudRepository<Room, String> {
}
