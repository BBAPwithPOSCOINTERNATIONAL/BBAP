package com.bbap.order_room.repository;

import com.bbap.order_room.config.RedisTestContainerConfig;
import com.bbap.order_room.entity.redis.EntireParticipant;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;


import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@SpringBootTest
@Import(RedisTestContainerConfig.class)
public class ParticipantRepositoryTest {

    @Autowired
    private ParticipantRepository participantRepository;

    @BeforeEach
    public void setUp() {
//        20000~20010번 유저가 testRoomId에 들어가고 20011~20020 유저가 testRoomId2에 들어가있게 설정
        for (int i = 20000; i <= 20020; i++) {
            String roomId = i <= 20010 ? "testRoomId" : "testRoomId2";
            EntireParticipant participant = new EntireParticipant(i, roomId);
            participantRepository.save(participant);
        }
    }

    @Test
    public void whenFindByRoomId_thenReturnParticipants() {
        // When
        Iterable<EntireParticipant> allParticipantsIterable = participantRepository.findAll();
        List<EntireParticipant> allParticipantsList = StreamSupport.stream(allParticipantsIterable.spliterator(), false)
                .toList();
        List<EntireParticipant> participants = allParticipantsList.stream()
                .filter(participant -> "testRoomId".equals(participant.getRoomId()))
                .collect(Collectors.toList());


        assertThat(participants).isNotEmpty();
        assertThat(participants.size()).isEqualTo(11);
        assertThat(participants.get(0).getRoomId()).isEqualTo("testRoomId");
    }

    @Test
    public void whenFindByRoomIdMethod_thenReturnParticipants() {
        // When
        List<EntireParticipant> participants = participantRepository.findByRoomId("testRoomId");

        assertThat(participants).isNotEmpty();
        assertThat(participants.size()).isEqualTo(11);
        assertThat(participants.get(0).getRoomId()).isEqualTo("testRoomId");
    }

    @AfterEach
    public void tearDown() {
        participantRepository.deleteAll();
    }
}