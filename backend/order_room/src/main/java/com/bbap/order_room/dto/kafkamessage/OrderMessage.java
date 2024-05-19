package com.bbap.order_room.dto.kafkamessage;

import com.bbap.order_room.dto.requestDto.OrderRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderMessage {
    private String sessionId;
    private OrderRequestDto orderRequestDto;
}
