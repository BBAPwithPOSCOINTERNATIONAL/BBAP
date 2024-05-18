package com.bbap.order_room.dto.kafkamessage;

import com.bbap.order_room.dto.requestDto.AddOrderItemRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddOrderItemMessage {
    private String sessionId;
    private AddOrderItemRequestDto requestDto;
}
